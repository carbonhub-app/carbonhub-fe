"use client";

import React from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isTradingPage = pathname === "/dashboard/trading";
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col">
        <DashboardHeader />
        <div className="flex flex-1">
          <DashboardSidebar thin={true} />
          <main className={`flex-1${!isTradingPage ? " p-6" : " p-0"}`}>{children}</main>
        </div>
        <DashboardFooter />
      </div>
    </AuthGuard>
  );
}
