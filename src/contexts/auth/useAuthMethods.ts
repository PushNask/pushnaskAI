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
        let errorMessage = 'Failed to sign in.';
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please verify your email address before signing in.';
        }
        throw new Error(errorMessage);
      }

      if (data.user) {
        await logAuthEvent('sign_in_success', {
          method: 'email',
          timestamp: new Date().toISOString()
        });
      }

      navigate('/ai-advisor');
      toast.success('Welcome back!');
    } catch (error) {
      console.error('Sign in error:', error);
      await logAuthEvent('sign_in_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      toast.error(error instanceof Error ? error.message : 'Failed to sign in.');
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        let errorMessage = 'Failed to create account.';
        if (error.message.includes('already registered')) {
          errorMessage = 'This email is already registered. Please try signing in instead.';
        } else if (error.message.includes('valid email')) {
          errorMessage = 'Please enter a valid email address.';
        }
        throw new Error(errorMessage);
      }

      if (data.user) {
        await logAuthEvent('sign_up_success', {
          method: 'email',
          timestamp: new Date().toISOString()
        });
      }

      toast.success('Check your email to confirm your account!');
    } catch (error) {
      console.error('Sign up error:', error);
      await logAuthEvent('sign_up_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      toast.error(error instanceof Error ? error.message : 'Failed to create account.');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear all auth-related items from localStorage
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('supabase.auth.expires_at');
      localStorage.removeItem('supabase.auth.refresh_token');
      
      await logAuthEvent('sign_out_success', {
        timestamp: new Date().toISOString()
      });

      navigate('/auth');
      toast.success('Successfully signed out');
    } catch (error) {
      console.error('Sign out error:', error);
      await logAuthEvent('sign_out_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      toast.error('Failed to sign out');
      throw error;
    }
  };

  return {
    signIn,
    signUp,
    signOut
  };
};

async function logAuthEvent(
  eventType: string,
  details: Record<string, any> = {}
) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.rpc('log_event', {
      p_user_id: user?.id,
      p_event_type: eventType,
      p_resource_type: 'auth',
      p_resource_id: user?.id,
      p_details: details
    });

    if (error) {
      console.error('Failed to log auth event:', error);
    }
  } catch (error) {
    console.error('Error logging auth event:', error);
  }
}
