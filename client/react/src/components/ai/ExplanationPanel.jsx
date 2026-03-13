import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";
import { fetchRAGInsights } from "../../services/api.js";

/**
 * ExplanationPanel - RAG Integration
 * Shows insights from knowledge base with source citations.
 * Grounded in startup data.
 */
const ExplanationPanel = ({ query, context = {}, trigger = 0 }) => {
  const [insights, setInsights] = useState([]);
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || trigger === 0) return;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchRAGInsights(query, context);
        setInsights(res.insights || []);
        setSources(res.sources || []);
      } catch (err) {
        setError(err.message);
        setInsights([]);
        setSources([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [query, trigger, JSON.stringify(context)]);

  const loadInsights = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchRAGInsights(query, context);
      setInsights(res.insights || []);
      setSources(res.sources || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && insights.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-panel relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6"
      >
        <div className="flex items-center gap-2 text-slate-400">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-violet-500/30 border-t-violet-400" />
          Retrieving insights from knowledge base...
        </div>
      </motion.div>
    );
  }

  if (error && insights.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-panel relative overflow-hidden rounded-3xl border border-rose-500/30 bg-slate-950/80 p-6"
      >
        <p className="text-rose-400">{error}</p>
        {query && (
          <button
            onClick={loadInsights}
            className="mt-4 rounded-full bg-slate-800 px-4 py-2.5 text-base text-slate-200 hover:bg-slate-700"
          >
            Retry
          </button>
        )}
      </motion.div>
    );
  }

  if (insights.length === 0 && !query) {
    return null;
  }

  if (insights.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-panel relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6"
      >
        <p className="text-slate-400">No insights found for this context.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="glass-panel relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-panel-glow opacity-70" />
      <div className="relative space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">
          <BookOpen className="h-3.5 w-3.5" />
          RAG · Knowledge Base
        </div>
        <div className="space-y-3">
          {insights.map((insight, i) => (
            <p key={i} className="text-base leading-relaxed text-slate-200">
              {insight}
            </p>
          ))}
        </div>
        {sources.length > 0 && (
          <div className="border-t border-slate-800/80 pt-4">
            <div className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500 mb-2">
              Sources
            </div>
            <div className="flex flex-wrap gap-2">
              {sources.map((src, i) => (
                <a
                  key={i}
                  href="#"
                  className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-violet-300 transition"
                >
                  {src.title}
                  <span className="text-slate-500 text-xs">
                    {(src.relevance * 100).toFixed(0)}% match
                  </span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ExplanationPanel;
