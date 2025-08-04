import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState } from "@/types/zustand";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: "",
      email: "",
      nm: "",
      isHydrated: false,
      setAuth: (authData) =>
        set({
          accessToken: authData.accessToken,
          email: authData.email,
          nm: authData.nm,
        }),
      clearAuth: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        set({ accessToken: "", email: "", nm: "" });
      },
      setHydrated: (hydrated: boolean) => set({ isHydrated: hydrated }),
    }),
    {
      name: "userInfoStorage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
