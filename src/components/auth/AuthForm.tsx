import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from 'react-i18next';
import useAuthHandler from '@/hooks/useAuthHandler';

interface AuthFormProps {
  isLogin: boolean;
}

export const AuthForm = ({ isLogin }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  
  const { t } = useTranslation();
  const { handleAuth, isLoading, error, failedAttempts } = useAuthHandler();

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      errors.email = t('auth.emailRequired');
    } else if (!EMAIL_REGEX.test(email)) {
      errors.email = t('auth.invalidEmail');
    }

    if (!password) {
      errors.password = t('auth.passwordRequired');
    } else if (!isLogin && password.length < 6) {
      errors.password = t('auth.passwordLength');
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    await handleAuth({ 
      email, 
      password,
      rememberMe 
    }, isLogin);
  };

  // Show account locked message if too many failed attempts
  if (failedAttempts >= 5) {
    return (
      <Alert variant="destructive" className="animate-in fade-in-50">
        <AlertDescription>
          Account temporarily locked due to too many failed attempts. 
          Please try again later or reset your password.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive" className="animate-in fade-in-50">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          {t('auth.email')}
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setValidationErrors({ ...validationErrors, email: undefined });
          }}
          placeholder="your@email.com"
          className={validationErrors.email ? 'border-red-500' : ''}
          disabled={isLoading}
          autoComplete="email"
          required
        />
        {validationErrors.email && (
          <p className="text-sm text-red-500 animate-in fade-in-50">
            {validationErrors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-slate-700">
          {t('auth.password')}
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setValidationErrors({ ...validationErrors, password: undefined });
            }}
            placeholder="••••••"
            className={`${validationErrors.password ? 'border-red-500' : ''} pr-10`}
            disabled={isLoading}
            autoComplete={isLogin ? "current-password" : "new-password"}
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-1"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {validationErrors.password && (
          <p className="text-sm text-red-500 animate-in fade-in-50">
            {validationErrors.password}
          </p>
        )}
      </div>

      {isLogin && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          />
          <label
            htmlFor="rememberMe"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            {isLogin ? t('auth.signingIn') : t('auth.creatingAccount')}
          </div>
        ) : (
          isLogin ? t('auth.signIn') : t('auth.createAccount')
        )}
      </Button>
    </form>
  );
};