import { z } from 'zod';

export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  const result = passwordSchema.safeParse(password);
  return {
    isValid: result.success,
    error: !result.success ? result.error.errors[0].message : undefined
  };
};