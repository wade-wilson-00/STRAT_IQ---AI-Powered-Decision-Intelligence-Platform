import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Wrench, Loader2 } from "lucide-react";
import { askAdvisor } from "../../services/api.js";

/**
 * AutonomousAdvisor - Multi-Tool Orchestration
 * Ask questions in natural language.
 * Agent chains multiple tools, shows which were called.
 * Synthesizes recommendations.
 */
const AutonomousAdvisor = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [toolsUsed, setToolsUsed] = useState([]);
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError(null);
    setAnswer(null);
    setToolsUsed([]);
    setFollowUps([]);

    try {
      const res = await askAdvisor(question.trim());
      setAnswer(res.answer);
      setToolsUsed(res.toolsUsed || []);
      setFollowUps(res.followUps || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
          <Wrench className="h-3.5 w-3.5" />
          Autonomous Advisor · Multi-Tool
        </div>
        <p className="text-base text-slate-400">
          Ask questions in natural language. I&apos;ll chain forecast, churn, and
          risk tools to synthesize recommendations.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. Should I prioritize retention or acquisition?"
            disabled={loading}
            className="flex-1 rounded-xl border border-slate-800/80 bg-slate-950/60 px-4 py-2.5 text-base text-slate-100 placeholder-slate-500 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="rounded-xl bg-gradient-accent px-4 py-2.5 text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </form>

        {error && (
          <p className="text-base text-rose-400">{error}</p>
        )}

        {answer && (
          <div className="space-y-4 rounded-xl border border-slate-800/80 bg-slate-900/40 p-4">
            <p className="text-base leading-relaxed text-slate-200">{answer}</p>
            {toolsUsed.length > 0 && (
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500 mb-2">
                  Tools used
                </div>
                <div className="flex flex-wrap gap-2">
                  {toolsUsed.map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center gap-1 rounded-full bg-slate-800/80 px-3 py-1.5 text-sm text-cyan-300"
                    >
                      <Wrench className="h-3 w-3" />
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {followUps.length > 0 && (
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500 mb-2">
                  Follow-up questions
                </div>
                <div className="flex flex-wrap gap-2">
                  {followUps.map((q, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setQuestion(q)}
                      className="rounded-full bg-slate-800/80 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700 hover:text-violet-300 transition"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AutonomousAdvisor;
