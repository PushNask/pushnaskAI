import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAuthMethods = () => {
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        toast.error(error.message);
        throw error;
      }

      if (data.user) {
        // Log successful sign in with correct parameter order
        await supabase.rpc('log_event', {
          p_user_id: data.user.id,
          p_event_type: 'sign_in_success',
          p_resource_type: 'auth',
          p_resource_id: data.user.id,
          p_details: { method: 'email' },
          p_metadata: { timestamp: new Date().toISOString() }
        });

        // Check if user has a profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profile) {
          navigate('/ai-advisor');
        } else {
          navigate('/profile/setup');
        }
        
        toast.success('Welcome back!');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Sign up error:', error);
        toast.error(error.message);
        throw error;
      }

      if (data.user) {
        // Log successful sign up with correct parameter order
        await supabase.rpc('log_event', {
          p_user_id: data.user.id,
          p_event_type: 'sign_up_success',
          p_resource_type: 'auth',
          p_resource_id: data.user.id,
          p_details: { method: 'email' },
          p_metadata: { timestamp: new Date().toISOString() }
        });
        
        toast.success('Check your email to confirm your account!');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Get user before signing out
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      if (user) {
        // Log successful sign out with correct parameter order
        await supabase.rpc('log_event', {
          p_user_id: user.id,
          p_event_type: 'sign_out_success',
          p_resource_type: 'auth',
          p_resource_id: user.id,
          p_details: {},
          p_metadata: { timestamp: new Date().toISOString() }
        });
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