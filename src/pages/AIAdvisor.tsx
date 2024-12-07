import { useState, useMemo } from "react";
import { GraduationCap, Globe, Building } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import ChatInterface from "@/components/ChatInterface";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AIService } from "@/types/service.types";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import Head from "@/components/Head";

// Move services array outside component
const services: AIService[] = [
  {
    id: "career",
    icon: GraduationCap,
    label: "Career Development",
    description: "Analyze career paths and opportunities",
    credits: 4
  },
  {
    id: "global",
    icon: Globe,
    label: "Discover international opportunities",
    description: "Explore global possibilities",
    credits: 4
  },
  {
    id: "education",
    icon: GraduationCap,
    label: "Explore Study Abroad Options",
    description: "Find the perfect study program",
    credits: 4
  },
  {
    id: "business",
    icon: Building,
    label: "Plan my startup fundraising",
    description: "Launch and grow your business",
    credits: 4
  },
];

const AIAdvisor = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedService, setSelectedService] = useState<AIService["id"] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Memoize service buttons to prevent unnecessary re-renders
  const serviceButtons = useMemo(() => services.map((service) => {
    const ServiceIcon = service.icon;
    return (
      <button
        key={service.id}
        onClick={() => handleServiceSelect(service.id)}
        className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-left"
        aria-label={`Select ${service.label} service`}
        role="button"
        disabled={isLoading}
      >
        <div className="p-2 rounded-lg bg-white shadow-sm">
          <ServiceIcon className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <span className="text-sm font-medium block">{service.label}</span>
          <span className="text-xs text-gray-500">{service.description}</span>
        </div>
      </button>
    );
  }), [isLoading]);

  const handleServiceSelect = async (serviceId: string) => {
    setIsLoading(true);
    try {
      setSelectedService(serviceId);
      toast({
        title: "Service Selected",
        description: `Starting ${services.find(s => s.id === serviceId)?.label} assistant...`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#F6F8FA]">
        <Head>
          <link rel="icon" href="/lovable-uploads/d6c1b7f9-1b2c-4735-bc20-5db0396c8a64.png" />
          <title>AI Advisor - PushNask</title>
        </Head>

        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <div 
          className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}
          role="main"
        >
          <DashboardHeader />
          <main className="p-4 md:p-6 max-w-4xl mx-auto">
            {!selectedService ? (
              <Card className="p-6 space-y-6">
                <h1 className="text-2xl font-semibold text-center mb-8">
                  What can I help with?
                </h1>
                
                <div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  role="group"
                  aria-label="Available AI services"
                >
                  {serviceButtons}
                </div>

                <p className="text-xs text-gray-500 text-center mt-8">
                  PushNask can make mistakes. Check important info.
                </p>
              </Card>
            ) : isLoading ? (
              <Card className="p-6">
                <Skeleton className="h-[400px] w-full" />
              </Card>
            ) : (
              <ChatInterface />
            )}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AIAdvisor;