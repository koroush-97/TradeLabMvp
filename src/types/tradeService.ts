export interface TradeRequest {
  coinId: string;
  quantity: number;
}

export interface TradeResponse {
  message: string;
  balance: number;
}

export interface TradeHistoryItem {
  id: number;
  coinId: string;
  type: "buy" | "sell";
  amount: number;
  price: number;
  realizedPnl: number | null;
  createdAt: string;
}

export type ResetDemoAccountResponse = {
  success: boolean;
  data: {
    message: string;
    cashBalance: number;
  };
};
