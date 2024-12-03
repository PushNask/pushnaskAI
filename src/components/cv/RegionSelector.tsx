import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Region {
  id: string;
  name: string;
  description: string;
}

interface RegionSelectorProps {
  selectedRegion: string;
  onRegionChange: (value: string) => void;
}

const regions: Region[] = [
  {
    id: "north-america",
    name: "North America",
    description: "1-2 pages, achievement-focused, excludes personal details"
  },
  {
    id: "europe",
    name: "Europe",
    description: "Skills-focused, includes personal information, Europass common"
  },
  {
    id: "asia",
    name: "Asia",
    description: "Formal structure, includes detailed personal information"
  },
  {
    id: "middle-east",
    name: "Middle East",
    description: "Highly detailed with photo and personal information"
  },
  {
    id: "africa",
    name: "Africa",
    description: "Varies by region, multi-page CVs common in some areas"
  },
  {
    id: "latin-america",
    name: "Latin America",
    description: "Emphasizes personal information, photos common"
  },
  {
    id: "oceania",
    name: "Australia & New Zealand",
    description: "2-3 pages, detailed, similar to UK standards"
  }
];

const RegionSelector = ({ selectedRegion, onRegionChange }: RegionSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select Your Region</h3>
      <RadioGroup
        value={selectedRegion}
        onValueChange={onRegionChange}
        className="grid gap-4 md:grid-cols-2"
      >
        {regions.map((region) => (
          <div key={region.id} className="relative">
            <RadioGroupItem
              value={region.id}
              id={region.id}
              className="peer sr-only"
            />
            <Label
              htmlFor={region.id}
              className="flex flex-col p-4 border rounded-lg cursor-pointer hover:bg-gray-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary"
            >
              <span className="font-medium">{region.name}</span>
              <span className="text-sm text-muted-foreground">
                {region.description}
              </span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default RegionSelector;