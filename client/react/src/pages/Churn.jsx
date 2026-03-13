import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import AIInsightPanel from "../components/AIInsightPanel.jsx";
import ChurnRateChart from "../components/charts/ChurnRateChart.jsx";
import Field from "../components/forms/Field.jsx";
import SubmitButton from "../components/forms/SubmitButton.jsx";
import { postChurn } from "../services/api.js";
import { validateChurnForm } from "../lib/validation.js";

const Churn = () => {
  const [form, setForm] = useState({
    activeUsers: "",
    cac: "",
    engagementScore: "",
    customerAgeMonths: "",
    supportTickets: "",
    productUsageScore: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [insight, setInsight] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateChurnForm(form);
    if (validationErrors) {
      setErrors(validationErrors);
      toast.error("Please fix the form errors");
      return;
    }

    setLoading(true);
    setInsight(null);
    setErrors({});

    try {
      const payload = {
        activeUsers: Number(form.activeUsers) || 0,
        cac: Number(form.cac) || 0,
        engagementScore: Number(form.engagementScore) || 0,
        customerAgeMonths: Number(form.customerAgeMonths) || 0,
        supportTickets: Number(form.supportTickets) || 0,
        productUsageScore: Number(form.productUsageScore) || 0,
      };

      const churn = await postChurn(payload);
      setResult(churn);

      let message;
      let tone = "neutral";

      if (churn.probability > 0.35) {
        message =
          "Churn risk is elevated. Consider reinforcing onboarding, success touchpoints, and in-product nudges for at‑risk cohorts.";
        tone = "negative";
      } else if (churn.probability > 0.2) {
        message =
          "Churn risk is moderate. Targeted engagement for lower‑usage accounts could meaningfully reduce churn probability.";
        tone = "neutral";
      } else {
        message =
          "Churn probability appears contained. Maintain current retention programs and continue watching leading indicators.";
        tone = "positive";
      }

      setInsight({
        title: "Churn risk profile",
        message,
        tone,
      });

      toast.success(`Churn analysis complete: ${(churn.probability * 100).toFixed(1)}% probability (${churn.level} risk)`);
    } catch (err) {
      toast.error(err.message || "Failed to predict churn");
    } finally {
      setLoading(false);
    }
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
              Churn prediction
            </h1>
            <p className="max-w-2xl text-base text-slate-300 md:text-lg">
              Use leading signals like engagement, support volume, and age in
              product to estimate churn probability.
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
                Cohort signals
              </h2>
              <div className="relative mt-4 grid gap-4 text-sm md:grid-cols-2 md:text-base">
                <Field
                  label="Active users"
                  name="activeUsers"
                  type="number"
                  placeholder="e.g. 800"
                  value={form.activeUsers}
                  onChange={handleChange}
                  disabled={disabled}
                  error={errors.activeUsers}
                />
                <Field
                  label="CAC (months to payback)"
                  name="cac"
                  type="number"
                  placeholder="e.g. 10"
                  value={form.cac}
                  onChange={handleChange}
                  disabled={disabled}
                  error={errors.cac}
                />
                <Field
                  label="Engagement score (0–1)"
                  name="engagementScore"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 0.6"
                  value={form.engagementScore}
                  onChange={handleChange}
                  disabled={disabled}
                  error={errors.engagementScore}
                />
                <Field
                  label="Customer age (months)"
                  name="customerAgeMonths"
                  type="number"
                  placeholder="e.g. 12"
                  value={form.customerAgeMonths}
                  onChange={handleChange}
                  disabled={disabled}
                  error={errors.customerAgeMonths}
                />
                <Field
                  label="Support tickets (last 30d)"
                  name="supportTickets"
                  type="number"
                  placeholder="e.g. 4"
                  value={form.supportTickets}
                  onChange={handleChange}
                  disabled={disabled}
                  error={errors.supportTickets}
                />
                <Field
                  label="Product usage score (0–1)"
                  name="productUsageScore"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 0.7"
                  value={form.productUsageScore}
                  onChange={handleChange}
                  disabled={disabled}
                  error={errors.productUsageScore}
                />
              </div>

              <SubmitButton loading={loading}>
                {loading ? "Analyzing metrics..." : "Predict churn"}
              </SubmitButton>
            </motion.form>

            <div className="space-y-4">
              {result && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                    className="card-elevated relative overflow-hidden rounded-3xl bg-strat-card/80 p-5"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-panel-glow opacity-40" />
                    <div className="mb-2 flex items-center justify-between">
                      <div className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">
                        Churn probability
                      </div>
                      <RiskBadge level={result.level} />
                    </div>
                    <div className="text-4xl font-semibold text-slate-50 md:text-5xl">
                      {(result.probability * 100).toFixed(1)}%
                    </div>
                    <p className="mt-2 text-sm text-slate-300 md:text-base">
                      Based on the signals you provided for this cohort.
                    </p>
                  </motion.div>
                  <ChurnRateChart
                    probability={result.probability}
                    level={result.level}
                  />
                </>
              )}
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

const RiskBadge = ({ level }) => {
  const map = {
    low: "bg-emerald-500/10 text-emerald-300 border-emerald-500/50",
    medium: "bg-amber-500/10 text-amber-300 border-amber-500/50",
    high: "bg-rose-500/10 text-rose-300 border-rose-500/50",
  };
  const label =
    level === "high" ? "High" : level === "medium" ? "Elevated" : "Low";
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${map[level]}`}
    >
      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </div>
  );
};

export default Churn;
