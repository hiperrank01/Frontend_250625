import { useMutation } from "@tanstack/react-query";
import { GoogleData } from "@/types/google-sheet";
import { sendInquiryToSheet } from "@/fetch/google-sheet-api";
interface UseSignUpMutationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useGoogleSheet = (options?: UseSignUpMutationOptions) => {
  return useMutation<any, Error, GoogleData>({
    mutationFn: sendInquiryToSheet,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.();
    },
    onError: (error, variables, context) => {
      options?.onError?.(error);
    },
  });
};
