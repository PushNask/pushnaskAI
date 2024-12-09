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
              data: {
                persistSession: credentials.rememberMe
              }
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

      if (response.error) {
        throw response.error;
      }

      // Handle successful authentication
      if (response.data?.user) {
        if (isLogin) {
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

      const errorMessage = error instanceof AuthError 
        ? error.message 
        : 'An unexpected error occurred';
      
      setError(errorMessage);
      toast.error(errorMessage);

      // Auto-reset error after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
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