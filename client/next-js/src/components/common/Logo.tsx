const Logo = ({ compact = false }: { compact?: boolean }) => {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-800/80 bg-slate-950/80 shadow-glow-purple">
        <svg className="h-7 w-7" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="stratiq-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="26" height="26" rx="8" fill="none" stroke="url(#stratiq-gradient)" strokeWidth="1.6" />
          <path d="M10 21c1.8-3.2 3.8-5 6.2-5.6 2.2-.5 4.4.4 6.3 2.3" stroke="url(#stratiq-gradient)" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M14 8h7.5M21.5 8v7.5" stroke="url(#stratiq-gradient)" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M11 10.5c1.2-.8 2.7-1.3 4.4-1.3" stroke="url(#stratiq-gradient)" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.8" />
        </svg>
      </div>
      {!compact && (
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-semibold tracking-[0.24em] text-slate-50 md:text-xl">STRAT_IQ</span>
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-slate-400">INTELLIGENCE LAYER</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
