import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import NorthAmericaForm from "./forms/NorthAmericaForm";
import EuropeForm from "./forms/EuropeForm";
import AsiaForm from "./forms/AsiaForm";
import MiddleEastForm from "./forms/MiddleEastForm";
import StudyAbroadForm from "./forms/StudyAbroadForm";
import FundingPrepForm from "./forms/FundingPrepForm";

type Region = "north-america" | "europe" | "asia" | "middle-east" | "africa" | "oceania" | "latin-america" | "study-abroad" | "funding-prep";

interface CVEditorProps {
  selectedRegion: string;
}

export type CVFormData = {
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  education?: string;
  workExperience?: string;
  skills?: string;
  [key: string]: any;
};

const CVEditor = ({ selectedRegion }: CVEditorProps) => {
  const [activeRegion] = useState<Region>(selectedRegion as Region);
  const { toast } = useToast();

  const handleFormSubmit = (data: CVFormData) => {
    toast({
      title: "CV Information Saved",
      description: "Your CV information has been saved successfully.",
    });
    console.log(data);
  };

  const renderForm = () => {
    switch (activeRegion) {
      case "north-america":
        return <NorthAmericaForm onSubmit={handleFormSubmit} />;
      case "europe":
        return <EuropeForm onSubmit={handleFormSubmit} />;
      case "asia":
        return <AsiaForm onSubmit={handleFormSubmit} />;
      case "middle-east":
        return <MiddleEastForm onSubmit={handleFormSubmit} />;
      case "study-abroad":
        return <StudyAbroadForm onSubmit={handleFormSubmit} />;
      case "funding-prep":
        return <FundingPrepForm onSubmit={handleFormSubmit} />;
      default:
        return <div>Form for {activeRegion} coming soon</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          CV Editor - {activeRegion.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </h2>
      </div>
      {renderForm()}
    </div>
  );
};

export default CVEditor;