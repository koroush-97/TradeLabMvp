import { walletService } from "@/services/wallet-service";
import { Wallet } from "@/types/wallet";
import { useQuery } from "@tanstack/react-query";

export const useMyWallet = () => {
  return useQuery<Wallet>({
    queryKey: ["wallet", "me"],
    queryFn: walletService.getMyWallet,
    refetchOnWindowFocus: false,
  });
};
