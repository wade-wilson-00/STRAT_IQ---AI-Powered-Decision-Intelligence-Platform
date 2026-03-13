import { motion } from "framer-motion";
import {
  Activity,
  LineChart as LineChartIcon,
  Shield,
  Workflow,
  ArrowRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Footer from "../components/Footer.jsx";

const Landing = () => {
  return (
    <div className="scroll-smooth bg-strat-bg text-slate-100">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <HowItWorksSection />
      <DashboardPreviewSection />
      <AIInsightSection />
      <CTASection />
      <DocsAnchor />
      <Footer />
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: LineChartIcon,
      title: "Revenue Forecast",
      description: "Predict next-month revenue with ML-driven cohort models.",
      tone: "from-violet-500/20 via-slate-900 to-slate-950",
    },
    {
      icon: Shield,
      title: "Risk Engine",
      description:
        "Quantify burn and churn impact before they hit your runway.",
      tone: "from-emerald-500/15 via-slate-900 to-slate-950",
    },
    {
      icon: Activity,
      title: "Scenario Simulation",
      description:
        "Adjust key levers and see strategic trade-offs instantly.",
      tone: "from-cyan-500/15 via-slate-900 to-slate-950",
    },
  ];

  return (
    <section
      id="features"
      className="relative border-t border-slate-800/80 bg-slate-950/40 py-16"
    >
      <div className="pointer-events-none absolute inset-0 grid-surface opacity-10" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-violet-300">
              PLATFORM OVERVIEW
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-50 md:text-2xl">
              Everything your customer signals have been trying to tell you.
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm text-slate-400 md:block">
            Strat_Iq ingests your existing tools and instruments them into a
            single, board-ready view of revenue, risk, and runway.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f, idx) => (
            <FeatureCard key={f.title} feature={f} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ feature, index }) => {
  const Icon = feature.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: 0.06 * index, duration: 0.45, ease: "easeOut" }}
      className="group relative"
    >
      <div className="gradient-border rounded-2xl">
        <div
          className={`card-elevated relative h-full rounded-2xl bg-gradient-to-br ${feature.tone} p-5 transition-transform duration-200 ease-out group-hover:-translate-y-1.5 group-hover:shadow-glow-purple`}
        >
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950/70 text-violet-200 ring-1 ring-violet-400/30">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-sm font-semibold tracking-tight text-slate-50">
            {feature.title}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            {feature.description}
          </p>
          <div className="mt-4 inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.22em] text-violet-300/90">
            Learn how it works
            <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="relative border-t border-slate-800/80 bg-slate-950/60 py-16"
    >
      <div className="pointer-events-none absolute inset-0 grid-surface opacity-10" />
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="mb-10 max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-violet-300">
            HOW IT WORKS
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-50 md:text-2xl">
            From raw events to strategy in three steps.
          </h2>
          <p className="mt-3 text-sm text-slate-400 md:text-base">
            Connect your billing, product analytics, and CRM. Strat_Iq orchestrates
            an ML pipeline that continuously translates noisy data into clean,
            actionable insight.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="glass-panel relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/70 p-6 md:p-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-panel-glow opacity-70" />
          <div className="relative grid gap-4 md:grid-cols-3">
            <Stage
              title="INPUT"
              icon={Workflow}
              description="Billing, CRM, and product analytics streamed in via API or warehouse."
            />
            <AnimatedArrow />
            <Stage
              title="ML PIPELINE"
              icon={Activity}
              description="Cohort models, retention curves, and Monte Carlo simulations run continuously."
            />
            <AnimatedArrow />
            <Stage
              title="STRATEGIC OUTPUT"
              icon={Shield}
              description="Board-ready metrics, scenario bands, and risk insights delivered in real-time."
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Stage = ({ title, icon: Icon, description }) => (
  <div className="flex flex-col gap-2">
    <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-slate-400">
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/90 text-cyan-300">
        <Icon className="h-3.5 w-3.5" />
      </span>
      {title}
    </div>
    <p className="text-xs leading-relaxed text-slate-300">{description}</p>
  </div>
);

