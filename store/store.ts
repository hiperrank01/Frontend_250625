import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState } from "@/types/zustand";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: "",
      email: "",
      nm: "",
      isHydrated: false, // 초기 false
      setAuth: (accessToken: string, email: string, nm: string) =>
        set({ accessToken, email, nm }),
      clearAuth: () => set({ accessToken: "", email: "", nm: "" }),
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
