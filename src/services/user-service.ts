import apiClient from "@/lib/api-client";
import type { MeResponse } from "@/types/MeResponse";
import type {
  ChangePasswordPayload,
  ChangePasswordResponse,
  UpdateProfilePayload,
} from "@/types/settings";

export const userService = {
  async me(): Promise<MeResponse> {
    const response = await apiClient.get<MeResponse>("/api/auth/me");

    return response.data;
  },

  async updateProfile(payload: UpdateProfilePayload): Promise<MeResponse> {
    const response = await apiClient.patch<MeResponse>("/api/auth/me", payload);

    return response.data;
  },

  async changePassword(
    payload: ChangePasswordPayload,
  ): Promise<ChangePasswordResponse> {
    const response = await apiClient.patch<ChangePasswordResponse>(
      "/api/auth/me/password",
      payload,
    );

    return response.data;
  },
};
