'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  TrendingUp,
  Shield,
  Brain,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { buttonVariants } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const previewData = [
  { month: 'Jan', revenue: 42000 },
  { month: 'Feb', revenue: 45000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 52000 },
  { month: 'May', revenue: 58000 },
  { month: 'Jun', revenue: 63000 },
];

const features = [
  {
    icon: TrendingUp,
    title: 'Revenue Forecasting',
    desc: 'ML-powered projections that adapt to your business metrics in real-time.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Shield,
    title: 'Churn Prediction',
    desc: 'Identify at-risk customers before they leave with predictive analytics.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    icon: Brain,
    title: 'AI Strategy Advisor',
    desc: 'Get actionable recommendations powered by multi-source intelligence.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
  },
];

const steps = [
  { num: '01', title: 'Connect Your Data', desc: 'Plug in your SaaS metrics — MRR, churn, engagement signals.' },
  { num: '02', title: 'AI Analyzes Patterns', desc: 'Our models identify trends, risks, and growth opportunities.' },
  { num: '03', title: 'Get Strategic Insights', desc: 'Receive prioritized recommendations to drive decisions.' },
];

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-500/10"
          style={{
            width: 200 + i * 80,
            height: 200 + i * 80,
            left: `${10 + i * 15}%`,
            top: `${5 + i * 12}%`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-strat-bg">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <FloatingParticles />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.12)_0%,transparent_70%)]" />

        <div className="relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                <span className="text-xs font-medium text-purple-300">AI-Powered Intelligence</span>
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-slate-50 md:text-5xl lg:text-6xl">
                Strategic decisions,{' '}
                <span className="gradient-text">powered by AI</span>
              </h1>
              <p className="mb-8 max-w-lg text-lg leading-relaxed text-slate-400">
                Predict churn, forecast revenue, and get actionable strategic advice — all in one
                intelligence layer for finance teams.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/signup"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow-purple hover:from-purple-500 hover:to-indigo-500'
                  )}
                >
                  Start Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/dashboard"
                  className={cn(
                    buttonVariants({ size: 'lg', variant: 'outline' }),
                    'border-slate-700 text-slate-300 hover:bg-slate-800'
                  )}
                >
                  View Demo
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="card-elevated rounded-2xl border border-slate-800/40 bg-strat-card/80 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-100">Revenue Forecast</div>
                  <div className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-400">
                    +18.2% ↑
                  </div>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={previewData}>
                      <defs>
                        <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a855f7" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="rgba(148,163,184,0.15)" strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} axisLine={false} />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0b0d12', borderRadius: 12, border: '1px solid rgba(51,65,85,0.8)' }}
                        formatter={(v: unknown) => [`$${Number(v).toLocaleString()}`, 'Revenue']}
                        labelStyle={{ color: '#e2e8f0', fontSize: 11 }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={2} fill="url(#heroGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex gap-3">
                  {[
                    { label: 'MRR', value: '$63K' },
                    { label: 'NRR', value: '118%' },
                    { label: 'Churn', value: '3.2%' },
                  ].map((m) => (
                    <div key={m.label} className="flex-1 rounded-xl bg-slate-900/60 px-3 py-2 text-center">
                      <div className="text-[10px] text-slate-500">{m.label}</div>
                      <div className="text-sm font-semibold text-slate-200">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-slate-50 md:text-4xl">Intelligence at every layer</h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              From predictive analytics to autonomous strategy, STRAT_IQ gives your team the edge.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group card-elevated rounded-2xl border border-slate-800/40 bg-strat-card/60 p-6 transition-all hover:border-slate-700/60 hover:bg-strat-card/80"
              >
                <div className={`mb-4 inline-flex rounded-xl p-3 ${f.bg}`}>
                  <f.icon className={`h-6 w-6 ${f.color}`} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-100">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative py-20 md:py-28 border-t border-slate-800/40">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-slate-50 md:text-4xl">How it works</h2>
            <p className="mx-auto max-w-2xl text-slate-400">Three steps to smarter decisions.</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative rounded-2xl border border-slate-800/40 bg-strat-card/40 p-6"
              >
                <span className="mb-3 block text-3xl font-bold gradient-text">{s.num}</span>
                <h3 className="mb-2 text-lg font-semibold text-slate-100">{s.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Insight */}
      <section id="ai-insights" className="relative py-20 md:py-28 border-t border-slate-800/40">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5">
              <Brain className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-xs font-medium text-cyan-300">AI-Powered</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-slate-50 md:text-4xl">
              Your autonomous strategy advisor
            </h2>
            <p className="mb-8 text-slate-400">
              Ask questions in plain language. Get data-driven answers from multiple intelligence sources.
            </p>
            <Link
              href="/ai-advisor"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-glow-cyan hover:from-cyan-400 hover:to-indigo-500'
              )}
            >
              Try AI Advisor <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-28 border-t border-slate-800/40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-slate-50 md:text-4xl">
              Ready to make smarter decisions?
            </h2>
            <p className="mb-8 text-lg text-slate-400">
              Join strategic finance teams using AI to forecast, predict, and advise.
            </p>
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow-purple hover:from-purple-500 hover:to-indigo-500'
              )}
            >
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
