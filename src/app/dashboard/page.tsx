"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Current Carbon Credits</h2>
          <p className="text-3xl font-bold">1,250</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            +125 from last month
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Current Value</h2>
          <p className="text-3xl font-bold">$45,750</p>
          <p className="text-sm text-green-500 mt-2">+12.5% from last month</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
          <p className="text-3xl font-bold">24</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Last 30 days
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Carbon Credit Trends</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Weekly
            </Button>
            <Button variant="outline" size="sm">
              Monthly
            </Button>
            <Button variant="outline" size="sm">
              Yearly
            </Button>
          </div>
        </div>

        <div className="h-64 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded">
          <p className="text-slate-500 dark:text-slate-400">
            Chart placeholder
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-start pb-4 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="2" x2="12" y2="22"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Purchased 100 Carbon Credits</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Transaction ID: #TX{1000 + item}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Market Insights</h2>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Current Price</span>
                <span className="font-bold">$36.60 per credit</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-slate-500">
                <span>$30.00</span>
                <span>$50.00</span>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Market News</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="pb-3 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0"
                  >
                    <p className="font-medium mb-1">
                      New carbon policy announced
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Government announces new carbon reduction targets for 2025
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
