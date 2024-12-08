import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';
import { AuthForm } from '@/components/auth/AuthForm';

const AuthScreen = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { signIn, signUp, session } = useAuth();

  // Only redirect if we have a session and we're not in the middle of authentication
  if (session && !loading) {
    console.log('Session found, redirecting to AI advisor');
    navigate('/ai-advisor');
    return null;
  }

  const handleAuth = async (email: string, password: string) => {
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </CardTitle>
          </div>
          <CardDescription>
            {isLogin
              ? 'Enter your credentials to access your account'
              : 'Fill in your details to get started'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm
            isLogin={isLogin}
            onSubmit={handleAuth}
            error={error}
            loading={loading}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative flex w-full items-center justify-center">
            <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200" />
            <span className="relative bg-white px-2 text-sm text-slate-500">or</span>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setIsLogin(!isLogin);
              navigate(`/auth?mode=${isLogin ? 'signup' : 'login'}`);
            }}
            disabled={loading}
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthScreen;