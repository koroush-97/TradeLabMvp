const TOKEN_KEY = "token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export const saveToken = (token: string) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(TOKEN_KEY, token);
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(TOKEN_KEY);
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
