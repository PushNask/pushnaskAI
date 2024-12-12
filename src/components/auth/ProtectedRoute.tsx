import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);
  const [lastValidation, setLastValidation] = useState(Date.now());

  useEffect(() => {
    let validationTimer: NodeJS.Timeout;
    let sessionCheckInterval: NodeJS.Timeout;

    const validateSession = async () => {
      console.log('Validating session...', {
        sessionExists: !!session?.user?.id,
        loading,
        hasProfile: !!profile,
        path: location.pathname
      });

      setIsValidating(true);
      
      try {
        if (!loading) {
          if (!session) {
            console.log('No session found, redirecting to auth');
            toast.error('Please sign in to continue');
            navigate('/auth');
          } else if (!profile && location.pathname !== '/profile/setup') {
            console.log('No profile found, redirecting to profile setup');
            toast.info('Please complete your profile setup to continue');
            navigate('/profile/setup');
          }
        }
      } catch (error) {
        console.error('Session validation error:', error);
        toast.error('Authentication error. Please try signing in again.');
        navigate('/auth');
      } finally {
        setIsValidating(false);
        setLastValidation(Date.now());
      }
    };

    // Initial validation
    validateSession();

    // Set up periodic session checks
    sessionCheckInterval = setInterval(() => {
      const timeSinceLastValidation = Date.now() - lastValidation;
      if (timeSinceLastValidation > 30000) { // 30 seconds
        validateSession();
      }
    }, 30000); // Check every 30 seconds

    // Cleanup
    return () => {
      clearTimeout(validationTimer);
      clearInterval(sessionCheckInterval);
    };
  }, [session, loading, profile, navigate, location.pathname, lastValidation]);

  // Show loading state
  if (loading || isValidating) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
      </div>
    );
  }

  // Only render children if we have both session and profile
  return session && (profile || location.pathname === '/profile/setup') ? <>{children}</> : null;
}