import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AppError, handleError } from "@/utils/errorHandling";
import { useAuth } from "@/contexts/auth/AuthContext";
import { CVLoadingState } from "./components/CVLoadingState";
import { CVHeader } from "./components/CVHeader";
import { RegionSelectorSection } from "./components/RegionSelectorSection";
import CVEditor from "./CVEditor";
import PrintControls from "./PrintControls";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useCVManagement } from "./hooks/useCVManagement";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const CVCreator = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [remainingFreePrints, setRemainingFreePrints] = useState(2);
  const [showEditor, setShowEditor] = useState(false);
  const { isLoading, loadExistingCV, handleSaveCV } = useCVManagement();
  const { toast } = useToast();
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    if (user) {
      loadExistingCV().then(cvData => {
        if (cvData?.parsed_data?.region) {
          setSelectedRegion(cvData.parsed_data.region);
          setShowEditor(true);
        }
      });
    }
  }, [user]);

  const handlePrint = async () => {
    try {
      setIsPrinting(true);
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
      setIsPrinting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <ErrorBoundary>
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center gap-4">
                <CVHeader onBack={() => navigate("/profile")} />
                <div>
                  <CardTitle>CV Creator</CardTitle>
                  <CardDescription>Create a professional CV tailored to your region</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading || isPrinting ? (
                <CVLoadingState />
              ) : !showEditor ? (
                <RegionSelectorSection
                  selectedRegion={selectedRegion}
                  onRegionChange={setSelectedRegion}
                  onContinue={() => setShowEditor(true)}
                />
              ) : (
                <>
                  <CVEditor 
                    selectedRegion={selectedRegion}
                    onSave={handleSaveCV}
                  />
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
    </DashboardLayout>
  );
};

export default CVCreator;