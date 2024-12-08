import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthState } from './types';
import { toast } from 'sonner';

export const useAuthState = () => {
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    loading: true
  });

  useEffect(() => {
    // Initialize auth state from local storage
    const savedSession = localStorage.getItem('supabase.auth.session');
    if (savedSession) {
      const parsedSession = JSON.parse(savedSession);
      setState(prev => ({
        ...prev,
        session: parsedSession,
        user: parsedSession?.user || null
      }));
    }

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.id);
        
        setState(prev => ({
          ...prev,
          session: currentSession,
          user: currentSession?.user ?? null,
          loading: false
        }));

        if (currentSession) {
          localStorage.setItem('supabase.auth.session', JSON.stringify(currentSession));
          
          if (currentSession.user) {
            await updateUserProfile(currentSession.user);
          }
        } else {
          localStorage.removeItem('supabase.auth.session');
          localStorage.removeItem('supabase.auth.token');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return state;
};

async function updateUserProfile(user: User) {
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      email: user.email,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'id'
    });

  if (profileError) {
    console.error('Error updating profile:', profileError);
    toast.error('Failed to update profile');
  }
}