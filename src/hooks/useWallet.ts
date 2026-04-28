import { useState, useEffect } from "react";

export interface WalletState {
  balance: number;
  points: number;
  totalTextSolved: number;
  streak: number;
  lastSolveTime: number;
  todayEarnings: number;
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("decaptcha_wallet");
      if (saved) return JSON.parse(saved);
    }
    return {
      balance: 0,
      points: 50,
      totalTextSolved: 0,
      streak: 0,
      lastSolveTime: Date.now(),
      todayEarnings: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem("decaptcha_wallet", JSON.stringify(wallet));
  }, [wallet]);

  const addReward = (amount: number) => {
    setWallet((prev) => {
      const now = Date.now();
      return {
        ...prev,
        balance: prev.balance + amount,
        todayEarnings: prev.todayEarnings + amount,
        totalTextSolved: prev.totalTextSolved + 1,
        streak: prev.streak + 1,
        lastSolveTime: now,
      };
    });
  };

  const deductPoints = (amount: number) => {
    setWallet((prev) => ({
      ...prev,
      points: Math.max(0, prev.points - amount),
    }));
  };

  const addPoints = (amount: number) => {
    setWallet((prev) => ({
      ...prev,
      points: prev.points + amount,
    }));
  };

  const resetStreak = () => {
    setWallet((prev) => ({ ...prev, streak: 0 }));
  };

  return { wallet, addReward, deductPoints, addPoints, resetStreak };
}
