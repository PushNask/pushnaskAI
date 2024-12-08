import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthState } from './types';

export const useAuthState = (): AuthState => {
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    loading: true
  });

  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session?.user?.id);
      setState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
        loading: false
      }));
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log('Auth state changed:', session?.user?.id);
        setState(prev => ({
          ...prev,
          session,
          user: session?.user ?? null,
          loading: false
        }));
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return state;
};