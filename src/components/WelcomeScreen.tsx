import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Globe, GraduationCap, LineChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const services = [
  {
    id: 1,
    title: "Career Development",
    service: "career",
    icon: Briefcase,
    description: "Analyze career paths and opportunities",
    credits: 4,
  },
  {
    id: 2,
    title: "Global Exploration",
    service: "travel",
    icon: Globe,
    description: "Discover international opportunities",
    credits: 4,
  },
  {
    id: 3,
    title: "Educational Guidance",
    service: "education",
    icon: GraduationCap,
    description: "Find the perfect study program",
    credits: 4,
  },
  {
    id: 4,
    title: "Entrepreneurial Support",
    service: "business",
    icon: LineChart,
    description: "Launch and grow your business",
    credits: 4,
  },
];

interface WelcomeScreenProps {
  userName: string;
  userCredits: number;
  onServiceSelect: (serviceId: number) => void;
}

const WelcomeScreen = ({ userName, userCredits, onServiceSelect }: WelcomeScreenProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleServiceSelect = async (serviceId: number) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    if (userCredits < service.credits) {
      toast({
        title: "Insufficient Credits",
        description: "You don't have enough credits for this service. Would you like general feedback instead?",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    onServiceSelect(serviceId);

    // Simulate processing time
    setTimeout(() => {
      toast({
        title: "Request Processing",
        description: "Your request is being analyzed. Please check the reports tab shortly.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Hello {userName}👋</CardTitle>
          <p className="text-gray-600">What would you like me to do for you today?</p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </div>
              <Button
                className="w-full mt-4"
                onClick={() => handleServiceSelect(service.id)}
                disabled={isProcessing}
              >
                Select Service ({service.credits} credits)
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;