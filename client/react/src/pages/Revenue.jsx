import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ForecastChart from "../components/ForecastChart.jsx";
import AIInsightPanel from "../components/AIInsightPanel.jsx";
import { postForecast } from "../services/api.js";

const Revenue = () => {
  const [form, setForm] = useState({
    currentMRR: "",
    activeUsers: "",
    churnRate: "",
    burnRate: "",
    cac: "",
    marketingSpend: "",
    revenue1: "",
    revenue2: "",
    revenue3: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [insight, setInsight] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setInsight(null);

    const payload = {
      currentMRR: Number(form.currentMRR) || 0,
      activeUsers: Number(form.activeUsers) || 0,
      churnRate: Number(form.churnRate) || 0,
      burnRate: Number(form.burnRate) || 0,
      cac: Number(form.cac) || 0,
      marketingSpend: Number(form.marketingSpend) || 0,
      previousRevenue: [
        Number(form.revenue1) || 0,
        Number(form.revenue2) || 0,
        Number(form.revenue3) || 0,
      ].filter((v) => v > 0),
    };

    const forecast = await postForecast(payload);
    setResult(forecast);

    const current = forecast.metrics.currentMRR;
    const predicted = forecast.metrics.predictedMRR;
    const delta = predicted - current;
    const growthPct =
      current > 0 ? ((predicted - current) / current) * 100 : 0;

    let message;
    let tone = "neutral";

    if (delta > 0 && growthPct >= 8) {
      message =
        "Revenue growth trajectory looks healthy. Current inputs suggest you can lean into acquisition while monitoring burn.";
      tone = "positive";
    } else if (delta > 0) {
      message =
        "Revenue is projected to grow modestly. Small improvements in churn or CAC could meaningfully compound this curve.";
      tone = "neutral";
    } else {
      message =
        "Revenue growth may slow under the current assumptions. Rising churn or burn could be compressing runway—consider reinforcing retention.";
      tone = "negative";
    }

    setInsight({
      title: "Revenue outlook based on your inputs",
      message,
      tone,
    });

    setLoading(false);
  };

  const disabled = loading;

  return (
    <div className="flex min-h-screen flex-col bg-strat-bg text-slate-100">
      <Navbar />
      <main className="relative flex-1 bg-strat-bg px-4 pb-12 pt-28 md:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 grid-surface opacity-10" />
        <section className="mx-auto flex max-w-6xl flex-col gap-8">
          <header className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl lg:text-5xl">
              Revenue forecasting
            </h1>
            <p className="max-w-2xl text-base text-slate-300 md:text-lg">
              Capture the state of your SaaS today and let Strat_Iq project how
              revenue may evolve over the next few months.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-[1.3fr,1.7fr]">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="glass-panel relative rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6 shadow-xl shadow-black/60"
            >
              <div className="pointer-events-none absolute inset-0 bg-panel-glow opacity-60" />
              <h2 className="text-lg font-semibold text-slate-50 md:text-xl">
                Current metrics
              </h2>
              <div className="relative mt-4 grid gap-4 text-sm md:grid-cols-2 md:text-base">
                <Field
                  label="Current MRR"
                  name="currentMRR"
                  placeholder="e.g. 48000"
                  type="number"
                  value={form.currentMRR}
                  onChange={handleChange}
                  disabled={disabled}
                />
                <Field
                  label="Active users"
                  name="activeUsers"
                  placeholder="e.g. 1200"
                  type="number"
                  value={form.activeUsers}
                  onChange={handleChange}
                  disabled={disabled}
                />
                <Field
                  label="Churn rate (%)"
                  name="churnRate"
                  placeholder="e.g. 4.5"
                  type="number"
                  step="0.1"
                  value={form.churnRate}
                  onChange={handleChange}
                  disabled={disabled}
                />
                <Field
                  label="Burn multiple"
                  name="burnRate"
                  placeholder="e.g. 1.3"
                  type="number"
                  step="0.1"
                  value={form.burnRate}
                  onChange={handleChange}
                  disabled={disabled}
                />
                <Field
                  label="CAC (months to payback)"
                  name="cac"
                  placeholder="e.g. 9"
                  type="number"
                  value={form.cac}
                  onChange={handleChange}
                  disabled={disabled}
                />
                <Field
                  label="Marketing spend (k/month)"
                  name="marketingSpend"
                  placeholder="e.g. 60"
                  type="number"
                  value={form.marketingSpend}
                  onChange={handleChange}
                  disabled={disabled}
                />
              </div>

              <h3 className="relative mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                Previous 3 months revenue
              </h3>
              <div className="relative mt-3 grid gap-3 text-sm md:grid-cols-3 md:text-base">
                <Field
                  label="Month -1"
                  name="revenue1"
                  type="number"
                  placeholder="e.g. 46000"
                  value={form.revenue1}
                  onChange={handleChange}
                  disabled={disabled}
                />
                <Field
                  label="Month -2"
                  name="revenue2"
                  type="number"
                  placeholder="e.g. 44000"
                  value={form.revenue2}
                  onChange={handleChange}
                  disabled={disabled}
                />
                <Field
                  label="Month -3"
                  name="revenue3"
                  type="number"
                  placeholder="e.g. 42000"
                  value={form.revenue3}
                  onChange={handleChange}
                  disabled={disabled}
                />
              </div>

              <button
                type="submit"
                disabled={disabled}
                className="relative mt-6 flex w-full items-center justify-center rounded-full bg-gradient-accent px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.22em] text-slate-950 shadow-glow-purple transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Analyzing metrics..." : "Predict revenue"}
              </button>
            </motion.form>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                className="space-y-4"
              >
                {result && (
                  <div className="card-elevated relative overflow-hidden rounded-3xl bg-strat-card/80 p-5">
                    <div className="pointer-events-none absolute inset-0 bg-panel-glow opacity-40" />
                    <div className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">
                      Predicted MRR (next month)
                    </div>
                    <div className="mt-2 text-4xl font-semibold text-slate-50 md:text-5xl">
                      ${result.metrics.predictedMRR.toLocaleString()}
                    </div>
                    <div className="mt-2 text-sm text-slate-300 md:text-base">
                      Current MRR:{" "}
                      <span className="text-violet-300">
                        ${result.metrics.currentMRR.toLocaleString()}
                      </span>
                      .
                    </div>
                  </div>
                )}
                <ForecastChart
                  data={result ? result.series : []}
                  variant="large"
                />
              </motion.div>
              <AIInsightPanel
                title={insight?.title}
                message={insight?.message}
                tone={insight?.tone}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const Field = ({
  label,
  name,
  value,
  onChange,
  disabled,
  placeholder,
  type = "text",
  step,
}) => (
  <div className="space-y-1.5">
    <label
      htmlFor={name}
      className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      step={step}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      className="w-full rounded-xl border border-slate-800/80 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 disabled:opacity-60 md:text-base"
    />
  </div>
);

export default Revenue;

