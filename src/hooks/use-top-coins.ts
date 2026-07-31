import { useQuery } from "@tanstack/react-query";
import { MarketService } from "@/services/market-service";

export function useTopCoins(perPage = 50) {
  return useQuery({
    queryKey: ["top-coins", perPage],
    queryFn: () => MarketService.getTopCoins(perPage),
    refetchInterval: 60_000,
    refetchOnWindowFocus: false,
  });
}
