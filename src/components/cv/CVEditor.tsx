import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import NorthAmericaForm from "./forms/NorthAmericaForm";
import EuropeForm from "./forms/EuropeForm";
import AsiaForm from "./forms/AsiaForm";
import MiddleEastForm from "./forms/MiddleEastForm";

type Region = "northAmerica" | "europe" | "asia" | "middleEast" | "africa" | "oceania" | "latinAmerica";

interface CVEditorProps {
  selectedRegion: string;
}

const CVEditor = ({ selectedRegion }: CVEditorProps) => {
  const [activeRegion, setActiveRegion] = useState<Region>("northAmerica");
  const { toast } = useToast();

  const handleRegionChange = (region: Region) => {
    setActiveRegion(region);
    toast({
      title: "Region Changed",
      description: `CV format changed to ${region.replace(/([A-Z])/g, " $1").trim()} region`,
    });
  };

  const handleFormSubmit = (data: any) => {
    toast({
      title: "CV Information Saved",
      description: "Your CV information has been saved successfully.",
    });
    console.log(data);
  };

  const renderForm = () => {
    switch (activeRegion) {
      case "northAmerica":
        return <NorthAmericaForm onSubmit={handleFormSubmit} />;
      case "europe":
        return <EuropeForm onSubmit={handleFormSubmit} />;
      case "asia":
        return <AsiaForm onSubmit={handleFormSubmit} />;
      case "middleEast":
        return <MiddleEastForm onSubmit={handleFormSubmit} />;
      default:
        return <div>Form for {activeRegion} coming soon</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Region</label>
        <select
          value={activeRegion}
          onChange={(e) => handleRegionChange(e.target.value as Region)}
          className="w-full p-2 border rounded-md"
        >
          <option value="northAmerica">North America</option>
          <option value="europe">Europe</option>
          <option value="asia">Asia</option>
          <option value="middleEast">Middle East</option>
          <option value="africa">Africa</option>
          <option value="oceania">Australia & New Zealand</option>
          <option value="latinAmerica">Latin America</option>
        </select>
      </div>

      {renderForm()}
    </div>
  );
};

export default CVEditor;