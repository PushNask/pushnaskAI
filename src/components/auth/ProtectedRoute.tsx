import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('ProtectedRoute - Session state:', { 
      session: session?.user?.id,
      loading,
      hasLocalSession: Boolean(localStorage.getItem('supabase.auth.session'))
    });
    
    // Only redirect if we're not loading and there's no session
    if (!loading && !session) {
      console.log('No session found, redirecting to auth');
      navigate('/auth');
    }
  }, [session, loading, navigate]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
      </div>
    );
  }

  // Only render children if we have a session
  return session ? <>{children}</> : null;
}