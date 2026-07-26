export type TransactionType = "buy" | "sell" | "BUY" | "SELL";

export interface TransactionItem {
  id: number;
  user_id?: number;
  coin_id?: string;
  coinId?: string;
  symbol: string;
  name: string;
  type: TransactionType;
  quantity: number | string;
  price_at_time?: number | string;
  price?: number | string;
  total_value?: number | string;
  totalCost?: number | string;
  fee?: number | null;
  realized_pnl?: number | null;
  created_at: string;
}

export interface TradeHistoryResponse {
  success: boolean;
  data: TransactionItem[];
}
