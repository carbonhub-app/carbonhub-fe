"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import trackingIcon from "@/assets/icons/tracking.png";
import rewardIcon from "@/assets/icons/reward.png";
import tradeIcon from "@/assets/icons/trade.png";
import { Button } from "@/components/ui/button";
import { fadeIn } from "@/utils/animations";
import heroImage from "@/assets/images/hero-image.png";
import { FiArrowRight } from "react-icons/fi";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      fadeIn(heroRef.current, 1, 0.2);
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative z-0 overflow-hidden mt-16 py-20 px-4 sm:px-6 md:px-8"
    >
      <Image
        src="/bg-hero.webp"
        alt="Hero background"
        fill
        priority
        quality={100}
        className="object-cover -z-10"
      />
      <div className="relative z-0 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="mb-6 inline-flex items-center space-x-3 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/30 dark:border-gray-700/30 rounded-lg px-4 py-2">
              <div className="px-3 py-1 inline-flex items-center space-x-1 border-[1px] bg-stone-800 border-gray-300 dark:border-gray-600 rounded-md">
                <span className="h-2 w-2 bg-green-500 rounded-full flex-shrink-0" />
                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                  100% Transparent.
                </span>
              </div>
              <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                Zero Greenwashing.
              </span>
              <FiArrowRight className="text-sm text-gray-800 dark:text-gray-200" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-8xl font-bold leading-tight">
              Make Every{" "}
              <span className="whitespace-nowrap">Emission Count</span>
            </h1>
            <p className="mt-6 text-xl text-slate-600 dark:text-slate-400 max-w-xl pr-4 sm:pr-8 lg:pr-16">
              Track emissions, earn blockchain-powered rewards, and trade carbon
              credits — all in real time, all in one intelligent platform.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-white">
                Get Demo
              </Button>
              <Button size="lg" variant="outline">
                Try For Free
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded-full p-1 flex items-center justify-center shadow-md border-3">
                <Image
                  src={trackingIcon}
                  alt="Tracking Icon"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Real-Time Tracking</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Monitor emissions effortlessly with smart, real-time data
                capture and visualization.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded-full p-1 flex items-center justify-center shadow-md border-3">
                <Image
                  src={rewardIcon}
                  alt="Reward Icon"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                Reward & Incentivization
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Turn sustainable actions into value with blockchain-powered
                token rewards.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded-full p-1 flex items-center justify-center shadow-md border-3">
                <Image
                  src={tradeIcon}
                  alt="Trade Icon"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                Trade & Scale Transparently
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Access a built-in carbon marketplace and grow your impact with
                full transparency.
              </p>
            </div>
          </div>
        </div>

        <div className="-mt-[170px] relative w-full h-[600px] rounded-lg overflow-hidden transform translate-y-[40%] z-0">
          <Image
            src={heroImage}
            alt="Dashboard preview"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
