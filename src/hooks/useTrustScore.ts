import { useState, useEffect } from 'react';

export interface TrustState {
  score: number;
  totalMistakes: number;
  totalCorrect: number;
  banned: boolean;
}

export function useTrustScore() {
  const [trustState, setTrustState] = useState<TrustState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('decaptcha_trust_state');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return {
      score: 100,
      totalMistakes: 0,
      totalCorrect: 0,
      banned: false,
    };
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('decaptcha_trust_state', JSON.stringify(trustState));
  }, [trustState]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const addMistake = (amount = 1) => {
    setTrustState((prev) => {
      let newScore = prev.score;
      const newMistakes = prev.totalMistakes + amount;
      let newBanned = prev.banned;
      
      // For every 10 mistakes, reduce score by 4%
      if (newMistakes % 10 === 0) {
        newScore = Math.max(0, newScore - 4);
        showToast('Trust Score reduced. Improve accuracy to protect account.');
      } else if (amount >= 3) {
        showToast('Too many mistakes detected. Slow down suspicious attempts.');
      }

      if (newScore < 49) {
        newBanned = true;
      }

      return {
        ...prev,
        score: newScore,
        totalMistakes: newMistakes,
        banned: newBanned,
        // Reset correct count on mistake to prevent streak hoarding
        totalCorrect: 0
      };
    });
  };

  const addCorrect = () => {
    setTrustState((prev) => {
      if (prev.banned || prev.score >= 100) return { ...prev, totalCorrect: prev.totalCorrect + 1 };
      
      const newCorrect = prev.totalCorrect + 1;
      let newScore = prev.score;

      // Every 20 correct captchas in a row = +1%
      if (newCorrect % 20 === 0) {
        newScore = Math.min(100, newScore + 1);
        showToast('Good job! Trust Score increased.');
      }

      return {
        ...prev,
        score: newScore,
        totalCorrect: newCorrect
      };
    });
  };

  const getStatus = (score: number) => {
    if (score >= 90) return { label: 'Excellent', color: 'text-emerald-400', bg: 'bg-emerald-400', message: 'Account is in great standing.' };
    if (score >= 75) return { label: 'Good', color: 'text-blue-400', bg: 'bg-blue-400', message: 'Maintain accuracy to improve score.' };
    if (score >= 60) return { label: 'Warning', color: 'text-yellow-400', bg: 'bg-yellow-400', message: 'Too many mistakes recently.' };
    if (score >= 49) return { label: 'Risky', color: 'text-orange-400', bg: 'bg-orange-400', message: 'Account at risk of restriction.' };
    return { label: 'Restricted', color: 'text-red-500', bg: 'bg-red-500', message: 'Account has been restricted.' };
  };

  const manualRestore = () => {
    setTrustState({
      score: 100,
      totalMistakes: 0,
      totalCorrect: 0,
      banned: false
    });
  };

  return {
    trustState,
    addMistake,
    addCorrect,
    getStatus,
    toastMessage,
    manualRestore
  };
}
