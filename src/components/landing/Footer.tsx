import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Footer = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <footer className="bg-[#15171E] px-4 py-12 text-slate-300">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo and Description Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/4a99b79b-d178-41d4-ad89-bd426920f7ec.png" 
                alt="PushNask" 
                className="h-10"
              />
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">{t('company.title')}</h4>
            <div className="flex flex-col space-y-2">
              <a href="#" className="hover:text-ocean transition-colors">{t('company.about')}</a>
              <a href="#" className="hover:text-ocean transition-colors">{t('company.career')}</a>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">{t('legal.title')}</h4>
            <div className="flex flex-col space-y-2">
              <a href="#" className="hover:text-ocean transition-colors">{t('legal.privacy')}</a>
              <a href="#" className="hover:text-ocean transition-colors">{t('legal.terms')}</a>
            </div>
          </div>

          {/* Help Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">{t('help.title')}</h4>
            <div className="flex flex-col space-y-2">
              <a href="#" className="hover:text-ocean transition-colors">{t('help.support')}</a>
            </div>
          </div>
        </div>

        {/* Language Selector and Copyright */}
        <div className="mt-12 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm">{t('copyright')}</p>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <Select onValueChange={changeLanguage} defaultValue={i18n.language}>
                <SelectTrigger className="w-[140px] bg-transparent border-slate-700">
                  <SelectValue placeholder={t('language.title')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{t('language.en')}</SelectItem>
                  <SelectItem value="fr">{t('language.fr')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;