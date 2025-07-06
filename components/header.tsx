"use client";

import { useState } from "react";
import { ProModal } from "@/components/modal/pro-modal";
import { AuthModal } from "@/components/modal/auth-modal";
import { useRouter, useSearchParams } from "next/navigation";

export const Header = () => {
  const [showMembership, setShowMembership] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <header className="sticky top-0 z-50 bg-black text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-white text-black px-3 py-1 rounded font-bold text-xl">
            9W
          </div>

          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);

              router.push("/");
            }}
          >
            <span className="text-xl font-bold">나인위닛</span>
          </button>
        </div>
        <nav className="flex space-x-6">
          <button
            className="hover:text-gray-300 transition-colors"
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              router.push("info");
            }}
          >
            서비스 소개
          </button>
          <button
            onClick={() => setShowMembership(true)}
            className="hover:text-gray-300 transition-colors"
          >
            PRO가입
          </button>
          <button
            onClick={() => setShowAuth(true)}
            className="hover:text-gray-300 transition-colors"
          >
            로그인
          </button>
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);

              router.push("mypage");
            }}
          >
            마이페이지
          </button>
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("tab", "inquiry");
              router.push(`?${params.toString()}`);
            }}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            무료 대행 신청하기
          </button>
        </nav>
      </div>
      <ProModal
        showMembership={showMembership}
        setShowMembership={setShowMembership}
      />
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </header>
  );
};
