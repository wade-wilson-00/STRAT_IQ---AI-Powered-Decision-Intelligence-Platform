'use client';

import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

interface ForecastChartProps {
  data: { month: string; revenue: number; projected: number }[];
  variant?: 'default' | 'compact';
}

export default function ForecastChart({ data, variant = 'default' }: ForecastChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`glass-card relative flex flex-col overflow-hidden rounded-2xl p-6 ${
        variant === 'compact' ? 'h-56' : 'h-72 md:h-80'
      }`}
    >
      {/* Top glow accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">
            REVENUE FORECAST
          </div>
          <div className="font-heading text-sm font-semibold text-slate-100">Projected MRR trend</div>
        </div>
        <div className="rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-purple-400 font-medium">
          PREDICTIVE
        </div>
      </div>

      <div className="relative flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <AreaChart data={data} margin={{ top: 8, right: 12, left: -8, bottom: 8 }}>
            <defs>
              <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.35} />
                <stop offset="50%" stopColor="#818cf8" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#818cf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148,163,184,0.08)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'var(--font-sans)' }}
              tickLine={false}
              tickMargin={8}
              height={28}
              axisLine={false}
            />
            <YAxis
              width={50}
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'var(--font-sans)' }}
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tickFormatter={(v: unknown) => `$${(Number(v) / 1000).toFixed(0)}k`}
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
              formatter={(v: unknown) => [`$${Number(v).toLocaleString()}`, 'Revenue']}
              labelStyle={{ color: '#e2e8f0', fontSize: 11, fontWeight: 600, marginBottom: 4 }}
              itemStyle={{ color: '#c4b5fd', fontSize: 12 }}
              cursor={{ stroke: 'rgba(168,85,247,0.3)', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area
              type="monotone"
              dataKey="projected"
              stroke="#a855f7"
              strokeWidth={2.5}
              fill="url(#forecastGradient)"
              animationDuration={1200}
              animationEasing="ease-in-out"
              dot={false}
              activeDot={{
                r: 5,
                fill: '#a855f7',
                stroke: '#0f172a',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
