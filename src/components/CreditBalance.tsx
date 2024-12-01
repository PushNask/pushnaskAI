import { Coins } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const CreditBalance = () => {
  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="bg-ocean/10 p-3 rounded-full">
            <Coins className="h-6 w-6 text-ocean" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Credit Balance</h2>
            <p className="text-ocean font-medium">Available credits: 10</p>
          </div>
        </div>
        <Button className="bg-ocean hover:bg-ocean-dark text-white">
          Buy Credits
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreditBalance;