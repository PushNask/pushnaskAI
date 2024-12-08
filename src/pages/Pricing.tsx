import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-500">
            Choose the plan that best fits your needs. All plans include our core features.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Starter",
              price: "$4.99",
              credits: 4,
              features: [
                "Career Development Analysis",
                "Basic Reports",
                "Email Support",
                "1 Service Category"
              ]
            },
            {
              name: "Professional",
              price: "$12.99",
              credits: 12,
              features: [
                "All Starter Features",
                "Global Exploration",
                "Priority Support",
                "2 Service Categories"
              ]
            },
            {
              name: "Enterprise",
              price: "$24.99",
              credits: 24,
              features: [
                "All Professional Features",
                "Custom Solutions",
                "24/7 Support",
                "All Service Categories"
              ]
            }
          ].map((plan) => (
            <div key={plan.name} className="rounded-lg border p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
              <p className="mt-4 text-3xl font-bold">{plan.price}</p>
              <p className="mt-2 text-sm text-gray-500">{plan.credits} credits</p>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;