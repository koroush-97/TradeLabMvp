import apiClient from "@/lib/api-client";
import { TradeHistoryResponse, TransactionItem } from "@/types/tradeHistory";

export const tradeHistoryService = {
  getHistory: async (): Promise<TransactionItem[]> => {
    const { data } =
      await apiClient.get<TradeHistoryResponse>("/api/trade/history");
    return Array.isArray(data.data) ? data.data : [];
  },
};
