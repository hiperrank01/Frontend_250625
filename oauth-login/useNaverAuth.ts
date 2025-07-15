
import { naverLogin } from "@/api/auth-api";
import { useMutation } from "@tanstack/react-query";

export const useNaverLogin = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  return useMutation({
    mutationFn: ({ code, state }: { code: string; state: string }) =>
      naverLogin(code, state),
    onSuccess,
    onError,
  });
};
