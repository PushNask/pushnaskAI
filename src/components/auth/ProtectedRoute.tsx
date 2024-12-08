import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('ProtectedRoute - Session state:', { 
      session: session?.user?.id,
      loading,
      hasLocalSession: Boolean(localStorage.getItem('supabase.auth.session'))
    });
    
    if (!loading && !session) {
      console.log('No session found, redirecting to auth');
      navigate('/auth');
    }
  }, [session, loading, navigate]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return session ? <>{children}</> : null;
}