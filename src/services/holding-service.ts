import apiClient from "@/lib/api-client";
import { Holding } from "@/types/holding";

interface MyHoldingsResponse {
  success: boolean;
  message: string;
  data: {
    holdings: Holding[];
    totalCryptoValue: number;
    totalCost: number;
    totalProfitLoss: number;
    totalProfitLossPercentage: number;
  };
}

export const holdingService = {
  getMyHoldings: async (): Promise<Holding[]> => {
    const { data } = await apiClient.get<MyHoldingsResponse>(
      "/api/holdings/my-holdings",
    );

    return data.data.holdings;
  },
};
