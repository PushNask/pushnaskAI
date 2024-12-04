import React from 'react';
import { Briefcase, GraduationCap, Globe, Rocket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Briefcase,
    title: "Career Development",
    description: "Get personalized career path recommendations and insights into future job trends",
    color: "blue"
  },
  {
    icon: Globe,
    title: "Global Exploration",
    description: "Discover international opportunities tailored to your qualifications and interests",
    color: "green"
  },
  {
    icon: GraduationCap,
    title: "Educational Guidance",
    description: "Find the perfect educational programs and scholarship opportunities worldwide",
    color: "purple"
  },
  {
    icon: Rocket,
    title: "Entrepreneurial Support",
    description: "Get expert guidance on funding, market strategies, and international business setup",
    color: "orange"
  }
];

const Features = () => {
  return (
    <section className="px-4 py-12 md:py-16">
      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature, index) => (
          <Card key={index} className="p-6">
            <CardContent className="p-0">
              <div className="flex items-start space-x-4">
                <div className={`rounded-lg bg-${feature.color}-100 p-3`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;