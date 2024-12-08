import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAuthMethods = () => {
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting sign in for:', email);
      
      // First, validate inputs
      if (!email || !password) {
        toast.error('Please provide both email and password');
        return;
      }

      // Attempt sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        
        // Handle specific error cases
        switch (true) {
          case error.message.includes('Email not confirmed'):
            toast.error('Please confirm your email address before signing in');
            break;
          case error.message.includes('Invalid login credentials'):
            toast.error('Invalid email or password');
            break;
          default:
            toast.error(error.message);
        }
        return;
      }

      if (data.user) {
        console.log('Sign in successful for user:', data.user.id);
        
        try {
          // Log successful sign in
          await supabase.rpc('log_event', {
            p_user_id: data.user.id,
            p_event_type: 'sign_in_success',
            p_resource_type: 'auth',
            p_resource_id: data.user.id,
            p_details: { method: 'email' },
            p_metadata: { timestamp: new Date().toISOString() }
          });

          // Check if user has a profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          if (profileError) {
            console.error('Error fetching profile:', profileError);
            toast.error('Error loading user profile');
            return;
          }

          console.log('Profile check result:', { hasProfile: !!profile });

          // Navigate based on profile existence
          if (profile) {
            navigate('/ai-advisor');
          } else {
            navigate('/profile/setup');
          }
          
          toast.success('Welcome back!');
        } catch (innerError) {
          console.error('Post-authentication error:', innerError);
          toast.error('An error occurred after sign in');
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      console.log('Attempting sign up for:', email);
      
      if (!email || !password) {
        toast.error('Please provide both email and password');
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Sign up error:', error);
        toast.error(error.message);
        return;
      }

      if (data.user) {
        console.log('Sign up successful for user:', data.user.id);
        
        try {
          // Log successful sign up
          await supabase.rpc('log_event', {
            p_user_id: data.user.id,
            p_event_type: 'sign_up_success',
            p_resource_type: 'auth',
            p_resource_id: data.user.id,
            p_details: { method: 'email' },
            p_metadata: { timestamp: new Date().toISOString() }
          });
          
          toast.success('Please check your email to confirm your account!');
        } catch (innerError) {
          console.error('Error logging sign up:', innerError);
        }
      }
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('An unexpected error occurred during sign up');
    }
  };

  const signOut = async () => {
    try {
      // Get user before signing out
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        toast.error('Error signing out');
        return;
      }
      
      if (user) {
        console.log('Sign out successful for user:', user.id);
        
        try {
          // Log successful sign out
          await supabase.rpc('log_event', {
            p_user_id: user.id,
            p_event_type: 'sign_out_success',
            p_resource_type: 'auth',
            p_resource_id: user.id,
            p_details: {},
            p_metadata: { timestamp: new Date().toISOString() }
          });
        } catch (innerError) {
          console.error('Error logging sign out:', innerError);
        }
      }

      navigate('/auth');
      toast.success('Successfully signed out');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('An unexpected error occurred during sign out');
    }
  };

  return {
    signIn,
    signUp,
    signOut
  };
};