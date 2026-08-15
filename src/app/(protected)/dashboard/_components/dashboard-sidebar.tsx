"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogout } from "@/hooks/use-logout";
import {
  ArrowLeftRight,
  History,
  LayoutDashboard,
  LogOut,
  Settings,
  WalletCards,
} from "lucide-react";
import { NavItem } from "./nav-item";

export function DashboardSidebar() {
  const pathname = usePathname();
  const handleLogout = useLogout();
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-l border-border bg-surface p-5 md:flex">
      {/* لوگو */}
      <Link href="/" className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-lg font-black text-primary">
          T
        </div>

        <div>
          <p className="font-black text-foreground">TradeLab</p>
          <p className="text-xs text-muted">تمرین بدون ریسک</p>
        </div>
      </Link>

      {/* منوی اصلی */}
      <nav className="flex flex-1 flex-col gap-2">
        <NavItem
          href="/dashboard"
          icon={<LayoutDashboard size={20} />}
          label="داشبورد"
          active={pathname === "/dashboard"}
        />

        <NavItem
          href="/dashboard/trade"
          icon={<ArrowLeftRight size={20} />}
          label="معاملات"
          active={pathname.startsWith("/dashboard/trade")}
        />

        <NavItem
          href="/dashboard/assets"
          icon={<WalletCards size={20} />}
          label="دارایی‌ها"
          active={pathname.startsWith("/dashboard/assets")}
        />

        <NavItem
          href="/dashboard/history"
          icon={<History size={20} />}
          label="تاریخچه"
          active={pathname.startsWith("/dashboard/history")}
        />
      </nav>

      {/* بخش پایین سایدبار */}
      <div className="border-t border-border pt-5">
        <NavItem
          href="/dashboard/settings"
          icon={<Settings size={20} />}
          label="تنظیمات"
          active={pathname.startsWith("/dashboard/settings")}
        />

        <button
          onClick={handleLogout}
          className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-loss transition-colors hover:bg-loss/10"
        >
          <LogOut size={20} />
          <span>خروج</span>
        </button>
      </div>
    </aside>
  );
}
