import { tradeService } from "@/services/tradeService";
import {
  TradeHistoryItem,
  TradeRequest,
  TradeResponse,
} from "@/types/tradeService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useBuy = () => {
  const queryClient = useQueryClient();

  return useMutation<TradeResponse, Error, TradeRequest>({
    mutationFn: tradeService.buy,
    onSuccess: (data) => {
      toast.success(data.message || "خرید با موفقیت انجام شد");
      queryClient.invalidateQueries({ queryKey: ["holdings", "my"] });
      queryClient.invalidateQueries({ queryKey: ["wallet", "me"] });
      queryClient.invalidateQueries({ queryKey: ["trades", "history"] });
    },
  });
};

export const useSell = () => {
  const queryClient = useQueryClient();

  return useMutation<TradeResponse, Error, TradeRequest>({
    mutationFn: tradeService.sell,
    onSuccess: (data) => {
      toast.success(data.message || "فروش با موفقیت انجام شد");
      queryClient.invalidateQueries({ queryKey: ["holdings", "my"] });
      queryClient.invalidateQueries({ queryKey: ["wallet", "me"] });
      queryClient.invalidateQueries({ queryKey: ["trades", "history"] });
    },
  });
};

export const useTradeHistory = () => {
  return useQuery<TradeHistoryItem[]>({
    queryKey: ["trades", "history"],
    queryFn: tradeService.getHistory,
    refetchOnWindowFocus: false,
  });
};
