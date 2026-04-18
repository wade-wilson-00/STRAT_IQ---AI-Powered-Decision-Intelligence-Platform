'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, UserMinus, Brain, DollarSign, Users, Activity, ArrowRight } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import RiskPanel from '@/components/dashboard/RiskPanel';
import ForecastChart from '@/components/charts/ForecastChart';
import ChurnRateChart from '@/components/charts/ChurnRateChart';
import RiskEngineChart from '@/components/charts/RiskEngineChart';
import { postForecast, postChurn } from '@/lib/api';
import type { ForecastResult, ChurnResult } from '@/lib/api';

export default function DashboardPage() {
  const [forecast, setForecast] = useState<ForecastResult | null>(null);
  const [churn, setChurn] = useState<ChurnResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [fRes, cRes] = await Promise.all([
          postForecast({
            current_mrr: 48000,
            mrr_growth_rate: 8,
            churn_rate: 4.5,
            expansion_rate: 3,
            months: 6,
          }),
          postChurn({
            nps_score: 7,
            login_frequency: 5,
            support_tickets: 2,
            usage_hours: 6,
            contract_length: 12,
            monthly_spend: 450,
          }),
        ]);
        setForecast(fRes);
        setChurn(cRes);
      } finally {
        setLoading(false);
      }
    }
    loadData();
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Metric cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            title="Monthly Revenue"
            value={forecast?.predicted_mrr ?? 48000}
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
            title="Net Revenue Retention"
            value={forecast?.metrics.net_revenue_retention ?? 106}
            suffix="%"
            trend={2.4}
            icon={<Activity className="h-4 w-4" />}
            delay={0.2}
          />
        </div>

        {/* Charts row 1 */}
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ForecastChart data={forecast?.time_series ?? []} />
          </div>
          <div className="lg:col-span-2">
            <RiskPanel
              level={churn?.level ?? 'medium'}
              summary={churn?.summary ?? 'Analyzing risk factors...'}
            />
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid gap-6 md:grid-cols-2">
          <ChurnRateChart probability={churn?.probability} level={churn?.level} />
          <RiskEngineChart riskLevel={churn?.level ?? 'medium'} />
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
