"use client";

import { Sidebar, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebarNav } from "@/components/dashboard/dashboard-sidebar-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar className="top-[72px]">
        <DashboardSidebarNav />
      </Sidebar>
      <SidebarInset className="pt-[72px]">{children}</SidebarInset>
    </SidebarProvider>
  );
}
