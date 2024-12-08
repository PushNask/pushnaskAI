import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

const Overview = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Your AI-Powered Journey to
            <span className="text-blue-600"> Global Success</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-500">
            PushNask helps you make informed decisions about your career, education, and international opportunities with AI-powered insights.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Career Development",
              description: "Get personalized career path recommendations and insights into future job trends"
            },
            {
              title: "Educational Guidance",
              description: "Find the perfect educational programs and scholarship opportunities worldwide"
            },
            {
              title: "Global Opportunities",
              description: "Discover international opportunities tailored to your qualifications"
            }
          ].map((feature, index) => (
            <div key={index} className="rounded-lg border p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Overview;