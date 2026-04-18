'use client';

import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RiskPanelProps {
  level: 'low' | 'medium' | 'high';
  summary: string;
}

const levelConfig = {
  low: {
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    label: 'LOW RISK',
    barColor: 'from-emerald-500 to-emerald-400',
    barWidth: '25%',
    glowColor: 'via-emerald-500/30',
    Icon: CheckCircle,
  },
  medium: {
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    label: 'MEDIUM RISK',
    barColor: 'from-amber-500 to-amber-400',
    barWidth: '55%',
    glowColor: 'via-amber-500/30',
    Icon: AlertTriangle,
  },
  high: {
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    label: 'HIGH RISK',
    barColor: 'from-rose-500 to-rose-400',
    barWidth: '85%',
    glowColor: 'via-rose-500/30',
    Icon: AlertCircle,
  },
};

export default function RiskPanel({ level, summary }: RiskPanelProps) {
  const cfg = levelConfig[level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass-card relative overflow-hidden rounded-2xl p-5"
    >
      {/* Top glow accent */}
      <div className={cn(
        'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent',
        cfg.glowColor
      )} />

      <div className="mb-4 flex items-center gap-2">
        <Shield className="h-4 w-4 text-slate-400" />
        <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">RISK ENGINE</span>
      </div>

      {/* Risk level badge with icon */}
      <div className="mb-4 flex items-center gap-3">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', cfg.bg)}>
          <cfg.Icon className={cn('h-5 w-5', cfg.color)} />
        </div>
        <div className={cn('inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold', cfg.bg, cfg.border, cfg.color)}>
          {cfg.label}
        </div>
      </div>

      {/* Animated risk bar */}
      <div className="mb-4 h-1.5 w-full rounded-full bg-slate-800/60 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: cfg.barWidth }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          className={cn('h-full rounded-full bg-gradient-to-r', cfg.barColor)}
        />
      </div>

      <p className="text-sm leading-relaxed text-slate-400">{summary}</p>
    </motion.div>
  );
}
