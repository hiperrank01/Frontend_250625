export interface AuthState {
  accessToken: string;
  email: string;
  nm: string;
  isHydrated: boolean;
  setAuth: (accessToken: string, email: string, nm: string) => void;
  clearAuth: () => void;
  setHydrated: (hydrated: boolean) => void;
}
