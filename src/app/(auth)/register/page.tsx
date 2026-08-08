"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import type { RegisterPayload } from "@/types/register";
import { useRegister } from "@/hooks/use-register";
import getApiErrorMessage from "@/utils/getApiErrorMessage";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const { mutateAsync: registerUser, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterPayload>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterPayload) => {
    try {
      // send info of register to server
      await registerUser(data);

      // success register
      router.push("/login");
    } catch (error) {
      // error handling
      const errorMessage = getApiErrorMessage(
        error,
        "خطا در انجام عملیات ورود",
      );

      toast.error(errorMessage);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-border/80 bg-card p-8 shadow-sm">
        {/* header form */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-black text-primary">
            T
          </div>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
            ایجاد حساب در TradeLab
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            به بزرگترین شبیه‌ساز معاملاتی بپیوندید و بدون ریسک تمرین کنید.
          </p>
        </div>

        {/* body form */}
        <form
          className="mt-8 space-y-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-4">
            {/* name and fullname */}
            <div className="space-y-1.5">
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-foreground"
              >
                نام و نام خانوادگی
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="به عنوان مثال: علی محمدی"
                className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20 ${
                  errors.fullName
                    ? "border-destructive focus:border-destructive"
                    : "border-border focus:border-primary"
                }`}
                {...register("fullName", {
                  required: "وارد کردن نام و نام خانوادگی الزامی است.",
                  minLength: {
                    value: 3,
                    message: "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد.",
                  },
                })}
              />
              {errors.fullName && (
                <p className="text-xs text-destructive text-red-600">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* email*/}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                آدرس ایمیل
              </label>
              <input
                id="email"
                type="email"
                dir="ltr"
                placeholder="yourname@example.com"
                className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20 ${
                  errors.email
                    ? "border-destructive focus:border-destructive "
                    : "border-border focus:border-primary"
                }`}
                {...register("email", {
                  required: "وارد کردن ایمیل الزامی است.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "یک ایمیل معتبر وارد کنید.",
                  },
                })}
              />
              {errors.email && (
                <p className="text-xs text-destructive text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                رمز عبور
              </label>
              <input
                id="password"
                type="password"
                dir="ltr"
                placeholder="حداقل ۶ کاراکتر"
                className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20 ${
                  errors.password
                    ? "border-destructive focus:border-destructive"
                    : "border-border focus:border-primary"
                }`}
                {...register("password", {
                  required: "وارد کردن رمز عبور الزامی است.",
                  minLength: {
                    value: 6,
                    message: "رمز عبور باید حداقل ۶ کاراکتر باشد.",
                  },
                })}
              />
              {errors.password && (
                <p className="text-xs text-destructive text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* submit btn */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="relative flex w-full justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  در حال ثبت نام...
                </span>
              ) : (
                "ایجاد حساب کاربری"
              )}
            </button>
          </div>
        </form>

        {/* register link */}
        <div className="text-center text-sm text-muted-foreground">
          قبلاً ثبت‌نام کرده‌اید؟{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            وارد حساب خود شوید
          </Link>
        </div>
      </div>
    </main>
  );
}
