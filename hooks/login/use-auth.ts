"use client";

import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth-api";
import type { LoginParams } from "@/types/auth";
import { useAuthStore } from "@/store/store";
import { toast } from "sonner";
export function useLogin(onSuccess?: () => void, onError?: (err: any) => void) {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation({
    mutationFn: (data: LoginParams) => login(data),
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      console.log("로그인 API 응답", data);
      setAuth(data.access, data.user.eml_adr, data.user.nm);

      toast.success("로그인 성공! 환영합니다");

      if (onSuccess) onSuccess();
    },
    onError: (err: any) => {
      if (onError) {
        onError(err);
      } else {
        toast.error(err.message || "로그인 실패: 아이디 또는 비밀번호 확인");
      }
    },
  });
}
export function useLogout() {
  const resetAuth = useAuthStore((state) => state.clearAuth);

  return () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    resetAuth();
    toast.success("로그아웃 되었습니다");
  };
}
