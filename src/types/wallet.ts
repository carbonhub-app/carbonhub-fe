export interface UserData {
  publicKey: string;
  blockchain: "solana";
  connectedAt: string;
  carbonCredits: number;
  totalTransactions: number;
  lastLoginAt: string;
}

export interface PhantomWalletState {
  phantom: any | null;
  isConnected: boolean;
  publicKey: string | null;
  connecting: boolean;
  error: string | null;
  userData: UserData | null;
}

export interface WalletConnection {
  address: string;
  blockchain: "solana" | "ethereum" | "sui" | "bitcoin";
  connectedAt: Date;
}

export interface CarbonCreditTransaction {
  id: string;
  type: "purchase" | "sale" | "offset" | "earn";
  amount: number;
  price?: number;
  timestamp: Date;
  transactionHash?: string;
  status: "pending" | "confirmed" | "failed";
}
