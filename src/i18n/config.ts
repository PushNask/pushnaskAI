import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      common: {
        welcome: "Welcome back",
        credits: "credits",
        services: {
          career: "Career Development",
          global: "Global Exploration",
          education: "Educational Guidance",
          entrepreneurial: "Entrepreneurial Support"
        },
        actions: {
          signIn: "Sign in",
          signUp: "Sign up",
          purchase: "Purchase",
          viewDetails: "View Details"
        }
      },
      auth: {
        email: "Email",
        password: "Password",
        rememberMe: "Remember me",
        forgotPassword: "Forgot password?",
        noAccount: "Don't have an account?",
        emailRequired: "Email is required",
        invalidEmail: "Please enter a valid email",
        passwordRequired: "Password is required",
        passwordRequirements: "Password must be at least 8 characters and contain at least one letter and one number",
        signingIn: "Signing in...",
        creatingAccount: "Creating account...",
        signIn: "Sign in",
        createAccount: "Create account"
      },
      credits: {
        balance: "Credit Balance",
        available: "Available credits",
        used: "Used credits",
        transactions: "Recent Transactions",
        purchase: "Purchase Credits"
      }
    }
  },
  fr: {
    translation: {
      common: {
        welcome: "Bienvenue",
        credits: "crédits",
        services: {
          career: "Développement de carrière",
          global: "Exploration mondiale",
          education: "Orientation pédagogique",
          entrepreneurial: "Soutien entrepreneurial"
        },
        actions: {
          signIn: "Se connecter",
          signUp: "S'inscrire",
          purchase: "Acheter",
          viewDetails: "Voir les détails"
        }
      },
      auth: {
        email: "Email",
        password: "Mot de passe",
        rememberMe: "Se souvenir de moi",
        forgotPassword: "Mot de passe oublié?",
        noAccount: "Vous n'avez pas de compte?",
        emailRequired: "L'email est requis",
        invalidEmail: "Veuillez entrer un email valide",
        passwordRequired: "Le mot de passe est requis",
        passwordRequirements: "Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre",
        signingIn: "Connexion en cours...",
        creatingAccount: "Création du compte...",
        signIn: "Se connecter",
        createAccount: "Créer un compte"
      },
      credits: {
        balance: "Solde des crédits",
        available: "Crédits disponibles",
        used: "Crédits utilisés",
        transactions: "Transactions récentes",
        purchase: "Acheter des crédits"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;