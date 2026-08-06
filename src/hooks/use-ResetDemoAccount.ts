import { tradeService } from "@/services/tradeService";
import type {
  ResetDemoAccountResponse,
  TradeHistoryItem,
} from "@/types/tradeService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useResetDemoAccount = () => {
  const queryClient = useQueryClient();

  return useMutation<ResetDemoAccountResponse, Error, void>({
    mutationFn: tradeService.resetDemoAccount,

    onSuccess: (data) => {
      // Wallet balance returns to 10,000 USDT
      queryClient.invalidateQueries({
        queryKey: ["wallet", "me"],
      });

      // All assets are deleted
      queryClient.invalidateQueries({
        queryKey: ["holdings", "my"],
      });

      // Immediately remove old history from cache
      queryClient.setQueryData<TradeHistoryItem[]>(["trades", "history"], []);

      // Then retrieve the actual data from the backend
      queryClient.invalidateQueries({
        queryKey: ["trades", "history"],
      });

      toast.success(data.data?.message || "حساب تمرینی با موفقیت ریست شد");
    },

    onError: (error) => {
      toast.error(error.message || "ریست‌کردن حساب تمرینی با خطا مواجه شد");
    },
  });
};
