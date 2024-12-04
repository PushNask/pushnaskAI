import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Globe, CreditCard, ChartBar, ChartLine, ChartPie, ArrowUp, ArrowDown } from "lucide-react";
import { ServiceUsageChart } from "@/components/analytics/ServiceUsageChart";
import { CareerAnalyticsChart } from "@/components/analytics/CareerAnalyticsChart";
import { GlobalExplorationChart } from "@/components/analytics/GlobalExplorationChart";
import { EducationalGuidanceChart } from "@/components/analytics/EducationalGuidanceChart";
import { EntrepreneurialSupportChart } from "@/components/analytics/EntrepreneurialSupportChart";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";

const regions = [
  "North America",
  "Europe",
  "Asia",
  "Africa",
  "South America",
  "Oceania"
];

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail"
];

const Analytics = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <DashboardHeader />
        <main className="p-4 md:p-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h1 className="text-2xl font-semibold">Opportunity Analytics</h1>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region.toLowerCase()}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry.toLowerCase()}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <ServiceUsageChart />
            
            <Tabs defaultValue="career" className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="career" className="gap-2">
                  <ChartBar className="h-4 w-4" />
                  <span>Career Development</span>
                </TabsTrigger>
                <TabsTrigger value="global" className="gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Global Exploration</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="gap-2">
                  <ChartLine className="h-4 w-4" />
                  <span>Educational Guidance</span>
                </TabsTrigger>
                <TabsTrigger value="entrepreneurial" className="gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Entrepreneurial Support</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="career">
                <Card className="mt-4">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Career Growth Trends</CardTitle>
                      <Badge variant="outline" className="ml-2">
                        <ArrowUp className="h-4 w-4 mr-1 text-green-500" />
                        15% Growth
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Market Demand</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} />
                      </div>
                      <CareerAnalyticsChart />
                    </div>
                  </CardContent>
                </Card>
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