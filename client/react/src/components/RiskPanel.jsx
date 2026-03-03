import { motion } from "framer-motion";

const badgeStyles = {
  low: {
    label: "LOW",
    classes:
      "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.5)]",
  },
  medium: {
    label: "ELEVATED",
    classes:
      "bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-[0_0_14px_rgba(245,158,11,0.5)]",
  },
  high: {
    label: "CRITICAL",
    classes:
      "bg-rose-500/10 border-rose-500/40 text-rose-300 shadow-[0_0_14px_rgba(244,63,94,0.5)]",
  },
};

const RiskPanel = ({ riskLevel, summary }) => {
  const badge = badgeStyles[riskLevel] ?? badgeStyles.medium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="card-elevated relative flex h-full flex-col overflow-hidden rounded-2xl bg-strat-card/80 p-4"
    >
      <div className="pointer-events-none absolute inset-0 bg-panel-glow opacity-40" />
      <div className="relative mb-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">
            RISK ENGINE
          </div>
          <div className="text-sm font-semibold text-slate-100">
            Runway health
          </div>
        </div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.26em] ${badge.classes}`}
        >
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-current" />
          {badge.label}
        </motion.div>
      </div>
      <p className="relative text-xs leading-relaxed text-slate-300">{summary}</p>
      <div className="relative mt-3 flex gap-2 text-[11px] text-slate-400">
        <span className="rounded-full bg-slate-900/80 px-3 py-1">
          Churn & burn scenarios monitored
        </span>
        <span className="hidden rounded-full bg-slate-900/80 px-3 py-1 sm:inline">
          Alerts stream sync-ready via API
        </span>
      </div>
    </motion.div>
  );
};

export default RiskPanel;

