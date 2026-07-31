import apiClient from "@/lib/api-client";
import type { RegisterPayload, RegisterResponse } from "@/types/register";
import type { LoginPayload, LoginResponse } from "@/types/login";

export const authService = {
  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>(
      "/api/auth/register",
      payload,
    );

    return response.data;
  },

  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      "/api/auth/login",
      payload,
    );
    return response.data;
  },
};
