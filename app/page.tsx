"use client";

import type React from "react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Main } from "@/components/main";

export default function NineWinitApp() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
