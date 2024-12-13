import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile, AuthState, AuthContextType } from './types';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    profile: null,
    loading: true,
    error: null
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setState(prev => ({ 
          ...prev, 
          session,
          user: session.user,
          loading: false 
        }));
        fetchProfile(session.user.id);
      } else {
        setState(prev => ({ ...prev, loading: false }));
      }
    });

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        setState(prev => ({
          ...prev,
          session,
          user: session?.user || null,
          loading: false
        }));

        if (event === 'SIGNED_IN' && session?.user) {
          await fetchProfile(session.user.id);
          const from = (location.state as any)?.from || '/ai-advisor';
          navigate(from, { replace: true });
        } else if (event === 'SIGNED_OUT') {
          setState(prev => ({ ...prev, profile: null }));
          navigate('/auth');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      setState(prev => ({ ...prev, profile }));
    } catch (error) {
      console.error('Error fetching profile:', error);
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to fetch profile' 
      }));
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success('Successfully signed in!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to sign in';
      setState(prev => ({ ...prev, error: message }));
      toast.error(message);
      throw error;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + '/auth?mode=login'
        }
      });

      if (error) throw error;
      
      toast.success('Please check your email to confirm your account!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to sign up';
      setState(prev => ({ ...prev, error: message }));
      toast.error(message);
      throw error;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const signOut = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success('Successfully signed out');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to sign out';
      setState(prev => ({ ...prev, error: message }));
      toast.error(message);
      throw error;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!state.user?.id) {
      throw new Error('No user logged in');
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', state.user.id)
        .select()
        .single();

      if (error) throw error;

      setState(prev => ({
        ...prev,
        profile: data
      }));
      
      toast.success('Profile updated successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update profile';
      setState(prev => ({ ...prev, error: message }));
      toast.error(message);
      throw error;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const value: AuthContextType = {
    ...state,
    signIn,
    signUp,
    signOut,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}