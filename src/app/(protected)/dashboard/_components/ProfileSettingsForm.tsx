import type { FormEvent } from "react";
import { useState } from "react";
import { RotateCcw, Save } from "lucide-react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

import type { LoginUser } from "@/types/login";
import { useUpdateProfile } from "@/hooks/use-CurrentUser";

import SettingsField from "./SettingsField";

interface ProfileFormState {
  fullName: string;
  email: string;
}

interface ProfileSettingsFormProps {
  user: LoginUser;
}

interface ApiErrorResponse {
  success: false;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ProfileSettingsForm({
  user,
}: ProfileSettingsFormProps) {
  const [profileForm, setProfileForm] = useState<ProfileFormState>({
    fullName: user.fullName,
    email: user.email,
  });

  const [submitError, setSubmitError] = useState("");

  const updateProfileMutation = useUpdateProfile();

  const normalizedFullName = profileForm.fullName.trim();
  const normalizedEmail = profileForm.email.trim();

  const isProfileChanged =
    normalizedFullName !== user.fullName || normalizedEmail !== user.email;

  const isNameValid = normalizedFullName.length >= 2;
  const isEmailValid = EMAIL_REGEX.test(normalizedEmail);
  const isProfileValid = isNameValid && isEmailValid;

  const handleProfileFieldChange = (
    field: keyof ProfileFormState,
    value: string,
  ) => {
    setProfileForm((previousForm) => ({
      ...previousForm,
      [field]: value,
    }));

    if (submitError) {
      setSubmitError("");
    }
  };

  const handleResetForm = () => {
    setProfileForm({
      fullName: user.fullName,
      email: user.email,
    });

    setSubmitError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !isProfileChanged ||
      !isProfileValid ||
      updateProfileMutation.isPending
    ) {
      return;
    }

    setSubmitError("");

    updateProfileMutation.mutate(
      {
        fullName: normalizedFullName,
        email: normalizedEmail,
      },
      {
        onSuccess: (response) => {
          toast.success(
            response.message || "اطلاعات پروفایل با موفقیت به‌روزرسانی شد.",
          );
        },

        onError: (error) => {
          if (error instanceof AxiosError) {
            const apiError = error.response?.data as
              | ApiErrorResponse
              | undefined;

            setSubmitError(
              apiError?.message ??
                "به‌روزرسانی اطلاعات پروفایل با خطا مواجه شد.",
            );

            return;
          }

          setSubmitError("به‌روزرسانی اطلاعات پروفایل با خطا مواجه شد.");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <SettingsField
          id="display-name"
          label="نام نمایشی"
          value={profileForm.fullName}
          autoComplete="name"
          disabled={updateProfileMutation.isPending}
          onChange={(event) =>
            handleProfileFieldChange("fullName", event.target.value)
          }
        />

        <SettingsField
          id="email"
          label="ایمیل"
          type="email"
          value={profileForm.email}
          direction="ltr"
          autoComplete="email"
          disabled={updateProfileMutation.isPending}
          onChange={(event) =>
            handleProfileFieldChange("email", event.target.value)
          }
        />
      </div>

      {isProfileChanged && !isNameValid ? (
        <p className="mt-3 text-sm text-loss">
          نام نمایشی باید حداقل دو کاراکتر باشد.
        </p>
      ) : null}

      {isProfileChanged && isNameValid && !isEmailValid ? (
        <p className="mt-3 text-sm text-loss">
          فرمت ایمیل وارد شده معتبر نیست (مثال: user@example.com).
        </p>
      ) : null}

      {submitError ? (
        <p className="mt-3 text-sm text-loss" role="alert">
          {submitError}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {isProfileChanged ? (
          <button
            type="button"
            onClick={handleResetForm}
            disabled={updateProfileMutation.isPending}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary/50 hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw size={17} />
            لغو تغییرات
          </button>
        ) : null}

        <button
          type="submit"
          disabled={
            !isProfileChanged ||
            !isProfileValid ||
            updateProfileMutation.isPending
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-background transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save
            size={18}
            className={updateProfileMutation.isPending ? "animate-spin" : ""}
          />

          {updateProfileMutation.isPending
            ? "در حال ذخیره..."
            : "ذخیره تغییرات"}
        </button>
      </div>
    </form>
  );
}
