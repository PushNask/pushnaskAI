import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { validatePassword } from '@/utils/auth/validation';
import { TokenStorage, StorageType } from '@/utils/auth/tokenStorage';
import { toast } from 'sonner';

interface AuthState {
  loading: boolean;
  error: string | null;
  failedAttempts: number;
  lastAttempt: number;
}

interface UseAuthHandlerOptions {
  maxAttempts?: number;
  lockoutDuration?: number;
  tokenStorage?: StorageType;
}

export const useAuthHandler = (options: UseAuthHandlerOptions = {}) => {
  const {
    maxAttempts = 5,
    lockoutDuration = 30,
    tokenStorage = 'cookie'
  } = options;

  const [authState, setAuthState] = useState<AuthState>({
    loading: false,
    error: null,
    failedAttempts: 0,
    lastAttempt: 0
  });

  const isAccountLocked = useCallback(() => {
    const { failedAttempts, lastAttempt } = authState;
    if (failedAttempts >= maxAttempts) {
      const timeSinceLastAttempt = Date.now() - lastAttempt;
      const lockoutMs = lockoutDuration * 60 * 1000;
      return timeSinceLastAttempt < lockoutMs;
    }
    return false;
  }, [authState, maxAttempts, lockoutDuration]);

  const handleAuth = async ({
    email,
    password,
    rememberMe = false
  }: {
    email: string;
    password: string;
    rememberMe?: boolean;
  }) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    try {
      if (isAccountLocked()) {
        throw new Error('Account temporarily locked. Please try again later.');
      }

      setAuthState(prev => ({ ...prev, loading: true, error: null }));

      const { isValid, error: validationError } = validatePassword(password);
      if (!validationError) {
        throw new Error(validationError);
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data?.session) {
        TokenStorage.store(data.session.access_token, tokenStorage);
        
        setAuthState({
          loading: false,
          error: null,
          failedAttempts: 0,
          lastAttempt: Date.now()
        });

        toast.success('Successfully signed in!');
        return data.session;
      }
    } catch (error) {
      console.error('Authentication error:', error);
      
      setAuthState(prev => ({
        loading: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
        failedAttempts: prev.failedAttempts + 1,
        lastAttempt: Date.now()
      }));

      toast.error(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      clearTimeout(timeoutId);
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  };

  return {
    ...authState,
    handleAuth,
    isAccountLocked: isAccountLocked(),
    resetFailedAttempts: () => setAuthState(prev => ({ ...prev, failedAttempts: 0 }))
  };
};