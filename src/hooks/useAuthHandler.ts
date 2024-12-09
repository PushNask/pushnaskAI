import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AuthError, AuthResponse } from '@supabase/supabase-js';

const AUTH_TIMEOUT = 15000; // 15 seconds timeout

interface Credentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export const useAuthHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const navigate = useNavigate();

  const handleAuth = useCallback(async (credentials: Credentials, isLogin: boolean) => {
    setIsLoading(true);
    setError(null);

    console.log(`Attempting ${isLogin ? 'login' : 'signup'} for:`, credentials.email);

    // Check for account lockout (5 attempts)
    if (isLogin && failedAttempts >= 5) {
      setIsLoading(false);
      setError('Account temporarily locked. Please try again later.');
      toast.error('Account locked due to too many failed attempts');
      return;
    }

    // Create a timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error('Authentication timeout - Please try again'));
      }, AUTH_TIMEOUT);
    });

    try {
      // Create the auth promise
      const authPromise: Promise<AuthResponse> = isLogin 
        ? supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
            options: {
              persistSession: credentials.rememberMe
            }
          })
        : supabase.auth.signUp({
            email: credentials.email,
            password: credentials.password,
            options: {
              emailRedirectTo: `${window.location.origin}/auth/callback`
            }
          });

      // Race between auth and timeout
      const response = await Promise.race([authPromise, timeoutPromise]);
      console.log('Auth response:', response);

      if (response.error) {
        if (isLogin) {
          setFailedAttempts(prev => prev + 1);
        }
        throw new Error(response.error.message);
      }

      // Handle successful authentication
      if (response.data?.user) {
        // Reset failed attempts on successful login
        if (isLogin) {
          setFailedAttempts(0);
          
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
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      
      setError(errorMessage);
      toast.error(getReadableErrorMessage(errorMessage));

      // Auto-reset error after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  }, [navigate, failedAttempts]);

  const handleSignOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear any stored auth data
      localStorage.removeItem('supabase.auth.token');
      sessionStorage.removeItem('supabase.auth.token');
      
      navigate('/auth');
      toast.success('Successfully signed out');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Error signing out. Please try again.');
    }
  }, [navigate]);

  // Helper function to make error messages more user-friendly
  const getReadableErrorMessage = (error: string): string => {
    if (error.includes('Invalid login credentials')) {
      return 'Invalid email or password. Please try again.';
    }
    if (error.includes('Email not confirmed')) {
      return 'Please confirm your email address before signing in.';
    }
    if (error.includes('already registered')) {
      return 'This email is already registered. Please try signing in instead.';
    }
    if (error.includes('Password should be')) {
      return 'Password must be at least 6 characters long.';
    }
    return error;
  };

  return {
    handleAuth,
    handleSignOut,
    isLoading,
    error,
    failedAttempts
  };
};

export default useAuthHandler;