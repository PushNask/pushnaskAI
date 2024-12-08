import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';
import { AuthForm } from '@/components/auth/AuthForm';
import { useTranslations } from '@/contexts/TranslationsContext';

const AuthScreen = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, session } = useAuth();
  const { t } = useTranslations();

  // Update isLogin state when searchParams change
  useEffect(() => {
    setIsLogin(searchParams.get('mode') !== 'signup');
  }, [searchParams]);

  // Redirect if already authenticated
  useEffect(() => {
    if (session && !loading) {
      console.log('Session found, redirecting to AI advisor');
      navigate('/ai-advisor');
    }
  }, [session, loading, navigate]);

  const handleAuth = async (email: string, password: string) => {
    setError('');
    setLoading(true);
    console.log(`Attempting ${isLogin ? 'sign in' : 'sign up'} for:`, email);

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

  const toggleMode = () => {
    const newMode = isLogin ? 'signup' : 'login';
    navigate(`/auth?mode=${newMode}`, { replace: true });
    setIsLogin(!isLogin);
    setError('');
  };

  if (session && !loading) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="rounded-full hover:bg-slate-100"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="space-y-0.5">
              <CardTitle className="text-2xl font-bold">
                {isLogin ? t('common.welcome') : t('auth.createAccount')}
              </CardTitle>
              <CardDescription>
                {isLogin
                  ? t('auth.enterCredentials')
                  : t('auth.fillDetails')}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <AuthForm
            isLogin={isLogin}
            onSubmit={handleAuth}
            error={error}
            loading={loading}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-6">
          <div className="relative flex w-full items-center justify-center">
            <Separator className="absolute left-0 right-0" />
            <span className="relative bg-white px-2 text-sm text-slate-500">
              {t('common.or')}
            </span>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={toggleMode}
            disabled={loading}
          >
            {isLogin 
              ? t('auth.noAccount')
              : t('auth.haveAccount')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthScreen;