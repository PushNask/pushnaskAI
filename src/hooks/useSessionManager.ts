import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useSessionManager = () => {
  const [isValidating, setIsValidating] = useState(true);
  const [lastCheck, setLastCheck] = useState(Date.now());
  const navigate = useNavigate();

  const validateSession = useCallback(async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Session validation error:', error);
        throw error;
      }

      if (!session) {
        console.log('No valid session found, redirecting to auth');
        navigate('/auth');
        return false;
      }

      // Check if session is about to expire (within 5 minutes)
      const expiresAt = session.expires_at ? session.expires_at * 1000 : 0;
      const fiveMinutes = 5 * 60 * 1000;
      
      if (expiresAt - Date.now() < fiveMinutes) {
        const { error: refreshError } = await supabase.auth.refreshSession();
        if (refreshError) {
          console.error('Session refresh failed:', refreshError);
          throw refreshError;
        }
      }

      return true;
    } catch (error) {
      console.error('Session validation failed:', error);
      toast.error('Session expired. Please sign in again.');
      navigate('/auth');
      return false;
    } finally {
      setIsValidating(false);
      setLastCheck(Date.now());
    }
  }, [navigate]);

  useEffect(() => {
    validateSession();

    // Set up periodic session validation (every 30 seconds)
    const intervalId = setInterval(() => {
      const timeSinceLastCheck = Date.now() - lastCheck;
      if (timeSinceLastCheck > 30000) { // 30 seconds
        validateSession();
      }
    }, 30000);

    // Cleanup
    return () => clearInterval(intervalId);
  }, [validateSession, lastCheck]);

  return {
    isValidating,
    validateSession
  };
};