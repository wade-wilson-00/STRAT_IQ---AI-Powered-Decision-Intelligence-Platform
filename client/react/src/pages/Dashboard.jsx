import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout.jsx";
import MetricCard from "../components/MetricCard.jsx";
import ForecastChart from "../components/ForecastChart.jsx";
import RiskPanel from "../components/RiskPanel.jsx";
import { getForecast, getChurnRisk } from "../services/api.js";

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [risk, setRisk] = useState({ level: "medium", summary: "" });

  useEffect(() => {
    const load = async () => {
      const [forecastData, churnRisk] = await Promise.all([
        getForecast(),
        getChurnRisk(),
      ]);
      setMetrics(forecastData.metrics);
      setForecast(forecastData.series);
      setRisk(churnRisk);
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
        <section className="grid gap-5 md:grid-cols-3">
          <MetricCard
            label="Current MRR"
            value={metrics?.currentMRR}
            prefix="$"
            trendDelta={metrics?.mrrGrowth}
            trendLabel="Last 30 days"
            tone="good"
            delay={0.05}
          />
          <MetricCard
            label="Predicted MRR"
            value={metrics?.predictedMRR}
            prefix="$"
            trendDelta={metrics?.predictedGrowth}
            trendLabel="Next 30 days"
            tone="good"
            delay={0.1}
          />
          <MetricCard
            label="Churn & Burn"
            value={
              metrics
                ? metrics.churnRate * 10 + metrics.burnMultiple * 1000
                : 0
            }
            suffix=""
            trendDelta={metrics?.churnRate}
            trendLabel="Churn · Burn multiple"
            tone="bad"
            delay={0.15}
          />
        </section>

        <section className="grid gap-5 lg:grid-cols-[2.1fr,1.2fr]">
          <ForecastChart data={forecast} />
          <RiskPanel riskLevel={risk.level} summary={risk.summary} />
        </section>

        <section className="mt-4 grid gap-4 md:grid-cols-2">
          <NavCard
            to="/revenue"
            title="Revenue forecasting"
            description="Feed in your current metrics to generate a forward-looking MRR curve."
          />
          <NavCard
            to="/churn"
            title="Churn prediction"
            description="Estimate churn probability using engagement, support, and cohort signals."
          />
        </section>
      </motion.div>
    </DashboardLayout>
  );
};

const NavCard = ({ to, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Link
        to={to}
        className="card-elevated relative flex h-full flex-col overflow-hidden rounded-2xl bg-strat-card/80 p-5 transition hover:-translate-y-1.5 hover:shadow-glow-purple"
      >
        <div className="pointer-events-none absolute inset-0 bg-panel-glow opacity-40" />
        <div className="relative">
          <h3 className="text-lg font-semibold text-slate-50 md:text-xl">
            {title}
          </h3>
          <p className="mt-2 text-sm text-slate-400 md:text-base">
            {description}
          </p>
          <span className="mt-auto block pt-3 text-xs font-medium uppercase tracking-[0.26em] text-violet-300">
            Open workspace
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default Dashboard;

