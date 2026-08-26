"use client";

import {
  useState,
  type ChangeEventHandler,
  type HTMLInputTypeAttribute,
} from "react";
import { Eye, EyeOff } from "lucide-react";

interface SettingsFieldProps {
  id: string;
  label: string;
  value: string;
  type?: HTMLInputTypeAttribute;
  direction?: "rtl" | "ltr";
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  showPasswordToggle?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function SettingsField({
  id,
  label,
  value,
  type = "text",
  direction = "rtl",
  placeholder,
  disabled = false,
  readOnly = false,
  autoComplete,
  showPasswordToggle = false,
  onChange,
}: SettingsFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const canTogglePassword = type === "password" && showPasswordToggle;

  const inputType = canTogglePassword && isPasswordVisible ? "text" : type;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-muted-foreground"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          dir={direction}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={autoComplete}
          onChange={onChange}
          className="w-full text-right  rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 read-only:cursor-default"
        />

        {canTogglePassword ? (
          <button
            type="button"
            onClick={() =>
              setIsPasswordVisible((previousValue) => !previousValue)
            }
            disabled={disabled}
            aria-label={
              isPasswordVisible ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"
            }
            aria-pressed={isPasswordVisible}
            className="absolute inset-y-0 left-0 flex w-12 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPasswordVisible ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        ) : null}
      </div>
    </div>
  );
}
