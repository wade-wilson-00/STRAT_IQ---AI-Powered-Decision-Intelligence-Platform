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
  nps_score: z.coerce.number().min(0, 'Min 0').max(10, 'Max 10'),
  login_frequency: z.coerce.number().min(0, 'Min 0').max(30, 'Max 30'),
  support_tickets: z.coerce.number().min(0, 'Min 0').max(50, 'Max 50'),
  usage_hours: z.coerce.number().min(0, 'Min 0').max(24, 'Max 24'),
  contract_length: z.coerce.number().min(1, 'Min 1').max(36, 'Max 36'),
  monthly_spend: z.coerce.number().min(0, 'Min 0'),
});
export type ChurnFormData = {
  nps_score: number;
  login_frequency: number;
  support_tickets: number;
  usage_hours: number;
  contract_length: number;
  monthly_spend: number;
};

export const revenueFormSchema = z.object({
  current_mrr: z.coerce.number().min(1, 'MRR is required'),
  mrr_growth_rate: z.coerce.number().min(-100).max(100),
  churn_rate: z.coerce.number().min(0).max(100),
  expansion_rate: z.coerce.number().min(0).max(100),
  months: z.coerce.number().min(1).max(36),
  previous_revenues: z.string().optional(),
});
export type RevenueFormData = {
  current_mrr: number;
  mrr_growth_rate: number;
  churn_rate: number;
  expansion_rate: number;
  months: number;
  previous_revenues?: string;
};

export const settingsSchema = z.object({
  displayName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  notifications: z.boolean(),
});
export type SettingsFormData = z.infer<typeof settingsSchema>;
