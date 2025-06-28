import React from "react"

interface CurrencyPair {
  id: string;
  name: string;
  flag1: React.ReactNode;
  flag2: React.ReactNode;
}

export const currencyPairs: CurrencyPair[] = [
  {
    id: "EURUSD",
    name: "EUR/USD",
    flag1: <span className="fi fi-eu rounded-full w-6 h-6 border-2 border-white shadow z-10 inline-block dark:border-slate-700" />,
    flag2: <span className="fi fi-us rounded-full w-6 h-6 border-2 border-white shadow inline-block dark:border-slate-700" />,
  },
  {
    id: "GBPUSD",
    name: "GBP/USD",
    flag1: <span className="fi fi-gb rounded-full w-6 h-6 border-2 border-white shadow z-10 inline-block dark:border-slate-700" />,
    flag2: <span className="fi fi-us rounded-full w-6 h-6 border-2 border-white shadow inline-block dark:border-slate-700" />,
  },
  {
    id: "USDJPY",
    name: "USD/JPY",
    flag1: <span className="fi fi-us rounded-full w-6 h-6 border-2 border-white shadow z-10 inline-block dark:border-slate-700" />,
    flag2: <span className="fi fi-jp rounded-full w-6 h-6 border-2 border-white shadow inline-block dark:border-slate-700" />,
  },
  {
    id: "USDCHF",
    name: "USD/CHF",
    flag1: <span className="fi fi-us rounded-full w-6 h-6 border-2 border-white shadow z-10 inline-block dark:border-slate-700" />,
    flag2: <span className="fi fi-ch rounded-full w-6 h-6 border-2 border-white shadow inline-block dark:border-slate-700" />,
  },
  {
    id: "AUDUSD",
    name: "AUD/USD",
    flag1: <span className="fi fi-au rounded-full w-6 h-6 border-2 border-white shadow z-10 inline-block dark:border-slate-700" />,
    flag2: <span className="fi fi-us rounded-full w-6 h-6 border-2 border-white shadow inline-block dark:border-slate-700" />,
  },
  {
    id: "USDCAD",
    name: "USD/CAD",
    flag1: <span className="fi fi-us rounded-full w-6 h-6 border-2 border-white shadow z-10 inline-block dark:border-slate-700" />,
    flag2: <span className="fi fi-ca rounded-full w-6 h-6 border-2 border-white shadow inline-block dark:border-slate-700" />,
  },
  {
    id: "NZDUSD",
    name: "NZD/USD",
    flag1: <span className="fi fi-nz rounded-full w-6 h-6 border-2 border-white shadow z-10 inline-block dark:border-slate-700" />,
    flag2: <span className="fi fi-us rounded-full w-6 h-6 border-2 border-white shadow inline-block dark:border-slate-700" />,
  },
  {
    id: "EURGBP",
    name: "EUR/GBP",
    flag1: <span className="fi fi-eu rounded-full w-6 h-6 border-2 border-white shadow z-10 inline-block dark:border-slate-700" />,
    flag2: <span className="fi fi-gb rounded-full w-6 h-6 border-2 border-white shadow inline-block dark:border-slate-700" />,
  },
  {
    id: "EURJPY",
    name: "EUR/JPY",
    flag1: <span className="fi fi-eu rounded-full w-6 h-6 border-2 border-white shadow z-10 inline-block dark:border-slate-700" />,
    flag2: <span className="fi fi-jp rounded-full w-6 h-6 border-2 border-white shadow inline-block dark:border-slate-700" />,
  },
  {
    id: "GBPJPY",
    name: "GBP/JPY",
    flag1: <span className="fi fi-gb rounded-full w-6 h-6 border-2 border-white shadow z-10 inline-block dark:border-slate-700" />,
    flag2: <span className="fi fi-jp rounded-full w-6 h-6 border-2 border-white shadow inline-block dark:border-slate-700" />,
  },
]; 