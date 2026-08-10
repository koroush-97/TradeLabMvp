"use client";

import {
  ArrowLeftRight,
  History,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

// Components

import { StatCard } from "./_components/stat-card";
import { AssetRow } from "./_components/asset-row";
import Link from "next/link";

// Hooks
import { useCurrentUser } from "@/hooks/use-CurrentUser";
import { useMyWallet } from "@/hooks/use-Wallet";
import { useMyHoldings } from "@/hooks/use-Holdings";
import { useMemo } from "react";
// Utils
import {
  formatMoney,
  formatSignedMoney,
  formatSignedPercent,
} from "@/utils/formatters";
import { DonutChart } from "./_components/DonutChart";

export default function DashboardPage() {
  const { data: user, isLoading: isUserLoading } = useCurrentUser(true);

  const {
    data: wallet,
    isLoading: isWalletLoading,
    isError: isWalletError,
  } = useMyWallet();

  const {
    data: holdings = [],
    isLoading: isHoldingsLoading,
    isError: isHoldingsError,
  } = useMyHoldings();

  const isLoading = isUserLoading || isWalletLoading || isHoldingsLoading;

  const hasDataError = isWalletError || isHoldingsError;

  //  just asstess thast more then 0
  const activeHoldings = useMemo(() => {
    return holdings.filter((holding) => Number(holding.quantity) > 0);
  }, [holdings]);

  // sum of value of coins
  const totalCryptoValue = useMemo(() => {
    return activeHoldings.reduce((sum, holding) => {
      return sum + Number(holding.currentValue || 0);
    }, 0);
  }, [activeHoldings]);

  // cash of wallet
  const cashBalance = useMemo(() => {
    return Number(wallet?.cashBalance || 0);
  }, [wallet?.cashBalance]);

  // all value of cash and coins
  const totalPortfolioValue = useMemo(() => {
    return cashBalance + totalCryptoValue;
  }, [cashBalance, totalCryptoValue]);

  //  Asset profit and loss collection
  const totalProfitLoss = useMemo(() => {
    return activeHoldings.reduce((sum, holding) => {
      return sum + Number(holding.profitLoss || 0);
    }, 0);
  }, [activeHoldings]);

  // Percentage of total profit and loss based on total purchase cost
  const totalProfitLossPercentage = useMemo(() => {
    const totalCost = activeHoldings.reduce((sum, holding) => {
      return sum + Number(holding.totalCost || 0);
    }, 0);

    if (totalCost === 0) {
      return 0;
    }

    return (totalProfitLoss / totalCost) * 100;
  }, [activeHoldings, totalProfitLoss]);

  //  Three assets with the highest current value
  const topHoldings = useMemo(() => {
    return [...activeHoldings]
      .sort((a, b) => Number(b.currentValue || 0) - Number(a.currentValue || 0))
      .slice(0, 3);
  }, [activeHoldings]);

  const fullName = user?.data?.user?.fullName || "تریدر";

  const portfolioValueText = `$${formatMoney(totalPortfolioValue)}`;
  const profitLossText = formatSignedMoney(totalProfitLoss);
  const profitLossPercentageText = formatSignedPercent(
    totalProfitLossPercentage,
  );

  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* title of page*/}
      <section>
        <p className="text-sm text-muted">نمای کلی حساب آزمایشی</p>

        <h2 className="mt-1 text-2xl font-black md:text-3xl">
          خوش آمدی، {isUserLoading ? "..." : fullName} عزیز!
        </h2>
      </section>

      {/* errorr handleing info */}
      {hasDataError && (
        <div className="rounded-2xl border border-loss/20 bg-loss/10 p-4 text-sm text-loss">
          دریافت اطلاعات داشبورد با خطا مواجه شد. لطفاً دوباره تلاش کنید.
        </div>
      )}

      {/* Statistical cards*/}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          label="ارزش کل پورتفولیو"
          value={isLoading ? "..." : portfolioValueText}
          icon={<Wallet size={20} className="text-secondary" />}
        />

        <StatCard
          label="سود و زیان کل"
          value={isLoading ? "..." : profitLossText}
          icon={
            totalProfitLoss >= 0 ? (
              <TrendingUp size={20} className="text-profit" />
            ) : (
              <TrendingDown size={20} className="text-loss" />
            )
          }
          isProfit={totalProfitLoss >= 0}
        />

        <StatCard
          label="دارایی‌های فعال"
          value={
            isLoading
              ? "..."
              : new Intl.NumberFormat("fa-IR").format(activeHoldings.length)
          }
          icon={<ArrowLeftRight size={20} className="text-info" />}
        />
      </section>

      {/* Portfolio status summary */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-5 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">موجودی نقدی کیف پول</p>
              <p className="mt-2 text-xl font-black">
                {isLoading ? "..." : `$${formatMoney(cashBalance)}`}
              </p>
            </div>

            <Wallet size={22} className="text-secondary" />
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted">درصد سود و زیان</p>
              <p
                className={`mt-2 text-xl font-black ${
                  totalProfitLoss >= 0 ? "text-profit" : "text-loss"
                }`}
              >
                {isLoading ? "..." : profitLossPercentageText}
              </p>
            </div>

            {totalProfitLoss >= 0 ? (
              <TrendingUp size={22} className="text-profit" />
            ) : (
              <TrendingDown size={22} className="text-loss" />
            )}
          </div>
        </div>
      </section>

      {/* chart */}
      <section className="rounded-3xl border border-border bg-card p-5 md:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-bold">عملکرد حساب</h3>
            <p className="mt-1 text-xs text-muted">
              تغییرات ارزش حساب در هفته اخیر
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs ${
              totalProfitLoss >= 0
                ? "bg-profit/10 text-profit"
                : "bg-loss/10 text-loss"
            }`}
          >
            {isLoading ? "..." : profitLossPercentageText}
          </span>
        </div>
        <DonutChart />
      </section>

      {/* Recent assets*/}
      <section className="rounded-3xl border border-border bg-card p-5 md:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-bold">دارایی‌های اخیر</h3>
            <p className="mt-1 text-xs text-muted">
              دارایی‌هایی با بیشترین ارزش در پورتفولیو
            </p>
          </div>

          <Link
            href="dashboard/assets"
            className="cursor-pointer text-xs text-primary "
          >
            مشاهده همه
          </Link>
        </div>

        <div className="space-y-4">
          {isHoldingsLoading && (
            <p className="py-6 text-center text-sm text-muted">
              در حال دریافت دارایی‌ها...
            </p>
          )}

          {!isHoldingsLoading &&
            !isHoldingsError &&
            topHoldings.length === 0 && (
              <div className="py-6 text-center">
                <History size={28} className="mx-auto mb-3 text-muted" />

                <p className="text-sm text-muted">هنوز دارایی فعالی ندارید.</p>
              </div>
            )}

          {!isHoldingsLoading &&
            !isHoldingsError &&
            topHoldings.map((holding) => {
              const symbol = holding.symbol.toUpperCase();
              const currentPrice = Number(holding.currentPrice || 0);
              const profitLossPercentage = Number(
                holding.profitLossPercentage || 0,
              );

              return (
                <AssetRow
                  key={holding.id}
                  name={holding.name}
                  symbol={symbol}
                  price={`$${formatMoney(currentPrice)}`}
                  change={formatSignedPercent(profitLossPercentage)}
                />
              );
            })}
        </div>
      </section>
    </div>
  );
}
