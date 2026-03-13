import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../components/DashboardLayout.jsx";
import ExplanationPanel from "../components/ai/ExplanationPanel.jsx";
import StrategyAdvisor from "../components/ai/StrategyAdvisor.jsx";
import AutonomousAdvisor from "../components/ai/AutonomousAdvisor.jsx";
import { getForecast, getChurnRisk } from "../services/api.js";

const Advisor = () => {
  const [metrics, setMetrics] = useState(null);
  const [ragQuery, setRagQuery] = useState("churn retention benchmarks");
  const [ragTrigger, setRagTrigger] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const [forecast, churn] = await Promise.all([
          getForecast(),
          getChurnRisk(),
        ]);
        setMetrics({
          ...forecast.metrics,
          churnProbability: churn.probability,
          churnLevel: churn.level,
        });
      } catch {
        setMetrics({});
      }
    };
    load();
  }, []);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="space-y-6"
      >
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
            Your Personalized AI Advisor
          </h1>
          <p className="max-w-2xl text-base text-slate-400">
            RAG-powered insights, strategy recommendations, and an autonomous
            advisor that chains forecast, churn, and risk tools.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-200">
              Autonomous Advisor
            </h2>
            <AutonomousAdvisor />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-200">
              RAG Insights
            </h2>
            <div className="space-y-2">
              <input
                type="text"
                value={ragQuery}
                onChange={(e) => setRagQuery(e.target.value)}
                placeholder="Query knowledge base..."
                className="w-full rounded-xl border border-slate-800/80 bg-slate-950/60 px-4 py-2.5 text-base text-slate-100 placeholder-slate-500 focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30"
              />
              <button
                onClick={() => setRagTrigger((t) => t + 1)}
                className="rounded-full bg-slate-800 px-5 py-2.5 text-base text-slate-200 hover:bg-slate-700"
              >
                Fetch insights
              </button>
            </div>
            <ExplanationPanel
              query={ragQuery}
              trigger={ragTrigger}
              context={{ metrics }}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-200">
            Strategic Advisor
          </h2>
          <StrategyAdvisor metrics={metrics || {}} />
        </section>
      </motion.div>
    </DashboardLayout>
  );
};

export default Advisor;
