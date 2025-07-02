"use client";

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

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export function SignUpModal({
  isOpen,
  onClose,
  onLoginClick,
}: SignUpModalProps) {
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
          <DialogTitle className=" text-center">회원가입</DialogTitle>
          <DialogDescription className=" text-center">
            새로운 계정을 생성합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id" className="text-right">
              아이디
            </Label>
            <Input
              id="id"
              placeholder="아이디를 입력하세요"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              비밀번호
            </Label>
            <Input
              id="password"
              type="password"
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
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              className="col-span-3"
            />
          </div>
        </div>
        <div className="mt-4">
          <Button variant="outline" className="w-full">
            Sign in with Google
          </Button>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full">
            회원가입 완료
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
