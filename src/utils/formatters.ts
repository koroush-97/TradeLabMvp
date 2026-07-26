export function formatNumber(
  value: number | string,
  maximumFractionDigits = 8,
): string {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return "0";

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(numericValue);
}

export function formatMoney(value: number | string): string {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return "0.00";

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
}

export function formatSignedMoney(value: number | string): string {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return "$0.00";

  const sign = numericValue > 0 ? "+" : numericValue < 0 ? "-" : "";
  return `${sign}$${formatMoney(Math.abs(numericValue))}`;
}

export function formatSignedPercent(value: number | string): string {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return "0.00%";

  const sign = numericValue > 0 ? "+" : numericValue < 0 ? "-" : "";
  return `${sign}${Math.abs(numericValue).toFixed(2)}%`;
}

export const COIN_ICONS: Record<string, string> = {
  btc: "₿",
  eth: "Ξ",
  sol: "◎",
  usdt: "$",
};

export function getCoinIcon(symbol: string): string {
  return COIN_ICONS[symbol.toLowerCase()] ?? "◎";
}

export const COIN_COLORS: Record<string, string> = {
  btc: "bg-amber-500",
  eth: "bg-blue-500",
  usdt: "bg-emerald-500",
  sol: "bg-purple-500",
  bnb: "bg-yellow-500",
};

export function getCoinColor(symbol: string): string {
  return COIN_COLORS[symbol.toLowerCase()] ?? "bg-primary";
}
