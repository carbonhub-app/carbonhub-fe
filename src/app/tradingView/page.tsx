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
  const [balance, setBalance] = useState<number | null>(null);
  const [available, setAvailable] = useState<number | null>(null);

  const [orderSize, setOrderSize] = useState<number | "">("");
  const [leverage, setLeverage] = useState(10);
  const [orderType, setOrderType] = useState("Market");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [price, setPrice] = useState(""); // For limit order

  const handleOrderTypeChange = (value: string) => {
    setOrderType(value);
    if (value === "Market") setPrice("");
  };

  const placeOrder = () => {
    if (orderType === "Limit" && (!price || Number(price) <= 0)) {
      alert("Please enter a valid price for limit order.");
      return;
    }
    if (!orderSize || Number(orderSize) <= 0) {
      alert("Please enter a valid order size.");
      return;
    }
    alert(
      `Order placed: ${side.toUpperCase()} ${orderSize} credits at ${orderType} order${orderType === "Limit" ? ` (Price: $${price})` : ""} with ${leverage}x leverage`
    );
    // Implement API call or further logic here
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-0 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-slate-800 bg-slate-900">
        <h1 className="text-3xl font-bold tracking-tight text-indigo-400 drop-shadow">CarbonHub Trading</h1>
        <div className="flex items-center gap-8">
          <div>
            <span className="text-xs text-slate-400">Balance</span>
            <div className="font-semibold text-lg text-white">
              {balance !== null ? `$${balance.toLocaleString()}` : <span className="text-slate-600">-</span>}
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-400">Available</span>
            <div className="font-semibold text-lg text-green-400">
              {available !== null ? `$${available.toLocaleString()}` : <span className="text-slate-600">-</span>}
            </div>
          </div>
        </div>
      </header>

      <main className="flex gap-8 px-8 py-8 bg-slate-900">
        {/* Left: Order Entry Panel */}
        <section className="w-[350px] bg-slate-800 rounded-2xl p-8 shadow-2xl flex flex-col gap-8 border border-slate-700">
          <div>
            <h2 className="text-xl font-bold mb-2 text-indigo-300">Place Order</h2>
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
              <label className="block mb-1 font-semibold" htmlFor="orderType">
                Order Type
              </label>
              <select
                id="orderType"
                className="w-full bg-slate-700 text-white rounded px-3 py-2"
                value={orderType}
                onChange={(e) => handleOrderTypeChange(e.target.value)}
              >
                <option value="Market">Market</option>
                <option value="Limit">Limit</option>
              </select>
            </div>
            {orderType === "Limit" && (
              <div className="mb-4">
                <label className="block mb-1 font-semibold" htmlFor="price">
                  Limit Price ($)
                </label>
                <input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full bg-slate-700 rounded px-3 py-2 text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block mb-1 font-semibold" htmlFor="orderSize">
                Order Size (carbon credits)
              </label>
              <input
                id="orderSize"
                type="number"
                min="1"
                className="w-full bg-slate-700 rounded px-3 py-2 text-white"
                value={orderSize}
                onChange={(e) => setOrderSize(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="Enter amount"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-1 font-semibold" htmlFor="leverage">
                Leverage: <span className="text-indigo-400">{leverage}x</span>
              </label>
              <input
                id="leverage"
                type="range"
                min="1"
                max="100"
                value={leverage}
                onChange={(e) => setLeverage(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>1x</span>
                <span>100x</span>
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
                <li>
                  <span className="text-slate-300">Order Type:</span> {orderType}
                </li>
                {orderType === "Limit" && (
                  <li>
                    <span className="text-slate-300">Limit Price:</span> ${price || "-"}
                  </li>
                )}
                <li>
                  <span className="text-slate-300">Order Size:</span> {orderSize || "-"} credits
                </li>
                <li>
                  <span className="text-slate-300">Leverage:</span> {leverage}x
                </li>
                <li>
                  <span className="text-slate-300">Side:</span>{" "}
                  <span className={side === "buy" ? "text-green-400" : "text-red-400"}>
                    {side.toUpperCase()}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Right: TradingView Chart */}
        <section className="flex-1 rounded-2xl bg-slate-800 p-6 shadow-2xl flex flex-col border border-slate-700">
          <div className="flex-grow h-[600px]">
            <TradingViewWidget />
          </div>
        </section>
      </main>
    </div>
  );
}