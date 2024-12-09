import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('ProtectedRoute - Auth state:', { 
      session: session?.user?.id,
      loading,
      hasProfile: Boolean(profile),
      path: location.pathname
    });
    
    if (!loading) {
      if (!session) {
        // No session, redirect to auth
        console.log('No session found, redirecting to auth');
        toast.error('Please sign in to continue');
        navigate('/auth');
      } else if (!profile && location.pathname !== '/profile/setup') {
        // Has session but no profile, redirect to profile setup
        console.log('No profile found, redirecting to profile setup');
        toast.info('Please complete your profile setup to continue');
        navigate('/profile/setup');
      }
    }
  }, [session, loading, profile, navigate, location.pathname]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
      </div>
    );
  }

  // Only render children if we have both session and profile
  return session && (profile || location.pathname === '/profile/setup') ? <>{children}</> : null;
}