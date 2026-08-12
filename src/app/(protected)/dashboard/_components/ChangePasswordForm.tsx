"use client";

import { useState, type FormEvent } from "react";
import { AxiosError } from "axios";
import { RotateCcw, Save } from "lucide-react";
import toast from "react-hot-toast";

import { useChangePassword } from "@/hooks/use-CurrentUser";
import type { ChangePasswordPayload } from "@/types/settings";

import SettingsField from "./SettingsField";

interface ChangePasswordFormProps {
  onCancel: () => void;
}

interface PasswordFormState {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface ApiErrorResponse {
  success: false;
  message?: string;
}

const MIN_PASSWORD_LENGTH = 8;

const INITIAL_PASSWORD_FORM: PasswordFormState = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export default function ChangePasswordForm({
  onCancel,
}: ChangePasswordFormProps) {
  const [passwordForm, setPasswordForm] = useState<PasswordFormState>(
    INITIAL_PASSWORD_FORM,
  );

  const [submitError, setSubmitError] = useState("");

  const changePasswordMutation = useChangePassword();

  const isFormChanged =
    passwordForm.currentPassword.length > 0 ||
    passwordForm.newPassword.length > 0 ||
    passwordForm.confirmNewPassword.length > 0;

  const isCurrentPasswordValid =
    passwordForm.currentPassword.length >= MIN_PASSWORD_LENGTH;

  const isNewPasswordValid =
    passwordForm.newPassword.length >= MIN_PASSWORD_LENGTH;

  const isConfirmNewPasswordValid =
    passwordForm.confirmNewPassword.length >= MIN_PASSWORD_LENGTH;

  const doPasswordsMatch =
    passwordForm.newPassword === passwordForm.confirmNewPassword;

  const isNewPasswordDifferent =
    passwordForm.currentPassword !== passwordForm.newPassword;

  const isFormValid =
    isCurrentPasswordValid &&
    isNewPasswordValid &&
    isConfirmNewPasswordValid &&
    doPasswordsMatch &&
    isNewPasswordDifferent;

  const handleFieldChange = (field: keyof PasswordFormState, value: string) => {
    setPasswordForm((previousForm) => ({
      ...previousForm,
      [field]: value,
    }));

    if (submitError) {
      setSubmitError("");
    }
  };

  const handleResetForm = () => {
    setPasswordForm(INITIAL_PASSWORD_FORM);
    setSubmitError("");
  };

  const handleCancel = () => {
    handleResetForm();
    onCancel();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormChanged || !isFormValid || changePasswordMutation.isPending) {
      return;
    }

    setSubmitError("");

    const payload: ChangePasswordPayload = {
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
      confirmNewPassword: passwordForm.confirmNewPassword,
    };

    changePasswordMutation.mutate(payload, {
      onSuccess: (response) => {
        toast.success(response.message);

        handleResetForm();
        onCancel();
      },

      onError: (error) => {
        if (error instanceof AxiosError) {
          const apiError = error.response?.data as ApiErrorResponse | undefined;

          setSubmitError(
            apiError?.message ?? "تغییر رمز عبور با خطا مواجه شد.",
          );

          return;
        }

        setSubmitError("تغییر رمز عبور با خطا مواجه شد.");
      },
    });
  };

  return (
    <form
      id="change-password-form"
      onSubmit={handleSubmit}
      className="mt-4 rounded-2xl border border-border bg-surface p-4"
    >
      <div className="grid gap-5 md:grid-cols-3">
        <SettingsField
          id="current-password"
          label="رمز عبور فعلی"
          type="password"
          direction="ltr"
          value={passwordForm.currentPassword}
          autoComplete="current-password"
          disabled={changePasswordMutation.isPending}
          onChange={(event) =>
            handleFieldChange("currentPassword", event.target.value)
          }
          showPasswordToggle
        />

        <SettingsField
          id="new-password"
          label="رمز عبور جدید"
          type="password"
          direction="ltr"
          value={passwordForm.newPassword}
          autoComplete="new-password"
          disabled={changePasswordMutation.isPending}
          onChange={(event) =>
            handleFieldChange("newPassword", event.target.value)
          }
          showPasswordToggle
        />

        <SettingsField
          id="confirm-new-password"
          label="تکرار رمز عبور جدید"
          type="password"
          direction="ltr"
          value={passwordForm.confirmNewPassword}
          autoComplete="new-password"
          disabled={changePasswordMutation.isPending}
          onChange={(event) =>
            handleFieldChange("confirmNewPassword", event.target.value)
          }
          showPasswordToggle
        />
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <p className="text-muted">
          رمز عبور جدید باید حداقل {MIN_PASSWORD_LENGTH} کاراکتر داشته باشد.
        </p>

        {isFormChanged && !isCurrentPasswordValid ? (
          <p className="text-loss">
            رمز عبور فعلی باید حداقل {MIN_PASSWORD_LENGTH} کاراکتر باشد.
          </p>
        ) : null}

        {isFormChanged && isCurrentPasswordValid && !isNewPasswordValid ? (
          <p className="text-loss">
            رمز عبور جدید باید حداقل {MIN_PASSWORD_LENGTH} کاراکتر باشد.
          </p>
        ) : null}

        {isFormChanged &&
        isCurrentPasswordValid &&
        isNewPasswordValid &&
        !isConfirmNewPasswordValid ? (
          <p className="text-loss">
            تکرار رمز عبور جدید باید حداقل {MIN_PASSWORD_LENGTH} کاراکتر باشد.
          </p>
        ) : null}

        {isFormChanged &&
        isCurrentPasswordValid &&
        isNewPasswordValid &&
        isConfirmNewPasswordValid &&
        !doPasswordsMatch ? (
          <p className="text-loss">
            رمز عبور جدید و تکرار آن با هم یکسان نیستند.
          </p>
        ) : null}

        {isFormChanged &&
        isCurrentPasswordValid &&
        isNewPasswordValid &&
        isConfirmNewPasswordValid &&
        doPasswordsMatch &&
        !isNewPasswordDifferent ? (
          <p className="text-loss">
            رمز عبور جدید باید با رمز عبور فعلی متفاوت باشد.
          </p>
        ) : null}

        {submitError ? (
          <p className="text-loss" role="alert">
            {submitError}
          </p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleCancel}
          disabled={changePasswordMutation.isPending}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary/50 hover:bg-card disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RotateCcw size={17} />
          لغو تغییرات
        </button>

        <button
          type="submit"
          disabled={
            !isFormChanged || !isFormValid || changePasswordMutation.isPending
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-background transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save
            size={18}
            className={changePasswordMutation.isPending ? "animate-spin" : ""}
          />

          {changePasswordMutation.isPending
            ? "در حال ذخیره..."
            : "ذخیره رمز جدید"}
        </button>
      </div>
    </form>
  );
}
