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
import { useSignUpMutation } from "@/hooks/sign-up/use-sign-up-mutation";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  verifiedEmail: string; // 인증된 이메일 props 추가
}

export function SignUpModal({
  isOpen,
  onClose,
  onLoginClick,
  verifiedEmail, // props 받기
}: SignUpModalProps) {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
    nm: "",
    phn_no: "",
    rcm_eml: "", // 추천인 이메일은 옵션으로 남겨둡니다.
    prv_agr_yn: "s",
    tos_agr_yn: "s",
    adv_rcv_yn: "s",
    user_type: "1",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate, isPending } = useSignUpMutation({
    onSuccess: () => {
      alert("회원가입 성공! 로그인 해주세요.");
      onLoginClick();
    },
    onError: (err: Error) => {
      alert("회원가입 실패: " + err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    mutate({ ...form, eml_adr: verifiedEmail });
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
        <DialogHeader className="pt-10">
          <DialogTitle className="text-center">회원가입</DialogTitle>
          <DialogDescription className="text-center">
            계정 정보를 입력해주세요. 이메일: {verifiedEmail}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4"></div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                비밀번호
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirm-password" className="text-right">
                비밀번호 확인
              </Label>
              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="비밀번호를 다시 입력하세요"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                이름
              </Label>
              <Input
                id="name"
                name="nm"
                value={form.nm}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                전화번호
              </Label>
              <Input
                id="phone"
                name="phn_no"
                value={form.phn_no}
                onChange={handleChange}
                placeholder="전화번호를 입력하세요"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isPending}>
              회원가입 완료
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
