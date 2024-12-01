import { Coins } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const CreditBalance = () => {
  return (
    <Card className="bg-white">
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Coins className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Credit Balance</h2>
            <p className="text-sm text-gray-600">Available credits: 10</p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          Buy Credits
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreditBalance;