import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { z } from 'zod';
import type { 
  Credit, 
  CreditBatch, 
  CreditTransaction, 
  PaymentDetails, 
  CreditBalance 
} from '@/types/credit';

// Validation schemas
const CreditBatchSchema = z.object({
  serviceId: z.string(),
  quantity: z.number().positive(),
  pricePerCredit: z.number().positive(),
  metadata: z.record(z.any()).optional()
});

export class CreditManagementService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY
    );
  }

  /**
   * Create a new credit batch
   */
  async createCreditBatch(data: z.infer<typeof CreditBatchSchema>): Promise<CreditBatch> {
    const validated = CreditBatchSchema.parse(data);
    const userId = await this.getCurrentUserId();

    const { data: batch, error } = await this.supabase
      .from('credit_batches')
      .insert({
        service_id: validated.serviceId,
        quantity: validated.quantity,
        price_per_credit: validated.pricePerCredit,
        metadata: validated.metadata || {},
        created_by: userId
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create batch: ${error.message}`);
    return batch;
  }

  /**
   * Purchase credits for a user
   */
  async purchaseCredits(
    userId: string,
    serviceId: string,
    quantity: number,
    paymentDetails: PaymentDetails
  ): Promise<Credit[]> {
    const { data: credits, error: creditsError } = await this.supabase
      .from('credits')
      .select()
      .eq('service_id', serviceId)
      .eq('status', 'active')
      .limit(quantity);

    if (creditsError) throw new Error(`Failed to fetch credits: ${creditsError.message}`);
    if (!credits || credits.length < quantity) {
      throw new Error('Insufficient credits available');
    }

    // Start transaction
    const { data: transaction, error: transactionError } = await this.supabase
      .from('credit_transactions')
      .insert({
        user_id: userId,
        type: 'purchase',
        amount: quantity,
        payment_method: paymentDetails.method,
        payment_status: 'pending',
        payment_reference: paymentDetails.reference
      })
      .select()
      .single();

    if (transactionError) throw new Error(`Failed to create transaction: ${transactionError.message}`);

    // Update credits
    const creditIds = credits.map(c => c.id);
    const { error: updateError } = await this.supabase
      .from('credits')
      .update({
        status: 'issued',
        issued_to: userId,
        issued_at: new Date().toISOString(),
        payment_id: paymentDetails.reference
      })
      .in('id', creditIds);

    if (updateError) throw new Error(`Failed to update credits: ${updateError.message}`);

    // Update transaction status
    await this.supabase
      .from('credit_transactions')
      .update({ payment_status: 'completed' })
      .eq('id', transaction.id);

    return credits;
  }

  /**
   * Use credits for a service
   */
  async redeemCredits(userId: string, serviceId: string, quantity: number): Promise<number> {
    const { data: availableCredits, error: checkError } = await this.supabase
      .from('credits')
      .select()
      .eq('issued_to', userId)
      .eq('service_id', serviceId)
      .eq('status', 'issued')
      .limit(quantity);

    if (checkError) throw new Error(`Failed to check credits: ${checkError.message}`);
    if (!availableCredits || availableCredits.length < quantity) {
      throw new Error('Insufficient credits');
    }

    // Redeem credits
    const creditIds = availableCredits.slice(0, quantity).map(c => c.id);
    const { error: redeemError } = await this.supabase
      .from('credits')
      .update({
        status: 'redeemed',
        redeemed_at: new Date().toISOString(),
        redeemed_by: userId
      })
      .in('id', creditIds);

    if (redeemError) throw new Error(`Failed to redeem credits: ${redeemError.message}`);

    // Record transaction
    const { error: transactionError } = await this.supabase
      .from('credit_transactions')
      .insert({
        user_id: userId,
        type: 'redemption',
        amount: quantity,
        metadata: {
          service_id: serviceId,
          redeemed_at: new Date().toISOString()
        }
      });

    if (transactionError) throw new Error(`Failed to record transaction: ${transactionError.message}`);

    return quantity;
  }

  /**
   * Get user's credit balance
   */
  async getCreditBalance(userId: string, serviceId?: string): Promise<CreditBalance> {
    let query = this.supabase
      .from('credits')
      .select('service_id, status')
      .eq('issued_to', userId)
      .eq('status', 'issued');

    if (serviceId) {
      query = query.eq('service_id', serviceId);
    }

    const { data: credits, error } = await query;

    if (error) throw new Error(`Failed to fetch balance: ${error.message}`);

    return credits.reduce((acc, credit) => {
      acc[credit.service_id] = (acc[credit.service_id] || 0) + 1;
      return acc;
    }, {} as CreditBalance);
  }

  /**
   * Get user's transaction history
   */
  async getTransactionHistory(userId: string): Promise<CreditTransaction[]> {
    const { data: transactions, error } = await this.supabase
      .from('credit_transactions')
      .select(`
        *,
        credits:credit_id (
          service_id,
          value
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch transactions: ${error.message}`);
    return transactions;
  }

  private async getCurrentUserId(): Promise<string> {
    const { data: { user }, error } = await this.supabase.auth.getUser();
    if (error || !user) throw new Error('Not authenticated');
    return user.id;
  }
}

export const creditService = new CreditManagementService();