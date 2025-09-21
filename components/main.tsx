"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs } from "@/components/ui/tabs";
import { ProModal } from "@/components/modal/pro-modal";
import { TabNav } from "@/components/tab/tab-nav";
import HeroSection from "./main/hero-section";
import { ServiceSection } from "./main/service-section";
import { InquirySection } from "./main/inquiry-section";

export const Main = () => {
  const [showMembership, setShowMembership] = useState(false);
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "seo-analysis";

  return (
    <main className="max-w-7xl mx-auto px-6 py-0">
      <Tabs value={activeTab} className="w-full">
        <HeroSection />
        <TabNav />
        <ServiceSection setShowMembership={setShowMembership} />
        <InquirySection />
      </Tabs>
      <ProModal
        showMembership={showMembership}
        setShowMembership={setShowMembership}
      />
    </main>
  );
};
