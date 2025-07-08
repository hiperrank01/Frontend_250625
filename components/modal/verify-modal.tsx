"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useRequestCode, useVerifyCode } from "@/hooks/sign-up/use-verify";
import { SignUpProps } from "@/types/sign-up";
import { GoogleSignInButton } from "@/google/GoogleSignInButton";
import { toast } from "sonner";
export function EmailVerifyModal({
  isOpen,
  onClose,
  onLoginClick,
  onSignUpClick,
}: SignUpProps) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"input" | "verify">("input");

  const { mutate: requestCode, isPending: isRequestingCode } = useRequestCode({
    onSuccess: () => {
      alert("이메일로 인증코드를 전송했습니다.");
      setStep("verify");
    },
    onError: (err: Error) => {
      alert(err.message);
    },
  });

  const { mutate: verifyCode, isPending: isVerifyingCode } = useVerifyCode({
    onSuccess: () => {
      alert("이메일 인증 성공!");
      onSignUpClick(email);
    },
    onError: (err: Error) => {
      alert(err.message || "인증 실패");
    },
  });
  const handleGoogleSuccess = (response: { credential?: string }) => {
    toast.success("Google 로그인 성공! 백엔드 검증 필요.");

    onClose();
  };

  const handleGoogleError = (error: Error) => {
    console.error("Google Sign-In Error:", error);
    toast.error("Google 로그인 실패: " + (error?.message || "알 수 없는 오류"));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="absolute top-4 left-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onLoginClick}
            className="bg-gray-400 hover:bg-[#333]"
          >
            <ArrowLeft className="h-4 w-4 text-white" />
          </Button>
        </div>
        <DialogHeader className="mt-20">
          <DialogTitle>이메일 인증</DialogTitle>
          <DialogDescription>
            인증을 위해 이메일을 입력하고 인증코드를 확인하세요.
          </DialogDescription>
        </DialogHeader>

        {step === "input" ? (
          <div className="grid gap-4 py-4">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
            />
            <Button
              onClick={() => requestCode(email)}
              disabled={!email || isRequestingCode}
            >
              인증코드 요청
            </Button>
            <GoogleSignInButton
              clientId="81819910903-50gnefig8q092lfihklimae08cebf2of.apps.googleusercontent.com"
              onSuccess={(res) => {
                handleGoogleSuccess(res);
              }}
              onError={handleGoogleError}
              buttonText="Google 로그인"
              theme="outline"
              size="large"
              type="standard"
              shape="rectangular"
              width="100%"
            />
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <Label>인증코드</Label>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="이메일로 받은 코드를 입력하세요"
            />
            <Button
              onClick={() => verifyCode({ eml_adr: email, code })}
              disabled={!code || isVerifyingCode}
            >
              코드 확인
            </Button>
          </div>
        )}

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
