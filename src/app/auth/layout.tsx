"use client";

import React from "react";
import BaseLayout from "@/components/layouts/BaseLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BaseLayout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white dark:bg-slate-800 rounded-lg shadow-md">
          {children}
        </div>
      </div>
    </BaseLayout>
  );
}
