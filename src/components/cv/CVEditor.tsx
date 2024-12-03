import { useState } from "react";
import { Card } from "@/components/ui/card";
import NorthAmericaForm from "./forms/NorthAmericaForm";
import EuropeForm from "./forms/EuropeForm";
import { useToast } from "@/hooks/use-toast";

type Region = "northAmerica" | "europe" | "asia" | "middleEast" | "africa" | "oceania" | "latinAmerica";

const CVEditor = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region>("northAmerica");
  const { toast } = useToast();

  const handleRegionChange = (region: Region) => {
    setSelectedRegion(region);
    toast({
      title: "Region Changed",
      description: `CV format changed to ${region.replace(/([A-Z])/g, " $1").trim()} region`,
    });
  };

  const renderForm = () => {
    switch (selectedRegion) {
      case "northAmerica":
        return <NorthAmericaForm />;
      case "europe":
        return <EuropeForm />;
      default:
        return <div>Form for {selectedRegion} coming soon</div>;
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Region</label>
        <select
          value={selectedRegion}
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
    </Card>
  );
};

export default CVEditor;