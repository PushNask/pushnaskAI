import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PrintControlsProps {
  remainingFreePrints: number;
  onPrint: () => void;
}

const PrintControls = ({ remainingFreePrints, onPrint }: PrintControlsProps) => {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your CV is being prepared for download."
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div>
          <h3 className="font-medium">Free Prints Remaining</h3>
          <p className="text-sm text-muted-foreground">{remainingFreePrints} copies</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={onPrint} className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print CV
          </Button>
          <Button variant="outline" onClick={handleDownload} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrintControls;