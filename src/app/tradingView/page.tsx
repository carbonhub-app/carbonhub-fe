"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
const TradingViewWidget = dynamic(
  () => import("@/components/trading/tradingview-embed-react"),
  { ssr: false }
);

// TODO: Ganti dengan data asli dari API/user context jika sudah ada
// const user = useUser(); // contoh jika pakai context
// const balance = user?.balance ?? 0;
// const available = user?.available ?? 0;

export default function CarbonTradingPage() {
  // Placeholder, ganti dengan data asli jika sudah ada
  const [balance] = useState<number | null>(null);
  const [available] = useState<number | null>(null);

  const [orderSize, setOrderSize] = useState<number>(1);
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [price, setPrice] = useState(""); // For limit order

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
    // Implement API call or further logic here
  };

  const formatBalance = (value: number | null): string => {
    if (value === null) return "-";
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-0 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-slate-800 bg-slate-900">
        <h1 className="text-3xl font-bold tracking-tight text-indigo-400 drop-shadow">
          CarbonHub Trading
        </h1>
        <div className="flex items-center gap-8">
          <div>
            <span className="text-xs text-slate-400">Balance</span>
            <div className="font-semibold text-lg text-white">
              {balance !== null ? (
                formatBalance(balance)
              ) : (
                <span className="text-slate-600">-</span>
              )}
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-400">Available</span>
            <div className="font-semibold text-lg text-green-400">
              {available !== null ? (
                formatBalance(available)
              ) : (
                <span className="text-slate-600">-</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex gap-8 px-8 py-8 bg-slate-900">
        {/* Left: Order Entry Panel */}
        <section className="w-[350px] bg-slate-800 rounded-2xl p-8 shadow-2xl flex flex-col gap-8 border border-slate-700">
          <div>
            <h2 className="text-xl font-bold mb-2 text-indigo-300">
              Place Order
            </h2>
            <div className="flex gap-2 mb-4">
              <button
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  side === "buy"
                    ? "bg-green-600 text-white shadow"
                    : "bg-slate-700 text-green-400 hover:bg-green-700"
                }`}
                onClick={() => setSide("buy")}
              >
                Buy
              </button>
              <button
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  side === "sell"
                    ? "bg-red-600 text-white shadow"
                    : "bg-slate-700 text-red-400 hover:bg-red-700"
                }`}
                onClick={() => setSide("sell")}
              >
                Sell
              </button>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold" htmlFor="price">
                Limit Price ($){" "}
                <span className="text-xs text-slate-400">(Opsional)</span>
              </label>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                className="w-full bg-slate-700 rounded px-3 py-2 text-white"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price (optional)"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-1 font-semibold" htmlFor="orderSize">
                Order Size (carbon credits)
              </label>
              <input
                id="orderSize"
                type="number"
                min="1"
                className="w-full bg-slate-700 rounded px-3 py-2 text-white mb-2"
                value={orderSize}
                onChange={(e) => setOrderSize(Number(e.target.value))}
                placeholder="Enter amount"
              />
              <label htmlFor="orderSizeRange" className="sr-only">
                Order Size Range Slider
              </label>
              <input
                id="orderSizeRange"
                type="range"
                min="1"
                max={available || 1000}
                value={orderSize}
                onChange={(e) => setOrderSize(Number(e.target.value))}
                className="w-full accent-indigo-500"
                aria-label="Order size range slider"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>1</span>
                <span>{available || 1000}</span>
              </div>
            </div>
            <button
              className={`w-full py-3 rounded-lg font-bold text-lg transition shadow-lg ${
                side === "buy"
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
              onClick={placeOrder}
            >
              {side === "buy" ? "Place Buy Order" : "Place Sell Order"}
            </button>
          </div>
          <div className="text-xs text-slate-400 border-t border-slate-700 pt-4">
            <div>
              <span className="font-semibold text-white">Order Info:</span>
              <ul className="mt-1 space-y-1">
                {price && (
                  <li>
                    <span className="text-slate-300">Limit Price:</span> $
                    {price}
                  </li>
                )}
                <li>
                  <span className="text-slate-300">Order Size:</span>{" "}
                  {orderSize || "-"} credits
                </li>
                <li>
                  <span className="text-slate-300">Side:</span>{" "}
                  <span
                    className={
                      side === "buy" ? "text-green-400" : "text-red-400"
                    }
                  >
                    {side.toUpperCase()}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Right: TradingView Chart */}
        <section className="flex-1 rounded-2xl bg-slate-800 p-6 shadow-2xl flex flex-col border border-slate-700">
          <div className="flex-grow h-[400px]">
            <TradingViewWidget />
          </div>
        </section>
      </main>
    </div>
  );
}
