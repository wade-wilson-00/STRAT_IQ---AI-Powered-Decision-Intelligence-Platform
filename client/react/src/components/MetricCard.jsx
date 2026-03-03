import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const formatNumber = (value, prefix = "", suffix = "") => {
  if (value == null) return "—";
  const formatted =
    value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toFixed(0);
  return `${prefix}${formatted}${suffix}`;
};

const MetricCard = ({
  label,
  value,
  prefix = "",
  suffix = "",
  trendLabel,
  trendDelta,
  tone = "neutral",
  delay = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (value == null || Number.isNaN(value)) return;

    let frame;
    const duration = 800;
    const start = performance.now();

    const animate = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayValue(value * eased);
      if (t < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  const trendColor =
    tone === "good"
      ? "text-emerald-400"
      : tone === "bad"
      ? "text-rose-400"
      : "text-slate-400";

  const trendBg =
    tone === "good"
      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/40"
      : tone === "bad"
      ? "bg-rose-500/10 text-rose-300 border-rose-500/40"
      : "bg-slate-900/80 text-slate-300 border-slate-700/80";

  const formattedTrend =
    trendDelta == null || Number.isNaN(trendDelta)
      ? "—"
      : `${trendDelta > 0 ? "+" : ""}${trendDelta.toFixed(1)}%`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.45, ease: "easeOut" }}
      className="card-elevated relative h-full overflow-hidden rounded-2xl bg-strat-card/80 p-4"
    >
      <div className="pointer-events-none absolute inset-0 bg-panel-glow opacity-40" />
      <div className="relative">
        <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">
          {label}
        </div>
        <div className="mt-4 flex items-end justify-between gap-4">
          <div className="flex flex-col">
            <div className="text-4xl font-semibold tracking-tight text-slate-50 md:text-5xl">
              {formatNumber(displayValue, prefix, suffix)}
            </div>
            {trendLabel && (
              <span className="mt-1 text-[11px] text-slate-500">
                {trendLabel}
              </span>
            )}
          </div>
          <div
            className={`inline-flex flex-col items-end justify-center rounded-xl border px-3 py-1.5 text-right text-[11px] ${trendBg}`}
          >
            <span className={`font-semibold ${trendColor}`}>
              {formattedTrend}
            </span>
            <span className="text-[10px] uppercase tracking-[0.24em] text-slate-400">
              NEXT 30 DAYS
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;

