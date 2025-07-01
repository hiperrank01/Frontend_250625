"use client";

import { useState } from "react";
import { ProModal } from "@/components/modal/pro-modal";
export const Header = () => {
  const [showMembership, setShowMembership] = useState(false);
  const [activeTab, setActiveTab] = useState("seo-analysis");
  return (
    <header className="sticky top-0 z-50 bg-black text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-white text-black px-3 py-1 rounded font-bold text-xl">
            9W
          </div>
          <span className="text-xl font-bold">나인위닛</span>
        </div>
        <nav className="flex space-x-6">
          <button className="hover:text-gray-300 transition-colors">
            서비스 소개
          </button>
          <button
            onClick={() => setShowMembership(true)}
            className="hover:text-gray-300 transition-colors"
          >
            PRO가입
          </button>
          <button
            onClick={() => setActiveTab("inquiry")}
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
    </header>
  );
};
