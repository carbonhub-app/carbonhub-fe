"use client";

import React from "react";
import BaseLayout from "./BaseLayout";
import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import DashboardFooter from "../dashboard/DashboardFooter";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <BaseLayout>
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-grow p-6">{children}</main>
      </div>
      <DashboardFooter />
    </BaseLayout>
  );
}
