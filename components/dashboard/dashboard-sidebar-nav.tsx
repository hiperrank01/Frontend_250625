"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Book, ChevronDown, LayoutDashboard } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function DashboardSidebarNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (pathname.startsWith("/dashboard")) {
      setOpen(true);
    }
  }, [pathname]);

  return (
    <React.Fragment>
      <SidebarHeader className="flex items-center">
        <div className="flex">
          <h2 className="px-3 py-2 text-lg font-semibold tracking-tight flex group-data-[collapsible=icon]:hidden">
            대시보드
          </h2>
          <SidebarTrigger className="hidden md:flex" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setOpen(!open)}
              isActive={pathname.startsWith("/dashboard")}
              data-state={open ? "open" : "closed"}
            >
              <LayoutDashboard />
              <span>보고서</span>
              <ChevronDown
                className={cn(
                  "ml-auto size-4 transition-transform",
                  open && "rotate-180"
                )}
              />
            </SidebarMenuButton>
            {open && (
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    asChild
                    isActive={pathname === "/dashboard"}
                  >
                    <Link href="/dashboard">
                      <Book />
                      <span>보고서</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </React.Fragment>
  );
}
