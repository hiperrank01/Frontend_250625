import { useMutation } from "@tanstack/react-query";
import { SignUp } from "@/fetch/auth-api";
import { SignUpRequest } from "@/types/sign-up";

interface UseSignUpMutationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useSignUpMutation = (options?: UseSignUpMutationOptions) => {
  return useMutation<any, Error, SignUpRequest>({
    mutationFn: SignUp,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.();
    },
    onError: (error, variables, context) => {
      options?.onError?.(error);
    },
  });
};
