export interface AuthState {
  accessToken: string;
  email: string;
  nm: string;
  isHydrated: boolean;
  setAuth: (authData: { accessToken: string; email: string; nm: string }) => void;
  clearAuth: () => void;
  setHydrated: (hydrated: boolean) => void;
}
