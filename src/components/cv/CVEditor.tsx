import { useState } from "react";
import NorthAmericaForm from "./forms/NorthAmericaForm";
import { useToast } from "@/components/ui/use-toast";

interface CVEditorProps {
  selectedRegion: string;
}

const CVEditor = ({ selectedRegion }: CVEditorProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement CV data saving logic
      console.log("CV Data:", data);
      toast({
        title: "CV Information Saved",
        description: "Your CV information has been successfully saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save CV information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    switch (selectedRegion) {
      case "north-america":
        return <NorthAmericaForm onSubmit={handleSubmit} />;
      // TODO: Add other region forms
      default:
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Please select a region to start creating your CV
            </p>
          </div>
        );
    }
  };

  return (
    <div className="mt-6">
      {renderForm()}
    </div>
  );
};

export default CVEditor;