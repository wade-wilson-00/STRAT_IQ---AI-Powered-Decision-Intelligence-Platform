'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import {
  UserMinus,
  Loader2,
  MessageSquare,
  LogIn,
  Headphones,
  Clock4,
  FileText,
  CreditCard,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ChurnRateChart from '@/components/charts/ChurnRateChart';
import AIInsightPanel from '@/components/common/AIInsightPanel';
import { churnFormSchema, type ChurnFormData } from '@/lib/schemas';
import { useChurnMutation } from '@/lib/queries';
import { usePredictionStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import type { ChurnResult } from '@/lib/api';

const engagementFields: { name: keyof ChurnFormData; label: string; placeholder: string; icon: React.ElementType }[] = [
  { name: 'nps_score', label: 'NPS Score', placeholder: '0–10', icon: MessageSquare },
  { name: 'login_frequency', label: 'Login Frequency / week', placeholder: '0–30', icon: LogIn },
  { name: 'usage_hours', label: 'Daily Usage Hours', placeholder: '0–24', icon: Clock4 },
];

const accountFields: { name: keyof ChurnFormData; label: string; placeholder: string; icon: React.ElementType }[] = [
  { name: 'support_tickets', label: 'Support Tickets (30d)', placeholder: '0–50', icon: Headphones },
  { name: 'contract_length', label: 'Contract Length (months)', placeholder: '1–36', icon: FileText },
  { name: 'monthly_spend', label: 'Monthly Spend ($)', placeholder: 'e.g. 500', icon: CreditCard },
];

/* ── SVG Risk Gauge ── */
function RiskGauge({ probability, level }: { probability: number; level: 'low' | 'medium' | 'high' }) {
  const pct = probability * 100;
  // Semi-circle gauge: 180 degrees, radius 70, center at (80, 80)
  const r = 65;
  const cx = 80;
  const cy = 78;
  const circumference = Math.PI * r;
  const filled = (pct / 100) * circumference;

  const gaugeColor = level === 'high' ? '#f43f5e' : level === 'medium' ? '#f59e0b' : '#22d3ee';
  const glowFilter = level === 'high' ? 'drop-shadow(0 0 6px rgba(244,63,94,0.5))' : level === 'medium' ? 'drop-shadow(0 0 6px rgba(245,158,11,0.5))' : 'drop-shadow(0 0 6px rgba(34,211,238,0.5))';

  // Needle angle: 0% = -90 (left), 100% = 90 (right)
  const needleAngle = -90 + (pct / 100) * 180;

  return (
    <div className="relative flex flex-col items-center">
      <svg width="160" height="95" viewBox="0 0 160 95" className="overflow-visible">
        {/* Background arc */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="rgba(51,65,85,0.3)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Filled arc */}
        <motion.path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={gaugeColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${circumference}`}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - filled }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          style={{ filter: glowFilter }}
        />
        {/* Needle */}
        <motion.line
          x1={cx}
          y1={cy}
          x2={cx}
          y2={cy - r + 12}
          stroke={gaugeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ rotate: -90, originX: cx, originY: cy }}
          animate={{ rotate: needleAngle, originX: cx, originY: cy }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        {/* Center dot */}
        <circle cx={cx} cy={cy} r="4" fill={gaugeColor} />
      </svg>
    </div>
  );
}

function AnimatedProbability({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const duration = 1200;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{display.toFixed(1)}</span>;
}

export default function ChurnPredictionPage() {
  const [result, setResult] = useState<ChurnResult | null>(null);
  const { setLatestChurn } = usePredictionStore();
  const mutation = useChurnMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<ChurnFormData>({
    resolver: zodResolver(churnFormSchema) as any,
    defaultValues: {
      nps_score: 7,
      login_frequency: 5,
      support_tickets: 2,
      usage_hours: 6,
      contract_length: 12,
      monthly_spend: 450,
    },
  });

  const onSubmit = async (data: ChurnFormData) => {
    try {
      const res = await mutation.mutateAsync(data);
      setResult(res);
      setLatestChurn(res);
      toast.success('Churn prediction complete');
    } catch {
      toast.error('Prediction failed');
    }
  };

  const levelColors = {
    low: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
    medium: 'text-amber-400 border-amber-500/20 bg-amber-500/10',
    high: 'text-rose-400 border-rose-500/20 bg-rose-500/10',
  };

  const levelGlows = {
    low: 'from-emerald-500/[0.05] to-transparent',
    medium: 'from-amber-500/[0.05] to-transparent',
    high: 'from-rose-500/[0.05] to-transparent',
  };

  return (
    <DashboardLayout>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card relative rounded-2xl p-6"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent rounded-t-2xl" />

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <UserMinus className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-slate-100">Customer Signals</h2>
              <p className="text-xs text-slate-400">Enter engagement metrics to predict churn risk</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Engagement Signals Group */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-cyan-400" />
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">Engagement Signals</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {engagementFields.map((f) => (
                  <div key={f.name} className="space-y-1.5">
                    <Label className="text-[11px] text-slate-400 font-medium">{f.label}</Label>
                    <div className="relative input-glow-cyan rounded-lg transition-all duration-200">
                      <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                      <Input
                        type="number"
                        placeholder={f.placeholder}
                        {...register(f.name)}
                        className="border-slate-700/40 bg-slate-900/40 text-slate-100 placeholder:text-slate-600 pl-9"
                      />
                    </div>
                    {errors[f.name] && (
                      <p className="text-[11px] text-rose-400">{errors[f.name]?.message}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Account Details Group */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-indigo-400" />
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">Account Details</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {accountFields.map((f) => (
                  <div key={f.name} className="space-y-1.5">
                    <Label className="text-[11px] text-slate-400 font-medium">{f.label}</Label>
                    <div className="relative input-glow-cyan rounded-lg transition-all duration-200">
                      <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                      <Input
                        type="number"
                        placeholder={f.placeholder}
                        {...register(f.name)}
                        className="border-slate-700/40 bg-slate-900/40 text-slate-100 placeholder:text-slate-600 pl-9"
                      />
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
              className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-500/30"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                </>
              ) : (
                'Predict Churn Risk'
              )}
            </Button>
          </form>
        </motion.div>

        {/* Results */}
        <div className="space-y-6">
          {result ? (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass-card relative overflow-hidden rounded-2xl p-6 text-center"
              >
                {/* Dynamic gradient based on risk */}
                <div className={cn(
                  'pointer-events-none absolute inset-0 bg-gradient-to-br',
                  levelGlows[result.level]
                )} />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

                <div className="relative">
                  <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500 mb-4">
                    CHURN PROBABILITY
                  </div>

                  {/* Animated gauge */}
                  <RiskGauge probability={result.probability} level={result.level} />

                  <div className="font-display text-5xl font-bold text-slate-50 font-tabular mt-2 mb-3">
                    <AnimatedProbability value={result.probability * 100} />%
                  </div>

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-semibold',
                      levelColors[result.level],
                    )}
                  >
                    <AlertTriangle className="h-3.5 w-3.5" />
                    {result.level.toUpperCase()} RISK
                  </motion.div>
                  <p className="mt-4 text-sm text-slate-400 leading-relaxed">{result.summary}</p>
                </div>
              </motion.div>

              <ChurnRateChart probability={result.probability} level={result.level} />

              <AIInsightPanel
                title="AI Analysis"
                insight={result.ai_insight}
                tone={result.level === 'high' ? 'negative' : result.level === 'medium' ? 'neutral' : 'positive'}
              />
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800/40 p-12"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                <UserMinus className="h-6 w-6 text-cyan-400/60" />
              </div>
              <p className="text-sm text-slate-500 text-center">Submit the form to see churn prediction results</p>
              <p className="mt-1 text-[11px] text-slate-600">AI-powered risk assessment for your customers</p>
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
