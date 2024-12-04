import { useState } from "react";
import { GraduationCap, Globe, Building } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import ChatInterface from "@/components/ChatInterface";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const AIAdvisor = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const { toast } = useToast();

  const services = [
    {
      icon: <GraduationCap className="h-5 w-5 text-purple-400" />,
      label: "Career Development",
      description: "Analyze career paths and opportunities",
    },
    {
      icon: <Globe className="h-5 w-5 text-blue-400" />,
      label: "Discover international opportunities",
      description: "Explore global possibilities",
    },
    {
      icon: <GraduationCap className="h-5 w-5 text-green-400" />,
      label: "Explore Study Abroad Options",
      description: "Find the perfect study program",
    },
    {
      icon: <Building className="h-5 w-5 text-orange-400" />,
      label: "Plan my startup fundraising",
      description: "Launch and grow your business",
    },
  ];

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    toast({
      title: "Service Selected",
      description: `Starting ${service} assistant...`,
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <DashboardHeader />
        <main className="p-4 md:p-6 max-w-4xl mx-auto">
          {!selectedService ? (
            <Card className="p-6 space-y-6">
              <h1 className="text-2xl font-semibold text-center mb-8">What can I help with?</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service.label}
                    onClick={() => handleServiceSelect(service.label)}
                    className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="p-2 rounded-lg bg-white shadow-sm">
                      {service.icon}
                    </div>
                    <span className="text-sm font-medium">{service.label}</span>
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-500 text-center mt-8">
                PushNask can make mistakes. Check important info.
              </p>
            </Card>
          ) : (
            <ChatInterface />
          )}
        </main>
      </div>
    </div>
  );
};

export default AIAdvisor;