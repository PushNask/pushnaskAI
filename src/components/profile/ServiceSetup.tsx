import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Globe, GraduationCap, LineChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/use-local-storage";
import EducationalGuidanceForm from "../services/forms/EducationalGuidanceForm";
import EntrepreneurialSupportForm from "../services/forms/EntrepreneurialSupportForm";
import CareerDevelopmentForm from "../services/forms/CareerDevelopmentForm";
import GlobalExplorationForm from "../services/forms/GlobalExplorationForm";

const services = [
  {
    id: "education",
    title: "Educational Guidance",
    description: "Set up your educational preferences and goals",
    icon: GraduationCap,
  },
  {
    id: "entrepreneurial",
    title: "Entrepreneurial Support",
    description: "Configure your business and funding requirements",
    icon: LineChart,
  },
  {
    id: "career",
    title: "Career Development",
    description: "Define your career path and objectives",
    icon: Briefcase,
  },
  {
    id: "global",
    title: "Global Exploration",
    description: "Set your international exploration preferences",
    icon: Globe,
  },
];

const ServiceSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useLocalStorage("selectedService", "");
  const [showForm, setShowForm] = useLocalStorage("showServiceForm", false);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setShowForm(true);
    toast({
      title: "Service Selected",
      description: "You can now configure your service preferences.",
    });
  };

  const handleBack = () => {
    setShowForm(false);
    setSelectedService("");
  };

  if (showForm) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Service Configuration</h1>
          <Button variant="outline" onClick={handleBack}>
            Back to Services
          </Button>
        </div>
        
        {selectedService === "education" && <EducationalGuidanceForm />}
        {selectedService === "entrepreneurial" && <EntrepreneurialSupportForm />}
        {selectedService === "career" && <CareerDevelopmentForm />}
        {selectedService === "global" && <GlobalExplorationForm />}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Service Setup</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card 
            key={service.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleServiceSelect(service.id)}
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {service.description}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceSetup;