export default function ProfileFormSkeleton() {
  return (
    <div
      className="mt-6 animate-pulse"
      role="status"
      aria-label="در حال دریافت اطلاعات حساب"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <div className="mb-2 h-4 w-20 rounded bg-surface" />
          <div className="h-12 rounded-xl bg-surface" />
        </div>

        <div>
          <div className="mb-2 h-4 w-12 rounded bg-surface" />
          <div className="h-12 rounded-xl bg-surface" />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <div className="h-12 w-36 rounded-xl bg-surface" />
      </div>

      <span className="sr-only">در حال دریافت اطلاعات حساب...</span>
    </div>
  );
}
