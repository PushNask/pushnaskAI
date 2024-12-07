import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import RegionSelector from "@/components/cv/RegionSelector";
import PrintControls from "@/components/cv/PrintControls";
import CVEditor from "@/components/cv/CVEditor";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import { AppError, handleError } from "@/utils/errorHandling";

interface LoadingProps {
  className?: string;
}

const LoadingState = ({ className = "" }: LoadingProps) => (
  <div className={`space-y-4 ${className}`}>
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-8 w-1/2" />
  </div>
);

const CVCreator = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [remainingFreePrints, setRemainingFreePrints] = useState(2);
  const [showEditor, setShowEditor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePrint = async () => {
    try {
      setIsLoading(true);
      if (remainingFreePrints > 0) {
        await window.print();
        setRemainingFreePrints(prev => prev - 1);
        toast({
          title: "CV Printed",
          description: `You have ${remainingFreePrints - 1} free prints remaining.`
        });
      } else {
        throw new AppError(
          "No free prints remaining. Please use 2 credits to print additional copies.",
          "NO_FREE_PRINTS",
          403
        );
      }
    } catch (error) {
      const errorDetails = handleError(error);
      toast({
        title: "Print Failed",
        description: errorDetails.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (showEditor) {
      setShowEditor(false);
    } else {
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <DashboardHeader />
        <main className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <ErrorBoundary>
              <Card className="w-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={handleBack} size="icon">
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                      <CardTitle>CV Creator</CardTitle>
                      <CardDescription>Create a professional CV tailored to your region</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isLoading ? (
                    <LoadingState />
                  ) : !showEditor ? (
                    <>
                      <RegionSelector 
                        selectedRegion={selectedRegion} 
                        onRegionChange={setSelectedRegion} 
                      />

                      {selectedRegion && (
                        <Button 
                          className="w-full mt-4 flex items-center justify-center gap-2"
                          onClick={() => setShowEditor(true)}
                        >
                          Continue to CV Editor
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      <CVEditor selectedRegion={selectedRegion} />
                      <PrintControls 
                        remainingFreePrints={remainingFreePrints}
                        onPrint={handlePrint}
                      />
                    </>
                  )}
                </CardContent>
              </Card>
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CVCreator;