import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

type TransactionType = "BUY" | "SELL";

type TransactionRowProps = {
  icon: string;
  coinName: string;
  symbol: string;
  type: TransactionType;
  quantity: string;
  price: string;
  total: string;
  date: string;
};

export function TransactionRow({
  icon,
  coinName,
  symbol,
  type,
  quantity,
  price,
  total,
  date,
}: TransactionRowProps) {
  const isBuy = type === "BUY";

  return (
    <div className="  grid gap-1 md:gap-4 rounded-2xl border border-border/70 bg-surface p-4 transition-colors hover:border-primary/30 lg:grid-cols-[1fr_0.5fr_1fr_1fr_1fr_1fr] md:items-center">
      {/* coin */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background text-xl ">
          {icon}
        </div>

        <div>
          <p className="font-bold">{coinName}</p>
          <p className="mt-0.5 text-xs text-muted" dir="ltr">
            {symbol}
          </p>
        </div>
      </div>

      {/* order  */}
      <div>
        <p className="text-xs text-muted md:hidden">نوع سفارش</p>

        <span
          className={`mt-1 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold ${
            isBuy ? "bg-profit/10 text-profit" : "bg-loss/10 text-loss"
          }`}
        >
          {isBuy ? <ArrowDownLeft size={15} /> : <ArrowUpRight size={15} />}
          {isBuy ? "خرید" : "فروش"}
        </span>
      </div>

      <TransactionDetail label="مقدار" value={quantity} />
      <TransactionDetail label="قیمت اجرا" value={price} />
      <TransactionDetail label="مبلغ کل" value={total} />
      <TransactionDetail label="زمان ثبت" value={date} />
    </div>
  );
}

type TransactionDetailProps = {
  label: string;
  value: string;
};

function TransactionDetail({ label, value }: TransactionDetailProps) {
  return (
    <div className="md:text-left">
      <p className="text-xs text-muted md:hidden">{label}</p>

      <p className="mt-1 text-sm font-medium md:mt-0" dir="ltr">
        {value}
      </p>
    </div>
  );
}
