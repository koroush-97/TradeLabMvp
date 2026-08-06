"use client";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { authService } from "@/services/auth-service";
import type { RegisterPayload, RegisterResponse } from "@/types/register";

export function useRegister() {
  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: (payload) => authService.register(payload),
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
}
