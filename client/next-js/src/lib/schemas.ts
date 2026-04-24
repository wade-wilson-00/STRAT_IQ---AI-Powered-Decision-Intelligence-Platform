import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export type SignupFormData = z.infer<typeof signupSchema>;

export const churnFormSchema = z.object({
  engagement_score: z.coerce.number().min(0).max(100),
  nps_score: z.coerce.number().min(0).max(10),
  product_adoption_rate: z.coerce.number().min(0).max(100),
  payment_failures: z.coerce.number().min(0),
  support_tickets_last_30d: z.coerce.number().min(0),
  customer_age_months: z.coerce.number().min(0),
  cac_payback_months: z.coerce.number().min(0),
  active_users_ratio: z.coerce.number().min(0).max(100),
  contract_length_months: z.coerce.number().min(1),
  churn_risk_flag: z.coerce.number().min(0).max(1),
});
export type ChurnFormData = z.infer<typeof churnFormSchema>;

export const revenueFormSchema = z.object({
  mrr: z.coerce.number().min(0),
  active_users: z.coerce.number().min(0),
  cac: z.coerce.number().min(0),
  churn_rate: z.coerce.number().min(0).max(100),
  marketing_spend: z.coerce.number().min(0),
  burn_rate: z.coerce.number().min(0),
});
export type RevenueFormData = z.infer<typeof revenueFormSchema>;

export const settingsSchema = z.object({
  displayName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  notifications: z.boolean(),
});
export type SettingsFormData = z.infer<typeof settingsSchema>;
