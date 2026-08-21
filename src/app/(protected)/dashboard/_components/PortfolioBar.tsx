type PortfolioBarProps = {
  name: string;
  symbol: string;
  percentage: string;
  colorClass: string;
};

export default function PortfolioBar({
  name,
  symbol,
  percentage,
  colorClass,
}: PortfolioBarProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${colorClass}`} />
          <span className="font-medium">{name}</span>
          <span className="text-xs text-muted" dir="ltr">
            {symbol}
          </span>
        </div>

        <span className="font-bold" dir="ltr">
          {percentage}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-surface">
        <div
          className={`h-full rounded-full ${colorClass}`}
          style={{ width: percentage }}
        />
      </div>
    </div>
  );
}
