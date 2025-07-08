"use client";

import { useState } from "react";
import { LoginModal } from "./login-modal";
import { SignUpModal } from "./signup-modal";
import { EmailVerifyModal } from "./verify-modal";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [step, setStep] = useState<"login" | "verify" | "signup">("login");
  const [verifiedEmail, setVerifiedEmail] = useState<string>("");

  if (!isOpen) return null;

  const handleVerifySuccess = (email: string) => {
    setVerifiedEmail(email);
    setStep("signup");
  };

  return (
    <>
      <div
        className={`transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {step === "login" && (
          <LoginModal
            isOpen={isOpen}
            onClose={onClose}
            onSignUpClick={() => setStep("verify")} // 이메일 인증 단계로
          />
        )}

        {step === "verify" && (
          <EmailVerifyModal
            isOpen={isOpen}
            onClose={onClose}
            onLoginClick={() => setStep("login")}
            onSignUpClick={handleVerifySuccess} // 인증 성공 시 이메일과 함께 회원가입 폼 열기
          />
        )}

        {step === "signup" && (
          <SignUpModal
            isOpen={isOpen}
            onClose={onClose}
            onLoginClick={() => setStep("login")}
            verifiedEmail={verifiedEmail} // 인증된 이메일 전달
          />
        )}
      </div>
    </>
  );
}
