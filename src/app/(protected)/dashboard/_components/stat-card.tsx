import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string;
  icon: ReactNode;
  isProfit?: boolean;
};

export function StatCard({
  label,
  value,
  icon,
  isProfit = false,
}: StatCardProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <div className="mb-4 flex items-start justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        {icon}
      </div>

      <p
        className={`text-2xl font-black ${
          isProfit ? "text-profit" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
