import { useEffect, useState } from 'react';
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
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (!loading) {
      setIsInitialLoad(false);
      
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

  // Don't render anything during initial load to prevent flash
  if (isInitialLoad || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-gray-500" role="status" />
      </div>
    );
  }

  // Only render children when we have the required auth state
  if (!session || (requireProfile && !profile && location.pathname !== '/profile/setup')) {
    return null;
  }

  return <>{children}</>;
}