import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AuthError, AuthResponse } from '@supabase/supabase-js';

interface Credentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const AUTH_TIMEOUT = 15000; // 15 seconds timeout

export const useAuthHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const navigate = useNavigate();

  const handleAuth = useCallback(async (credentials: Credentials, isLogin: boolean) => {
    setIsLoading(true);
    setError(null);

    console.log(`Attempting ${isLogin ? 'login' : 'signup'} for:`, credentials.email);

    // Create an AbortController for timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), AUTH_TIMEOUT);

    try {
      // Create the auth promise
      const authPromise: Promise<AuthResponse> = isLogin 
        ? supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password
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
          // Set session persistence based on rememberMe
          if (credentials.rememberMe) {
            await supabase.auth.setSession({
              access_token: response.data.session!.access_token,
              refresh_token: response.data.session!.refresh_token
            });
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
      }
    } catch (error) {
      console.error('Auth error:', error);
      
      if (isLogin) {
        setFailedAttempts(prev => prev + 1);
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
      
      setError(errorMessage);
      toast.error(errorMessage);

      // Auto-reset error after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  }, [navigate]);

  return {
    handleAuth,
    isLoading,
    error,
    failedAttempts
  };
};

export default useAuthHandler;