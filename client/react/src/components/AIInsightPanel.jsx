import { motion } from "framer-motion";

const toneStyles = {
  neutral: {
    badge: "bg-slate-900/80 text-slate-200 border-slate-600/80",
    accent: "text-slate-100",
  },
  positive: {
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/50",
    accent: "text-emerald-300",
  },
  negative: {
    badge: "bg-rose-500/10 text-rose-300 border-rose-500/50",
    accent: "text-rose-300",
  },
};

const AIInsightPanel = ({ title, message, tone = "neutral" }) => {
  const styles = toneStyles[tone] ?? toneStyles.neutral;

  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="glass-panel relative mt-6 overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6 sm:p-7"
    >
      <div className="pointer-events-none absolute inset-0 bg-panel-glow opacity-70" />
      <div className="relative space-y-3">
        <div
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] ${styles.badge}`}
        >
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-current" />
          AI Insight
        </div>
        <div className="space-y-1">
          {title && (
            <h3 className="text-lg font-semibold text-slate-50 md:text-xl">
              {title}
            </h3>
          )}
          <p className={`text-base leading-relaxed md:text-lg ${styles.accent}`}>
            {message}
          </p>
        </div>
        <p className="text-xs text-slate-400 md:text-sm">
          Generated from your latest inputs — ready to share with investors or
          your leadership team.
        </p>
      </div>
    </motion.div>
  );
};

export default AIInsightPanel;

