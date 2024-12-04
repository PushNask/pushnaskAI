import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <header className="px-4 py-16 text-center md:py-24">
      <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
        Your AI-Powered Journey to Global Success
      </h1>
      <p className="mb-8 text-lg text-slate-600 md:text-xl">
        Make informed decisions about your career, education, and international opportunities
      </p>
      <Button size="lg">
        Get Started <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </header>
  );
};

export default Hero;