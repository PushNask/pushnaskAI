import React from 'react';

const steps = [
  "Create your profile and set your preferences",
  "Choose from our range of AI-powered advisory services",
  "Receive personalized recommendations and actionable insights"
];

const HowItWorks = () => {
  return (
    <section className="bg-white px-4 py-12 md:py-16">
      <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">How It Works</h2>
      <div className="mx-auto max-w-3xl space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ocean text-white">
              {index + 1}
            </div>
            <p className="text-lg text-slate-600">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;