"use client";

import { Bell, Settings2, UserRound } from "lucide-react";

import SettingToggle from "../_components/SettingToggle";
import ProfileSettingsForm from "../_components/ProfileSettingsForm";
import ProfileLoadError from "../_components/ProfileLoadError";
import ProfileFormSkeleton from "../_components/ProfileFormSkeleton";
import PasswordSettings from "../_components/PasswordSettings";
import ResetDemoAccountSection from "../_components/ResetDemoAccountSection";

import { useCurrentUser } from "@/hooks/use-CurrentUser";
import { useResetDemoAccount } from "@/hooks/use-ResetDemoAccount";

export default function SettingsPage() {
  const {
    data: currentUserResponse,
    isLoading: isUserLoading,
    isError: isUserError,
    isFetching: isUserFetching,
    refetch: refetchCurrentUser,
  } = useCurrentUser(true);

  const { mutate: resetDemoAccount } = useResetDemoAccount();

  const user = currentUserResponse?.data.user;

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-8 md:px-8">
      {/* Page title */}
      <section>
        <p className="text-sm text-muted">مدیریت حساب و محیط تمرینی</p>

        <h1 className="mt-1 text-2xl font-black md:text-3xl">تنظیمات</h1>
      </section>

      {/* Account information */}
      <section className="rounded-3xl border border-border bg-card p-5 md:p-6">
        <div className="flex items-center gap-2">
          <UserRound size={21} className="shrink-0 text-primary" />

          <div>
            <h2 className="font-bold">اطلاعات حساب</h2>

            <p className="mt-1 text-sm text-muted">
              میتوانید روی فیلد ها کلیک کنید و اطلاعات خود را ویرایش کنید
            </p>
          </div>
        </div>

        {isUserLoading ? <ProfileFormSkeleton /> : null}

        {!isUserLoading && isUserError ? (
          <ProfileLoadError
            isRetrying={isUserFetching}
            onRetry={() => void refetchCurrentUser()}
          />
        ) : null}

        {!isUserLoading && !isUserError && user ? (
          <ProfileSettingsForm
            key={`${user.id}-${user.fullName}-${user.email}`}
            user={user}
          />
        ) : null}

        {!isUserLoading && !isUserError && !user ? (
          <div className="mt-6 rounded-2xl border border-border bg-surface p-4 text-sm text-muted-foreground">
            اطلاعاتی برای نمایش وجود ندارد.
          </div>
        ) : null}
      </section>

      {/* Account Security */}
      <PasswordSettings />

      {/* Notification Settings Guide */}
      <section className="rounded-3xl border border-primary/20 bg-primary/10 p-5">
        <div className="flex items-start gap-3">
          <Settings2 size={21} className="mt-0.5 shrink-0 text-primary" />

          <p className="text-sm leading-7 text-muted-foreground">
            تغییرات بخش اعلان‌ها فعلاً نمایشی هستند؛ در نسخه اصلی این تنظیمات به
            حساب کاربر متصل و ذخیره خواهند شد.
          </p>
        </div>

        {/* notification settings */}
        <div className="mt-5 w-full rounded-3xl border border-border bg-card p-5 md:p-6">
          <div className="flex items-center gap-2">
            <Bell size={21} className="shrink-0 text-secondary" />

            <div>
              <h2 className="font-bold">اعلان‌ها</h2>

              <p className="mt-1 text-sm text-muted">
                انتخاب کن چه پیام‌هایی در محیط تمرینی به تو نمایش داده شوند.
              </p>
            </div>
          </div>

          <div className="mt-6 divide-y divide-border">
            <SettingToggle
              title="اعلان تغییرات مهم قیمت"
              description="نمایش اعلان هنگام نوسان قابل‌توجه قیمت رمزارزهای سبد شما."
              defaultChecked
            />

            <SettingToggle
              title="یادآوری مرور معاملات"
              description="یادآوری برای بررسی عملکرد و تاریخچه معاملات تمرینی."
              defaultChecked
            />

            <SettingToggle
              title="نکته‌های آموزشی"
              description="نمایش راهنمای کوتاه و نکته‌های یادگیری هنگام معامله."
              defaultChecked
            />
          </div>
        </div>
      </section>

      {/* Danger zone */}
      <ResetDemoAccountSection
        onResetClick={() => {
          resetDemoAccount();
        }}
      />
    </main>
  );
}
