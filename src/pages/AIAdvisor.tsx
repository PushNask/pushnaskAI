import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import ChatInterface from "@/components/ChatInterface";
import WelcomeScreen from "@/components/WelcomeScreen";

const AIAdvisor = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  // Mock user data - in a real app, this would come from your auth context
  const mockUser = {
    name: "User",
    credits: 10,
  };

  const handleServiceSelect = (serviceId: number) => {
    setSelectedService(serviceId);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <DashboardHeader />
        <main className="p-6">
          {!selectedService ? (
            <WelcomeScreen
              userName={mockUser.name}
              userCredits={mockUser.credits}
              onServiceSelect={handleServiceSelect}
            />
          ) : (
            <ChatInterface />
          )}
        </main>
      </div>
    </div>
  );
};

export default AIAdvisor;