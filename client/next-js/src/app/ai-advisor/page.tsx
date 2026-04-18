'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Send,
  Loader2,
  Wrench,
  Sparkles,
  Search,
  BarChart3,
  MessageCircle,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AIInsightPanel from '@/components/common/AIInsightPanel';
import { useAdvisorMutation, useRAGQuery, useStrategyQuery } from '@/lib/queries';
import type { AdvisorAnswer } from '@/lib/api';
import { cn } from '@/lib/utils';

/* ── Typing indicator ── */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-purple-400"
          animate={{ y: [0, -4, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

/* ── Circular progress ── */
function ConfidenceCircle({ value }: { value: number }) {
  const r = 18;
  const circumference = 2 * Math.PI * r;
  const filled = (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(51,65,85,0.3)" strokeWidth="3" />
        <motion.circle
          cx="24"
          cy="24"
          r={r}
          fill="none"
          stroke="#a855f7"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - filled }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '24px 24px', filter: 'drop-shadow(0 0 4px rgba(168,85,247,0.4))' }}
        />
      </svg>
      <span className="absolute font-display text-xs font-bold text-slate-200">{value}%</span>
    </div>
  );
}

export default function AIAdvisorPage() {
  // ─── Autonomous Advisor ───
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<AdvisorAnswer | null>(null);
  const advisorMutation = useAdvisorMutation();

  const handleAsk = async () => {
    if (!question.trim()) return;
    try {
      const res = await advisorMutation.mutateAsync(question);
      setAnswer(res);
    } catch {
      toast.error('Advisor failed');
    }
  };

  // ─── RAG Insights ───
  const [ragQuery, setRagQuery] = useState('');
  const [ragSearchTerm, setRagSearchTerm] = useState('');
  const ragResult = useRAGQuery(ragSearchTerm);

  // ─── Strategy ───
  const strategyResult = useStrategyQuery({ churn_rate: 4.5, nrr: 106, growth_rate: 8 });

  const priorityConfig = {
    high: { color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', accent: 'border-l-rose-500/50' },
    medium: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', accent: 'border-l-amber-500/50' },
    low: { color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20', accent: 'border-l-slate-500/50' },
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Top row: Advisor + RAG side-by-side */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Autonomous Advisor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card relative rounded-2xl p-6"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20">
                <Brain className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h2 className="font-heading text-base font-semibold text-slate-100">Autonomous Advisor</h2>
                <p className="text-xs text-slate-400">Ask anything about your business strategy</p>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <div className="flex-1 input-glow rounded-lg transition-all duration-200">
                <Input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. How can we reduce churn by 20%?"
                  className="border-slate-700/40 bg-slate-900/40 text-slate-100 placeholder:text-slate-600"
                  onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                />
              </div>
              <Button
                onClick={handleAsk}
                disabled={advisorMutation.isPending || !question.trim()}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all"
              >
                {advisorMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Typing indicator */}
            <AnimatePresence>
              {advisorMutation.isPending && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <TypingIndicator />
                </motion.div>
              )}
            </AnimatePresence>

            {answer && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-4">
                {/* Answer bubble */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-xl bg-slate-900/50 border border-slate-800/30 p-4"
                >
                  <div className="mb-2 flex items-center gap-1.5">
                    <MessageCircle className="h-3 w-3 text-purple-400" />
                    <span className="text-[10px] font-medium uppercase tracking-widest text-purple-400">Advisor Response</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">{answer.answer}</p>
                </motion.div>

                {/* Tools used */}
                <div className="flex flex-wrap gap-2">
                  {answer.tools_used.map((tool, i) => (
                    <motion.span
                      key={tool}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-700/40 bg-slate-800/30 px-2.5 py-1 text-[11px] text-slate-400 transition-colors hover:bg-slate-800/50 hover:text-slate-300"
                    >
                      <Wrench className="h-3 w-3" /> {tool}
                    </motion.span>
                  ))}
                </div>

                {/* Follow-ups */}
                <div className="space-y-2">
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
                    Follow-up questions
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {answer.follow_up_questions.map((fq, i) => (
                      <motion.button
                        key={fq}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        onClick={() => setQuestion(fq)}
                        className="group rounded-lg border border-slate-800/30 bg-slate-900/30 px-3 py-2 text-left text-xs text-slate-400 transition-all duration-200 hover:bg-slate-800/50 hover:text-slate-200 hover:border-purple-500/20"
                      >
                        <span className="mr-1.5 text-purple-500/50 group-hover:text-purple-400 transition-colors">→</span>
                        {fq}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* RAG Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card relative rounded-2xl p-6"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <Search className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="font-heading text-base font-semibold text-slate-100">Knowledge Base</h2>
                <p className="text-xs text-slate-400">RAG-powered insights from your data</p>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <div className="flex-1 input-glow-cyan rounded-lg transition-all duration-200">
                <Input
                  value={ragQuery}
                  onChange={(e) => setRagQuery(e.target.value)}
                  placeholder="Search knowledge base..."
                  className="border-slate-700/40 bg-slate-900/40 text-slate-100 placeholder:text-slate-600"
                  onKeyDown={(e) => e.key === 'Enter' && setRagSearchTerm(ragQuery)}
                />
              </div>
              <Button
                onClick={() => setRagSearchTerm(ragQuery)}
                disabled={ragResult.isFetching || !ragQuery.trim()}
                variant="outline"
                className="border-slate-700/40 text-slate-300 hover:bg-slate-800/50 transition-all"
              >
                {ragResult.isFetching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>

            {ragResult.data && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {ragResult.data.insights.map((insight, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-xl bg-slate-900/40 border border-slate-800/30 p-3.5"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[10px] font-medium text-cyan-400">
                        Relevance: {(insight.relevance * 100).toFixed(0)}%
                      </span>
                      {/* Mini relevance bar */}
                      <div className="h-1 w-16 rounded-full bg-slate-800/60 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                          style={{ width: `${insight.relevance * 100}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-300">{insight.text}</p>
                  </motion.div>
                ))}

                <div className="space-y-2">
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">Sources</span>
                  <div className="flex flex-wrap gap-2">
                    {ragResult.data.sources.map((s) => (
                      <span
                        key={s.name}
                        className="inline-flex items-center gap-1 rounded-full border border-slate-700/40 bg-slate-800/30 px-2.5 py-1 text-[11px] text-slate-400 card-hover-lift cursor-default"
                      >
                        {s.name} · {s.type}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Bottom: Strategy Advisor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card relative rounded-2xl p-6"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <BarChart3 className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <h2 className="font-heading text-base font-semibold text-slate-100">Strategic Advisor</h2>
                <p className="text-xs text-slate-400">
                  Actionable recommendations based on your current metrics
                </p>
              </div>
            </div>

            {/* Confidence circle */}
            {strategyResult.data && (
              <ConfidenceCircle value={Math.round(strategyResult.data.confidence * 100)} />
            )}
          </div>

          {strategyResult.data ? (
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                {strategyResult.data.recommendations.map((rec, i) => {
                  const cfg = priorityConfig[rec.priority];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className={cn(
                        'rounded-xl border bg-slate-900/30 p-4 border-l-2 transition-all duration-200 hover:bg-slate-900/50',
                        cfg.border,
                        cfg.accent
                      )}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <Zap className={cn('h-3 w-3', cfg.color)} />
                        <span
                          className={cn(`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase`, cfg.bg, cfg.border, cfg.color)}
                        >
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-300">{rec.text}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : strategyResult.isLoading ? (
            <div className="flex items-center justify-center py-8 gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
              <span className="text-sm text-slate-500">Loading strategic recommendations...</span>
            </div>
          ) : null}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
