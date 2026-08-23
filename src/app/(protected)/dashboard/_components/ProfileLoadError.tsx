import { RefreshCcw } from "lucide-react";

interface ProfileLoadErrorProps {
  isRetrying: boolean;
  onRetry: () => void;
}

export default function ProfileLoadError({
  isRetrying,
  onRetry,
}: ProfileLoadErrorProps) {
  return (
    <div
      role="alert"
      className="mt-6 flex flex-col gap-4 rounded-2xl border border-loss/20 bg-loss/5 p-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm leading-6 text-loss">
        دریافت اطلاعات حساب با خطا مواجه شد. دوباره تلاش کنید.
      </p>

      <button
        type="button"
        disabled={isRetrying}
        onClick={onRetry}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-loss/30 px-4 py-2 text-sm font-bold text-loss transition-colors hover:bg-loss/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RefreshCcw
          size={16}
          className={isRetrying ? "animate-spin" : undefined}
        />

        {isRetrying ? "در حال تلاش..." : "تلاش دوباره"}
      </button>
    </div>
  );
}
