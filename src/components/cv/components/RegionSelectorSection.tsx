import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import RegionSelector from "../RegionSelector";

interface RegionSelectorSectionProps {
  selectedRegion: string;
  onRegionChange: (value: string) => void;
  onContinue: () => void;
}

export const RegionSelectorSection = ({
  selectedRegion,
  onRegionChange,
  onContinue
}: RegionSelectorSectionProps) => (
  <>
    <RegionSelector 
      selectedRegion={selectedRegion} 
      onRegionChange={onRegionChange} 
    />
    {selectedRegion && (
      <Button 
        className="w-full mt-4 flex items-center justify-center gap-2"
        onClick={onContinue}
      >
        Continue to CV Editor
        <ChevronRight className="h-4 w-4" />
      </Button>
    )}
  </>
);