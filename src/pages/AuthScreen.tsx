import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';
import { AuthForm } from '@/components/auth/AuthForm';
import { useTranslation } from 'react-i18next';

const AuthScreen = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup');
  const navigate = useNavigate();
  const location = useLocation();
  const { session } = useAuth();
  const { t } = useTranslation();

  // Check session and redirect if already authenticated
  useEffect(() => {
    if (session) {
      console.log('Session detected, redirecting to AI advisor');
      navigate('/ai-advisor');
    }
  }, [session, navigate]);

  const toggleMode = () => {
    const newMode = isLogin ? 'signup' : 'login';
    navigate(`/auth?mode=${newMode}`, { replace: true });
    setIsLogin(!isLogin);
  };

  // Don't render if already authenticated
  if (session) return null;

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
                {isLogin ? t('auth.signIn') : t('auth.createAccount')}
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
          <AuthForm isLogin={isLogin} />
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