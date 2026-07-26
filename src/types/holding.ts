export interface Holding {
  id: number;
  coinId: string;
  symbol: string;
  name: string;
  quantity: number;
  averageBuyPrice: number;
  currentPrice: number;
  totalCost: string;
  currentValue: string;
  profitLoss: string;
  profitLossPercentage: string;
  image: string;
}
