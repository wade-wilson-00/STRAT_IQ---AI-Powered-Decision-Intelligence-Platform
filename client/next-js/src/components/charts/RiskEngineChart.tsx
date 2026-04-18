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

interface RiskEngineChartProps {
  series?: { label: string; runway: number; risk: number }[];
  riskLevel?: 'low' | 'medium' | 'high';
}

export default function RiskEngineChart({ series = [], riskLevel = 'medium' }: RiskEngineChartProps) {
  const defaultData = [
    { label: 'M+0', runway: 18, risk: 0.2 },
    { label: 'M+2', runway: 16, risk: 0.25 },
    { label: 'M+4', runway: 14, risk: 0.3 },
    { label: 'M+6', runway: 11, risk: 0.4 },
    { label: 'M+8', runway: 8, risk: 0.5 },
    { label: 'M+10', runway: 5, risk: 0.65 },
    { label: 'M+12', runway: 3, risk: 0.8 },
  ];

  const data = series.length
    ? series.map((s, i) => ({
        label: s.label || `M+${i}`,
        runway: s.runway ?? 18 - i * 1.2,
        risk: s.risk ?? (i / series.length) * 0.6,
      }))
    : defaultData;

  const riskColor = riskLevel === 'high' ? '#f43f5e' : riskLevel === 'medium' ? '#f59e0b' : '#22d3ee';
  const glowClass =
    riskLevel === 'high' ? 'via-rose-500/30' : riskLevel === 'medium' ? 'via-amber-500/30' : 'via-cyan-500/30';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass-card relative flex flex-col overflow-hidden rounded-2xl p-6 h-72 md:h-80"
    >
      {/* Top glow accent */}
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${glowClass} to-transparent`} />

      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">RISK ENGINE</div>
          <div className="font-heading text-sm font-semibold text-slate-100">Runway vs. risk over time</div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-slate-900/60 border border-slate-700/30 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.24em] text-slate-400 font-medium">LIVE</span>
        </div>
      </div>

      <div className="relative flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <AreaChart data={data} margin={{ top: 8, right: 12, left: -8, bottom: 8 }}>
            <defs>
              <linearGradient id="runwayGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={riskColor} stopOpacity={0.35} />
                <stop offset="50%" stopColor={riskColor} stopOpacity={0.1} />
                <stop offset="100%" stopColor={riskColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148,163,184,0.08)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickLine={false}
              tickMargin={8}
              height={28}
              axisLine={false}
            />
            <YAxis
              width={36}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tickFormatter={(v: unknown) => `${v}m`}
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
              formatter={(value: unknown, name: unknown) => [
                name === 'runway' ? `${Number(value)} months` : `${(Number(value) * 100).toFixed(0)}%`,
                name === 'runway' ? 'Runway' : 'Risk',
              ]}
              labelStyle={{ color: '#e2e8f0', fontSize: 11, fontWeight: 600, marginBottom: 4 }}
              cursor={{ stroke: `${riskColor}33`, strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area
              type="monotone"
              dataKey="runway"
              stroke={riskColor}
              strokeWidth={2.5}
              fill="url(#runwayGradient)"
              animationDuration={1200}
              animationEasing="ease-in-out"
              dot={false}
              activeDot={{
                r: 5,
                fill: riskColor,
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
