'use client';

import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';

interface ChurnRateChartProps {
  probability?: number;
  level?: 'low' | 'medium' | 'high';
  data?: { month: string; rate: number; fill: string }[];
}

export default function ChurnRateChart({ data, probability, level }: ChurnRateChartProps) {
  const defaultData = [
    { month: 'M-3', rate: 3.2, fill: '#22d3ee' },
    { month: 'M-2', rate: 3.8, fill: '#818cf8' },
    { month: 'M-1', rate: 4.2, fill: '#a855f7' },
    {
      month: 'Now',
      rate: probability != null ? probability * 100 : 4.5,
      fill: level === 'high' ? '#f43f5e' : level === 'medium' ? '#f59e0b' : '#22d3ee',
    },
    {
      month: 'M+1',
      rate: probability != null ? Math.min(20, probability * 100 * 1.15) : 5.1,
      fill: 'rgba(148,163,184,0.5)',
    },
  ];

  const chartData = data?.length ? data : defaultData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass-card relative flex flex-col overflow-hidden rounded-2xl p-6 h-72 md:h-80"
    >
      {/* Top glow accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">CHURN RATE</div>
          <div className="font-heading text-sm font-semibold text-slate-100">Probability &amp; trend</div>
        </div>
        <div className="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-cyan-400 font-medium">
          ML-ASSISTED
        </div>
      </div>

      <div className="relative flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <BarChart data={chartData} margin={{ top: 8, right: 12, left: -8, bottom: 8 }}>
            <defs>
              {chartData.map((entry, i) => (
                <linearGradient key={`barGrad-${i}`} id={`barGrad-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={entry.fill || '#818cf8'} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={entry.fill || '#818cf8'} stopOpacity={0.4} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid stroke="rgba(148,163,184,0.08)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickLine={false}
              tickMargin={8}
              height={28}
              axisLine={false}
            />
            <YAxis
              width={40}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tickFormatter={(v: unknown) => `${v}%`}
              domain={[0, 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                backdropFilter: 'blur(12px)',
                borderRadius: 12,
                border: '1px solid rgba(148,163,184,0.15)',
                padding: '10px 14px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}
              formatter={(v: unknown) => [`${Number(v).toFixed(1)}%`, 'Churn rate']}
              labelStyle={{ color: '#e2e8f0', fontSize: 11, fontWeight: 600, marginBottom: 4 }}
              cursor={{ fill: 'rgba(168,85,247,0.06)' }}
            />
            <Bar dataKey="rate" radius={[6, 6, 0, 0]} animationDuration={1000} animationEasing="ease-out">
              {chartData.map((entry, i) => (
                <Cell key={i} fill={`url(#barGrad-${i})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
