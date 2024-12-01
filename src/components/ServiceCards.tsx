import { Briefcase, Globe, GraduationCap, LineChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

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
        <Card key={service.title} className="bg-white shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="bg-ocean/10 p-3 rounded-full">
                <service.icon className="h-5 w-5 text-ocean" />
              </div>
              <span className="text-sm font-medium text-ocean">{service.credits} credits</span>
            </div>
            <CardTitle className="text-lg">{service.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">{service.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-ocean font-semibold">{service.price}</span>
              <Button variant="ghost" className="text-ocean hover:text-ocean-dark hover:bg-ocean/10">
                Learn more
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServiceCards;