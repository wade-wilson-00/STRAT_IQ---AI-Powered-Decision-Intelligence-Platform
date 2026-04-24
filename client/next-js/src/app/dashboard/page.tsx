'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, UserMinus, Brain, DollarSign, Users, Activity, ArrowRight } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import RiskPanel from '@/components/dashboard/RiskPanel';
import ForecastChart from '@/components/charts/ForecastChart';
import RiskEngineChart from '@/components/charts/RiskEngineChart';
import { usePredictionStore } from '@/lib/store';

export default function DashboardPage() {
  const { latestForecast, latestChurn } = usePredictionStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navCards = [
    {
      title: 'Revenue Forecast',
      desc: 'Predict future MRR with ML models',
      href: '/revenue-forecast',
      icon: TrendingUp,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      borderHover: 'hover:border-purple-500/30',
      glowHover: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]',
    },
    {
      title: 'Churn Prediction',
      desc: 'Identify at-risk customers early',
      href: '/churn-prediction',
      icon: UserMinus,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      borderHover: 'hover:border-cyan-500/30',
      glowHover: 'group-hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]',
    },
    {
      title: 'AI Advisor',
      desc: 'Get strategic advice from AI',
      href: '/ai-advisor',
      icon: Brain,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      borderHover: 'hover:border-indigo-500/30',
      glowHover: 'group-hover:shadow-[0_0_20px_rgba(129,140,248,0.1)]',
    },
  ];

  if (!mounted) return null;

  // Generate synthetic timeseries based on latest forecast or default
  const baseMrr = latestForecast?.predicted_mrr ?? 48000;
  const timeSeries = [
    { month: 'Jan', revenue: baseMrr * 0.8, projected: baseMrr * 0.82 },
    { month: 'Feb', revenue: baseMrr * 0.85, projected: baseMrr * 0.86 },
    { month: 'Mar', revenue: baseMrr * 0.9, projected: baseMrr * 0.91 },
    { month: 'Apr', revenue: baseMrr * 0.95, projected: baseMrr * 0.96 },
    { month: 'May', revenue: baseMrr * 0.98, projected: baseMrr * 0.99 },
    { month: 'Jun', revenue: baseMrr, projected: baseMrr * 1.05 },
  ];

  // Map Churn to standard Risk Levels
  const churnProb = latestChurn?.churn_probability ?? 15;
  const riskLevel = churnProb > 60 ? 'high' : churnProb > 30 ? 'medium' : 'low';
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Metric cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            title="Monthly Revenue"
            value={latestForecast?.predicted_mrr ?? 48000}
            prefix="$"
            trend={8.2}
            icon={<DollarSign className="h-4 w-4" />}
            delay={0}
          />
          <StatsCard
            title="Active Customers"
            value={1247}
            trend={3.1}
            icon={<Users className="h-4 w-4" />}
            delay={0.1}
          />
          <StatsCard
            title="Avg Churn Risk"
            value={churnProb}
            suffix="%"
            trend={-2.4}
            icon={<Activity className="h-4 w-4" />}
            delay={0.2}
          />
        </div>

        {/* Charts row 1 */}
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ForecastChart data={timeSeries} />
          </div>
          <div className="lg:col-span-2">
            <RiskPanel
              level={riskLevel}
              summary={latestChurn?.ai_insight ?? 'Run a churn prediction to get AI-powered risk analysis and retention strategies.'}
            />
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid gap-6 md:grid-cols-2">
          <RiskEngineChart riskLevel={riskLevel} />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="glass-card relative rounded-2xl p-6 flex flex-col justify-center items-center text-center"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
              <Brain className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">Need Strategic Advice?</h3>
            <p className="text-sm text-slate-400 mb-6">
              Ask your personalized AI Advisor about churn reduction, revenue growth, and more based on your data.
            </p>
            <Link
              href="/ai-advisor"
              className="px-6 py-2 rounded-xl bg-indigo-500/20 text-indigo-300 font-medium hover:bg-indigo-500/30 transition-colors border border-indigo-500/30"
            >
              Open AI Advisor
            </Link>
          </motion.div>
        </div>

        {/* Nav cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {navCards.map((card, i) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
            >
              <Link
                href={card.href}
                className={`group block glass-card rounded-2xl p-5 transition-all duration-300 card-hover-lift ${card.borderHover} ${card.glowHover}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`inline-flex rounded-xl p-2.5 ${card.bg} border border-current/10`}>
                    <card.icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-600 transition-all duration-300 group-hover:text-slate-400 group-hover:translate-x-0.5" />
                </div>
                <h3 className="mb-1 font-heading text-sm font-semibold text-slate-100">{card.title}</h3>
                <p className="text-xs text-slate-400">{card.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
