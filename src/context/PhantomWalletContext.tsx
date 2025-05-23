"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Types
interface PhantomWallet {
  solana?: {
    connect: () => Promise<any>;
    isConnected: boolean;
    signMessage: (message: Uint8Array) => Promise<void>;
  };
}

interface PhantomWalletState {
  phantom: any;
  isConnected: boolean;
  publicKey: string | null;
  connecting: boolean;
  error: string | null;
  userData: UserData | null;
}

interface UserData {
  publicKey: string;
  blockchain: "solana";
  connectedAt: string;
  carbonCredits: number;
  totalTransactions: number;
  lastLoginAt: string;
}

interface PhantomWalletContextType extends PhantomWalletState {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  clearError: () => void;
}

// Context
const PhantomWalletContext = createContext<PhantomWalletContextType | null>(
  null
);

// Provider Component
export function PhantomWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<PhantomWalletState>({
    phantom: null,
    isConnected: false,
    publicKey: null,
    connecting: false,
    error: null,
    userData: null,
  });

  const router = useRouter();

  // Check existing connection on mount
  useEffect(() => {
    checkExistingConnection();
  }, []);

  const checkExistingConnection = async () => {
    try {
      const savedUserData = localStorage.getItem("carbonhub_user");
      if (savedUserData) {
        const userData: UserData = JSON.parse(savedUserData);

        // Try to reconnect to phantom
        if (typeof window !== "undefined" && (window as any).phantom?.solana) {
          const phantom = (window as any).phantom;
          if (phantom && phantom.solana?.isConnected) {
            setState((prev) => ({
              ...prev,
              phantom: phantom,
              isConnected: true,
              publicKey: userData.publicKey,
              userData: {
                ...userData,
                lastLoginAt: new Date().toISOString(),
              },
            }));

            // Update last login
            const updatedUserData = {
              ...userData,
              lastLoginAt: new Date().toISOString(),
            };
            localStorage.setItem(
              "carbonhub_user",
              JSON.stringify(updatedUserData)
            );
          }
        }
      }
    } catch (error) {
      console.error("Error checking existing connection:", error);
    }
  };

  const connectWallet = async () => {
    setState((prev) => ({ ...prev, connecting: true, error: null }));

    try {
      // Dynamic import untuk phantom SDK
      const { createPhantom, Position } = await import("@phantom/wallet-sdk");

      // Create phantom instance
      const phantom = await createPhantom({
        position: Position.bottomRight,
        namespace: "carbonhub",
        hideLauncherBeforeOnboarded: false,
      });

      // Connect to Solana
      const publicKey = await phantom.solana.connect();

      // Optional: Sign a message for verification
      const message = `Welcome to CarbonHub!\n\nPlease sign this message to authenticate your wallet.\n\nTimestamp: ${Date.now()}`;
      await phantom.solana.signMessage(new TextEncoder().encode(message));

      // Create user data
      const userData: UserData = {
        publicKey: publicKey.toString(),
        blockchain: "solana",
        connectedAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        carbonCredits: 0, // Start with 0, will be fetched from backend
        totalTransactions: 0,
      };

      // Save to localStorage
      localStorage.setItem("carbonhub_user", JSON.stringify(userData));

      // Update state
      setState((prev) => ({
        ...prev,
        phantom: phantom,
        isConnected: true,
        publicKey: publicKey.toString(),
        userData,
        connecting: false,
        error: null,
      }));

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Wallet connection failed:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to connect wallet. Please try again.";
      setState((prev) => ({
        ...prev,
        connecting: false,
        error: errorMessage,
      }));
    }
  };

  const disconnectWallet = () => {
    try {
      // Clear localStorage
      localStorage.removeItem("carbonhub_user");

      // Reset state
      setState({
        phantom: null,
        isConnected: false,
        publicKey: null,
        connecting: false,
        error: null,
        userData: null,
      });

      // Redirect to home
      router.push("/");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  const contextValue: PhantomWalletContextType = {
    ...state,
    connectWallet,
    disconnectWallet,
    clearError,
  };

  return (
    <PhantomWalletContext.Provider value={contextValue}>
      {children}
    </PhantomWalletContext.Provider>
  );
}

// Hook
export function usePhantomWallet() {
  const context = useContext(PhantomWalletContext);
  if (!context) {
    throw new Error(
      "usePhantomWallet must be used within a PhantomWalletProvider"
    );
  }
  return context;
}
