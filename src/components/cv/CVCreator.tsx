import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import RegionSelector from "@/components/cv/RegionSelector";
import PrintControls from "@/components/cv/PrintControls";
import CVEditor from "@/components/cv/CVEditor";

const CVCreator = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [remainingFreePrints, setRemainingFreePrints] = useState(2);
  const [showEditor, setShowEditor] = useState(false);
  const { toast } = useToast();

  const handlePrint = () => {
    if (remainingFreePrints > 0) {
      window.print();
      setRemainingFreePrints(prev => prev - 1);
      toast({
        title: "CV Printed",
        description: `You have ${remainingFreePrints - 1} free prints remaining.`
      });
    } else {
      toast({
        title: "No Free Prints Remaining",
        description: "Please use 2 credits to print additional copies.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <DashboardHeader />
        <main className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Card className="w-full">
              {!showEditor && (
                <CardHeader>
                  <CardTitle>CV Creator</CardTitle>
                  <CardDescription>Create a professional CV tailored to your region</CardDescription>
                </CardHeader>
              )}
              <CardContent className="space-y-6">
                {!showEditor ? (
                  <>
                    <RegionSelector 
                      selectedRegion={selectedRegion} 
                      onRegionChange={setSelectedRegion} 
                    />

                    {selectedRegion && (
                      <>
                        <PrintControls 
                          remainingFreePrints={remainingFreePrints}
                          onPrint={handlePrint}
                        />
                        
                        <Button 
                          className="w-full mt-4 flex items-center justify-center gap-2"
                          onClick={() => setShowEditor(true)}
                        >
                          Continue to CV Editor
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </>
                ) : (
                  <CVEditor selectedRegion={selectedRegion} />
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CVCreator;