import { useState, useMemo } from "react";
import { GraduationCap, Globe, Building, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import ChatInterface from "@/components/ChatInterface";
import { Card } from "@/components/ui/card";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import Head from "@/components/Head";

const services = [
  {
    id: "career",
    icon: GraduationCap,
    label: "Career Development",
    description: "Get personalized career guidance and development plans",
    credits: 4
  },
  {
    id: "global",
    icon: Globe,
    label: "Global Exploration",
    description: "Discover international opportunities and pathways",
    credits: 4
  },
  {
    id: "education",
    icon: GraduationCap,
    label: "Educational Guidance",
    description: "Find the perfect study program and academic path",
    credits: 4
  },
  {
    id: "business",
    icon: Building,
    label: "Entrepreneurial Support",
    description: "Launch and grow your business ventures",
    credits: 4
  }
] as const;

type ServiceType = typeof services[number]['id'];

const AIAdvisor = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const user = useUser();

  const handleServiceSelect = async (serviceId: ServiceType) => {
    setIsLoading(true);
    try {
      if (!user?.id) throw new Error('User not authenticated');

      // Save service selection to user's service config
      const { error } = await supabase
        .from('service_configs')
        .upsert({
          user_id: user.id,
          service_type: serviceId,
          last_used: new Date().toISOString()
        });

      if (error) throw error;

      setSelectedService(serviceId);
      toast({
        title: "Service Selected",
        description: `Starting ${services.find(s => s.id === serviceId)?.label} assistant...`,
      });
    } catch (error) {
      console.error('Error selecting service:', error);
      toast({
        title: "Error",
        description: "Failed to start service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Memoize service buttons to prevent unnecessary re-renders
  const serviceButtons = useMemo(() => services.map((service) => {
    const ServiceIcon = service.icon;
    return (
      <button
        key={service.id}
        onClick={() => handleServiceSelect(service.id)}
        className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-left w-full"
        aria-label={`Select ${service.label} service`}
        disabled={isLoading}
      >
        <div className="p-2 rounded-lg bg-white shadow-sm">
          <ServiceIcon className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <span className="text-sm font-medium block">{service.label}</span>
          <span className="text-xs text-gray-500">{service.description}</span>
        </div>
        <span className="text-xs text-gray-400">{service.credits} credits</span>
      </button>
    );
  }), [isLoading]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#F6F8FA]">
        <Head>
          <title>AI Advisor - PushNask</title>
          <meta name="description" content="Get personalized AI guidance for your career, education, and business goals" />
        </Head>

        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <div 
          className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}
          role="main"
        >
          <DashboardHeader />
          <main className="p-4 md:p-6 max-w-5xl mx-auto">
            {!selectedService ? (
              <Card className="p-6 space-y-6">
                <div className="text-center space-y-2">
                  <h1 className="text-2xl font-semibold">
                    How can I assist you today?
                  </h1>
                  <p className="text-gray-500">
                    Select a service to begin your consultation
                  </p>
                </div>
                
                <div 
                  className="grid grid-cols-1 gap-4"
                  role="group"
                  aria-label="Available AI services"
                >
                  {serviceButtons}
                </div>

                <p className="text-xs text-gray-500 text-center">
                  PushNask AI provides personalized guidance based on your profile and preferences
                </p>
              </Card>
            ) : isLoading ? (
              <Card className="p-6">
                <Skeleton className="h-[400px] w-full" />
              </Card>
            ) : (
              <ChatInterface 
                serviceType={selectedService} 
                onReset={() => setSelectedService(null)} 
              />
            )}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AIAdvisor;