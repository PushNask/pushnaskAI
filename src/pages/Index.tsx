import { useState } from "react";
import { useAuth } from "@/contexts/auth/AuthContext";
import { Navigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import ServiceCards from "@/components/ServiceCards";
import CreditBalance from "@/components/CreditBalance";
import ChatInterface from "@/components/ChatInterface";
import ErrorBoundary from "@/components/ErrorBoundary";

const Index = () => {
  const { session } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Redirect to landing page if not authenticated
  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#F6F8FA]">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          <DashboardHeader />
          <main className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <CreditBalance />
                <ServiceCards />
              </div>
              <div>
                <ChatInterface 
                  serviceType={selectedService || "career"} 
                  onReset={() => setSelectedService(null)} 
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Index;