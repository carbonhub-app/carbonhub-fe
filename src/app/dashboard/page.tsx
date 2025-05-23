"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { usePhantomWallet } from "@/context/PhantomWalletContext";

export default function DashboardPage() {
  const { userData, publicKey } = usePhantomWallet();

  // Helper function to truncate wallet address
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Connected Wallet:</span>
          <span className="font-mono bg-muted px-2 py-1 rounded">
            {publicKey ? truncateAddress(publicKey) : "Not connected"}
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            Solana
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Current Carbon Credits</h2>
          <p className="text-3xl font-bold">{userData?.carbonCredits || 0}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Ready to trade or offset
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Wallet Connection</h2>
          <p className="text-3xl font-bold text-green-500">Active</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Connected since{" "}
            {userData?.connectedAt
              ? new Date(userData.connectedAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Total Transactions</h2>
          <p className="text-3xl font-bold">
            {userData?.totalTransactions || 0}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Blockchain transactions
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Carbon Credit Activity</h2>
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
          <div className="text-center">
            <p className="text-slate-500 dark:text-slate-400 mb-2">
              Carbon tracking chart will appear here
            </p>
            <p className="text-sm text-slate-400">
              Connect your carbon sources to start tracking
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Wallet Activity</h2>

          {userData?.totalTransactions === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500 dark:text-slate-400 mb-2">
                No transactions yet
              </p>
              <p className="text-sm text-slate-400">
                Start by purchasing or earning carbon credits
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
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
                    <p className="font-medium">Wallet Connected</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Phantom wallet authenticated successfully
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                      {userData?.connectedAt
                        ? new Date(userData.connectedAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Getting Started</h2>

          <div className="space-y-6">
            <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
              <h3 className="font-medium mb-2 text-primary">
                🎉 Wallet Connected!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                Your Phantom wallet is now connected to CarbonHub. You're ready
                to start tracking and trading carbon credits.
              </p>
              <div className="text-xs text-slate-500 font-mono">
                {publicKey ? truncateAddress(publicKey) : "N/A"}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">Next Steps:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Complete your profile setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                  <span>Connect your carbon sources</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                  <span>Start tracking emissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                  <span>Explore carbon marketplace</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
