export interface LoginPayload {
  email: string;
  password: string;
}

export type UserRole = "user" | "admin";

export type UserStatus = "active" | "inactive" | "suspended";

export interface LoginUser {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar: string | null;
  createdAt: string;
}

export interface LoginResponse {
  success: true;
  message: string;
  data: {
    token: string;
    user: LoginUser;
  };
}
