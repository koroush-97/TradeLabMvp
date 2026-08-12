import { useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  CandlestickSeries,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";

import { Container } from "@/app/_components_ui/Container";
import { useCoinOhlc } from "@/hooks/use-CoinOhlc";

interface CoinChartProps {
  coinId: string;
  days: number;
}

export function CoinChart({ coinId, days }: CoinChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const { data, isLoading, isError } = useCoinOhlc(coinId, days);

  // Create a chart — only once per mount
  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#94a3b8",
      },
      grid: {
        vertLines: { color: "#1e293b" },
        horzLines: { color: "#1e293b" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    chartRef.current = chart;
    seriesRef.current = series;

    return () => {
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  // Update data every time the query changes
  useEffect(() => {
    if (!seriesRef.current || !data) return;
    seriesRef.current.setData(data);
    chartRef.current?.timeScale().fitContent();
  }, [data]);

  return (
    <Container className="min-w-0">
      <div className="relative h-64 w-full sm:h-80 lg:h-96 min-w-0">
        <div ref={containerRef} className="absolute inset-0" />

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-slate-800/60 backdrop-blur-sm text-slate-400 text-sm animate-pulse">
            در حال دریافت داده‌ها...
          </div>
        )}

        {isError && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-slate-800/60 text-red-400 text-sm">
            خطا در دریافت داده نمودار
          </div>
        )}
      </div>
    </Container>
  );
}
