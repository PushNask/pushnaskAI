import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Globe, GraduationCap, Wallet } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { ServiceUsageChart } from "@/components/analytics/ServiceUsageChart";
import { CareerAnalyticsChart } from "@/components/analytics/CareerAnalyticsChart";
import { GlobalExplorationChart } from "@/components/analytics/GlobalExplorationChart";
import { EducationalGuidanceChart } from "@/components/analytics/EducationalGuidanceChart";
import { EntrepreneurialSupportChart } from "@/components/analytics/EntrepreneurialSupportChart";

const Analytics = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <DashboardHeader />
        <main className="p-4 md:p-6 space-y-6">
          <h1 className="text-2xl font-semibold mb-6">Analytics Dashboard</h1>
          
          <div className="grid grid-cols-1 gap-6">
            <ServiceUsageChart />
            
            <Tabs defaultValue="career" className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="career" className="gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Career Development</span>
                </TabsTrigger>
                <TabsTrigger value="global" className="gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Global Exploration</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Educational Guidance</span>
                </TabsTrigger>
                <TabsTrigger value="entrepreneurial" className="gap-2">
                  <Wallet className="h-4 w-4" />
                  <span>Entrepreneurial Support</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="career">
                <CareerAnalyticsChart />
              </TabsContent>
              
              <TabsContent value="global">
                <GlobalExplorationChart />
              </TabsContent>
              
              <TabsContent value="education">
                <EducationalGuidanceChart />
              </TabsContent>
              
              <TabsContent value="entrepreneurial">
                <EntrepreneurialSupportChart />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;