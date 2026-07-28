import apiClient from "@/lib/api-client";
import { MarketCoin } from "@/types/MarketCoin";

export const marketService = {
  getMarkets: async (): Promise<MarketCoin[]> => {
    const { data } = await apiClient.get("/api/market/prices");
    return data;
  },
};
