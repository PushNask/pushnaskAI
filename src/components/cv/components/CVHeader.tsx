import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CVHeaderProps {
  onBack: () => void;
}

export const CVHeader = ({ onBack }: CVHeaderProps) => (
  <div className="mb-4">
    <Button
      variant="outline"
      onClick={onBack}
      className="flex items-center gap-2"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Profile
    </Button>
  </div>
);