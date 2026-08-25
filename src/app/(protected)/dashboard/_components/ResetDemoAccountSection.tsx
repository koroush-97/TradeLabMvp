import Link from "next/link";
import { CircleHelp, RefreshCcw, ShieldAlert } from "lucide-react";

type ResetDemoAccountSectionProps = {
  onResetClick: () => void;
  isResetting?: boolean;
};

export default function ResetDemoAccountSection({
  onResetClick,
  isResetting = false,
}: ResetDemoAccountSectionProps) {
  return (
    <section className="rounded-3xl border border-loss/30 bg-loss/5 p-5 md:p-6">
      <div className="flex items-start gap-3">
        <ShieldAlert size={23} className="mt-0.5 shrink-0 text-loss" />

        <div>
          <h2 className="font-bold text-loss">بخش حساس حساب تمرینی</h2>

          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            با ریست‌کردن حساب، تمام دارایی‌ها، سفارش‌ها و تاریخچه معاملات
            آزمایشی پاک می‌شوند. سپس موجودی اولیه حساب به{" "}
            <span className="font-bold text-foreground" dir="ltr">
              10,000 USDT
            </span>{" "}
            برمی‌گردد.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-loss/20 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <CircleHelp size={17} />
          قبل از ریست، درباره حساب تمرینی بخوانید
        </Link>

        <button
          type="button"
          onClick={onResetClick}
          disabled={isResetting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-loss px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCcw
            size={18}
            className={isResetting ? "animate-spin" : undefined}
          />

          {isResetting ? "در حال ریست‌کردن حساب..." : "ریست‌کردن حساب تمرینی"}
        </button>
      </div>
    </section>
  );
}