const AnimatedArrow = () => (
  <motion.div
    className="hidden items-center justify-center md:flex"
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    <motion.div
      className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent"
      animate={{ scaleX: [0.6, 1, 0.6] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

const DashboardPreviewSection = () => {
  return (
    <section
      id="demo"
      className="relative border-t border-slate-800/80 bg-strat-bg py-16"
    >
      <div className="pointer-events-none absolute inset-0 grid-surface opacity-10" />
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-violet-300">
              DASHBOARD PREVIEW
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-50 md:text-2xl">
              A founder console built for strategic decisions.
            </h2>
          </div>
          <p className="hidden max-w-sm text-xs text-slate-400 md:block">
            See a snapshot of the STRATIQ dashboard — revenue curves, KPI
            cards, and risk bands, all tuned to your inputs.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/80 p-4 shadow-2xl shadow-black/70"
        >
          <motion.div
            className="pointer-events-none absolute inset-0 bg-panel-glow"
            style={{ translateY: -10 }}
          />
          <DashboardPreview />
        </motion.div>
      </div>
    </section>
  );
};

const DashboardPreview = () => {
  const forecastData = [
    { label: "M+0", mrr: 48000 },
    { label: "M+2", mrr: 52200 },
    { label: "M+4", mrr: 56800 },
    { label: "M+6", mrr: 61800 },
    { label: "M+8", mrr: 67200 },
    { label: "M+10", mrr: 73100 },
    { label: "M+12", mrr: 79500 },
  ];
  const churnData = [
    { month: "M-2", rate: 3.8 },
    { month: "M-1", rate: 4.2 },
    { month: "Now", rate: 4.5 },
    { month: "M+1", rate: 4.8 },
  ];

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between gap-4 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          LIVE FORECAST · MOCK DATA
        </div>
        <span className="rounded-full bg-slate-900/80 px-3 py-1">
          Multi-scenario · 12 months
        </span>
      </div>
      <DashboardPreviewCharts forecastData={forecastData} churnData={churnData} />
    </div>
  );
};

const DashboardPreviewCharts = ({ forecastData, churnData }) => {
  return (
    <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
      <div className="card-elevated h-56 overflow-hidden rounded-2xl bg-slate-950/80 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData} margin={{ top: 4, right: 4, left: -20, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
            <XAxis dataKey="label" tick={{ fill: "#94a3b8", fontSize: 10 }} />
            <YAxis
              width={32}
              tick={{ fill: "#94a3b8", fontSize: 10 }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0b0d12",
                borderRadius: 8,
                border: "1px solid rgba(51,65,85,0.8)",
                fontSize: 11,
              }}
              formatter={(v) => [`$${v.toLocaleString()}`, "MRR"]}
            />
            <defs>
              <linearGradient id="previewStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="mrr"
              stroke="url(#previewStroke)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3">
        <div className="card-elevated h-[calc(50%-6px)] overflow-hidden rounded-2xl bg-slate-950/80 p-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={churnData} margin={{ top: 4, right: 4, left: -20, bottom: 4 }}>
              <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 9 }} />
              <YAxis
                width={24}
                tick={{ fill: "#94a3b8", fontSize: 9 }}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0b0d12",
                  borderRadius: 8,
                  border: "1px solid rgba(51,65,85,0.8)",
                  fontSize: 10,
                }}
                formatter={(v) => [`${v}%`, "Churn"]}
              />
              <Bar dataKey="rate" fill="#818cf8" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card-elevated h-[calc(50%-6px)] overflow-hidden rounded-2xl bg-slate-950/80 p-3 flex items-center justify-center">
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Risk</div>
            <div className="mt-1 flex items-center justify-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="text-xs font-semibold text-amber-300">ELEVATED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AIInsightSection = () => {
  return (
    <section className="relative border-t border-slate-800/80 bg-slate-950/80 py-16">
      <div className="pointer-events-none absolute inset-0 grid-surface opacity-10" />
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="mb-8 max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-violet-300">
            AI STRATEGIC INSIGHTS
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-50 md:text-2xl">
            Not another dashboard. A partner for decisions.
          </h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="glass-panel relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/70 p-6 sm:p-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-panel-glow opacity-70" />
          <div className="relative max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-slate-400">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.9)]" />
              AI STRATEGIC LAYER
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
              className="text-sm leading-relaxed text-slate-100 sm:text-base"
            >
              “Churn increase above{" "}
              <span className="font-semibold text-violet-300">5%</span> may reduce
              revenue growth by{" "}
              <span className="font-semibold text-violet-300">8%</span> over the
              next quarter. Consider reallocating{" "}
              <span className="font-semibold text-violet-300">12–18%</span> of
              marketing spend towards retention programs to preserve runway.”
            </motion.p>
            <p className="text-xs text-slate-400">
              Every insight is grounded in your actual cohorts, not generic
              benchmarks.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="relative border-t border-slate-800/80 bg-strat-bg py-16">
      <div className="pointer-events-none absolute inset-0 grid-surface opacity-10" />
      <div className="mx-auto max-w-6xl px-4 text-center md:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-violet-300">
          READY TO OPERATE WITH CLARITY
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
          Build with intelligence.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-xs text-slate-400 md:text-sm">
          Turn every board meeting into a conversation about strategy, not
          spreadsheets.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-6 flex justify-center"
        >
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-slate-950 shadow-glow-purple transition hover:brightness-110"
          >
            Start forecasting
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const DocsAnchor = () => (
  <section
    id="docs"
    className="border-t border-slate-800/80 bg-slate-950/90 py-6 text-center text-[11px] text-slate-500"
  >
    STRATIQ API & workspace docs will plug in here.
  </section>
);

export default Landing;

