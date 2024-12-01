import { Briefcase, Globe, GraduationCap, LineChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const services = [
  {
    title: "Career Development",
    description: "Analyze career paths and opportunities",
    icon: Briefcase,
    credits: 4,
    price: "$4.99"
  },
  {
    title: "Global Exploration",
    description: "Discover international opportunities",
    icon: Globe,
    credits: 4,
    price: "$12.99"
  },
  {
    title: "Educational Guidance",
    description: "Find the perfect study program",
    icon: GraduationCap,
    credits: 4,
    price: "$8.00"
  },
  {
    title: "Entrepreneurial Support",
    description: "Launch and grow your business",
    icon: LineChart,
    credits: 4,
    price: "$12.00"
  }
];

const ServiceCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {services.map((service) => (
        <Card key={service.title} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <service.icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-gray-500">{service.credits} credits</span>
            </div>
            <CardTitle className="text-lg">{service.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">{service.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-primary font-semibold">{service.price}</span>
              <button className="text-sm text-primary hover:underline">Learn more</button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServiceCards;