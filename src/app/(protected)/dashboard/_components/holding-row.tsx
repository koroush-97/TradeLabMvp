type HoldingRowProps = {
  icon: string;
  name: string;
  symbol: string;
  quantity: string;
  averageBuyPrice: string;
  currentPrice: string;
  totalValue: string;
  profitLoss: string;
  profitLossPercent: string;
};

export function HoldingRow({
  icon,
  name,
  symbol,
  quantity,
  averageBuyPrice,
  currentPrice,
  totalValue,
  profitLoss,
  profitLossPercent,
}: HoldingRowProps) {
  const isProfit = !profitLoss.startsWith("-");

  return (
    <div className="grid gap-4 rounded-2xl border border-border/70 bg-surface p-4 transition-colors hover:border-primary/30 xl:grid-cols-[1.3fr_1fr_1fr_1fr_1fr] md:items-center">
      {/* Asset name*/}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background text-xl">
          {icon}
        </div>

        <div>
          <p className="font-bold">{name}</p>
          <p className="mt-0.5 text-xs text-muted" dir="ltr">
            {symbol}
          </p>
        </div>
      </div>

      {/* value */}
      <HoldingDetail label="مقدار" value={quantity} />

      {/* Average purchase price*/}
      <HoldingDetail label="میانگین خرید" value={averageBuyPrice} />

      {/* Current value and price*/}
      <div className="md:text-left">
        <p className="text-xs text-muted md:hidden">ارزش فعلی</p>

        <p className="mt-1 text-sm font-medium md:mt-0" dir="ltr">
          {totalValue}
        </p>

        <p className="mt-1 text-xs text-muted" dir="ltr">
          {currentPrice}
        </p>
      </div>

      {/* Profit or loss*/}
      <div className="md:text-left">
        <p className="text-xs text-muted md:hidden">سود و زیان</p>

        <p
          className={`mt-1 font-bold ${isProfit ? "text-profit" : "text-loss"}`}
          dir="ltr"
        >
          {profitLoss}
        </p>

        <p
          className={`mt-1 text-xs ${isProfit ? "text-profit" : "text-loss"}`}
          dir="ltr"
        >
          {profitLossPercent}
        </p>
      </div>
    </div>
  );
}

type HoldingDetailProps = {
  label: string;
  value: string;
};

function HoldingDetail({ label, value }: HoldingDetailProps) {
  return (
    <div className="md:text-left">
      <p className="text-xs text-muted md:hidden">{label}</p>

      <p className="mt-1 text-sm font-medium md:mt-0" dir="ltr">
        {value}
      </p>
    </div>
  );
}
