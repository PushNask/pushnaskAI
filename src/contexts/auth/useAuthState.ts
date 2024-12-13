import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthState } from './types';

export const useAuthState = (): AuthState => {
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    loading: true,
    profile: null,
    error: null
  });

  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Get initial session and profile
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          console.log('Initial session found:', session.user.id);
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('Error fetching profile:', profileError);
          }

          setState(prev => ({
            ...prev,
            session,
            user: session.user,
            profile,
            loading: false
          }));
        } else {
          console.log('No initial session found');
          setState(prev => ({
            ...prev,
            loading: false
          }));
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to initialize auth'
        }));
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log('Auth state changed:', session?.user?.id);
        
        if (session?.user) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('Error fetching profile:', profileError);
          }

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
            session: null,
            user: null,
            profile: null,
            loading: false,
            error: null
          }));
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return state;
};