import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Printer, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CVCreator = () => {
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
        <CardDescription>Create and manage your professional CV</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
      </CardContent>
    </Card>
  );
};

export default CVCreator;