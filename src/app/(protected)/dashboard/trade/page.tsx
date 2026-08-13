"use client";

import { useState, type ChangeEvent } from "react";
import { ArrowLeftRight, BarChart3, WalletCards } from "lucide-react";
import Image from "next/image";

// @ components
import { CoinSelector, type MarketCoin } from "../_components/CoinSelector";
import { CoinChart } from "../_components/CoinChart";
import { MarketStatCard } from "@/app/_components_ui/MarketStatCard";

// @ hooks
import { useTopCoins } from "@/hooks/use-top-coins";
import { useCoinOhlc } from "@/hooks/use-CoinOhlc";
import { useBuy, useSell } from "@/hooks/use-Trade";
import { useMyWallet } from "@/hooks/use-Wallet";
import { useMyHoldings } from "@/hooks/use-Holdings";
import getApiErrorMessage from "@/utils/getApiErrorMessage";

const RANGE_OPTIONS = [
  { label: "۱ روز", days: 1 },
  { label: "۱ هفته", days: 7 },
  { label: "۱ ماه", days: 30 },
] as const;

export default function TradePage() {
  // ─── Data and Server Hooks ─
  const { mutate: buy, isPending: isBuying } = useBuy();
  const { mutate: sell, isPending: isSelling } = useSell();
  const { data: wallet, isLoading: isWalletLoading } = useMyWallet();
  const { data: holdings = [], isLoading: isHoldingsLoading } = useMyHoldings();
  const { data: allCoins = [], isLoading: isCoinsLoading } = useTopCoins(50);

  // ─── Local form and page states ─
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState<number>(RANGE_OPTIONS[2].days);
  const [selectedCoin, setSelectedCoin] = useState<MarketCoin | undefined>();
  const [orderSide, setOrderSide] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");

  const activeCoin = selectedCoin ?? allCoins[0];
  const { data: ohlcData = [] } = useCoinOhlc(activeCoin?.id ?? "", days);

  // ─── Variables and Inventory Calculations ─
  const isBuy = orderSide === "buy";
  const price = activeCoin?.current_price ?? 0;
  const numericAmount = Number(amount) || 0;
  const coinSymbol = activeCoin?.symbol.toUpperCase() ?? "";

  const usdtBalance = wallet ? Number(wallet.cashBalance) : 0;

  const coinBalance = Number(
    holdings?.find((holding) => holding.coinId === activeCoin?.id)?.quantity ??
      0,
  );

  const estimatedReceive =
    price > 0 && numericAmount > 0
      ? isBuy
        ? numericAmount / price
        : numericAmount * price
      : 0;

  const totalUsdt = isBuy ? numericAmount : numericAmount * price;
  const canSubmit =
    numericAmount > 0 && !!activeCoin && !isBuying && !isSelling;

  const balanceLabel = isBuy
    ? isWalletLoading
      ? "دریافت موجودی..."
      : `موجودی: ${usdtBalance.toLocaleString("en-US", { maximumFractionDigits: 2 })} USDT`
    : isHoldingsLoading
      ? "دریافت موجودی..."
      : `موجودی: ${coinBalance.toLocaleString("en-US", { maximumFractionDigits: 8 })} ${coinSymbol}`;

  // ─── Form Control Functions (Handlers) ─
  function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
    const rawValue = event.target.value;
    if (rawValue === "" || /^\d*\.?\d*$/.test(rawValue)) {
      setAmount(rawValue);
      if (error) setError(null);
    }
  }

  function handlePercent(percent: number) {
    const balance = isBuy ? usdtBalance : coinBalance;
    if (balance <= 0) {
      setAmount("0");
      return;
    }
    const decimals = isBuy ? 2 : 8;
    setAmount(
      ((balance * percent) / 100).toFixed(decimals).replace(/\.?0+$/, ""),
    );
    if (error) setError(null);
  }

  function handleSideChange(side: "buy" | "sell") {
    setOrderSide(side);
    setAmount("");
    if (error) setError(null);
  }

  const handleSubmit = () => {
    setError(null);

    if (!activeCoin || numericAmount <= 0) {
      setError("لطفاً مقدار معتبر وارد کنید.");
      return;
    }

    if (isBuy) {
      if (numericAmount > usdtBalance) {
        setError("موجودی USDT کافی نیست.");
        return;
      }

      buy(
        {
          coinId: activeCoin.id,
          quantity: numericAmount,
        },
        {
          onSuccess: () => {
            setAmount("");
          },
          onError: (error: unknown) => {
            setError(getApiErrorMessage(error, "ثبت سفارش خرید ناموفق بود."));
          },
        },
      );
      return;
    }

    if (numericAmount > coinBalance) {
      setError(`موجودی ${coinSymbol} کافی نیست.`);
      return;
    }

    sell(
      {
        coinId: activeCoin.id,
        quantity: numericAmount,
      },
      {
        onSuccess: (data) => {
          setAmount("");
          console.log("فرئش با موفقیت انجام شد ", data);
        },
        onError: (error: unknown) => {
          setError(getApiErrorMessage(error, "ثبت سفارش فروش ناموفق بود."));
        },
      },
    );
  };

  // ─── OHLC statistical data ─
  const maxHigh = ohlcData.length
    ? Math.max(...ohlcData.map((c) => c.high))
    : 0;

  const minLow = ohlcData.length ? Math.min(...ohlcData.map((c) => c.low)) : 0;

  const lastClose = ohlcData.at(-1)?.close ?? 0;

  const formattedLastUpdate = ohlcData.at(-1)
    ? new Date(Number(ohlcData.at(-1)!.time) * 1000).toLocaleString("fa-IR")
    : "--";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      {/* ─── Market Title and Information ─ */}
      <section className="mb-8 flex flex-col gap-5 rounded-3xl border border-border bg-card p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warning/10 text-xl">
            {activeCoin?.image ? (
              <Image
                src={activeCoin.image}
                alt={activeCoin.name}
                width={32}
                height={32}
                className="h-8 w-8"
              />
            ) : (
              <span>نماد کوین</span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black">
                {activeCoin?.name ?? "در حال دریافت..."}
              </h1>
              <span className="text-sm text-muted" dir="ltr">
                {activeCoin ? `${coinSymbol}/USDT` : ""}
              </span>
            </div>

            {activeCoin && (
              <p
                className={`mt-1 text-sm ${
                  (activeCoin.price_change_percentage_24h ?? 0) >= 0
                    ? "text-profit"
                    : "text-loss"
                }`}
              >
                {(activeCoin.price_change_percentage_24h ?? 0) >= 0 ? "+" : ""}
                {(activeCoin.price_change_percentage_24h ?? 0).toFixed(2)}% در
                ۲۴ ساعت گذشته
              </p>
            )}
          </div>
        </div>

        <div className="md:text-left">
          <p className="text-sm text-muted">قیمت فعلی</p>
          <p className="mt-1 text-2xl font-black" dir="ltr">
            {activeCoin
              ? `$${activeCoin.current_price.toLocaleString("en-US", {
                  maximumFractionDigits: 8,
                })}`
              : "--"}
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* ─── Chart section ─ */}
        <section className="min-h-105 rounded-3xl border border-border bg-card p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
            <div className="flex items-center gap-2">
              <BarChart3 size={20} className="text-primary" />
              <h2 className="font-bold">نمودار قیمت {activeCoin?.name}</h2>
            </div>

            <div className="flex gap-2">
              {RANGE_OPTIONS.map((option) => (
                <button
                  key={option.days}
                  type="button"
                  onClick={() => setDays(option.days)}
                  className={
                    days === option.days
                      ? "rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-background"
                      : "rounded-lg px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-175 rounded-lg pt-4">
            <CoinChart coinId={activeCoin?.id ?? ""} days={days} />
          </div>
        </section>

        {/* ─── Buy and sell form ─ */}
        <aside className="rounded-3xl border border-border bg-card p-5 md:p-6">
          {/* Buy / Sell tab */}
          <div className="mb-6 grid grid-cols-2 rounded-xl bg-surface p-1">
            <button
              type="button"
              onClick={() => handleSideChange("buy")}
              className={`rounded-lg py-2.5 text-sm font-bold transition-colors ${
                isBuy
                  ? "bg-primary text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              خرید
            </button>

            <button
              type="button"
              onClick={() => handleSideChange("sell")}
              className={`rounded-lg py-2.5 text-sm font-bold transition-colors ${
                !isBuy
                  ? "bg-loss text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              فروش
            </button>
          </div>

          <div className="space-y-5">
            {/* Select cryptocurrency */}
            <CoinSelector
              coins={allCoins}
              selectedCoin={activeCoin}
              isLoading={isCoinsLoading}
              onSelect={(coin) => {
                setSelectedCoin(coin);
                if (error) setError(null);
              }}
            />

            {/* Order amount */}
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="amount"
                  className="text-sm text-muted-foreground"
                >
                  {isBuy ? "مقدار خرید" : "مقدار فروش"}
                </label>

                <span className="text-xs text-muted" dir="ltr">
                  {balanceLabel}
                </span>
              </div>

              <div className="flex overflow-hidden rounded-xl border border-border bg-surface transition-colors focus-within:border-primary">
                <input
                  id="amount"
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent py-3 px-0.5  text-sm outline-none placeholder:text-muted "
                  dir="ltr"
                />

                <span
                  className="flex items-center border-r border-border px-1 text-xs text-muted-foreground"
                  dir="ltr"
                >
                  {isBuy ? "USDT" : coinSymbol}
                </span>
              </div>

              {/* Preview approximate download */}
              {numericAmount > 0 && activeCoin && (
                <p className="mt-2 text-xs text-muted" dir="ltr">
                  ≈{" "}
                  {estimatedReceive.toLocaleString("en-US", {
                    maximumFractionDigits: 8,
                  })}{" "}
                  {isBuy ? coinSymbol : "USDT"}
                </p>
              )}
            </div>

            {/* Quick selection of balance percentage */}
            <div className="flex gap-2" dir="ltr">
              {[25, 50, 75, 100].map((percent) => (
                <button
                  key={percent}
                  type="button"
                  onClick={() => handlePercent(percent)}
                  className="flex-1 rounded-lg bg-surface py-2 text-xs text-muted-foreground transition-colors hover:bg-primary/15 hover:text-primary"
                >
                  {percent}%
                </button>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-3 rounded-2xl bg-surface p-4 text-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>قیمت تقریبی</span>
                <span dir="ltr">
                  {activeCoin
                    ? `$${price.toLocaleString("en-US", {
                        maximumFractionDigits: 8,
                      })}`
                    : "--"}
                </span>
              </div>

              <div className="flex items-center justify-between text-muted-foreground">
                <span>کارمزد</span>
                <span dir="ltr">0 USDT</span>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-3 font-bold">
                <span>{isBuy ? "مبلغ پرداختی" : "مبلغ دریافتی"}</span>
                <span dir="ltr">
                  {totalUsdt.toLocaleString("en-US", {
                    maximumFractionDigits: 8,
                  })}{" "}
                  USDT
                </span>
              </div>
            </div>

            {/* Show validation or server error */}
            {error && (
              <p className="rounded-lg bg-loss/10 p-2.5 text-center text-xs font-medium text-loss">
                {error}
              </p>
            )}

            {/* Order Placement Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-bold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                isBuy
                  ? "bg-primary text-background hover:bg-primary-hover"
                  : "bg-loss text-white hover:bg-loss/90"
              }`}
            >
              <ArrowLeftRight
                size={19}
                className={isBuying || isSelling ? "animate-spin" : ""}
              />
              {isBuying || isSelling
                ? "در حال ثبت سفارش..."
                : isBuy
                  ? "ثبت سفارش خرید"
                  : "ثبت سفارش فروش"}
            </button>
          </div>
        </aside>
      </div>

      {/* ───  Currency Summary ─────────────────────────────────────────── */}
      <section className="mt-6 rounded-3xl border border-border bg-card p-5 md:p-6">
        <div className="flex items-center gap-2">
          <WalletCards size={20} className="text-secondary" />
          <h2 className="font-bold">وضعیت بازار کوین</h2>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MarketStatCard
            label="بیشترین قیمت بازه"
            value={`$${maxHigh.toLocaleString("en-US")}`}
          />
          <MarketStatCard
            label="کمترین قیمت بازه"
            value={`$${minLow.toLocaleString("en-US")}`}
          />
          <MarketStatCard
            label="آخرین قیمت"
            value={`$${lastClose.toLocaleString("en-US")}`}
          />
          <MarketStatCard label="آخرین بروزرسانی" value={formattedLastUpdate} />
        </div>
      </section>
    </div>
  );
}
