import { LoginParams } from "@/utils/types/auth";
import type {
  SignupParams,
  SendVerify,
  VerifyCodeParams,
} from "@/utils/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_PATHS = {
  LOGIN: `${API_BASE_URL}/login/`,
  SEND_CODE: `${API_BASE_URL}/send-code/`,
  VERIFY_CODE: `${API_BASE_URL}/verify-code/`,
  SIGNUP: `${API_BASE_URL}/signup/`,
};

export async function login({ email, password }: LoginParams) {
  const res = await fetch(API_PATHS.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eml_adr: email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "로그인 실패");
  }

  return res.json();
}

export async function SendVerifyCode(data: SendVerify): Promise<any> {
  const response = await fetch(API_PATHS.SEND_CODE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "회원가입 실패" }));
    throw new Error(error.message || "회원가입 실패");
  }

  return response.json();
}

export async function verify(data: VerifyCodeParams): Promise<any> {
  const response = await fetch(API_PATHS.VERIFY_CODE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "인증실패" }));
    throw new Error(error.message || "인증에러");
  }

  return response.json();
}

export async function SignUp(data: SignupParams): Promise<any> {
  const response = await fetch(API_PATHS.SIGNUP, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    try {
      const errorData = await response.json();
      // 서버가 구체적인 에러 메시지를 detail 또는 message 필드에 담아준다고 가정
      throw new Error(errorData.detail || errorData.message || "알 수 없는 오류가 발생했습니다.");
    } catch (e) {
      // response.json() 파싱 실패 시 (서버가 HTML 에러 페이지 등을 반환할 때)
      throw new Error(`서버 에러: ${response.status} ${response.statusText}`);
    }
  }

  return response.json();
}
