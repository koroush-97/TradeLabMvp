import { isAxiosError } from "axios";

export default function getApiErrorMessage(
  error: unknown,
  fallbackMessage: string,
): string {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? error.message ?? fallbackMessage;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
}
