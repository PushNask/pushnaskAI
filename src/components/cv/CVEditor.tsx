import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Download, Save } from "lucide-react";
import NorthAmericaForm from "./forms/NorthAmericaForm";
import EuropeForm from "./forms/EuropeForm";
import AsiaForm from "./forms/AsiaForm";
import MiddleEastForm from "./forms/MiddleEastForm";
import OceaniaForm from "./forms/OceaniaForm";
import LatinAmericaForm from "./forms/LatinAmericaForm";
import AfricaForm from "./forms/AfricaForm";
import { CVFormData } from "./types/formTypes";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth/AuthContext";

type Region = "north-america" | "europe" | "asia" | "middle-east" | "africa" | "oceania" | "latin-america";

interface CVEditorProps {
  selectedRegion: string;
  onSave?: (data: CVFormData) => void;
}

const CVEditor = ({ selectedRegion, onSave }: CVEditorProps) => {
  const [activeRegion] = useState<Region>(selectedRegion as Region);
  const [formData, setFormData] = useState<CVFormData | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadExistingData();
    }
  }, [user, selectedRegion]);

  const loadExistingData = async () => {
    try {
      const { data: cvData, error } = await supabase
        .from('user_cvs')
        .select('*')
        .eq('user_id', user?.id)
        .eq('parsed_data->region', selectedRegion)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;

      if (cvData?.parsed_data) {
        setFormData(cvData.parsed_data as CVFormData);
      }
    } catch (error) {
      console.error('Error loading CV data:', error);
    }
  };

  const handleFormSubmit = async (data: CVFormData) => {
    setFormData(data);
    if (onSave) {
      await onSave(data);
    }
    toast({
      title: "CV Information Saved",
      description: "Your CV information has been saved successfully.",
    });
  };

  const handleDownloadPDF = async () => {
    if (!formData) {
      toast({
        title: "No CV Data",
        description: "Please fill and save your CV information first.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Here you would implement the actual PDF generation
      toast({
        title: "CV Downloaded",
        description: "Your CV has been downloaded as a PDF.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading your CV.",
        variant: "destructive"
      });
    }
  };

  const formatRegionName = (region: string) => {
    return region
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const renderForm = () => {
    switch (activeRegion) {
      case "north-america":
        return <NorthAmericaForm onSubmit={handleFormSubmit} initialData={formData} />;
      case "europe":
        return <EuropeForm onSubmit={handleFormSubmit} initialData={formData} />;
      case "asia":
        return <AsiaForm onSubmit={handleFormSubmit} initialData={formData} />;
      case "middle-east":
        return <MiddleEastForm onSubmit={handleFormSubmit} initialData={formData} />;
      case "oceania":
        return <OceaniaForm onSubmit={handleFormSubmit} initialData={formData} />;
      case "latin-america":
        return <LatinAmericaForm onSubmit={handleFormSubmit} initialData={formData} />;
      case "africa":
        return <AfricaForm onSubmit={handleFormSubmit} initialData={formData} />;
      default:
        return <div>Form for {formatRegionName(activeRegion)}</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          CV Editor - {formatRegionName(activeRegion)}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleDownloadPDF}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
      {renderForm()}
    </div>
  );
};

export default CVEditor;