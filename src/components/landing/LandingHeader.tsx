"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TbBuildingFactory } from "react-icons/tb";
import gsap from "gsap";
import Image from "next/image";

import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);
// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRouter } from "next/navigation";
import { accountTypes, ChallengeResponses, VerifyResponses } from "@/types/wallet";

export default function LandingHeader() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { publicKey, signMessage, connected, connecting, wallet } = useWallet();
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!wallet) return;
    const handleError = (err: unknown) => {
      const error = err instanceof Error ? err : new Error('Unknown wallet error');
      setError(error);
    };
    wallet.adapter.on('error', handleError);
    return () => {
      wallet.adapter.off('error', handleError);
    };
  }, [wallet]);

  useEffect(() => {
    if (connected) {
      setError(null);
    }
  }, [connected]);

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

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const handleLogin = async (accountType: accountTypes) => {
    if (!publicKey || !signMessage) {
      alert('Please connect your wallet first.');
      return;
    }

    try {
      const challengeResponse = await fetch('https://api.carbonhub.app/auth/request-challenge',  {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publicKey: publicKey.toBase58(),
          type: accountType,
        }),
      });

      const challengeData: ChallengeResponses = await challengeResponse.json();
      if (challengeData.status === 'error') {
        throw new Error(challengeData.data?.challenge || 'Failed to fetch challenge');
      }

      const challengeMessage = challengeData.data.challenge;

      const encodedMessage = new TextEncoder().encode(challengeMessage);
      const signature = await signMessage(encodedMessage);

      const verifyResponse = await fetch('https://api.carbonhub.app/auth/verify-signature',  {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publicKey: publicKey.toBase58(),
          challenge: challengeMessage,
          signature: Buffer.from(signature).toString('base64'),
        }),
      });

      const verifyResult: VerifyResponses = await verifyResponse.json();
      if (verifyResult.status === 'success') {
        // Store JWT token in localStorage
        localStorage.setItem('token', verifyResult.data.token);
        localStorage.setItem('accountType', verifyResult.data.type);
        localStorage.setItem('publicKey', verifyResult.data.publicKey);
        
        router.push("/dashboard");
      } else {
        alert('Signature verification failed.');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      alert('Signing failed.');
    }
  };

  const handleUserLogin = () => {
    handleLogin("user");
  };

  const handleCompanyLogin = () => {
    handleLogin("company");
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
          <Button
            onClick={handleUserLogin}
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
              <div className="flex items-center gap-2">User Login</div>
            )}
          </Button>
          <Button
            onClick={handleCompanyLogin}
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
                Company Login{" "}
                <TbBuildingFactory className="ml-1 text-lg" />
              </>
            )}
          </Button>
          <WalletMultiButton />
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
              {!connected ? (
                <>
                  <Button
                    onClick={() => {
                      handleUserLogin();
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
                      <>User Login</>
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      handleCompanyLogin();
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
                      <>Company Login</>
                    )}
                  </Button>
                </>
              ) : (
                <div className="w-full flex flex-col gap-2">
                  <div className="text-white/80 text-sm text-center">
                    {truncateAddress(publicKey?.toBase58() || "")}
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
                </div>
              )}
              <WalletMultiButton />
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-500/90 text-white px-4 py-2 rounded-lg text-sm max-w-xs text-center">
            {error.message}
          </div>
        )}
      </nav>
    </header>
  );
}
