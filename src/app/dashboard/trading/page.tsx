"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, VersionedTransaction, Message, VersionedMessage, TransactionInstruction } from "@solana/web3.js";
import toast, { Toaster } from 'react-hot-toast';

// Token mint addresses
const EURCH_MINT = new PublicKey("ENzHR75e9uH7WKhE6shHj1jsuu61Wb8wSEUvv9Lry5Kw");
const ECFCH_MINT = new PublicKey("GYQkEPSYD7m3hKZxcnz7vR3axazX5HifJARC3DU474oQ");

// Token decimals
const TOKEN_DECIMALS = {
  EURCH: 6,
  ECFCH: 3
};

const TradingViewWidget = dynamic(
  () => import("@/components/trading/tradingview-embed-react"),
  { ssr: false }
);

// Type for Phantom window object
declare global {
  interface Window {
    phantom?: {
      solana?: {
        getTokenAccounts: () => Promise<{
          accounts: Array<{
            mint: string;
            amount: string;
          }>;
        }>;
      };
    };
  }
}

export default function DashboardTradingPage() {
  const { publicKey, signTransaction, wallet } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [available, setAvailable] = useState<number | null>(null);
  const [orderSize, setOrderSize] = useState<number>(1);
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [inputCurrency, setInputCurrency] = useState<"EURCH" | "ECFCH">("EURCH");
  const [price, setPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user's balance on component mount and when wallet changes
  useEffect(() => {
    if (publicKey) {
      fetchBalance();
    }
  }, [publicKey, side]); // Also fetch when side changes

  // Fetch price on component mount and periodically
  useEffect(() => {
    if (publicKey) {
      fetchPrice();
      const interval = setInterval(fetchPrice, 5 * 60 * 1000); // Update price every 5 minutes
      return () => clearInterval(interval);
    }
  }, [publicKey]);

  const fetchBalance = async () => {
    if (!publicKey) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/swap/balance`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (data.status === 'success') {
        // Set balance based on current trading side
        const tokenData = side === 'buy' ? data.data.EURCH : data.data.ECFCH;
        setBalance(tokenData.balance);
        setAvailable(tokenData.balance);
      } else {
        throw new Error(data.message || 'Failed to fetch balance');
      }
    } catch (err) {
      console.error('Error fetching balance:', err);
      toast.error('Failed to fetch token balance');
      setBalance(0);
      setAvailable(0);
    }
  };

  const fetchPrice = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/swap/price`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (data.status === 'success') {
        setPrice(data.data.price);
      } else {
        throw new Error(data.message || 'Failed to fetch price');
      }
    } catch (err) {
      console.error('Error fetching price:', err);
      toast.error('Failed to fetch current price');
    }
  };

  // Calculate equivalent amount in the other currency
  const calculateEquivalentAmount = (amount: number): number => {
    if (side === 'buy') {
      return inputCurrency === 'EURCH' ? amount / price : amount * price;
    } else {
      return inputCurrency === 'EURCH' ? amount * price : amount / price;
    }
  };

  const placeOrder = async () => {
    if (!publicKey || !signTransaction) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!orderSize || Number(orderSize) <= 0) {
      toast.error("Please enter a valid order size");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Convert order size to EURCH if input is in ECFCH
      const orderSizeInEURCH = inputCurrency === 'ECFCH' ? orderSize * price : orderSize;

      // Create swap transaction
      const createResponse = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/swap/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          userPublicKey: publicKey.toBase58(),
          fromToken: side === 'buy' ? 'EURCH' : 'ECFCH',
          amount: orderSizeInEURCH,
        }),
      });

      const createData = await createResponse.json();
      if (createData.status !== 'success') {
        throw new Error(createData.message || 'Failed to create swap');
      }

      // Get the transaction data and deserialize it
      const transactionBuffer = Buffer.from(createData.data.transaction, 'base64');
      const message = VersionedMessage.deserialize(transactionBuffer);
      const transaction = new VersionedTransaction(message);

      // Sign transaction with user's wallet
      const signedTransaction = await signTransaction(transaction);

      // Execute swap with partially signed transaction
      const executeResponse = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/swap/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          signedTransaction: Buffer.from(signedTransaction.serialize()).toString('base64'),
          fromToken: side === 'buy' ? 'EURCH' : 'ECFCH',
          amount: orderSizeInEURCH,
        }),
      });

      const executeData = await executeResponse.json();
      if (executeData.status !== 'success') {
        throw new Error(executeData.message || 'Failed to execute swap');
      }

      // Update balance after successful swap
      await fetchBalance();
      toast.success(`Order placed successfully! Transaction signature: ${executeData.data.signature}`, {
        duration: 5000,
        style: {
          background: '#10B981',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
          maxWidth: '90vw',
          wordBreak: 'break-all',
          whiteSpace: 'pre-wrap',
        },
      });
    } catch (err) {
      console.error('Error placing order:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to place order';
      setError(errorMessage);
      toast.error(errorMessage, {
        duration: 5000,
        style: {
          background: '#EF4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
          maxWidth: '90vw',
          wordBreak: 'break-all',
          whiteSpace: 'pre-wrap',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatBalance = (value: number | null): string => {
    if (value === null) return "-";
    const tokenSymbol = side === 'buy' ? 'EURCH' : 'ECFCH';
    return `${tokenSymbol} ${value.toLocaleString()}`;
  };

  return (
    <div className="flex h-screen m-0 p-0 overflow-hidden">
      <Toaster position="top-right" />
      {/* TradingView Chart on the left, fills available space */}
      <section className="flex-1 bg-white dark:bg-slate-900 rounded-none p-0 m-0 shadow-none border-none h-full">
        <div className="h-full w-full">
          <TradingViewWidget />
        </div>
      </section>
      {/* Place Order Panel on the right */}
      <section className="w-[250px] bg-white dark:bg-slate-900 rounded-none p-6 shadow-none border-l border-gray-200 dark:border-slate-800 h-full flex flex-col justify-center m-0">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Place Order
          </h2>
          {!publicKey ? (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Please connect your wallet to start trading
              </p>
            </div>
          ) : (
            <>
              <div className="flex gap-2 mb-4">
                <button
                  className={`flex-1 py-2 rounded-lg font-semibold transition ${
                    side === "buy"
                      ? "bg-green-600 text-white shadow"
                      : "bg-gray-100 dark:bg-slate-800 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-700"
                  }`}
                  onClick={() => setSide("buy")}
                  disabled={isLoading}
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
                  disabled={isLoading}
                >
                  Sell
                </button>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="font-medium text-gray-700 dark:text-gray-200" htmlFor="orderSize">
                    Order Size
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      className={`px-2 py-1 text-sm rounded ${
                        inputCurrency === 'EURCH'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300'
                      }`}
                      onClick={() => setInputCurrency('EURCH')}
                      disabled={isLoading}
                    >
                      EURCH
                    </button>
                    <button
                      className={`px-2 py-1 text-sm rounded ${
                        inputCurrency === 'ECFCH'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300'
                      }`}
                      onClick={() => setInputCurrency('ECFCH')}
                      disabled={isLoading}
                    >
                      ECFCH
                    </button>
                  </div>
                </div>
                <input
                  id="orderSize"
                  type="number"
                  min="1"
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded px-3 py-2 text-gray-900 dark:text-white mb-2"
                  value={orderSize}
                  onChange={(e) => setOrderSize(Number(e.target.value))}
                  placeholder={`Enter amount in ${inputCurrency}`}
                  disabled={isLoading}
                />
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Equivalent: {calculateEquivalentAmount(orderSize).toFixed(3)} {inputCurrency === 'EURCH' ? 'ECFCH' : 'EURCH'}
                </div>
                <input
                  type="range"
                  min="1"
                  max={available || 1000}
                  value={orderSize}
                  onChange={(e) => setOrderSize(Number(e.target.value))}
                  className="w-full accent-green-600 dark:accent-green-400"
                  disabled={isLoading}
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1</span>
                  <span>{available || 1000}</span>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded">
                  {error}
                </div>
              )}

              <button
                className={`w-full py-3 rounded-lg font-bold text-lg transition ${
                  side === "buy"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={placeOrder}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  side === "buy" ? "Place Buy Order" : "Place Sell Order"
                )}
              </button>
            </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-800">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-900 dark:text-white">Order Info:</span>
            <ul className="mt-2 space-y-1">
              <li>
                <span className="text-gray-700 dark:text-gray-200">Order Size:</span>{" "}
                {orderSize || "-"} {inputCurrency}
              </li>
              <li>
                <span className="text-gray-700 dark:text-gray-200">Equivalent:</span>{" "}
                {calculateEquivalentAmount(orderSize).toFixed(3)} {inputCurrency === 'EURCH' ? 'ECFCH' : 'EURCH'}
              </li>
              <li>
                <span className="text-gray-700 dark:text-gray-200">Current Price:</span>{" "}
                1 ECFCH = {price} EURCH
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
              <li>
                <span className="text-gray-700 dark:text-gray-200">Balance:</span>{" "}
                {formatBalance(balance)}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
} 