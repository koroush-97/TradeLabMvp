type AssetRowProps = {
  name: string;
  symbol: string;
  price: string;
  change: string;
};

export function AssetRow({ name, symbol, price, change }: AssetRowProps) {
  const isProfit = change.startsWith("+");

  return (
    <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-surface p-4">
      <div>
        <p className="font-bold">{name}</p>
        <p className="mt-1 text-xs text-muted">{symbol}</p>
      </div>

      <div className="flex items-center gap-4 text-left sm:gap-8">
        <span className="text-muted-foreground">{price}</span>

        <span className={`font-bold ${isProfit ? "text-profit" : "text-loss"}`}>
          {change}
        </span>
      </div>
    </div>
  );
}
