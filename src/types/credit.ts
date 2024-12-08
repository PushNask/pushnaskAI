export type CreditStatus = 'active' | 'issued' | 'redeemed' | 'expired' | 'revoked' | 'inactive' | 'pending' | 'failed';
export type BatchStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type TransactionType = 'purchase' | 'redemption' | 'refund' | 'expiration' | 'revocation';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface Credit {
  id: string;
  code: string;
  status: CreditStatus;
  value: number;
  service_id: string;
  batch_id: string;
  created_at: string;
  expires_at: string;
  issued_to?: string;
  issued_at?: string;
  redeemed_at?: string;
  redeemed_by?: string;
  payment_id?: string;
  metadata?: Record<string, any>;
}

export interface CreditBatch {
  id: string;
  service_id: string;
  quantity: number;
  status: BatchStatus;
  price_per_credit: number;
  total_value: number;
  metadata?: Record<string, any>;
  created_at: string;
  created_by: string;
  completed_at?: string;
  failed_at?: string;
}

export interface CreditTransaction {
  id: string;
  credit_id?: string;
  user_id: string;
  type: TransactionType;
  amount: number;
  payment_method?: string;
  payment_status?: PaymentStatus;
  payment_reference?: string;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface PaymentDetails {
  method: string;
  reference: string;
}

export interface CreditBalance {
  [serviceId: string]: number;
}