const Field = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  disabled,
  placeholder,
  type = "text",
  step,
  error,
  ...props
}) => (
  <div className="space-y-1.5">
    <label
      htmlFor={name}
      className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      step={step}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      placeholder={placeholder}
      className={`w-full rounded-xl border bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:ring-2 disabled:opacity-60 md:text-base ${
        error
          ? "border-rose-500/60 focus:border-rose-400 focus:ring-rose-500/30"
          : "border-slate-800/80 focus:border-violet-400 focus:ring-violet-500/30"
      }`}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
      {...props}
    />
    {error && (
      <p id={`${name}-error`} className="text-xs text-rose-400" role="alert">
        {error}
      </p>
    )}
  </div>
);

export default Field;
