'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend?: number;
  icon?: React.ReactNode;
  delay?: number;
}

export default function StatsCard({ title, value, prefix = '', suffix = '', trend, icon, delay = 0 }: StatsCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplayValue(Math.round(value * eased));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="group glass-card relative overflow-hidden rounded-2xl p-5 card-hover-lift"
    >
      {/* Top glow accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-panel-glow opacity-30" />

      <div className="relative">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">{title}</span>
          {icon && (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 transition-all duration-300 group-hover:bg-purple-500/20 group-hover:shadow-glow-purple/20">
              {icon}
            </div>
          )}
        </div>
        <div className="font-display text-2xl font-bold text-slate-50 font-tabular md:text-3xl">
          {prefix}
          {displayValue.toLocaleString()}
          {suffix}
        </div>
        {trend !== undefined && (
          <div className={cn('mt-2 flex items-center gap-1 text-xs font-medium', trend >= 0 ? 'text-emerald-400' : 'text-rose-400')}>
            {trend >= 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
            <span>{trend >= 0 ? '+' : ''}{trend}%</span>
            <span className="text-slate-500">vs last period</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
