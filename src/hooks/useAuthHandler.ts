import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import { AuthError } from '@supabase/supabase-js';

// Password validation schema
const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

interface AuthState {
  loading: boolean;
  error: string | null;
  failedAttempts: number;
  lastAttempt: number;
}

interface UseAuthHandlerOptions {
  maxAttempts?: number;
  lockoutDuration?: number; // in minutes
  tokenStorage?: 'cookie' | 'memory';
}

interface Credentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export const useAuthHandler = (options: UseAuthHandlerOptions = {}) => {
  const {
    maxAttempts = 5,
    lockoutDuration = 30,
    tokenStorage = 'cookie'
  } = options;

  const [authState, setAuthState] = useState<AuthState>({
    loading: false,
    error: null,
    failedAttempts: 0,
    lastAttempt: 0
  });
  const navigate = useNavigate();

  // Check if account is locked
  const isAccountLocked = useCallback(() => {
    const { failedAttempts, lastAttempt } = authState;
    if (failedAttempts >= maxAttempts) {
      const timeSinceLastAttempt = Date.now() - lastAttempt;
      const lockoutMs = lockoutDuration * 60 * 1000;
      return timeSinceLastAttempt < lockoutMs;
    }
    return false;
  }, [authState, maxAttempts, lockoutDuration]);

  const handleAuth = useCallback(async (credentials: Credentials, isLogin: boolean) => {
    try {
      // Check for account lockout
      if (isAccountLocked()) {
        throw new Error('Account temporarily locked. Please try again later.');
      }

      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      console.log(`Attempting ${isLogin ? 'login' : 'signup'} for:`, credentials.email);

      // Validate password for new accounts
      if (!isLogin) {
        const passwordValidation = passwordSchema.safeParse(credentials.password);
        if (!passwordValidation.success) {
          throw new Error(passwordValidation.error.errors[0].message);
        }
      }

      // Create an AbortController for timeout handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      try {
        // Attempt authentication
        const authPromise = isLogin
          ? supabase.auth.signInWithPassword({
              email: credentials.email,
              password: credentials.password,
            })
          : supabase.auth.signUp({
              email: credentials.email,
              password: credentials.password,
              options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`
              }
            });

        // Race between auth and timeout
        const response = await Promise.race([
          authPromise,
          new Promise<never>((_, reject) => {
            controller.signal.addEventListener('abort', () => {
              reject(new Error('Authentication timeout - Please try again'));
            });
          })
        ]);

        if (response.error) {
          throw response.error;
        }

        // Handle successful authentication
        if (response.data?.user) {
          if (isLogin) {
            // Handle session persistence based on rememberMe
            if (credentials.rememberMe && response.data.session) {
              if (tokenStorage === 'cookie') {
                document.cookie = `auth-token=${response.data.session.access_token}; path=/; secure; samesite=strict`;
              } else {
                sessionStorage.setItem('auth-token', response.data.session.access_token);
              }
            }

            // Check if profile exists
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', response.data.user.id)
              .single();

            if (profile) {
              navigate('/ai-advisor');
              toast.success('Welcome back!');
            } else {
              navigate('/profile/setup');
              toast.success('Please complete your profile setup');
            }
          } else {
            toast.success('Please check your email to confirm your account!');
          }

          // Reset failed attempts on success
          setAuthState({
            loading: false,
            error: null,
            failedAttempts: 0,
            lastAttempt: Date.now()
          });
        }
      } finally {
        clearTimeout(timeoutId);
      }
    } catch (error) {
      console.error('Auth error:', error);
      
      if (isLogin) {
        setAuthState(prev => ({
          loading: false,
          error: error instanceof Error ? error.message : 'Authentication failed',
          failedAttempts: prev.failedAttempts + 1,
          lastAttempt: Date.now()
        }));
      }

      let errorMessage = 'An unexpected error occurred';
      
      if (error instanceof AuthError) {
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please confirm your email before signing in';
        } else if (error.message.includes('timeout')) {
          errorMessage = 'Authentication timed out - Please try again';
        } else {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setAuthState(prev => ({ ...prev, error: errorMessage }));
      toast.error(errorMessage);

      // Auto-reset error after 5 seconds
      setTimeout(() => setAuthState(prev => ({ ...prev, error: null })), 5000);
    } finally {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, [navigate, isAccountLocked, tokenStorage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear any stored tokens on unmount
      if (tokenStorage === 'memory') {
        sessionStorage.removeItem('auth-token');
      }
    };
  }, [tokenStorage]);

  return {
    isLoading: authState.loading,
    error: authState.error,
    failedAttempts: authState.failedAttempts,
    handleAuth,
    isAccountLocked: isAccountLocked(),
    resetFailedAttempts: () => setAuthState(prev => ({ ...prev, failedAttempts: 0 }))
  };
};

export default useAuthHandler;