import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const floatTransition = {
  duration: 6,
  repeat: Infinity,
  repeatType: "mirror",
  ease: "easeInOut",
};

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-radial-faded pt-24">
      <div className="pointer-events-none absolute inset-0 grid-surface opacity-20" />
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-2xl"
          animate={{ y: [0, -12, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={floatTransition}
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div
          className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-purple-500/10 blur-2xl"
          animate={{ y: [0, 14, 0], opacity: [0.45, 0.75, 0.45] }}
          transition={{ ...floatTransition, duration: 7.2 }}
          style={{ willChange: "transform, opacity" }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-16 px-4 md:px-6 lg:flex-row lg:items-center lg:px-8">
        <div className="max-w-xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-950/70 px-3 py-1 text-[11px] font-medium tracking-[0.24em] text-slate-400 shadow-lg shadow-black/40 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.9)]" />
            STRATEGIC SIGNALS, LIVE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6, ease: "easeOut" }}
            className="text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Get total clarity from{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              scattered growth signals
            </span>{" "}
            and act faster.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.6, ease: "easeOut" }}
            className="max-w-xl text-balance text-sm leading-relaxed text-slate-400 sm:text-base"
          >
            Strat_Iq centralizes customer, product, and revenue data into a
            single intelligence layer — forecasting revenue, highlighting churn
            risk, and surfacing the next best move.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.6, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-7 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-950 shadow-glow-purple transition hover:brightness-110"
            >
              Get a demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/revenue"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-100 transition hover:border-slate-500/80 hover:text-white"
            >
              See it in action
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.5, ease: "easeOut" }}
            className="mt-4 flex flex-wrap gap-4 text-xs text-slate-300 md:text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-slate-900/80 ring-1 ring-slate-700/80">
                <div className="h-5 w-5 rounded-full bg-[radial-gradient(circle_at_30%_20%,#7c3aed,transparent_45%),radial-gradient(circle_at_70%_80%,#22d3ee,transparent_55%)] opacity-80" />
              </div>
              <span>Built for product, growth, and revenue leaders</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.7, ease: "easeOut" }}
          className="relative mt-8 w-full flex-1 lg:mt-0"
        >
          <div className="card-elevated relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/60 p-5 shadow-2xl shadow-black/70 backdrop-blur-lg">
            <div className="pointer-events-none absolute inset-0 opacity-60">
              <motion.div
                className="absolute inset-x-6 top-10 h-48 rounded-3xl bg-gradient-to-tr from-violet-500/20 via-sky-500/10 to-cyan-500/10 blur-2xl"
                animate={{
                  opacity: [0.5, 0.9, 0.5],
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ willChange: "transform, opacity" }}
              />
            </div>

            <div className="relative">
              <AnimatedBackgroundChart />
              <FloatingMetrics />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AnimatedBackgroundChart = () => {
  const points = [
    { x: 0, y: 60 },
    { x: 20, y: 52 },
    { x: 40, y: 58 },
    { x: 60, y: 44 },
    { x: 80, y: 50 },
    { x: 100, y: 36 },
  ];

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
      className="relative h-64 w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60"
    >
      <svg
        viewBox="0 0 100 70"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hero-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="40%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient
            id="hero-fill"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(56,189,248,0.25)" />
            <stop offset="50%" stopColor="rgba(129,140,248,0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        <g strokeWidth="0.2" opacity="0.18">
          {[...Array(7)].map((_, i) => (
            <line
              key={i}
              x1="0"
              x2="100"
              y1={10 * i}
              y2={10 * i}
              stroke="#1f2937"
            />
          ))}
        </g>

        <motion.path
          d={`${pathD} L 100 70 L 0 70 Z`}
          fill="url(#hero-fill)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        />

        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#hero-line)"
          strokeWidth="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />

        {points.map((p, idx) => (
          <motion.circle
            key={idx}
            cx={p.x}
            cy={p.y}
            r="1.2"
            fill="#22d3ee"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 + idx * 0.08, type: "spring", stiffness: 210 }}
          />
        ))}
      </svg>
    </motion.div>
  );
};

const FloatingMetrics = () => {
  return (
    <div className="pointer-events-none absolute inset-0">
      <motion.div
        className="absolute left-4 top-4 rounded-2xl bg-slate-900/80 px-3 py-2 text-xs text-slate-200 shadow-lg shadow-black/50 backdrop-blur"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform" }}
      >
        <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-slate-500">
          NEXT 90 DAYS
        </div>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-sm font-semibold text-cyan-300">
            +28.4%
          </span>
          <span className="text-[11px] text-slate-500">revenue growth</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-4 right-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-100 shadow-lg shadow-emerald-900/70 backdrop-blur"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: "transform" }}
      >
        <div className="flex items-center gap-2">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">
            RISK ENGINE
          </span>
        </div>
        <div className="mt-1 text-[11px] text-emerald-100/90">
          Runway impact stable across scenarios.
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;

