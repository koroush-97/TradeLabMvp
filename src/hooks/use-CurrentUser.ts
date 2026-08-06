"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user-service";
import { MeResponse } from "@/types/MeResponse";
import { ChangePasswordPayload, UpdateProfilePayload } from "@/types/settings";

export const CURRENT_USER_QUERY_KEY = ["CurrentUser"] as const;

export function useCurrentUser(enabled = true) {
  return useQuery<MeResponse>({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: () => userService.me(),
    enabled,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      userService.updateProfile(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, data);
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) =>
      userService.changePassword(payload),
  });
}
