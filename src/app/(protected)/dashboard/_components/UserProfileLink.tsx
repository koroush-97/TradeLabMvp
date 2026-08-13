"use client";

import { useCurrentUser } from "@/hooks/use-CurrentUser";
import Link from "next/link";

function getFirstCharacter(fullName?: string) {
  const name = fullName?.trim();

  if (!name) {
    return "..";
  }

  return Array.from(name)[0];
}

export function UserProfileLink() {
  const { data, isLoading } = useCurrentUser();

  const user = data?.data.user;
  const fullName = user?.fullName ?? "کاربر";
  const firstCharacter = getFirstCharacter(user?.fullName);

  return (
    <Link
      href="/dashboard"
      title={isLoading ? "در حال دریافت اطلاعات کاربر..." : fullName}
      aria-label="رفتن به داشبورد کاربری"
      className="group flex min-w-0 items-center gap-2 rounded-xl p-1 transition-colors hover:bg-surface"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-black text-primary transition-transform group-hover:scale-105">
        {isLoading ? (
          <span className="h-4 w-4 animate-pulse rounded-full bg-primary/30" />
        ) : (
          firstCharacter
        )}
      </div>

      <span className="max-w-28 truncate text-xs font-bold text-foreground">
        {isLoading ? "..." : fullName}
      </span>
    </Link>
  );
}
