"use client";

import Link from "next/link";
import { ReactNode } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { isAuthenticated } from "@/utils/auth";

interface ButtonProps {
  href?: string;
  protectedHref?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  href,
  protectedHref,
  onClick,
  children,
  variant = "primary",
  className = "",
  type = "button",
}: ButtonProps) => {
  const router = useRouter();

  const baseStyles =
    "inline-block rounded-xl px-6 py-3 text-center transition-all duration-200 active:scale-[0.98]";

  const variants = {
    primary:
      "bg-primary font-bold text-background hover:bg-primary-hover shadow-lg shadow-primary/20",
    secondary:
      "bg-surface border border-border font-semibold text-foreground hover:border-primary/40 hover:bg-card",
    outline:
      "border-2 border-primary font-bold text-primary hover:bg-primary hover:text-background",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-accent",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  const handleProtectedClick = () => {
    if (isAuthenticated()) {
      router.push(protectedHref!);
      return;
    }

    toast.error("برای شروع، ابتدا وارد حساب کاربری شوید");
    router.push(`/login?redirect=${encodeURIComponent(protectedHref!)}`);
  };

  if (protectedHref) {
    return (
      <button
        type="button"
        onClick={handleProtectedClick}
        className={combinedClassName}
      >
        {children}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
};
