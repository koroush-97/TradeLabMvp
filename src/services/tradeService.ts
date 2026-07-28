import apiClient from "@/lib/api-client";
import type {
  ResetDemoAccountResponse,
  TradeHistoryItem,
  TradeRequest,
  TradeResponse,
} from "@/types/tradeService";

export const tradeService = {
  buy: async (payload: TradeRequest): Promise<TradeResponse> => {
    const { data } = await apiClient.post("/api/trade/buy", payload);
    return data;
  },

  sell: async (payload: TradeRequest): Promise<TradeResponse> => {
    const { data } = await apiClient.post("/api/trade/sell", payload);
    return data;
  },

  getHistory: async (): Promise<TradeHistoryItem[]> => {
    const { data } = await apiClient.get("/api/trade/history");
    return data;
  },

  // reset assets
  resetDemoAccount: async (): Promise<ResetDemoAccountResponse> => {
    const { data } = await apiClient.post("/api/trade/reset-demo-account");
    return data;
  },
};
