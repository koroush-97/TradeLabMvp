"use client";

import { useMemo } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { WalletCards } from "lucide-react";
import { useMyHoldings } from "@/hooks/use-Holdings";
import { useMyWallet } from "@/hooks/use-Wallet";

type DonutChartItem = {
  name: string;
  label: string;
  value: number;
  color: string;
};

type TooltipPayloadItem = {
  payload?: DonutChartItem;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  total: number;
};

type LegendPayloadItem = {
  payload?: DonutChartItem;
};

type CustomLegendProps = {
  payload?: LegendPayloadItem[];
  total: number;
};

const ASSET_COLORS = [
  "#f59e0b",
  "#3b82f6",
  "#a855f7",
  "#06b6d4",
  "#ec",
  "#a855f7",
  "#06b6d4",
  "#ec8a6",
];

const CASH_COLOR = "#22c55e";
const OTHER_COLOR = "#64748b";

const toSafeNumber = (value: string | number | null | undefined): number => {
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
    return 0;
  }

  return parsedValue;
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
};

const formatPercentage = (value: number, total: number): string => {
  if (total <= 0) {
    return "0%";
  }

  return `${((value / total) * 100).toFixed(1)}%`;
};

function CustomTooltip({ active, payload, total }: CustomTooltipProps) {
  if (!active || !payload?.length || !payload[0]?.payload) {
    return null;
  }

  const item = payload[0].payload;

  return (
    <div
      className="rounded-lg border border-white/10 bg-slate-900/95 px-3 py-2 shadow-xl"
      dir="rtl"
    >
      <div className="mb-1 flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: item.color }}
        />

        <span className="text-sm font-medium text-slate-200">{item.label}</span>
      </div>

      <p className="text-sm text-white" dir="ltr">
        {formatCurrency(item.value)}
      </p>

      <p className="mt-0.5 text-xs text-slate-400" dir="ltr">
        {formatPercentage(item.value, total)}
      </p>
    </div>
  );
}

function CustomLegend({ payload, total }: CustomLegendProps) {
  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3"
      dir="rtl"
    >
      {payload.map((entry, index) => {
        const item = entry.payload;

        if (!item) {
          return null;
        }

        return (
          <div
            key={`${item.name}-${index}`}
            className="flex min-w-0 items-center justify-between gap-2 text-xs"
          >
            <div className="flex min-w-0 items-center gap-1.5">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />

              <span className="truncate text-slate-400">{item.label}</span>
            </div>

            <span className="shrink-0 text-slate-300" dir="ltr">
              {formatPercentage(item.value, total)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function DonutChart() {
  const {
    data: holdings = [],
    isLoading: isHoldingsLoading,
    isError: isHoldingsError,
  } = useMyHoldings();

  const {
    data: wallet,
    isLoading: isWalletLoading,
    isError: isWalletError,
  } = useMyWallet();

  const isLoading = isHoldingsLoading || isWalletLoading;
  const isError = isHoldingsError || isWalletError;

  const { chartData, totalPortfolioValue } = useMemo(() => {
    const cashBalance = toSafeNumber(wallet?.cashBalance);

    const validHoldings = holdings
      .map((holding) => ({
        name: holding.coinId,
        label: holding.symbol.toUpperCase(),
        value: toSafeNumber(holding.currentValue),
      }))
      .filter((holding) => holding.value > 0)
      .sort((a, b) => b.value - a.value);

    const maxVisibleAssets = 7;

    const visibleHoldings = validHoldings.slice(0, maxVisibleAssets);

    const hiddenHoldings = validHoldings.slice(maxVisibleAssets);

    const otherValue = hiddenHoldings.reduce(
      (sum, holding) => sum + holding.value,
      0,
    );

    const data: DonutChartItem[] = [];

    if (cashBalance > 0) {
      data.push({
        name: "cash",
        label: "Cash",
        value: cashBalance,
        color: CASH_COLOR,
      });
    }

    visibleHoldings.forEach((holding, index) => {
      data.push({
        name: holding.name,
        label: holding.label,
        value: holding.value,
        color: ASSET_COLORS[index % ASSET_COLORS.length],
      });
    });

    if (otherValue > 0) {
      data.push({
        name: "other",
        label: "Other",
        value: otherValue,
        color: OTHER_COLOR,
      });
    }

    const totalValue = data.reduce((sum, item) => sum + item.value, 0);

    return {
      chartData: data,
      totalPortfolioValue: totalValue,
    };
  }, [holdings, wallet?.cashBalance]);

  if (isLoading) {
    return (
      <div className="flex h-90 w-full animate-pulse flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/2">
        <div className="mb-4 h-44 w-44 rounded-full border-24 border-slate-700/60 border-t-emerald-500/70" />

        <div className="h-4 w-36 rounded bg-slate-700/60" />
        <div className="mt-2 h-3 w-24 rounded bg-slate-700/40" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-90 w-full flex-col items-center justify-center rounded-2xl border border-red-500/10 bg-white/2 px-6 text-center">
        <WalletCards className="mb-3 h-10 w-10 text-red-400/80" />

        <p className="text-sm font-medium text-red-300">
          خطا در دریافت اطلاعات پورتفولیو
        </p>

        <p className="mt-1 text-xs text-slate-500">
          لطفاً دوباره صفحه را بارگذاری کنید.
        </p>
      </div>
    );
  }

  if (chartData.length === 0 || totalPortfolioValue <= 0) {
    return (
      <div className="flex h-90 w-full flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/2 px-6 text-center">
        <WalletCards className="mb-3 h-10 w-10 text-slate-500" />

        <p className="text-sm font-medium text-slate-300">
          هنوز دارایی‌ای برای نمایش وجود ندارد
        </p>

        <p className="mt-1 text-xs text-slate-500">
          پس از شارژ کیف پول یا خرید دارایی، ترکیب پورتفولیو در اینجا نمایش داده
          می‌شود.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-white/5 bg-white/2 p-4 sm:p-5">
      <div className="mb-2">
        <h3 className="text-base font-semibold text-white">ترکیب دارایی‌ها</h3>

        <p className="mt-1 text-xs text-slate-500">
          درصد تفکیک ارزش فعلی کیف پول و دارایی‌ها
        </p>
      </div>

      <div className="relative h-80 w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="43%"
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={2}
              cornerRadius={4}
              stroke="transparent"
              isAnimationActive
              animationDuration={700}
            >
              {chartData.map((item) => (
                <Cell key={item.name} fill={item.color} stroke="transparent" />
              ))}
            </Pie>

            <Tooltip
              cursor={false}
              content={<CustomTooltip total={totalPortfolioValue} />}
            />

            <Legend
              verticalAlign="bottom"
              content={<CustomLegend total={totalPortfolioValue} />}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center pb-12">
          <div className="text-center" dir="rtl">
            <p className="text-[11px] text-slate-500">ارزش کل پورتفولیو</p>

            <p className="mt-1 text-lg font-bold text-white" dir="ltr">
              {formatCurrency(totalPortfolioValue)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
