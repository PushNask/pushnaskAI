import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AuthError, AuthResponse } from '@supabase/supabase-js';

const AUTH_TIMEOUT = 15000; // 15 seconds timeout

interface Credentials {
  email: string;
  password: string;
}

export const useAuthHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
        ? supabase.auth.signInWithPassword(credentials)
        : supabase.auth.signUp(credentials);

      // Race between auth and timeout
      const response = await Promise.race([authPromise, timeoutPromise]);

      console.log('Auth response:', response);

      if (response.error) {
        throw new Error(response.error.message);
      }

      // Handle successful authentication
      if (response.data?.user) {
        if (isLogin) {
          // Check for user profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', response.data.user.id)
            .single();

          console.log('Profile check:', { profile, profileError });

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
      toast.error(errorMessage);

      // Auto-reset error after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleSignOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
      toast.success('Successfully signed out');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Error signing out. Please try again.');
    }
  }, [navigate]);

  return {
    handleAuth,
    handleSignOut,
    isLoading,
    error,
  };
};

export default useAuthHandler;