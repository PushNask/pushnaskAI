import React, { createContext, useContext, useState } from 'react';

// Define available languages
type Language = 'en' | 'fr';

// Define translation structure
interface Translations {
  common: {
    welcome: string;
    credits: string;
    services: {
      career: string;
      global: string;
      education: string;
      entrepreneurial: string;
    };
    actions: {
      signIn: string;
      signUp: string;
      purchase: string;
      viewDetails: string;
    };
  };
  auth: {
    email: string;
    password: string;
    rememberMe: string;
    forgotPassword: string;
    noAccount: string;
  };
  credits: {
    balance: string;
    available: string;
    used: string;
    transactions: string;
    purchase: string;
  };
}

// Translation data
const translations: Record<Language, Translations> = {
  en: {
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
      noAccount: "Don't have an account?"
    },
    credits: {
      balance: "Credit Balance",
      available: "Available credits",
      used: "Used credits",
      transactions: "Recent Transactions",
      purchase: "Purchase Credits"
    }
  },
  fr: {
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
      noAccount: "Vous n'avez pas de compte?"
    },
    credits: {
      balance: "Solde des crédits",
      available: "Crédits disponibles",
      used: "Crédits utilisés",
      transactions: "Transactions récentes",
      purchase: "Acheter des crédits"
    }
  }
};

interface TranslationsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationsContext = createContext<TranslationsContextType | undefined>(undefined);

export function TranslationsProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    
    return value || key;
  };

  return (
    <TranslationsContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationsContext);
  if (context === undefined) {
    throw new Error('useTranslations must be used within a TranslationsProvider');
  }
  return context;
}