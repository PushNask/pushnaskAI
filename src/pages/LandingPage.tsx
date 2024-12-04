import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import CallToAction from '@/components/landing/CallToAction';
import SocialShare from '@/components/landing/SocialShare';
import Footer from '@/components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CallToAction />
      <SocialShare />
      <Footer />
    </div>
  );
};

export default LandingPage;