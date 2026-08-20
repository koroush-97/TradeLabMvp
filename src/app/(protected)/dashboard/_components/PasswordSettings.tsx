"use client";

import { useState } from "react";
import { KeyRound } from "lucide-react";

import ChangePasswordForm from "./ChangePasswordForm";

export default function PasswordSettings() {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const handleToggleChangePasswordForm = () => {
    setIsChangePasswordOpen((previousState) => !previousState);
  };

  const handleCloseChangePasswordForm = () => {
    setIsChangePasswordOpen(false);
  };

  return (
    <section className="rounded-3xl border border-border bg-card p-5 md:p-6">
      <div className="flex items-center gap-2">
        <KeyRound size={21} className="shrink-0 text-info" />

        <div>
          <h2 className="font-bold">امنیت حساب</h2>

          <p className="mt-1 text-sm text-muted">
            در این بخش می‌توانی رمز عبور حسابت را تغییر دهی.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium">رمز عبور حساب</p>

          <p className="mt-1 text-sm text-muted">
            برای امنیت بیشتر، رمز عبور خود را به‌صورت دوره‌ای تغییر بده.
          </p>
        </div>

        <button
          type="button"
          onClick={handleToggleChangePasswordForm}
          aria-expanded={isChangePasswordOpen}
          aria-controls="change-password-form"
          className="shrink-0 rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:border-primary/50 hover:bg-card"
        >
          {isChangePasswordOpen ? "بستن فرم" : "تغییر رمز عبور"}
        </button>
      </div>

      {isChangePasswordOpen ? (
        <ChangePasswordForm onCancel={handleCloseChangePasswordForm} />
      ) : null}
    </section>
  );
}
