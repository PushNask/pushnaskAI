import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(() => {
    const savedSession = localStorage.getItem('supabase.auth.session');
    return savedSession ? JSON.parse(savedSession) : null;
  });
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logAuthEvent = async (
    eventType: string,
    details: Record<string, any> = {}
  ) => {
    try {
      const { error } = await supabase.rpc('log_event', {
        p_user_id: user?.id,
        p_event_type: eventType,
        p_resource_type: 'auth',
        p_resource_id: user?.id || null,
        p_details: details,
        p_metadata: {
          timestamp: new Date().toISOString(),
          session_id: session?.id
        }
      });

      if (error) {
        console.error('Failed to log auth event:', error);
      }
    } catch (error) {
      console.error('Error logging auth event:', error);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (initialSession) {
          setSession(initialSession);
          setUser(initialSession.user);
          localStorage.setItem('supabase.auth.session', JSON.stringify(initialSession));
          await logAuthEvent('session_restored', {
            method: 'local_storage',
            timestamp: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('Auth state changed:', event, currentSession?.user?.id);
      
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession) {
        localStorage.setItem('supabase.auth.session', JSON.stringify(currentSession));
        
        if (currentSession.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: currentSession.user.id,
              email: currentSession.user.email,
              updated_at: new Date().toISOString()
            }, {
              onConflict: 'id'
            });

          if (profileError) {
            console.error('Error updating profile:', profileError);
          }

          await logAuthEvent('auth_state_changed', {
            event,
            timestamp: new Date().toISOString()
          });
        }
      } else {
        localStorage.removeItem('supabase.auth.session');
        await logAuthEvent('session_ended', {
          timestamp: new Date().toISOString()
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            email: data.user.email,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'id'
          });

        if (profileError) {
          console.error('Error updating profile:', profileError);
        }

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
      toast.error('Failed to sign in. Please check your credentials.');
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

      if (error) throw error;

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: data.user.email,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
        }

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
      toast.error('Failed to create account. Please try again.');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      localStorage.removeItem('supabase.auth.session');
      localStorage.removeItem('supabase.auth.token');
      
      setSession(null);
      setUser(null);

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

  return (
    <AuthContext.Provider value={{ session, user, signIn, signUp, signOut, loading }}>
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