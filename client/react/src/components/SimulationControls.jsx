import { motion } from "framer-motion";

const ControlSlider = ({ label, value, min, max, step, onChange, suffix }) => {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{label}</span>
        <span className="font-semibold text-slate-100">
          {value}
          {suffix}
        </span>
      </div>
      <div className="relative h-8 rounded-full bg-slate-900/80 px-3">
        <div className="absolute inset-y-3 left-3 right-3 rounded-full bg-slate-800/80">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative z-10 h-8 w-full cursor-pointer bg-transparent"
        />
      </div>
    </div>
  );
};

const SimulationControls = ({ params, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="card-elevated relative flex h-full flex-col overflow-hidden rounded-2xl bg-strat-card/80 p-4"
    >
      <div className="pointer-events-none absolute inset-0 bg-panel-glow opacity-40" />
      <div className="relative mb-3">
        <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">
          SCENARIO SIMULATION
        </div>
        <div className="text-sm font-semibold text-slate-100">
          Adjust key levers
        </div>
      </div>
      <div className="relative space-y-4 text-xs">
        <ControlSlider
          label="Churn rate"
          value={params.churn}
          min={1}
          max={15}
          step={0.5}
          suffix="%"
          onChange={(v) => onChange({ ...params, churn: v })}
        />
        <ControlSlider
          label="CAC payback (months)"
          value={params.cac}
          min={3}
          max={18}
          step={1}
          suffix="m"
          onChange={(v) => onChange({ ...params, cac: v })}
        />
        <ControlSlider
          label="Burn multiple"
          value={params.burn}
          min={0.5}
          max={3}
          step={0.1}
          suffix="×"
          onChange={(v) => onChange({ ...params, burn: v })}
        />
        <ControlSlider
          label="Marketing spend"
          value={params.marketing}
          min={20}
          max={120}
          step={5}
          suffix="k"
          onChange={(v) => onChange({ ...params, marketing: v })}
        />
      </div>
      <div className="relative mt-4 rounded-xl border border-slate-800 bg-slate-900/80 p-3 text-[11px] text-slate-400">
        Based on current inputs, STRATIQ recomputes forecast curves and runway
        risk bands in real-time.
      </div>
    </motion.div>
  );
};

export default SimulationControls;

