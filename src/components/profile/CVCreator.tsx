import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Printer, Download, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Region = {
  id: string;
  name: string;
  description: string;
};

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

const CVCreator = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [remainingFreePrints, setRemainingFreePrints] = useState(2);
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>CV Creator</CardTitle>
        <CardDescription>Create a professional CV tailored to your region</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Select Your Region</h3>
          <RadioGroup
            value={selectedRegion}
            onValueChange={setSelectedRegion}
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

        {selectedRegion && (
          <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
              <div>
                <h3 className="font-medium">Free Prints Remaining</h3>
                <p className="text-sm text-muted-foreground">{remainingFreePrints} copies</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handlePrint} className="flex items-center gap-2">
                  <Printer className="h-4 w-4" />
                  Print CV
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
            
            <Button className="w-full mt-4 flex items-center justify-center gap-2">
              Continue to CV Editor
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CVCreator;