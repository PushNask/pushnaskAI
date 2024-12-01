import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import ServiceCards from "@/components/ServiceCards";
import CreditBalance from "@/components/CreditBalance";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <DashboardHeader />
        <main className="p-6">
          <div className="space-y-6">
            <CreditBalance />
            <ServiceCards />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;