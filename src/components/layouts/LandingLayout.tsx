"use client";

import React from "react";
import BaseLayout from "./BaseLayout";
import LandingHeader from "../landing/LandingHeader";
import LandingFooter from "../landing/LandingFooter";

interface LandingLayoutProps {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <BaseLayout>
      <LandingHeader />
      <div className="flex-grow">{children}</div>
      <LandingFooter />
    </BaseLayout>
  );
}
