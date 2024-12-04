import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="px-4 py-12 text-center md:py-16">
      <h2 className="mb-6 text-3xl font-bold text-slate-900">Ready to Begin Your Journey?</h2>
      <p className="mb-8 text-lg text-slate-600">
        Join thousands of users making informed decisions about their future
      </p>
      <Button size="lg">
        Start Now <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </section>
  );
};

export default CallToAction;