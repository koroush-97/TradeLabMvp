"use client";
// @hooks
import { useMutation } from "@tanstack/react-query";

// @ components
import toast from "react-hot-toast";

// @services
import { authService } from "@/services/auth-service";
import type { LoginPayload, LoginResponse } from "@/types/login";

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: (payload) => authService.login(payload),

    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
}
