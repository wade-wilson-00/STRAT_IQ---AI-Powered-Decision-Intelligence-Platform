'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
import { createClient } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

const iconMap = { LayoutDashboard, TrendingUp, UserMinus, Brain, Settings } as const;

const links = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' as const },
  { label: 'Revenue Forecast', href: '/revenue-forecast', icon: 'TrendingUp' as const },
  { label: 'Churn Prediction', href: '/churn-prediction', icon: 'UserMinus' as const },
  { label: 'AI Advisor', href: '/ai-advisor', icon: 'Brain' as const },
  { label: 'Settings', href: '/settings', icon: 'Settings' as const },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
  const fullName = (user?.user_metadata?.full_name as string) || user?.email?.split('@')[0] || 'User';
  const email = user?.email || '';
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <>
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

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 flex h-screen w-64 flex-col transition-transform duration-300 lg:translate-x-0 lg:z-30',
          'bg-strat-panel/80 backdrop-blur-xl border-r border-slate-800/30',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-500/[0.03] via-transparent to-transparent" />

        {/* Header */}
        <div className="relative flex items-center justify-between px-5 py-5 border-b border-slate-800/30">
          <Link href="/dashboard"><Logo compact /></Link>
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
                  isActive ? 'text-white' : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200',
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-bg"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/15 to-indigo-500/10 border border-purple-500/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-accent"
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-gradient-to-b from-purple-400 to-indigo-400"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <Icon className={cn('relative z-10 h-[18px] w-[18px] flex-shrink-0 transition-colors', isActive ? 'text-purple-400' : 'group-hover:text-slate-300')} />
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer — User info + Sign out */}
        <div className="relative border-t border-slate-800/30 px-3 py-4 space-y-2">
          {user && (
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-800/40 border border-slate-700/30">
              <div className="relative flex-shrink-0">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={fullName}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-purple-500/40 ring-offset-2 ring-offset-slate-900"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-sm font-bold text-white ring-2 ring-purple-500/40 ring-offset-2 ring-offset-slate-900">
                    {initials}
                  </div>
                )}
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-100 truncate">{fullName}</p>
                <p className="text-[11px] text-slate-400 truncate">{email}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition-all duration-200 hover:bg-rose-500/10 hover:text-rose-400"
          >
            <LogOut className="h-[18px] w-[18px]" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
