"use client";

import React from "react";
import MarqueeSection from "./MarqueeSection";

export default function ProblemSection() {
  return (
    <>
      <MarqueeSection />

      <section
        id="problem"
        className="relative pt-20 pb-24 bg-transparent dark:bg-transparent"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white dark:text-white">
              The Carbon Management Challenge
            </h2>
            <p className="text-lg text-slate-300 dark:text-slate-400">
              Companies face significant hurdles in managing their carbon
              footprint while meeting sustainability goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/80 dark:bg-slate-800/80 p-6 md:p-8 rounded-lg shadow-xl">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
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
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white dark:text-white">
                Cost & Complexity
              </h3>
              <p className="text-slate-300 dark:text-slate-400 text-sm sm:text-base">
                Traditional carbon management systems are expensive to implement
                and complex to maintain, requiring specialized knowledge.
              </p>
            </div>
            <div className="bg-slate-800/80 dark:bg-slate-800/80 p-6 md:p-8 rounded-lg shadow-xl">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
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
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white dark:text-white">
                Data Transparency
              </h3>
              <p className="text-slate-300 dark:text-slate-400 text-sm sm:text-base">
                Lack of real-time data and transparency makes it difficult to
                make informed decisions about carbon credit trading.
              </p>
            </div>
            <div className="bg-slate-800/80 dark:bg-slate-800/80 p-6 md:p-8 rounded-lg shadow-xl">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
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
                  <line x1="12" y1="2" x2="12" y2="6"></line>
                  <line x1="12" y1="18" x2="12" y2="22"></line>
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                  <line x1="2" y1="12" x2="6" y2="12"></line>
                  <line x1="18" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white dark:text-white">
                Market Inefficiency
              </h3>
              <p className="text-slate-300 dark:text-slate-400 text-sm sm:text-base">
                Fragmented carbon markets create inefficiencies, leading to
                higher costs and missed opportunities for businesses.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
