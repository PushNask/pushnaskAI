import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/auth/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireProfile?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  requireProfile = true 
}: ProtectedRouteProps) {
  const { session, profile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!session) {
        console.log('No session found, redirecting to auth');
        navigate('/auth', {
          replace: true,
          state: { from: location.pathname }
        });
        return;
      }

      if (requireProfile && !profile && location.pathname !== '/profile/setup') {
        console.log('No profile found, redirecting to profile setup');
        navigate('/profile/setup', { replace: true });
      }
    }
  }, [session, profile, loading, navigate, location, requireProfile]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-gray-500" role="status" />
      </div>
    );
  }

  if (!session || (requireProfile && !profile && location.pathname !== '/profile/setup')) {
    return null;
  }

  return <>{children}</>;
}