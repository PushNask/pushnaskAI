import { Briefcase, Globe, GraduationCap, LineChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { ServiceConfig } from "@/types/service";
import { AppError, handleError } from "@/utils/errorHandling";
import { Skeleton } from "./ui/skeleton";

const services: ServiceConfig[] = [
  {
    id: "career",
    title: "Career Development",
    description: "Analyze career paths and opportunities",
    icon: Briefcase,
    credits: 4,
    price: "$4.99"
  },
  {
    id: "global",
    title: "Global Exploration",
    description: "Discover international opportunities",
    icon: Globe,
    credits: 4,
    price: "$12.99"
  },
  {
    id: "education",
    title: "Educational Guidance",
    description: "Find the perfect study program",
    icon: GraduationCap,
    credits: 4,
    price: "$8.00"
  },
  {
    id: "entrepreneurial",
    title: "Entrepreneurial Support",
    description: "Launch and grow your business",
    icon: LineChart,
    credits: 4,
    price: "$12.00"
  }
];

const ServiceCards = () => {
  const [selectedService, setSelectedService] = useState<ServiceConfig | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyCredit = (service: ServiceConfig) => {
    try {
      setSelectedService(service);
      setShowPaymentDialog(true);
    } catch (error) {
      const errorDetails = handleError(error);
      toast({
        title: "Error",
        description: errorDetails.message,
        variant: "destructive"
      });
    }
  };

  const handlePaymentMethod = async (method: string) => {
    setIsLoading(true);
    try {
      if (!selectedService) {
        throw new AppError("No service selected", "NO_SERVICE_SELECTED", 400);
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Payment Successful",
        description: `Successfully processed ${method} payment for ${selectedService.title}`,
      });
      setShowPaymentDialog(false);
    } catch (error) {
      const errorDetails = handleError(error);
      toast({
        title: "Payment Failed",
        description: errorDetails.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="bg-white">
            <CardHeader className="space-y-1">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {services.map((service) => (
          <Card key={service.id} className="bg-white shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="bg-ocean/10 p-3 rounded-full">
                  <service.icon className="h-5 w-5 text-ocean" />
                </div>
                <span className="text-sm font-medium text-ocean">{service.credits} credits</span>
              </div>
              <CardTitle className="text-lg">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-ocean font-semibold">{service.price}</span>
                <Button 
                  variant="ghost" 
                  className="text-ocean hover:text-ocean-dark hover:bg-ocean/10"
                  onClick={() => handleBuyCredit(service)}
                  disabled={isLoading}
                >
                  Buy Credit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose Payment Method</DialogTitle>
            <DialogDescription>
              Select your preferred payment method to purchase credits for {selectedService?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button 
              className="w-full" 
              onClick={() => handlePaymentMethod('Stripe')}
              disabled={isLoading}
            >
              Pay with Stripe
            </Button>
            <Button 
              className="w-full" 
              onClick={() => handlePaymentMethod('Mobile Money')}
              disabled={isLoading}
            >
              Pay with Mobile Money
            </Button>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => handlePaymentMethod('Credit Redemption')}
              disabled={isLoading}
            >
              Redeem Credit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </ErrorBoundary>
  );
};

export default ServiceCards;