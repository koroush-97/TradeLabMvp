import { holdingService } from "@/services/holding-service";
import type { Holding } from "@/types/holding";
import { useQuery } from "@tanstack/react-query";

export const useMyHoldings = () => {
  return useQuery<Holding[]>({
    queryKey: ["holdings", "my"],
    queryFn: holdingService.getMyHoldings,
    refetchOnWindowFocus: false,
    refetchInterval: 15000,
  });
};
