"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TbBuildingFactory } from "react-icons/tb";

export default function LandingHeader() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <header className="fixed inset-x-0 top-6 z-50 flex justify-center pointer-events-none">
      <nav className="pointer-events-auto bg-black/70 backdrop-blur-md shadow-xl rounded-4xl max-w-7xl w-[95vw] mx-auto px-6 py-3 flex items-center justify-between gap-4 border border-white/10">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img src="/logo-full.png" alt="Carbon Hub" className="h-8 sm:h-10" />
        </Link>
        {/* Desktop Nav */}
        <ul className="hidden md:flex flex-1 justify-center items-center gap-8">
          <li>
            <Link
              href="/"
              className="text-white/90 font-normal text-base hover:text-primary transition-colors duration-200 hover:color-primary"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#roadmap"
              className="text-white/90 font-normal text-base hover:text-primary transition-colors duration-200"
            >
              Roadmap
            </Link>
          </li>
          <li>
            <Link
              href="#why"
              className="text-white/90 font-normal text-base hover:text-primary transition-colors duration-200"
            >
              Why Carbon Hub
            </Link>
          </li>
        </ul>
        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/auth/signin"
            className="text-white/80 border-[1px] rounded-lg font-medium hover:text-primary hover:border-primary px-4 py-2 transition-all duration-200"
          >
            Login
          </Link>
          <Link href="/auth/signup">
            <Button
              size="sm"
              className="bg-primary text-white font-semibold flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:bg-primary/90 transition-all duration-200"
            >
              Start Tracking <TbBuildingFactory className="ml-1 text-lg" />
            </Button>
          </Link>
        </div>
        {/* Hamburger */}
        <button
          className="md:hidden flex items-center justify-center text-white hover:text-primary transition-colors duration-200 focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full flex justify-center md:hidden z-50">
            <div className="bg-black/90 backdrop-blur-md rounded-xl shadow-lg py-4 px-6 flex flex-col items-center gap-4 border border-white/10 max-w-xs w-[90vw]">
              <Link
                href="/"
                className="text-white/90 font-medium text-base hover:text-primary transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#roadmap"
                className="text-white/90 font-medium text-base hover:text-primary transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Roadmap
              </Link>
              <Link
                href="#why"
                className="text-white/90 font-medium text-base hover:text-primary transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Why Carbon Hub
              </Link>
              <Link
                href="/auth/signin"
                className="text-white/80 font-medium hover:text-primary transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="w-full"
                onClick={() => setMenuOpen(false)}
              >
                <Button
                  size="sm"
                  className="bg-primary text-white font-semibold flex items-center gap-2 w-full justify-center rounded-lg shadow-md hover:bg-primary/90 transition-all duration-200"
                >
                  Start Tracking <TbBuildingFactory className="ml-1 text-lg" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
