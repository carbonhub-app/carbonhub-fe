"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TbBuildingFactory } from "react-icons/tb";
import { usePhantomWallet } from "@/context/PhantomWalletContext";
import gsap from "gsap";
import Image from "next/image";

export default function LandingHeader() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const {
    isConnected,
    connecting,
    connectWallet,
    disconnectWallet,
    publicKey,
    error,
  } = usePhantomWallet();

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        {
          y: -100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }
  }, []);

  const handleWalletConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-6 z-50 flex justify-center pointer-events-none"
    >
      <nav className="pointer-events-auto bg-black/70 backdrop-blur-md shadow-xl rounded-4xl max-w-7xl w-[95vw] mx-auto px-6 py-3 flex items-center justify-between gap-4 border border-white/10">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo-full.png"
            alt="Carbon Hub"
            width={120}
            height={40}
            className="h-8 sm:h-10 w-auto"
          />
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

        {/* CTA - Wallet Connection */}
        <div className="hidden md:flex items-center gap-4">
          {!isConnected ? (
            <>
              <Button
                onClick={handleWalletConnect}
                disabled={connecting}
                variant="outline"
                className="text-white/80 border-white/20 hover:border-primary hover:text-primary bg-transparent"
              >
                {connecting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Connecting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">Login</div>
                )}
              </Button>
              <Button
                onClick={handleWalletConnect}
                disabled={connecting}
                size="sm"
                className="bg-primary text-white font-semibold flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:bg-primary/90 transition-all duration-200"
              >
                {connecting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Connecting...
                  </div>
                ) : (
                  <>
                    Start Tracking{" "}
                    <TbBuildingFactory className="ml-1 text-lg" />
                  </>
                )}
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="text-white/80 text-sm">
                {truncateAddress(publicKey || "")}
              </div>
              <Link href="/dashboard">
                <Button
                  size="sm"
                  className="bg-primary text-white font-semibold flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:bg-primary/90 transition-all duration-200"
                >
                  Dashboard <TbBuildingFactory className="ml-1 text-lg" />
                </Button>
              </Link>
              <Button
                onClick={disconnectWallet}
                variant="outline"
                size="sm"
                className="text-white/80 border-white/20 hover:border-red-400 hover:text-red-400 bg-transparent"
              >
                Disconnect
              </Button>
            </div>
          )}
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

              {!isConnected ? (
                <Button
                  onClick={() => {
                    handleWalletConnect();
                    setMenuOpen(false);
                  }}
                  disabled={connecting}
                  className="w-full bg-primary text-white font-semibold flex items-center gap-2 justify-center rounded-lg shadow-md hover:bg-primary/90 transition-all duration-200"
                >
                  {connecting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Connecting...
                    </div>
                  ) : (
                    <>Login</>
                  )}
                </Button>
              ) : (
                <div className="w-full flex flex-col gap-2">
                  <div className="text-white/80 text-sm text-center">
                    {truncateAddress(publicKey || "")}
                  </div>
                  <Link
                    href="/dashboard"
                    className="w-full"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Button
                      size="sm"
                      className="bg-primary text-white font-semibold flex items-center gap-2 w-full justify-center rounded-lg shadow-md hover:bg-primary/90 transition-all duration-200"
                    >
                      Dashboard <TbBuildingFactory className="ml-1 text-lg" />
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      disconnectWallet();
                      setMenuOpen(false);
                    }}
                    variant="outline"
                    size="sm"
                    className="text-white/80 border-white/20 hover:border-red-400 hover:text-red-400 bg-transparent w-full"
                  >
                    Disconnect
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-500/90 text-white px-4 py-2 rounded-lg text-sm max-w-xs text-center">
            {error}
          </div>
        )}
      </nav>
    </header>
  );
}
