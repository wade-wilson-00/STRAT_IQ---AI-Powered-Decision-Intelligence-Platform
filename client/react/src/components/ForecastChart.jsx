import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ForecastChart = ({ data, variant = "default" }) => {
  const containerHeight =
    variant === "large" ? "h-[420px] md:h-[460px]" : "h-72 md:h-80";
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`card-elevated relative flex flex-col overflow-hidden rounded-2xl bg-strat-card/80 p-6 md:p-7 ${containerHeight}`}
    >
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">
            FORECAST
          </div>
          <div className="text-sm font-semibold text-slate-100">
            Revenue projection
          </div>
        </div>
        <div className="rounded-full bg-slate-900/80 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-slate-400">
          ML-ASSISTED
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-panel-glow opacity-70" />

      <div className="relative flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 12, left: -8, bottom: 8 }}
          >
            <CartesianGrid
              stroke="rgba(148,163,184,0.22)"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={{ fill: "#cbd5f5", fontSize: 12 }}
              tickLine={false}
              tickMargin={8}
              height={28}
              axisLine={{ stroke: "rgba(148,163,184,0.35)" }}
            />
            <YAxis
              width={46}
              tick={{ fill: "#cbd5f5", fontSize: 12 }}
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0b0d12",
                borderRadius: 12,
                border: "1px solid rgba(51,65,85,0.8)",
                padding: "8px 10px",
              }}
              labelStyle={{ color: "#e2e8f0", fontSize: 11 }}
              itemStyle={{ color: "#22d3ee", fontSize: 11 }}
              formatter={(v) => [`$${v.toLocaleString()}`, "MRR"]}
            />
            <defs>
              <linearGradient id="forecastStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <linearGradient id="forecastFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(56,189,248,0.35)" />
                <stop offset="60%" stopColor="rgba(30,64,175,0.1)" />
                <stop offset="100%" stopColor="rgba(15,23,42,0.8)" />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="mrr"
              stroke="url(#forecastStroke)"
              strokeWidth={2.3}
              dot={false}
              activeDot={{
                r: 4,
                fill: "#22d3ee",
                stroke: "#0f172a",
                strokeWidth: 2,
              }}
              fill="url(#forecastFill)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ForecastChart;

