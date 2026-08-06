import { marketService } from "@/services/marketCoinPrice-service";
import { MarketCoin } from "@/types/MarketCoin";
import { useQuery } from "@tanstack/react-query";

export const useMarketsPrice = () => {
  return useQuery<MarketCoin[]>({
    queryKey: ["market", "prices"],
    queryFn: marketService.getMarkets,
    refetchOnWindowFocus: false,
    refetchInterval: 10000,
  });
};
