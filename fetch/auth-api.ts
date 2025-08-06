import { LoginParams } from "@/types/auth";
import type {
  SignupParams,
  SendVerify,
  VerifyCodeParams,
  AuthResponse,
} from "@/types/auth";
import { handleApiResponse } from "@/lib/api-utils";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_PATHS = {
  LOGIN: `${API_BASE_URL}/login/`,
  SEND_CODE: `${API_BASE_URL}/send-code/`,
  VERIFY_CODE: `${API_BASE_URL}/verify-code/`,
  SIGNUP: `${API_BASE_URL}/signup/`,
  GOOGLE_LOGIN: `${API_BASE_URL}/google/verify/`,
  NAVER_LOGIN: `${API_BASE_URL}/naver/verify/`,
};

export async function login({
  email,
  password,
}: LoginParams): Promise<AuthResponse> {
  const res = await fetch(API_PATHS.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eml_adr: email, password }),
  });
  return handleApiResponse(res);
}

export async function SendVerifyCode(data: SendVerify): Promise<any> {
  const response = await fetch(API_PATHS.SEND_CODE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleApiResponse(response);
}

export async function verify(data: VerifyCodeParams): Promise<any> {
  const response = await fetch(API_PATHS.VERIFY_CODE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleApiResponse(response);
}

export async function SignUp(data: SignupParams): Promise<any> {
  const response = await fetch(API_PATHS.SIGNUP, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleApiResponse(response);
}

export async function googleLogin(idToken: string): Promise<AuthResponse> {
  const res = await fetch(API_PATHS.GOOGLE_LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_token: idToken }),
  });
  return handleApiResponse(res);
}

export async function naverLogin(
  code: string,
  state: string
): Promise<AuthResponse> {
  const res = await fetch(API_PATHS.NAVER_LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, state }),
  });
  return handleApiResponse(res);
}
