"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Menu } from "lucide-react";
import { toast } from "react-hot-toast";

import { MobileMenu } from "./MobileMenu";
import { UserProfileLink } from "./UserProfileLink";
import { useLogout } from "@/hooks/use-logout";

export function DashboardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = useLogout();

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/85 px-4 backdrop-blur-md md:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="باز کردن منو"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-surface hover:text-foreground md:hidden"
          >
            <Menu size={21} />
          </button>

          <Link href="/dashboard" className="font-black text-primary md:hidden">
            TradeLab
          </Link>

          <div className="hidden md:block">
            <h1 className="text-sm font-bold text-foreground">
              پنل تمرینی TradeLab
            </h1>
            <p className="mt-0.5 text-xs text-muted">بازار آزمایشی رمزارز</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="اعلان‌ها"
            onClick={() => toast("اعلان جدیدی ندارید")}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
          >
            <Bell size={20} />
          </button>

          <UserProfileLink />
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onLogout={handleLogout}
      />
    </>
  );
}
