import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { creditService } from '@/services/CreditManagementService';
import type { CreditBalance, PaymentDetails } from '@/types/credit';

export function useCredits() {
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<CreditBalance>({});
  const { toast } = useToast();

  const purchaseCredits = useCallback(async (
    userId: string,
    serviceId: string,
    quantity: number,
    paymentDetails: PaymentDetails
  ) => {
    setIsLoading(true);
    try {
      await creditService.purchaseCredits(userId, serviceId, quantity, paymentDetails);
      toast({
        title: "Credits Purchased",
        description: `Successfully purchased ${quantity} credits for ${serviceId} service.`
      });
      // Refresh balance
      const newBalance = await creditService.getCreditBalance(userId);
      setBalance(newBalance);
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: error instanceof Error ? error.message : "Failed to purchase credits",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const redeemCredits = useCallback(async (
    userId: string,
    serviceId: string,
    quantity: number
  ) => {
    setIsLoading(true);
    try {
      await creditService.redeemCredits(userId, serviceId, quantity);
      toast({
        title: "Credits Redeemed",
        description: `Successfully redeemed ${quantity} credits for ${serviceId} service.`
      });
      // Refresh balance
      const newBalance = await creditService.getCreditBalance(userId);
      setBalance(newBalance);
    } catch (error) {
      toast({
        title: "Redemption Failed",
        description: error instanceof Error ? error.message : "Failed to redeem credits",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const loadBalance = useCallback(async (userId: string) => {
    setIsLoading(true);
    try {
      const newBalance = await creditService.getCreditBalance(userId);
      setBalance(newBalance);
      return newBalance;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load credit balance",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    isLoading,
    balance,
    purchaseCredits,
    redeemCredits,
    loadBalance
  };
}