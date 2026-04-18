'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import { useUIStore } from '@/lib/store';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/revenue-forecast': 'Revenue Forecast',
  '/churn-prediction': 'Churn Prediction',
  '/ai-advisor': 'AI Advisor',
  '/settings': 'Settings',
};

const pageGlows: Record<string, string> = {
  '/dashboard': 'page-glow-purple',
  '/revenue-forecast': 'page-glow-purple',
  '/churn-prediction': 'page-glow-cyan',
  '/ai-advisor': 'page-glow-indigo',
  '/settings': 'page-glow-purple',
};

const pageSubtitles: Record<string, string> = {
  '/dashboard': 'Real-time overview of your SaaS metrics',
  '/revenue-forecast': 'ML-powered revenue projections',
  '/churn-prediction': 'Predict and prevent customer churn',
  '/ai-advisor': 'AI-driven strategic intelligence',
  '/settings': 'Manage your account preferences',
};

function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 300 + i * 120,
            height: 300 + i * 120,
            left: `${15 + i * 25}%`,
            top: `${-5 + i * 10}%`,
            background: `radial-gradient(circle, rgba(168,85,247,${0.03 - i * 0.005}) 0%, transparent 70%)`,
          }}
          animate={{ y: [0, -15, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{
            duration: 8 + i * 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.2,
          }}
        />
      ))}
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { toggleSidebar } = useUIStore();
  const title = pageTitles[pathname] || 'Dashboard';
  const subtitle = pageSubtitles[pathname] || 'STRAT_IQ Intelligence Layer';
  const glowClass = pageGlows[pathname] || 'page-glow-purple';

  return (
    <div className="min-h-screen bg-strat-bg">
      {/* Ambient page glow */}
      <div className={`pointer-events-none fixed inset-0 ${glowClass} z-0`} />
      <FloatingOrbs />

      <Sidebar />

      {/* Main area */}
      <div className="relative z-10 lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-800/40 bg-strat-bg/60 backdrop-blur-2xl px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="rounded-lg p-2 text-slate-400 transition-premium hover:bg-slate-800/50 hover:text-white lg:hidden"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="font-heading text-lg font-semibold text-slate-100">{title}</h1>
              <p className="text-[11px] text-slate-500">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              System Online
            </span>
          </div>
        </header>

        {/* Page content with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="p-4 md:p-6 lg:p-8"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
