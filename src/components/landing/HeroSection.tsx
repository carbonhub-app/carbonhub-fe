"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fadeIn } from "@/utils/animations";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      fadeIn(heroRef.current, 1, 0.2);
    }
  }, []);

  return (
    <section ref={heroRef} className="py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Reduce Carbon Footprint.{" "}
              <span className="text-primary">Trade</span> Efficiently.
            </h1>
            <p className="mt-6 text-xl text-slate-600 dark:text-slate-400">
              CarbonHub helps companies monitor, manage, and trade carbon
              credits in real-time, making sustainable business practices easier
              than ever.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="#demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Request Demo
                </Button>
              </Link>
            </div>
            <div className="mt-10">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Trusted by leading companies
              </p>
              <div className="mt-4 flex flex-wrap gap-8 items-center">
                <div className="text-slate-400 dark:text-slate-500 font-medium">
                  Company A
                </div>
                <div className="text-slate-400 dark:text-slate-500 font-medium">
                  Company B
                </div>
                <div className="text-slate-400 dark:text-slate-500 font-medium">
                  Company C
                </div>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="w-full h-[500px] bg-gradient-to-tr from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
              <div className="text-slate-400">
                {/* Placeholder for illustration/dashboard preview */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="128"
                  height="128"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                  <path d="M6 8h.01M6 12h.01M6 16h.01M18 8h.01M18 12h.01M18 16h.01"></path>
                  <path d="M12 8v8"></path>
                  <path d="M8 12h8"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
