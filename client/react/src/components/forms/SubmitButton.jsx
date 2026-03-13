const SubmitButton = ({ loading, children, disabled, ...props }) => (
  <button
    type="submit"
    disabled={disabled || loading}
    className="relative mt-6 flex w-full items-center justify-center rounded-full bg-gradient-accent px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.22em] text-slate-950 shadow-glow-purple transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
    {...props}
  >
    {loading ? (
      <span className="flex items-center gap-2">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
        {children}
      </span>
    ) : (
      children
    )}
  </button>
);

export default SubmitButton;
