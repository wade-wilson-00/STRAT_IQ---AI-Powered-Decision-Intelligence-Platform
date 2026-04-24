'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Loader2,
  DollarSign,
  ArrowUpRight,
  BarChart3,
  Users,
  Flame,
  Activity,
  Megaphone,
} from 'lucide-react';
import { toast } from 'sonner';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AIInsightPanel from '@/components/common/AIInsightPanel';
import { revenueFormSchema, type RevenueFormData } from '@/lib/schemas';
import { useForecastMutation } from '@/lib/queries';
import { usePredictionStore } from '@/lib/store';
import type { ForecastResult } from '@/lib/api';

const revenueMetricFields: { name: keyof RevenueFormData; label: string; placeholder: string; suffix?: string; icon: React.ElementType }[] = [
  { name: 'mrr', label: 'Current MRR', placeholder: 'e.g. 48000', suffix: '$', icon: DollarSign },
  { name: 'active_users', label: 'Active Users', placeholder: 'e.g. 1200', icon: Users },
  { name: 'cac', label: 'CAC', placeholder: 'e.g. 150', suffix: '$', icon: Activity },
];

const growthFactorFields: { name: keyof RevenueFormData; label: string; placeholder: string; suffix?: string; icon: React.ElementType }[] = [
  { name: 'churn_rate', label: 'Churn Rate', placeholder: 'e.g. 4.5', suffix: '%', icon: ArrowUpRight },
  { name: 'marketing_spend', label: 'Marketing Spend', placeholder: 'e.g. 5000', suffix: '$', icon: Megaphone },
  { name: 'burn_rate', label: 'Burn Rate', placeholder: 'e.g. 20000', suffix: '$', icon: Flame },
];

function AnimatedCounter({ value, prefix = '' }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const duration = 1200;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{prefix}{display.toLocaleString()}</span>;
}

export default function RevenueForecastPage() {
  const [result, setResult] = useState<ForecastResult | null>(null);
  const { setLatestForecast } = usePredictionStore();
  const mutation = useForecastMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<RevenueFormData>({
    resolver: zodResolver(revenueFormSchema) as any,
    defaultValues: {
      mrr: 48000,
      active_users: 1200,
      cac: 150,
      churn_rate: 4.5,
      marketing_spend: 5000,
      burn_rate: 20000,
    },
  });

  const onSubmit = async (data: RevenueFormData) => {
    try {
      const payload = { ...data, churn_rate: data.churn_rate / 100 };
      const res = await mutation.mutateAsync(payload);
      setResult(res);
      setLatestForecast(res);
      toast.success('Revenue forecast generated');
    } catch {
      toast.error('Forecast failed');
    }
  };

  return (
    <DashboardLayout>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          {/* Top accent */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent rounded-t-2xl" />

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20">
              <TrendingUp className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-slate-100">Forecast Parameters</h2>
              <p className="text-xs text-slate-400">Enter your SaaS metrics to generate a revenue forecast</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Revenue Metrics Group */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-purple-400" />
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">Revenue Metrics</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {revenueMetricFields.map((f) => (
                  <div key={f.name} className="space-y-1.5">
                    <Label className="text-[11px] text-slate-400 font-medium">{f.label}</Label>
                    <div className="relative input-glow rounded-lg transition-all duration-200">
                      <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                      <Input
                        type="number"
                        step="any"
                        placeholder={f.placeholder}
                        {...register(f.name)}
                        className="border-slate-700/40 bg-slate-900/40 text-slate-100 placeholder:text-slate-600 pl-9"
                      />
                      {f.suffix && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 font-medium">
                          {f.suffix}
                        </span>
                      )}
                    </div>
                    {errors[f.name] && (
                      <p className="text-[11px] text-rose-400">{errors[f.name]?.message}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Growth Factors Group */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-indigo-400" />
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">Growth Factors</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {growthFactorFields.map((f) => (
                  <div key={f.name} className="space-y-1.5">
                    <Label className="text-[11px] text-slate-400 font-medium">{f.label}</Label>
                    <div className="relative input-glow rounded-lg transition-all duration-200">
                      <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                      <Input
                        type="number"
                        step="any"
                        placeholder={f.placeholder}
                        {...register(f.name)}
                        className="border-slate-700/40 bg-slate-900/40 text-slate-100 placeholder:text-slate-600 pl-9"
                      />
                      {f.suffix && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 font-medium">
                          {f.suffix}
                        </span>
                      )}
                    </div>
                    {errors[f.name] && (
                      <p className="text-[11px] text-rose-400">{errors[f.name]?.message}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                'Generate Forecast'
              )}
            </Button>
          </form>
        </motion.div>

        {/* Results */}
        <div className="space-y-6">
          {result ? (
            <>
              {/* Predicted MRR card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass-card relative overflow-hidden rounded-2xl p-6"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/[0.05] to-transparent" />

                <div className="relative">
                  <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500 mb-3">
                    PREDICTED MRR
                  </div>
                  <div className="flex items-baseline gap-1 mb-5">
                    <DollarSign className="h-6 w-6 text-purple-400" />
                    <span className="font-display text-4xl font-bold text-slate-50 font-tabular">
                      <AnimatedCounter value={result.predicted_mrr} />
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-semibold text-slate-200">Status: {result.status}</span>
                  </div>
                </div>
              </motion.div>

              <AIInsightPanel
                title="AI Forecast Insight"
                insight={result.ai_insight}
                tone={result.predicted_mrr > 50000 ? 'positive' : 'neutral'}
              />
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800/40 p-12"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20">
                <TrendingUp className="h-6 w-6 text-purple-400/60" />
              </div>
              <p className="text-sm text-slate-500 text-center">Submit the form to see revenue forecast results</p>
              <p className="mt-1 text-[11px] text-slate-600">ML-powered predictions based on your metrics</p>
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
