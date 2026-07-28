import coingeckoApi from "@/lib/coingecko";
import { CoinMarketData } from "@/types/market";

export const MarketService = {
  getTopCoins: async (perPage = 50): Promise<CoinMarketData[]> => {
    const { data } = await coingeckoApi.get<CoinMarketData[]>(
      "/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: perPage,
          page: 1,
          sparkline: false,
          price_change_percentage: "24h",
        },
      },
    );
    return data;
  },

  getOhlc: async (coinId: string, days = 7): Promise<number[][]> => {
    const { data } = await coingeckoApi.get<number[][]>(
      `/coins/${coinId}/ohlc`,
      { params: { vs_currency: "usd", days } },
    );
    return data;
  },
};
