import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Globe, GraduationCap, LineChart } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";

const services = [
  {
    icon: <Briefcase className="h-5 w-5" />,
    title: "Career Development",
    description: "Configure your career preferences and goals",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Global Exploration",
    description: "Set up your travel and relocation preferences",
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "Educational Guidance",
    description: "Configure your educational interests",
  },
  {
    icon: <LineChart className="h-5 w-5" />,
    title: "Entrepreneurial Support",
    description: "Set up your business interests",
  },
];

const ServiceSetup = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <DashboardHeader />
        <main className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Service Setup</CardTitle>
                <CardDescription>Configure your preferences for each service</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                {services.map((service) => (
                  <div
                    key={service.title}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ServiceSetup;