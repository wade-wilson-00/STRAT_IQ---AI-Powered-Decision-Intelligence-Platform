import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import { fetchStrategyAdvice } from "../../services/api.js";

/**
 * StrategyAdvisor - Fine-tuned LLM Integration
 * Domain-specific advice for startup metrics.
 * Actionable recommendations.
 */
const StrategyAdvisor = ({ metrics = {}, context = "" }) => {
  const [advice, setAdvice] = useState([]);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchStrategyAdvice(metrics, { context });
        setAdvice(res.advice || []);
        setConfidence(res.confidence ?? null);
      } catch (err) {
        setError(err.message);
        setAdvice([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [JSON.stringify(metrics), context]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-panel relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6"
      >
        <div className="flex items-center gap-2 text-slate-400">
          <Sparkles className="h-4 w-4 animate-pulse text-violet-400" />
          Generating strategy recommendations...
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-panel relative overflow-hidden rounded-3xl border border-rose-500/30 bg-slate-950/80 p-6"
      >
        <p className="text-rose-400">{error}</p>
      </motion.div>
    );
  }

  if (advice.length === 0) {
    return null;
  }

  const priorityIcon = (p) =>
    p === "high" ? (
      <AlertCircle className="h-4 w-4 text-rose-400" />
    ) : (
      <CheckCircle className="h-4 w-4 text-emerald-400" />
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="glass-panel relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-panel-glow opacity-70" />
      <div className="relative space-y-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            Strategy Advisor
          </div>
          {confidence != null && (
            <span className="text-xs text-slate-500">
              {(confidence * 100).toFixed(0)}% confidence
            </span>
          )}
        </div>
        <div className="space-y-4">
          {advice.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4"
            >
              <div className="flex items-start gap-3">
                {priorityIcon(item.priority)}
                <div>
                  <h4 className="text-base font-semibold text-slate-100">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-base leading-relaxed text-slate-300">
                    {item.recommendation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-500">
          Advice is tailored to your startup metrics and industry benchmarks.
        </p>
      </div>
    </motion.div>
  );
};

export default StrategyAdvisor;
