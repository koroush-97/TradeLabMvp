export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

export type UserRole = "user" | "admin";
export type UserStatus = "active" | "inactive" | "suspended";

export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar: string | null;
  createdAt: string;
}

export interface RegisterResponse {
  success: true;
  message: string;
  data: {
    user: AuthUser;
  };
}
