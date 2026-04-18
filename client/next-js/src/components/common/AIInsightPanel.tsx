'use client';

import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIInsightPanelProps {
  title?: string;
  insight: string;
  tone?: 'positive' | 'negative' | 'neutral';
}

const toneConfig = {
  positive: {
    border: 'border-emerald-500/20',
    bg: 'from-emerald-500/10 to-emerald-500/[0.02]',
    text: 'text-emerald-400',
    glow: 'via-emerald-500/30',
    Icon: TrendingUp,
  },
  negative: {
    border: 'border-rose-500/20',
    bg: 'from-rose-500/10 to-rose-500/[0.02]',
    text: 'text-rose-400',
    glow: 'via-rose-500/30',
    Icon: TrendingDown,
  },
  neutral: {
    border: 'border-slate-600/20',
    bg: 'from-slate-500/10 to-slate-500/[0.02]',
    text: 'text-slate-400',
    glow: 'via-slate-500/30',
    Icon: Minus,
  },
};

export default function AIInsightPanel({ title = 'AI Insight', insight, tone = 'neutral' }: AIInsightPanelProps) {
  const cfg = toneConfig[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={cn(
        'relative overflow-hidden rounded-2xl border p-5 backdrop-blur-sm bg-gradient-to-br',
        cfg.border,
        cfg.bg
      )}
    >
      {/* Top glow accent */}
      <div className={cn(
        'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent',
        cfg.glow
      )} />

      <div className="mb-3 flex items-center gap-2">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="h-4 w-4 text-purple-400" />
        </motion.div>
        <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{title}</span>
      </div>
      <div
        className={cn(
          'text-sm leading-relaxed whitespace-pre-line',
          'space-y-2 [&>p]:m-0',
          cfg.text
        )}
      >
        {insight.split('\n').map((line, i) => (
          <p key={`${i}-${line.slice(0, 24)}`}>{line.trim() === '' ? '\u00a0' : line}</p>
        ))}
      </div>
    </motion.div>
  );
}
