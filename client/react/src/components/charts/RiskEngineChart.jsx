import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const RiskEngineChart = ({ series = [], riskLevel = "medium" }) => {
  const defaultData = [
    { label: "M+0", runway: 18, risk: 0.2 },
    { label: "M+2", runway: 16, risk: 0.25 },
    { label: "M+4", runway: 14, risk: 0.3 },
    { label: "M+6", runway: 11, risk: 0.4 },
    { label: "M+8", runway: 8, risk: 0.5 },
    { label: "M+10", runway: 5, risk: 0.65 },
    { label: "M+12", runway: 3, risk: 0.8 },
  ];

  const data = series.length
    ? series.map((s, i) => ({
        label: s.label || `M+${i}`,
        runway: s.runway ?? 18 - i * 1.2,
        risk: s.risk ?? (i / series.length) * 0.6,
      }))
    : defaultData;

  const riskColor =
    riskLevel === "high"
      ? "#f43f5e"
      : riskLevel === "medium"
      ? "#f59e0b"
      : "#22d3ee";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="card-elevated relative flex flex-col overflow-hidden rounded-2xl bg-strat-card/80 p-6 h-72 md:h-80"
    >
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">
            RISK ENGINE
          </div>
          <div className="text-sm font-semibold text-slate-100">
            Runway vs. risk over time
          </div>
        </div>
        <div className="rounded-full bg-slate-900/80 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-slate-400">
          LIVE
        </div>
      </div>

      <div className="relative flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 12, left: -8, bottom: 8 }}
          >
            <defs>
              <linearGradient id="runwayGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={riskColor} stopOpacity={0.4} />
                <stop offset="100%" stopColor={riskColor} stopOpacity={0} />
              </linearGradient>
            </defs>
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
              width={36}
              tick={{ fill: "#cbd5f5", fontSize: 12 }}
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tickFormatter={(v) => `${v}m`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0b0d12",
                borderRadius: 12,
                border: "1px solid rgba(51,65,85,0.8)",
                padding: "8px 10px",
              }}
              formatter={(value, name) => [
                name === "runway" ? `${value} months` : `${(value * 100).toFixed(0)}%`,
                name === "runway" ? "Runway" : "Risk",
              ]}
              labelStyle={{ color: "#e2e8f0", fontSize: 11 }}
            />
            <Area
              type="monotone"
              dataKey="runway"
              stroke={riskColor}
              strokeWidth={2}
              fill="url(#runwayGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default RiskEngineChart;
