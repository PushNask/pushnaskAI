import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthState } from './types';

export const useAuthState = (): AuthState => {
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    loading: true,
    profile: null
  });

  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Get initial session and profile
    const initializeAuth = async () => {
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
          loading: false
        }));
      } else {
        setState(prev => ({
          ...prev,
          loading: false
        }));
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log('Auth state changed:', session?.user?.id);
        
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
            loading: false
          }));
        } else {
          setState(prev => ({
            ...prev,
            session: null,
            user: null,
            profile: null,
            loading: false
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