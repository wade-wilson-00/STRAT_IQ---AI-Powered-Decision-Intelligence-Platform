import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const ChurnRateChart = ({ data = [], probability, level }) => {
  const defaultData = [
    { month: "M-3", rate: 3.2, fill: "#22d3ee" },
    { month: "M-2", rate: 3.8, fill: "#818cf8" },
    { month: "M-1", rate: 4.2, fill: "#a855f7" },
    { month: "Now", rate: probability != null ? probability * 100 : 4.5, fill: level === "high" ? "#f43f5e" : level === "medium" ? "#f59e0b" : "#22d3ee" },
    { month: "M+1", rate: probability != null ? Math.min(20, probability * 100 * 1.15) : 5.1, fill: "rgba(148,163,184,0.5)" },
  ];

  const chartData = data.length ? data : defaultData;

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
            CHURN RATE
          </div>
          <div className="text-sm font-semibold text-slate-100">
            Probability & trend
          </div>
        </div>
        <div className="rounded-full bg-slate-900/80 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-slate-400">
          ML-ASSISTED
        </div>
      </div>

      <div className="relative flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 12, left: -8, bottom: 8 }}
          >
            <CartesianGrid
              stroke="rgba(148,163,184,0.22)"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#cbd5f5", fontSize: 12 }}
              tickLine={false}
              tickMargin={8}
              height={28}
              axisLine={{ stroke: "rgba(148,163,184,0.35)" }}
            />
            <YAxis
              width={40}
              tick={{ fill: "#cbd5f5", fontSize: 12 }}
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
              domain={[0, "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0b0d12",
                borderRadius: 12,
                border: "1px solid rgba(51,65,85,0.8)",
                padding: "8px 10px",
              }}
              formatter={(v) => [`${Number(v).toFixed(1)}%`, "Churn rate"]}
              labelStyle={{ color: "#e2e8f0", fontSize: 11 }}
            />
            <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.fill || "#818cf8"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ChurnRateChart;
