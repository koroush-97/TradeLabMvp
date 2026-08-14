type MarketStatCardProps = {
  label: string;
  value: string;
  helperText?: string;
  valueClassName?: string;
};

export function MarketStatCard({
  label,
  value,
  helperText,
  valueClassName = "",
}: MarketStatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-md">
      <p className="text-xs text-zinc-400">{label}</p>

      <div
        className={`mt-2 text-lg font-semibold text-white ${valueClassName}`}
      >
        {value}
      </div>

      {helperText ? (
        <p className="mt-1 text-xs text-zinc-500">{helperText}</p>
      ) : null}
    </div>
  );
}
