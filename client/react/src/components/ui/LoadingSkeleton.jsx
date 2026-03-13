const LoadingSkeleton = ({ className = "", ...props }) => (
  <div
    className={`animate-pulse rounded-2xl bg-slate-800/50 ${className}`}
    {...props}
  />
);

export const CardSkeleton = () => (
  <div className="card-elevated relative overflow-hidden rounded-2xl bg-strat-card/80 p-4">
    <div className="h-4 w-24 animate-pulse rounded bg-slate-700/50" />
    <div className="mt-4 h-10 w-32 animate-pulse rounded bg-slate-700/50" />
    <div className="mt-2 h-3 w-full animate-pulse rounded bg-slate-700/30" />
  </div>
);

export const ChartSkeleton = () => (
  <div className="card-elevated relative flex flex-col overflow-hidden rounded-2xl bg-strat-card/80 p-6 h-72 md:h-80">
    <div className="mb-4 flex items-center justify-between">
      <div className="h-4 w-32 animate-pulse rounded bg-slate-700/50" />
      <div className="h-6 w-20 animate-pulse rounded-full bg-slate-700/50" />
    </div>
    <div className="flex-1 flex items-end gap-2">
      {[40, 55, 45, 70, 60, 85, 75].map((h, i) => (
        <div
          key={i}
          className="flex-1 animate-pulse rounded-t bg-slate-700/40"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  </div>
);

export const FormSkeleton = () => (
  <div className="glass-panel relative rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6 space-y-4">
    <div className="h-6 w-40 animate-pulse rounded bg-slate-700/50" />
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="space-y-2">
        <div className="h-3 w-24 animate-pulse rounded bg-slate-700/30" />
        <div className="h-10 w-full animate-pulse rounded-xl bg-slate-700/40" />
      </div>
    ))}
    <div className="mt-6 h-11 w-full animate-pulse rounded-full bg-slate-700/50" />
  </div>
);

export default LoadingSkeleton;
