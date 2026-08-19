import Link from "next/link";
import type { ReactNode } from "react";

type NavItemProps = {
  icon: ReactNode;
  label: string;
  href: string;
  active?: boolean;
};

export function NavItem({ icon, label, href, active = false }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all ${
        active
          ? "bg-primary font-bold text-background"
          : "text-muted-foreground hover:bg-card hover:text-foreground"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
