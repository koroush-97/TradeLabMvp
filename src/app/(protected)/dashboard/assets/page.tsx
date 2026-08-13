"use client";
// @components
import {
  ArrowUpRight,
  CircleDollarSign,
  PieChart,
  Plus,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import { WalletInfo } from "../_components/wallet-info";
import { HoldingRow } from "../_components/holding-row";
import PortfolioBar from "../_components/PortfolioBar";
// hooks
import { useMyHoldings } from "@/hooks/use-Holdings";
import { useMyWallet } from "@/hooks/use-Wallet";
import { useMemo } from "react";

// @ funcs
import {
  formatMoney,
  formatNumber,
  formatSignedMoney,
  formatSignedPercent,
  getCoinColor,
  getCoinIcon,
} from "@/utils/formatters";

export default function AssetsPage() {
  const { data: holdings = [], isLoading, isError } = useMyHoldings();
  const { data: walletdata } = useMyWallet();

  // Calculating active assets with useMemo
  const activeHoldings = useMemo(() => {
    return holdings.filter((holding) => Number(holding.quantity) > 0);
  }, [holdings]);

  // Number of active holdings (read directly from activeHoldings above)
  const lengthOfHoldings = activeHoldings.length;

  //  Total dollar value of all active assets
  const totalPortfolioValue = useMemo(() => {
    return activeHoldings.reduce(
      (sum, holding) => sum + Number(holding.currentValue),
      0,
    );
  }, [activeHoldings]);

  // Calculate the percentage share of each asset
  const portfolioAllocation = useMemo(() => {
    if (totalPortfolioValue === 0) return [];

    return activeHoldings
      .map((holding) => {
        const value = Number(holding.currentValue);
        const percentageNum = (value / totalPortfolioValue) * 100;

        return {
          id: holding.id,
          name: holding.name,
          symbol: holding.symbol.toUpperCase(),
          percentageNum,
          percentageStr: `${percentageNum.toFixed(2)}%`,
          colorClass: getCoinColor(holding.symbol),
        };
      })
      .sort((a, b) => b.percentageNum - a.percentageNum);
  }, [activeHoldings, totalPortfolioValue]);
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-8">
      {/* main title */}
      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted">مدیریت سرمایه آزمایشی</p>
          <h1 className="mt-1 text-2xl font-black md:text-3xl">
            کیف پول و دارایی‌ها
          </h1>
        </div>

        <Link
          href="/dashboard/trade"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-background transition-colors hover:bg-primary-hover"
        >
          <Plus size={18} />
          معامله جدید
        </Link>
      </section>

      {/* Main card value basket*/}
      <section className="overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-l from-primary/10 to-card p-6 md:p-8">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <WalletCards size={20} className="text-primary" />
              <span className="text-sm">ارزش کل سبد آزمایشی</span>
            </div>

            <p className="mt-4 text-4xl font-black md:text-5xl" dir="ltr">
              {walletdata?.cashBalance}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-profit/10 px-3 py-2 text-sm font-bold text-profit">
              <ArrowUpRight size={18} />
              <span dir="ltr">
                {" "}
                {walletdata?.updatedAt
                  ? `${walletdata.updatedAt.split("T")[0]} | ساعت ${
                      walletdata.updatedAt.split("T")[1].split(".")[0]
                    }`
                  : ""}
              </span>
              <span className="font-medium">آخرین آپدیت</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:w-107.5">
            <WalletInfo label="تعداد ارز های فعال" value={lengthOfHoldings} />
          </div>
        </div>
      </section>

      {/* Basket Distribution - Graphical View Currently*/}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-3xl border border-border bg-card p-5 md:p-6">
          <div className="flex items-center gap-2">
            <PieChart size={20} className="text-secondary" />
            <h2 className="font-bold">توزیع دارایی‌ها</h2>
          </div>

          <div className="mt-7 space-y-5">
            {portfolioAllocation.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground">
                دارایی فعالی برای نمایش توزیع وجود ندارد.
              </p>
            ) : (
              portfolioAllocation.map((item) => (
                <PortfolioBar
                  key={item.id}
                  name={item.name}
                  symbol={item.symbol}
                  percentage={item.percentageStr}
                  colorClass={item.colorClass}
                />
              ))
            )}
          </div>
        </div>

        <aside className="rounded-3xl border border-secondary/20 bg-secondary/10 p-5 md:p-6">
          <div className="flex items-center gap-2">
            <CircleDollarSign size={21} className="text-secondary" />
            <h2 className="font-bold">نکته تمرینی</h2>
          </div>

          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            همه سرمایه آزمایشی خود را روی یک رمزارز قرار نده. تنوع در سبد دارایی
            می‌تواند ریسک نوسان‌های شدید بازار را کاهش دهد.
          </p>

          <Link
            href="/learn"
            className="mt-5 inline-flex text-sm font-bold text-secondary transition-colors hover:text-foreground"
          >
            مطالعه آموزش مدیریت ریسک
          </Link>
        </aside>
      </section>

      {/* Complete list of assets*/}
      <section className="rounded-3xl border border-border bg-card p-5 md:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold">دارایی‌های شما</h2>
            <p className="mt-1 text-sm text-muted">
              وضعیت لحظه‌ای سبد سرمایه آزمایشی
            </p>
          </div>

          <span className="rounded-xl bg-surface px-3 py-2 text-xs text-muted-foreground">
            {lengthOfHoldings > 0 && (
              <span>
                {new Intl.NumberFormat("fa-IR").format(lengthOfHoldings)} دارایی
                فعال
              </span>
            )}
          </span>
        </div>

        {/* Header only on desktop*/}
        <div className="mb-3 hidden grid-cols-[1.3fr_1fr_1fr_1fr_1fr] gap-4 px-4 text-xs text-muted md:grid">
          <span>دارایی</span>
          <span className="text-left">مقدار</span>
          <span className="text-left">میانگین خرید</span>
          <span className="text-left">ارزش فعلی</span>
          <span className="text-left">سود و زیان</span>
        </div>

        <div className="space-y-3">
          {isLoading && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              در حال دریافت دارایی‌ها...
            </p>
          )}

          {isError && (
            <p className="py-6 text-center text-sm text-red-500">
              دریافت دارایی‌ها با خطا مواجه شد.
            </p>
          )}

          {!isLoading && !isError && holdings?.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              هنوز هیچ دارایی‌ای ندارید.
            </p>
          )}

          {!isLoading &&
            !isError &&
            activeHoldings.map((holding) => (
              <HoldingRow
                key={holding.id}
                icon={getCoinIcon(holding.symbol)}
                name={holding.name}
                symbol={holding.symbol.toUpperCase()}
                quantity={`${formatNumber(holding.quantity)} ${holding.symbol.toUpperCase()}`}
                averageBuyPrice={`$${formatMoney(holding.averageBuyPrice)}`}
                currentPrice={`$${formatMoney(holding.currentPrice)}`}
                totalValue={`$${formatMoney(holding.currentValue)}`}
                profitLoss={formatSignedMoney(holding.profitLoss)}
                profitLossPercent={formatSignedPercent(
                  holding.profitLossPercentage,
                )}
              />
            ))}
        </div>
      </section>
    </div>
  );
}
