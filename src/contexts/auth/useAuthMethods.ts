import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAuthMethods = () => {
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    console.log('Attempting sign in for:', email);
    
    if (!email || !password) {
      throw new Error('Please provide both email and password');
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password. Please try again.');
        } else if (error.message.includes('Email not confirmed')) {
          throw new Error('Please confirm your email address before signing in.');
        } else {
          throw error;
        }
      }

      if (data.user) {
        console.log('Sign in successful for user:', data.user.id);
        
        try {
          // Check if user has a profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          if (profileError && !profileError.message.includes('not found')) {
            console.error('Error fetching profile:', profileError);
            throw new Error('Error loading user profile');
          }

          console.log('Profile check result:', { profile });

          // Navigate based on profile existence
          if (profile) {
            navigate('/ai-advisor');
            toast.success('Welcome back!');
          } else {
            navigate('/profile/setup');
            toast.success('Please complete your profile setup');
          }
        } catch (innerError) {
          console.error('Post-authentication error:', innerError);
          throw new Error('An error occurred after sign in');
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      console.log('Attempting sign up for:', email);
      
      if (!email || !password) {
        throw new Error('Please provide both email and password');
      }

      // Simplified password validation
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + '/auth?mode=login'
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        if (error.message.includes('already registered')) {
          throw new Error('This email is already registered. Please try signing in instead.');
        }
        throw error;
      }

      console.log('Sign up successful:', data);
      
      toast.success('Please check your email to confirm your account!');
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        throw error;
      }
      
      navigate('/auth');
      toast.success('Successfully signed out');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  return {
    signIn,
    signUp,
    signOut
  };
};