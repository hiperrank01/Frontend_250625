"use client";

import { useState } from "react";
import { ProModal } from "@/components/modal/pro-modal";
import { AuthModal } from "@/components/modal/auth-modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useLogout } from "@/hooks/login/use-auth";
import mainLogo from "@/public/Logo_Main.png";
import { useAuthStore } from "@/store/store";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
export const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showMembership, setShowMembership] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const logout = useLogout();
  const { accessToken, isHydrated } = useAuthStore();
  if (!isHydrated) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <header className="sticky top-0 z-50 bg-black text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              router.push("/");
            }}
          >
            <img src={mainLogo.src} alt="나인위닛 로고" />
          </button>
        </div>
        <nav className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 items-center">
          <button
            className="hover:text-gray-300 transition-colors"
            onClick={() => {
              router.push("intro");
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
          {accessToken ? (
            <button
              onClick={() => logout()} // 로그인된 상태 → 로그아웃
              className="hover:text-gray-300 transition-colors"
            >
              로그아웃
            </button>
          ) : (
            <button
              onClick={() => setShowAuth(true)} // 로그인 안 된 상태 → 로그인 모달 열기
              className="hover:text-gray-300 transition-colors"
            >
              로그인
            </button>
          )}

          {accessToken !== "" ? (
            <button
              onClick={() => {
                router.push("mypage", { scroll: false });
              }}
            >
              마이페이지
            </button>
          ) : (
            ""
          )}
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("tab", "inquiry");
              router.push(`?${params.toString()}`, { scroll: false });
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
