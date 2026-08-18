"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRight,
  History,
  LayoutDashboard,
  LogOut,
  Settings,
  WalletCards,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function MobileMenu({ isOpen, onClose, onLogout }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <>
      {/* backdrop and clicked for close and open */}
      <button
        type="button"
        aria-label="بستن منو"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/45 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* drawer*/}
      <aside
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-50 flex h-dvh w-72 flex-col border-l border-border bg-surface p-5 shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* logo and close btn */}
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 px-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-lg font-black text-primary">
              T
            </div>

            <div>
              <p className="font-black text-foreground">TradeLab</p>
              <p className="text-xs text-muted">تمرین بدون ریسک</p>
            </div>
          </Link>

          <button
            type="button"
            aria-label="بستن منو"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            <X size={21} />
          </button>
        </div>

        {/*  main menu */}
        <nav className="flex flex-1 flex-col gap-2">
          <NavItem
            href="/dashboard"
            icon={<LayoutDashboard size={20} />}
            label="داشبورد"
            active={pathname === "/dashboard"}
            onClick={onClose}
          />

          <NavItem
            href="/dashboard/trade"
            icon={<ArrowLeftRight size={20} />}
            label="معاملات"
            active={pathname.startsWith("/dashboard/trade")}
            onClick={onClose}
          />

          <NavItem
            href="/dashboard/assets"
            icon={<WalletCards size={20} />}
            label="دارایی‌ها"
            active={pathname.startsWith("/dashboard/assets")}
            onClick={onClose}
          />

          <NavItem
            href="/dashboard/history"
            icon={<History size={20} />}
            label="تاریخچه"
            active={pathname.startsWith("/dashboard/history")}
            onClick={onClose}
          />
        </nav>

        {/*  menu dwon */}
        <div className="border-t border-border pt-5">
          <NavItem
            href="/dashboard/settings"
            icon={<Settings size={20} />}
            label="تنظیمات"
            active={pathname.startsWith("/dashboard/settings")}
            onClick={onClose}
          />

          <button
            type="button"
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-loss transition-colors hover:bg-loss/10"
          >
            <LogOut size={20} />
            <span>خروج</span>
          </button>
        </div>
      </aside>
    </>
  );
}

interface NavItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function NavItem({
  href,
  icon,
  label,
  active = false,
  onClick,
}: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-background hover:text-foreground"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
