// src/hooks/use-TradeHistory.ts
import { tradeHistoryService } from "@/services/history-service";
import { TransactionItem } from "@/types/tradeHistory";
import { useQuery } from "@tanstack/react-query";

export const useTradeHistory = () => {
  return useQuery<TransactionItem[]>({
    queryKey: ["trade", "history"],
    queryFn: tradeHistoryService.getHistory,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
  });
};
