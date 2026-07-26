import type { LoginUser } from "@/types/login";

export interface MeResponse {
  success: true;
  message: string;
  data: {
    user: LoginUser;
  };
}
