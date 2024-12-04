import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, Globe, GraduationCap, LineChart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import StudyAbroadForm from "@/components/services/StudyAbroadForm";
import FundingPrepForm from "@/components/services/FundingPrepForm";
import { useToast } from "@/components/ui/use-toast";

const ServiceSetup = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const { toast } = useToast();

  const services = [
    {
      id: "career",
      title: "Career Development",
      description: "Configure your career preferences and goals",
      icon: Briefcase,
      setupTitle: "Career Development Setup",
      setupDescription: "Accurately answer the questions below for our AI advisor to better help you make informed decisions",
    },
    {
      id: "global",
      title: "Global Exploration",
      description: "Set up your travel and relocation preferences",
      icon: Globe,
      setupTitle: "Global Exploration Setup",
      setupDescription: "Accurately answer the questions below for our AI advisor to better help you make informed decisions",
    },
    {
      id: "education",
      title: "Educational Guidance",
      description: "Configure your educational interests",
      icon: GraduationCap,
      setupTitle: "Educational Guidance Setup",
      setupDescription: "Accurately answer the questions below for our AI advisor to better help you make informed decisions",
    },
    {
      id: "business",
      title: "Entrepreneurial Support",
      description: "Set up your business interests",
      icon: LineChart,
      setupTitle: "Entrepreneurial Support Setup",
      setupDescription: "Accurately answer the questions below for our AI advisor to better help you make informed decisions",
    },
  ];

  const handleFormSubmit = (data: any) => {
    toast({
      title: "Settings Saved",
      description: "Your service preferences have been updated successfully.",
    });
    setSelectedService(null);
  };

  const renderForm = () => {
    switch (selectedService) {
      case "education":
        return <StudyAbroadForm onSubmit={handleFormSubmit} />;
      case "business":
        return <FundingPrepForm onSubmit={handleFormSubmit} />;
      default:
        return <p>Form coming soon...</p>;
    }
  };

  const selectedServiceData = selectedService 
    ? services.find(service => service.id === selectedService)
    : null;

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <DashboardHeader />
        <main className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Card className="w-full">
              <CardHeader>
                <Link to="/profile" className="flex items-center text-sm text-blue-600 hover:text-blue-800 mb-4">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to profile
                </Link>
                <CardTitle>
                  {selectedService 
                    ? selectedServiceData?.setupTitle
                    : "Service Setup"}
                </CardTitle>
                <CardDescription>
                  {selectedService 
                    ? selectedServiceData?.setupDescription
                    : "Configure your preferences for each service"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedService ? (
                  <div>
                    <button
                      onClick={() => setSelectedService(null)}
                      className="mb-4 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back to services
                    </button>
                    {renderForm()}
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                        onClick={() => setSelectedService(service.id)}
                      >
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <service.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">{service.title}</h3>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ServiceSetup;