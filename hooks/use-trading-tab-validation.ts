import { useEffect, useState } from "react";

interface TradingTabState {
  investmentAmount: string;
  expirationTime: string;
  candleInterval: string;
  selectedPairs: string[];
  strategy: string;
  confidence: [number, number];
}

// We no longer need getTradingTabState here as state is passed via event
// function getTradingTabState(): TradingTabState | null {
//   if (typeof window === "undefined") return null;
//   try {
//     const val = localStorage.getItem("tradingTab_state");
//     if (!val) return null;
//     return JSON.parse(val);
//   } catch {
//     return null;
//   }
// }

export function useTradingTabValidation() {
  const [canStart, setCanStart] = useState(false);

  function validateTradingTab(trading: TradingTabState | null): boolean {
    if (!trading) return false;

    const investment = parseFloat(trading.investmentAmount);
    const isInvestmentValid = !isNaN(investment) && investment >= 1;
    const isExpirationValid = !!trading.expirationTime;
    const isIntervalValid = !!trading.candleInterval;
    const isPairsValid = trading.selectedPairs && trading.selectedPairs.length > 0;
    const isStrategyValid = !!trading.strategy;
    const isConfidenceValid = trading.confidence && trading.confidence.length > 0 && trading.confidence[0] >= 50 && trading.confidence[0] <= 100;

    // Simulación de saldo (reemplazar por prop o contexto real en un futuro)
    const balance = 10; // This should ideally come from a context or prop
    const hasBalance = balance > 0;

    return (
      hasBalance &&
      isInvestmentValid &&
      isExpirationValid &&
      isIntervalValid &&
      isPairsValid &&
      isStrategyValid &&
      isConfidenceValid
    );
  }

  useEffect(() => {
    function syncValidation(event?: Event) {
      let latestState: TradingTabState | null = null;

      if (event && event.type === 'tradingTabStateChanged' && event instanceof CustomEvent && event.detail) {
        // Prioritize state from our custom event
        latestState = event.detail as TradingTabState;
        console.log("useTradingTabValidation: Received custom event with state:", latestState);
      } else if (typeof window !== "undefined") {
        // Fallback for initial load or other storage events (e.g., from other tabs)
        try {
          const val = localStorage.getItem("tradingTab_state");
          if (val) {
            latestState = JSON.parse(val);
            console.log("useTradingTabValidation: Read state from localStorage:", latestState);
          }
        } catch {}
      }
      const newCanStart = validateTradingTab(latestState);
      console.log("useTradingTabValidation: newCanStart value:", newCanStart);
      setCanStart(newCanStart);
    }

    // Listen to storage events (for other tabs/windows)
    window.addEventListener("storage", syncValidation);
    // Listen to our custom event (for real-time updates from TradingTab)
    window.addEventListener("tradingTabStateChanged", syncValidation as EventListener);

    syncValidation(); // Initial validation on mount

    return () => {
      window.removeEventListener("storage", syncValidation);
      window.removeEventListener("tradingTabStateChanged", syncValidation as EventListener);
    };
  }, []);

  return canStart;
} 