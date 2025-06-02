"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
const TradingViewWidget = dynamic(
  () => import("@/components/trading/tradingview-embed-react"),
  { ssr: false }
);

export default function DashboardTradingPage() {
  const [balance] = useState<number | null>(null);
  const [available] = useState<number | null>(null);
  const [orderSize, setOrderSize] = useState<number>(1);
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [price, setPrice] = useState("");

  const placeOrder = () => {
    if (!orderSize || Number(orderSize) <= 0) {
      alert("Please enter a valid order size.");
      return;
    }
    alert(
      `Order placed: ${side.toUpperCase()} ${orderSize} credits${
        price ? ` (Price: $${price})` : ""
      }`
    );
    // TODO: Implement API call or further logic here
  };

  const formatBalance = (value: number | null): string => {
    if (value === null) return "-";
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="flex h-screen m-0 p-0 overflow-hidden">
      {/* TradingView Chart on the left, fills available space */}
      <section className="flex-1 bg-white dark:bg-slate-900 rounded-none p-0 m-0 shadow-none border-none h-full">
        <div className="h-full w-full">
          <TradingViewWidget />
        </div>
      </section>
      {/* Place Order Panel on the right */}
      <section className="w-[350px] bg-white dark:bg-slate-900 rounded-none p-6 shadow-none border-l border-gray-200 dark:border-slate-800 h-full flex flex-col justify-center m-0">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Place Order
          </h2>
          <div className="flex gap-2 mb-4">
            <button
              className={`flex-1 py-2 rounded-lg font-semibold transition ${
                side === "buy"
                  ? "bg-green-600 text-white shadow"
                  : "bg-gray-100 dark:bg-slate-800 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-700"
              }`}
              onClick={() => setSide("buy")}
            >
              Buy
            </button>
            <button
              className={`flex-1 py-2 rounded-lg font-semibold transition ${
                side === "sell"
                  ? "bg-red-600 text-white shadow"
                  : "bg-gray-100 dark:bg-slate-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-700"
              }`}
              onClick={() => setSide("sell")}
            >
              Sell
            </button>
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200" htmlFor="orderSize">
              Order Size (carbon credits)
            </label>
            <input
              id="orderSize"
              type="number"
              min="1"
              className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded px-3 py-2 text-gray-900 dark:text-white mb-2"
              value={orderSize}
              onChange={(e) => setOrderSize(Number(e.target.value))}
              placeholder="Enter amount"
            />
            <input
              type="range"
              min="1"
              max={available || 1000}
              value={orderSize}
              onChange={(e) => setOrderSize(Number(e.target.value))}
              className="w-full accent-green-600 dark:accent-green-400"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1</span>
              <span>{available || 1000}</span>
            </div>
          </div>

          <button
            className={`w-full py-3 rounded-lg font-bold text-lg transition ${
              side === "buy"
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
            onClick={placeOrder}
          >
            {side === "buy" ? "Place Buy Order" : "Place Sell Order"}
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-800">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-900 dark:text-white">Order Info:</span>
            <ul className="mt-2 space-y-1">
              <li>
                <span className="text-gray-700 dark:text-gray-200">Order Size:</span>{" "}
                {orderSize || "-"} credits
              </li>
              <li>
                <span className="text-gray-700 dark:text-gray-200">Side:</span>{" "}
                <span
                  className={
                    side === "buy" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }
                >
                  {side.toUpperCase()}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
} 