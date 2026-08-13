"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowUpRight,
  History,
  ListFilter,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { StatCard } from "../_components/stat-card";
import { TransactionRow } from "../_components/transaction-row";
import { useTradeHistory } from "@/hooks/use-TradeHistory";
import { formatMoney, formatNumber, getCoinIcon } from "@/utils/formatters";

type FilterType = "ALL" | "BUY" | "SELL";

// Helper function for date/time format
function formatTransactionDate(dateStr: string): string {
  if (!dateStr) return "-";
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return dateStr;
  }
}

export default function HistoryPage() {
  const { data: transactions = [], isLoading, isError } = useTradeHistory();
  const [filter, setFilter] = useState<FilterType>("ALL");

  // General statistics with useMemo
  const stats = useMemo(() => {
    const totalCount = transactions.length;
    const buyCount = transactions.filter(
      (t) => t.type.toLowerCase() === "buy",
    ).length;
    const sellCount = transactions.filter(
      (t) => t.type.toLowerCase() === "sell",
    ).length;

    return { totalCount, buyCount, sellCount };
  }, [transactions]);

  // Filter transactions based on selected tab
  const filteredTransactions = useMemo(() => {
    if (filter === "ALL") return transactions;
    return transactions.filter((t) => t.type.toUpperCase() === filter);
  }, [transactions, filter]);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-8">
      {/* title page */}
      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted">مرور فعالیت‌های حساب آزمایشی</p>
          <h1 className="mt-1 text-2xl font-black md:text-3xl">
            تاریخچه معاملات
          </h1>
        </div>

        <Link
          href="/dashboard/trade"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-background transition-colors hover:bg-primary-hover"
        >
          <TrendingUp size={18} />
          ثبت معامله جدید
        </Link>
      </section>

      {/* Summary of activities */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="کل معاملات"
          value={new Intl.NumberFormat("fa-IR").format(stats.totalCount)}
          icon={<History size={20} className="text-secondary" />}
        />

        <StatCard
          label="سفارش‌های خرید"
          value={new Intl.NumberFormat("fa-IR").format(stats.buyCount)}
          icon={<ArrowDownLeft size={20} className="text-profit" />}
        />

        <StatCard
          label="سفارش‌های فروش"
          value={new Intl.NumberFormat("fa-IR").format(stats.sellCount)}
          icon={<ArrowUpRight size={20} className="text-loss" />}
        />
      </section>

      {/* Order list */}
      <section className="rounded-3xl border border-border bg-card p-5 md:p-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-bold">فهرست سفارش‌ها</h2>
            <p className="mt-1 text-sm text-muted">
              تمامی خرید و فروش‌های ثبت‌شده در حساب تمرینی
            </p>
          </div>

          {/* Dynamic filters */}
          <div className="flex items-center gap-2 rounded-xl bg-surface p-1">
            <ListFilter size={17} className="mr-2 text-muted" />

            <button
              type="button"
              onClick={() => setFilter("ALL")}
              className={`rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
                filter === "ALL"
                  ? "bg-primary text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              همه
            </button>

            <button
              type="button"
              onClick={() => setFilter("BUY")}
              className={`rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
                filter === "BUY"
                  ? "bg-primary text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              خرید
            </button>

            <button
              type="button"
              onClick={() => setFilter("SELL")}
              className={`rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
                filter === "SELL"
                  ? "bg-primary text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              فروش
            </button>
          </div>
        </div>

        {/* Column titles on desktop */}
        <div className="mb-3 hidden grid-cols-[1.3fr_0.8fr_1fr_1fr_1fr_1fr] gap-4 px-4 text-xs text-muted md:grid">
          <span>رمزارز</span>
          <span className="text-left">نوع</span>
          <span className="text-left">مقدار</span>
          <span className="text-left">قیمت اجرا</span>
          <span className="text-left">مبلغ کل</span>
          <span className="text-left">زمان ثبت</span>
        </div>

        <div className="space-y-3">
          {isLoading && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              در حال دریافت تاریخچه معاملات...
            </p>
          )}

          {isError && (
            <p className="py-6 text-center text-sm text-red-500">
              خطا در دریافت تاریخچه معاملات.
            </p>
          )}

          {!isLoading && !isError && filteredTransactions.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              هیچ سفارشی یافت نشد.
            </p>
          )}

          {!isLoading &&
            !isError &&
            filteredTransactions.map((tx) => {
              const price = tx.price_at_time ?? tx.price ?? 0;
              const total = tx.total_value ?? tx.totalCost ?? 0;
              const sym = (tx.symbol || "").toUpperCase();

              return (
                <TransactionRow
                  key={tx.id}
                  icon={getCoinIcon(tx.symbol || "")}
                  coinName={tx.name || sym}
                  symbol={sym}
                  type={tx.type.toUpperCase() as "BUY" | "SELL"}
                  quantity={`${formatNumber(tx.quantity)} ${sym}`}
                  price={`$${formatMoney(price)}`}
                  total={`$${formatMoney(total)}`}
                  date={formatTransactionDate(tx.created_at)}
                />
              );
            })}
        </div>
      </section>

      {/* Educational box */}
      <section className="rounded-3xl border border-warning/20 bg-warning/10 p-5 md:p-6">
        <div className="flex items-start gap-3">
          <TrendingDown size={22} className="mt-0.5 shrink-0 text-warning" />

          <div>
            <h2 className="font-bold">مرور معاملات؛ بخش مهم یادگیری ترید</h2>

            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              بعد از هر معامله بررسی کن چرا وارد یا خارج شدی، چه نتیجه‌ای گرفتی
              و چه چیزی را می‌توانی در معامله بعدی بهتر انجام دهی. تاریخچه
              معاملات، ابزار اصلی ساختن یک استراتژی منظم است.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
