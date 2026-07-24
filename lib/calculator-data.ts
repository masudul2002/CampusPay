export interface ProviderOption {
  id: string;
  name: string;
  logoColor: string;
  appFeeRate: number; // percentage
  ussdFeeRate: number; // percentage
  cashInFeeRate: number;
  sendMoneyFee: number; // flat BDT if under threshold or free
  description: string;
  badge?: string;
}

export const PROVIDERS: ProviderOption[] = [
  {
    id: "bkash",
    name: "bKash",
    logoColor: "from-pink-500 to-rose-600",
    appFeeRate: 1.85,
    ussdFeeRate: 1.85,
    cashInFeeRate: 0,
    sendMoneyFee: 0,
    description: "Bangladesh's largest Mobile Financial Service",
    badge: "Most Popular",
  },
  {
    id: "nagad",
    name: "Nagad",
    logoColor: "from-orange-500 to-amber-600",
    appFeeRate: 1.49,
    ussdFeeRate: 1.80,
    cashInFeeRate: 0,
    sendMoneyFee: 0,
    description: "Post Office MFS with lowest Cash Out rates",
    badge: "Lowest Rate",
  },
  {
    id: "rocket",
    name: "Dutch-Bangla Rocket",
    logoColor: "from-purple-600 to-indigo-700",
    appFeeRate: 1.80,
    ussdFeeRate: 1.80,
    cashInFeeRate: 0,
    sendMoneyFee: 0,
    description: "DBBL official digital mobile wallet",
  },
  {
    id: "cellfin",
    name: "Cellfin (Islami Bank)",
    logoColor: "from-emerald-500 to-teal-700",
    appFeeRate: 1.00,
    ussdFeeRate: 1.00,
    cashInFeeRate: 0,
    sendMoneyFee: 0,
    description: "Omni-channel banking app for IBBL",
    badge: "Best Student Pick",
  },
  {
    id: "bank",
    name: "Direct Bank Transfer",
    logoColor: "from-blue-600 to-cyan-700",
    appFeeRate: 0.00,
    ussdFeeRate: 0.00,
    cashInFeeRate: 0,
    sendMoneyFee: 0,
    description: "NPSB / BEFTN instant inter-bank transfer",
    badge: "Zero Fee",
  },
];
