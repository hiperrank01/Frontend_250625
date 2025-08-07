"use client";

import { useMutation } from "@tanstack/react-query";
import { verify, API_PATHS } from "@/fetch/auth-api";
import { VerifyRequest } from "@/types/auth";

// 인증코드 요청을 위한 커스텀 훅
export const useRequestCode = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch(API_PATHS.SEND_CODE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eml_adr: email }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "코드 요청 실패");
      }
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
};

export const useVerifyCode = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation({
    mutationFn: (data: VerifyRequest) => verify(data),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
};
