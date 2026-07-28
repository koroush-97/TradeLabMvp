import apiClient from "@/lib/api-client";
import { Wallet } from "@/types/wallet";

export const walletService = {
  getMyWallet: async (): Promise<Wallet> => {
    const response = await apiClient.get<{
      success: boolean;
      message: string;
      data: { wallet: Wallet };
    }>("/api/wallet/me");

    const wallet = response.data.data.wallet;

    return wallet;
  },
};
