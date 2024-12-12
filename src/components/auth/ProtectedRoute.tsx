import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';
import { Loader2 } from 'lucide-react';
import { useSessionManager } from '@/hooks/useSessionManager';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading, profile } = useAuth();
  const { isValidating, validateSession } = useSessionManager();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      if (!loading) {
        const isValid = await validateSession();
        
        if (!isValid) {
          return;
        }
        
        if (!profile && location.pathname !== '/profile/setup') {
          console.log('No profile found, redirecting to profile setup');
          navigate('/profile/setup');
        }
      }
    };

    checkAuth();
  }, [session, loading, profile, navigate, location.pathname, validateSession]);

  if (loading || isValidating) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-gray-500" role="status" />
      </div>
    );
  }

  return session && (profile || location.pathname === '/profile/setup') ? <>{children}</> : null;
}