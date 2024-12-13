import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthState } from './types';
import { toast } from 'sonner';

export const useAuthState = (): AuthState => {
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    profile: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          setState(prev => ({
            ...prev,
            session,
            user: session.user,
            profile,
            loading: false,
            error: null
          }));
        } else {
          setState(prev => ({
            ...prev,
            loading: false,
            error: null
          }));
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to initialize auth'
        }));
        toast.error('Failed to initialize authentication');
      }
    };

    // Initialize auth
    initializeAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);

        if (event === 'SIGNED_OUT') {
          setState(prev => ({
            ...prev,
            session: null,
            user: null,
            profile: null,
            loading: false,
            error: null
          }));
        } else if (session?.user) {
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            setState(prev => ({
              ...prev,
              session,
              user: session.user,
              profile,
              loading: false,
              error: null
            }));
          } catch (error) {
            console.error('Error fetching profile:', error);
            setState(prev => ({
              ...prev,
              loading: false,
              error: error instanceof Error ? error.message : 'Failed to fetch profile'
            }));
            toast.error('Failed to fetch user profile');
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return state;
};