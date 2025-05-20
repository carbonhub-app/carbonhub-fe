"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingHeader() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-2xl">
              CarbonHub
            </Link>
            <nav className="hidden md:flex ml-10 space-x-6">
              <Link
                href="#problem"
                className="text-sm font-medium hover:text-primary"
              >
                Problem
              </Link>
              <Link
                href="#solution"
                className="text-sm font-medium hover:text-primary"
              >
                Solution
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium hover:text-primary"
              >
                Testimonials
              </Link>
              <Link
                href="#team"
                className="text-sm font-medium hover:text-primary"
              >
                Team
              </Link>
              <Link
                href="#faq"
                className="text-sm font-medium hover:text-primary"
              >
                FAQ
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/auth/signin">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
            <button className="md:hidden" aria-label="Toggle menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
