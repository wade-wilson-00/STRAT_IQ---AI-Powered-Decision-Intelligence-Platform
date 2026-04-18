'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  TrendingUp,
  UserMinus,
  Brain,
  Settings,
  X,
  LogOut,
} from 'lucide-react';
import Logo from '@/components/common/Logo';
import { useUIStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const iconMap = {
  LayoutDashboard,
  TrendingUp,
  UserMinus,
  Brain,
  Settings,
} as const;

const links = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' as const },
  { label: 'Revenue Forecast', href: '/revenue-forecast', icon: 'TrendingUp' as const },
  { label: 'Churn Prediction', href: '/churn-prediction', icon: 'UserMinus' as const },
  { label: 'AI Advisor', href: '/ai-advisor', icon: 'Brain' as const },
  { label: 'Settings', href: '/settings', icon: 'Settings' as const },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 flex h-screen w-64 flex-col transition-transform duration-300 lg:translate-x-0 lg:z-30',
          'bg-strat-panel/80 backdrop-blur-xl border-r border-slate-800/30',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Sidebar ambient glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-500/[0.03] via-transparent to-transparent" />

        {/* Header */}
        <div className="relative flex items-center justify-between px-5 py-5 border-b border-slate-800/30">
          <Link href="/dashboard">
            <Logo compact />
          </Link>
          <button
            className="rounded-lg p-1.5 text-slate-400 hover:text-white transition-premium lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="relative flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {links.map((link) => {
            const Icon = iconMap[link.icon];
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200',
                )}
              >
                {/* Active background with glow */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-bg"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/15 to-indigo-500/10 border border-purple-500/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                {/* Active left accent */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-accent"
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-gradient-to-b from-purple-400 to-indigo-400"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <Icon className={cn(
                  'relative z-10 h-[18px] w-[18px] flex-shrink-0 transition-colors',
                  isActive ? 'text-purple-400' : 'group-hover:text-slate-300'
                )} />
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="relative border-t border-slate-800/30 px-3 py-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition-all duration-200 hover:bg-slate-800/40 hover:text-slate-300"
          >
            <LogOut className="h-[18px] w-[18px]" />
            <span>Log out</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
