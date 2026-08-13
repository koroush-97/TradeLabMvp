"use client";

import { Check, ChevronDown, LoaderCircle, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import Image from "next/image";

export interface MarketCoin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number | null;
}

interface CoinSelectorProps {
  coins: MarketCoin[];
  selectedCoin?: MarketCoin;
  isLoading?: boolean;
  onSelect: (coin: MarketCoin) => void;
}

export function CoinSelector({
  coins,
  selectedCoin,
  isLoading = false,
  onSelect,
}: CoinSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  // Filter by cryptocurrency name or symbol
  const filteredCoins = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    if (!normalizedSearch) {
      return coins;
    }

    return coins.filter((coin) => {
      const coinName = coin.name.toLowerCase();
      const coinSymbol = coin.symbol.toLowerCase();

      return (
        coinName.includes(normalizedSearch) ||
        coinSymbol.includes(normalizedSearch)
      );
    });
  }, [coins, searchValue]);

  // Close the dropdown if clicked outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (containerRef.current && !containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleToggleDropdown() {
    if (isLoading) return;

    setIsOpen((previousValue) => !previousValue);
  }

  function handleSelectCoin(coin: MarketCoin) {
    onSelect(coin);

    // After selection, the previous search is cleared and the dropdown is closed.
    setSearchValue("");
    setIsOpen(false);
  }

  const selectedCoinSymbol = selectedCoin?.symbol.toUpperCase();

  return (
    <div ref={containerRef} className="relative ">
      <label
        htmlFor="coin-search"
        className="mb-2 block text-sm text-muted-foreground"
      >
        رمزارز
      </label>

      {/* Button to display the selected cryptocurrency */}
      <button
        type="button"
        onClick={handleToggleDropdown}
        disabled={isLoading}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 text-sm transition-colors hover:border-primary/50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? (
          <span className="flex items-center gap-2 text-muted">
            <LoaderCircle size={17} className="animate-spin" />
            در حال دریافت رمزارزها...
          </span>
        ) : selectedCoin ? (
          <span className="flex min-w-0 items-center gap-2" dir="ltr">
            <Image
              src={selectedCoin.image}
              alt={selectedCoin.name}
              className="h-6 w-6 shrink-0 rounded-full"
              width={32}
              height={32}
            />

            <span className="truncate font-bold">
              {selectedCoin.name} ({selectedCoinSymbol})
            </span>
          </span>
        ) : (
          <span className="text-muted">رمزارز را انتخاب کنید</span>
        )}

        <ChevronDown
          size={18}
          className={`shrink-0 text-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/*  dropdown */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
          {/* input جست‌وجو */}
          <div className="border-b border-border p-3">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3">
              <Search size={17} className="shrink-0 text-muted" />

              <input
                id="coin-search"
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="جست‌وجوی نام یا نماد..."
                autoFocus
                className="min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-muted"
              />

              {searchValue && (
                <button
                  type="button"
                  onClick={() => setSearchValue("")}
                  aria-label="پاک کردن جست‌وجو"
                  className="text-muted transition-colors hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Coins list */}
          <div role="listbox" className="max-h-80 overflow-y-auto p-2">
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin) => {
                const isSelected = coin.id === selectedCoin?.id;
                const priceChange = coin.price_change_percentage_24h ?? 0;

                const isPositive = priceChange >= 0;

                return (
                  <button
                    key={coin.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectCoin(coin)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right transition-colors hover:bg-surface ${
                      isSelected ? "bg-primary/10" : ""
                    }`}
                  >
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      className="h-9 w-9 shrink-0 rounded-full"
                      width={33}
                      height={33}
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <span className="truncate text-sm font-bold">
                          {coin.name}
                        </span>

                        <span className="shrink-0 text-xs text-muted" dir="ltr">
                          $
                          {coin.current_price.toLocaleString("en-US", {
                            maximumFractionDigits: 8,
                          })}
                        </span>
                      </div>

                      <div className="mt-1 flex items-center justify-between gap-3">
                        <span className="text-xs text-muted" dir="ltr">
                          {coin.symbol.toUpperCase()}/USDT
                        </span>

                        <span
                          dir="ltr"
                          className={`text-xs font-medium ${
                            isPositive ? "text-profit" : "text-loss"
                          }`}
                        >
                          {isPositive ? "+" : ""}
                          {priceChange.toFixed(2)}%
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <Check size={18} className="shrink-0 text-primary" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="py-8 text-center text-sm text-muted">
                رمزارزی با عبارت «{searchValue}» پیدا نشد.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
