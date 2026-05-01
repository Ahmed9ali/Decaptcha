import { useState, useEffect } from "react";
import { useAuth } from "../lib/AuthContext";

export interface WalletState {
  userId?: string;
  balance: number;
  points: number;
  totalTextSolved: number;
  totalImageSolved: number;
  streak: number;
  lastSolveTime: number;
  todayEarnings: number;
}

export function useWallet() {
  const { user } = useAuth();
  
  const [wallet, setWallet] = useState<WalletState>({
    balance: user?.balance || 0,
    points: user?.points || 0,
    totalTextSolved: user?.captchaStats?.text?.dailyCount || 0,
    totalImageSolved: 0,
    streak: 0,
    lastSolveTime: Date.now(),
    todayEarnings: 0,
  });

  useEffect(() => {
    if (user) {
      setWallet(prev => ({
        ...prev,
        balance: user.balance || 0,
        points: user.points || 0,
        totalTextSolved: user.captchaStats?.text?.dailyCount || prev.totalTextSolved,
      }));
    }
  }, [user]);

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
