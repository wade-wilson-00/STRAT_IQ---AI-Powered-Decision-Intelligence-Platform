import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { BarChart2, Brain, LineChart, Settings, Shield, Sparkles } from "lucide-react";
import Logo from "./Logo.jsx";

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-strat-bg text-slate-100">
      <aside className="hidden w-60 flex-col border-r border-slate-800/80 bg-slate-950/80 px-4 py-5 backdrop-blur-xl lg:flex">
        <div className="mb-6 px-1">
          <Logo />
        </div>
        <nav className="flex-1 space-y-1 text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
          <SidebarItem icon={LineChart} label="Overview" to="/dashboard" active={location.pathname === "/dashboard"} />
          <SidebarItem icon={BarChart2} label="Revenue forecasting" to="/revenue" active={location.pathname === "/revenue"} />
          <SidebarItem icon={Brain} label="Churn prediction" to="/churn" active={location.pathname === "/churn"} />
          <SidebarItem icon={Sparkles} label="AI Advisor" to="/advisor" active={location.pathname === "/advisor"} />
          <SidebarItem icon={Shield} label="Risk" />
          <SidebarItem icon={Settings} label="Settings" />
        </nav>
        <div className="mt-auto rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-[11px] text-slate-400">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-500">
            WORKSPACE STATUS
          </div>
          <div className="flex items-center justify-between">
            <span>Seed · 18 mo runway</span>
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <motion.header
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-slate-500">
                  STRATEGIC DASHBOARD
                </div>
                <div className="text-sm font-semibold text-slate-100">
                  Founder Workspace
                </div>
              </div>
              <div className="hidden items-center gap-3 text-xs text-slate-400 sm:flex">
                <span className="rounded-full bg-slate-900/80 px-3 py-1 text-[11px] uppercase tracking-[0.22em]">
                  Live data · Mock API
                </span>
              </div>
            </div>
            {/* Mobile/tablet nav - visible when sidebar is hidden */}
            <nav className="flex flex-wrap gap-2 lg:hidden">
              <Link
                to="/dashboard"
                className={`rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider transition ${
                  location.pathname === "/dashboard"
                    ? "bg-violet-500/20 text-violet-300"
                    : "bg-slate-900/80 text-slate-400 hover:text-slate-200"
                }`}
              >
                Overview
              </Link>
              <Link
                to="/revenue"
                className={`rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider transition ${
                  location.pathname === "/revenue"
                    ? "bg-violet-500/20 text-violet-300"
                    : "bg-slate-900/80 text-slate-400 hover:text-slate-200"
                }`}
              >
                Revenue
              </Link>
              <Link
                to="/churn"
                className={`rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider transition ${
                  location.pathname === "/churn"
                    ? "bg-violet-500/20 text-violet-300"
                    : "bg-slate-900/80 text-slate-400 hover:text-slate-200"
                }`}
              >
                Churn
              </Link>
              <Link
                to="/advisor"
                className={`rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider transition ${
                  location.pathname === "/advisor"
                    ? "bg-violet-500/20 text-violet-300"
                    : "bg-slate-900/80 text-slate-400 hover:text-slate-200"
                }`}
              >
                AI Advisor
              </Link>
            </nav>
          </div>
        </motion.header>

        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-5 md:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, active, to }) => {
  const content = (
    <>
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </>
  );

  const baseClass = `flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left transition ${
    active
      ? "bg-slate-900/90 text-slate-100 shadow-glow-purple"
      : "text-slate-500 hover:bg-slate-900/60 hover:text-slate-100"
  }`;

  if (to) {
    return (
      <Link to={to} className={baseClass}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseClass} disabled>
      {content}
    </button>
  );
};

export default DashboardLayout;

