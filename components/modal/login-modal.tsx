"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/login/use-auth";
import { toast } from "sonner";
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

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUpClick: () => void;
}

export function LoginModal({
  isOpen,
  onClose,
  onSignUpClick,
}: LoginModalProps) {
  const [form, setForm] = useState({
    eml_adr: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate, isPending } = useLogin(
    () => {
      onClose();
    },
    (err: any) => {
      toast.error("로그인 실패: 이메일 또는 비밀번호를 확인해주세요");
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email: form.eml_adr, password: form.password });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>로그인</DialogTitle>
          <DialogDescription>
            로그인하여 모든 기능을 이용해보세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id" className="text-right">
              아이디
            </Label>
            <Input
              id="id"
              name="eml_adr"
              value={form.eml_adr}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
              className="col-span-3"
              disabled={isPending}
            />
          </div>
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
              disabled={isPending}
            />
          </div>

          <DialogFooter className="flex-col gap-2 pt-4">
            <Button variant="outline" className="w-full" type="button">
              Google 로그인
            </Button>
            <Button type="submit" className="w-full" disabled={isPending}>
              로그인
            </Button>
            <Button type="button" variant="secondary" onClick={onSignUpClick}>
              회원가입
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
