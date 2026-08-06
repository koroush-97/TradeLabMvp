import { useQuery } from "@tanstack/react-query";
import { MarketService } from "@/services/market-service";
import type { UTCTimestamp } from "lightweight-charts";

type OhlcCandle = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
};

export function useCoinOhlc(coinId: string, days = 7) {
  return useQuery({
    queryKey: ["coin-ohlc", coinId, days],
    queryFn: async () => {
      const raw = await MarketService.getOhlc(coinId, days);
      const seen = new Set<number>();
      return raw
        .map(
          ([ts, o, h, l, c]): OhlcCandle => ({
            time: (ts / 1000) as UTCTimestamp,
            open: o,
            high: h,
            low: l,
            close: c,
          }),
        )
        .filter((d) => (seen.has(d.time) ? false : seen.add(d.time)))
        .sort((a, b) => a.time - b.time);
    },
    enabled: !!coinId,
    refetchOnWindowFocus: false,
  });
}
