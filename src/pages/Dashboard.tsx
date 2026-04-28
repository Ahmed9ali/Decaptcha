import React, { useState, useEffect } from "react";
import {
  Wallet,
  Target,
  Trophy,
  PlayCircle,
  Activity,
  CheckCircle,
  ArrowUpRight,
  Zap,
  ShieldAlert,
  ShieldCheck,
  Download,
  History,
  Bell,
  FileText,
  LayoutGrid,
  Clock,
  Users,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  Smartphone,
  Heart,
  Coins,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTrustScore } from "../hooks/useTrustScore";
import { useWallet } from "../hooks/useWallet";
import { useLeaderboard } from "../hooks/useLeaderboard";

import { useGender } from "../hooks/useGender";

const CountUp = ({
  value,
  isCurrency = false,
  prefix = "",
}: {
  value: number;
  isCurrency?: boolean;
  prefix?: string;
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(easeProgress * value);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value]);

  return (
    <span className="font-mono transition-all duration-300">
      {prefix}
      {isCurrency
        ? displayValue.toFixed(4)
        : Math.floor(displayValue).toLocaleString()}
    </span>
  );
};

export default function Dashboard({
  onNavigate,
}: {
  onNavigate: (tab: string) => void;
}) {
  const { trustState, getStatus } = useTrustScore();
  const { wallet } = useWallet();
  const { userXp, getLiveLeaderboard } = useLeaderboard();
  const { gender, updateGender, getAvatarUrl } = useGender();
  const status = getStatus(trustState.score);

  const leaderboard = getLiveLeaderboard();
  const currentUserIndex = leaderboard.findIndex((u) => u.isCurrentUser);
  const userRank = currentUserIndex !== -1 ? currentUserIndex + 1 : "-";

  const lifetimePoints = wallet.points + 2420;
  const pointsUsedToday = 20;
  const pointsEarnedToday = 45;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24 lg:pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 p-[2px]">
            <div className="w-full h-full rounded-full bg-navy border-2 border-transparent flex items-center justify-center overflow-hidden">
              <img
                src={getAvatarUrl()}
                alt="User Avatar"
                className="w-full h-full object-cover bg-white/5"
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Solver!</h1>
            <div className="flex gap-2 mt-1.5 bg-navy border border-glass-border p-1 rounded-xl w-fit">
              <button
                onClick={() => updateGender("male")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${gender === "male" ? "bg-blue-500 hover:bg-blue-400 text-white shadow-md shadow-blue-500/20" : "text-slate-400 hover:text-white"}`}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M14 11l4 9-3 0-2-6-2 6-3 0 4-9" />
                </svg>
                Male
              </button>
              <button
                onClick={() => updateGender("female")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${gender === "female" ? "bg-pink-500 hover:bg-pink-400 text-white shadow-md shadow-pink-500/20" : "text-slate-400 hover:text-white"}`}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M12 11l0 10" />
                  <path d="M9 18l6 0" />
                  <path d="M12 11l-3 4" />
                  <path d="M12 11l3 4" />
                </svg>
                Female
              </button>
            </div>
          </div>
        </div>
      </div>

      <div 
        onClick={() => onNavigate("daily")}
        className="glass-panel p-4 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-teal-500/5 cursor-pointer hover:bg-emerald-500/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-emerald-500/5 group"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center p-0.5 shadow-md group-hover:scale-105 transition-transform shrink-0">
            <div className="w-full h-full border-2 border-white/20 rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/30" />
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-black text-slate-800 dark:text-emerald-50 text-lg">Daily Check-In Ready!</h3>
            <p className="text-slate-500 dark:text-emerald-200/80 text-sm font-medium">Claim your +150 Points & +30 XP now</p>
          </div>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-2.5 rounded-xl font-bold shadow-md transform hover:scale-105 transition-all text-sm flex items-center justify-center gap-2 w-full sm:w-auto">
          Claim Now <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden bg-gradient-to-br from-blue-600/10 to-indigo-600/5 group border border-blue-500/20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 px-3 py-1.5 rounded-full shadow-sm text-blue-100 backdrop-blur-sm">
              <Wallet className="w-4 h-4 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
              <span className="font-bold uppercase tracking-widest text-xs text-shadow-sm">
                Current Balance
              </span>
            </div>
          </div>

          <div className="relative z-10 mb-8 mt-4">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white filter drop-shadow-lg font-mono flex items-baseline gap-1">
              <span className="text-blue-400/80 transition-all font-sans">
                $
              </span>
              <CountUp value={6.22 + wallet.balance} isCurrency={true} />
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10 mt-auto">
            <div className="bg-navy/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between hover:bg-white/10 transition-colors shadow-inner backdrop-blur-sm">
              <div>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-1">
                  Today Earnings
                </p>
                <p className="font-bold text-emerald-400 text-lg font-mono drop-shadow-sm">
                  +
                  <CountUp
                    value={1.45 + wallet.todayEarnings}
                    isCurrency={true}
                    prefix="$"
                  />
                </p>
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-400/40" />
            </div>
            <div className="bg-navy/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between hover:bg-white/10 transition-colors shadow-inner backdrop-blur-sm">
              <div>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-1">
                  Lifetime
                </p>
                <p className="font-bold text-white text-lg font-mono drop-shadow-sm">
                  <CountUp value={142.5} isCurrency={true} prefix="$" />
                </p>
              </div>
              <Wallet className="w-5 h-5 text-purple-400/40" />
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden bg-gradient-to-br from-orange-600/10 to-pink-600/5 border border-orange-500/20 group flex flex-col justify-between">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex justify-between items-start mb-6 relative z-10">
            <div
              className="flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 px-3 py-1.5 rounded-full shadow-sm text-orange-100 backdrop-blur-sm"
              title="Use points to solve captchas"
            >
              <Coins className="w-4 h-4 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
              <span className="font-bold uppercase tracking-widest text-xs text-shadow-sm">
                Total Points
              </span>
            </div>
          </div>

          {wallet.points === 0 ? (
            <div className="relative z-10 flex flex-col items-start justify-center h-[100px] mb-8 mt-4">
              <p className="text-slate-300 text-sm mb-4 max-w-[250px] leading-relaxed">
                Watch ads in app to earn points and solve captchas.
              </p>
              <button
                onClick={() => alert("Opening app...")}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 text-white px-5 py-2 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
              >
                <Smartphone className="w-4 h-4" /> Open App
              </button>
            </div>
          ) : (
            <div className="relative z-10 mb-8 mt-4 flex items-end justify-between">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white filter drop-shadow-lg font-mono flex items-center">
                  <CountUp value={wallet.points} />
                  <span className="text-xl font-sans text-orange-300/50 font-bold ml-3 uppercase tracking-widest">
                    pts
                  </span>
                </h2>
              </div>
              <div className="text-right">
                <p className="text-slate-200 text-[10px] font-bold uppercase tracking-widest mb-1 drop-shadow-sm">Total XP</p>
                <p className="text-2xl font-bold text-white font-mono tracking-tight flex items-baseline justify-end gap-1 drop-shadow-md">
                  <CountUp value={userXp} />
                  <span className="text-xs text-slate-200">XP</span>
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 relative z-10 mt-auto">
            <div className="bg-navy/40 border border-white/10 rounded-xl p-2.5 text-center shadow-inner hover:bg-white/10 transition-colors">
              <div className="text-slate-400 text-[9px] sm:text-[10px] uppercase font-bold mb-1 tracking-wider">
                Earned
              </div>
              <div className="text-emerald-400 font-bold font-mono text-xs sm:text-sm drop-shadow-sm">
                +{pointsEarnedToday}
              </div>
            </div>
            <div className="bg-navy/40 border border-white/10 rounded-xl p-2.5 text-center shadow-inner hover:bg-white/10 transition-colors">
              <div className="text-slate-400 text-[9px] sm:text-[10px] uppercase font-bold mb-1 tracking-wider">
                Used
              </div>
              <div className="text-red-400 font-bold font-mono text-xs sm:text-sm drop-shadow-sm">
                -{pointsUsedToday}
              </div>
            </div>
            <div className="bg-navy/40 border border-white/10 rounded-xl p-2.5 text-center shadow-inner hover:bg-white/10 transition-colors">
              <div className="text-slate-400 text-[9px] sm:text-[10px] uppercase font-bold mb-1 tracking-wider">
                Total
              </div>
              <div className="text-white font-bold font-mono text-xs sm:text-sm drop-shadow-sm">
                {lifetimePoints.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group border border-glass-border flex flex-col justify-center shadow-lg">
          <div
            className="absolute top-[-50%] right-[-10%] w-64 h-64 rounded-full blur-[80px] pointer-events-none opacity-20 transition-all duration-500"
            style={{ backgroundColor: status.bg.replace("bg-", "") }}
          />

          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <ShieldCheck className={`w-5 h-5 ${status.color}`} />
              Trust Score
            </h3>
            <span
              className={`px-2 py-1 bg-white/5 rounded-full text-[10px] font-bold tracking-wider ${status.color} uppercase border border-white/5 backdrop-blur-sm`}
            >
              {status.label}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 relative z-10 my-2">
            <div className="relative w-32 h-32 flex items-center justify-center filter drop-shadow-lg">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  className="stroke-white/10"
                  strokeWidth="10"
                  fill="none"
                />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="56"
                  className={`stroke-current ${status.color}`}
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray="351.86"
                  initial={{ strokeDashoffset: 351.86 }}
                  animate={{
                    strokeDashoffset:
                      351.86 - (351.86 * trustState.score) / 100,
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{trustState.score}%</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center px-4 max-w-[240px] mt-2">
              {status.message}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 glass-panel p-8 rounded-3xl relative overflow-hidden bg-gradient-to-br from-blue-900/20 to-purple-900/10 border border-blue-500/10 flex flex-col justify-between group shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30 group-hover:bg-blue-500/30 transition-colors shadow-lg">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Captchas Solved Today
                </h3>
                <p className="text-sm text-slate-400">
                  Your daily solving activity
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                Weekly XP
              </p>
              <p className="text-xl font-bold text-purple-400 font-mono">
                {userXp.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-end gap-6">
            <h2 className="text-7xl font-bold text-white font-mono drop-shadow-md tracking-tighter">
              <CountUp value={wallet.totalTextSolved + 342} />
            </h2>
            <div className="mb-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm font-bold border border-emerald-500/20 shadow-sm">
              +14% vs Yesterday
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-bold text-slate-300">
                {wallet.streak} Day Streak
              </span>
            </div>
            <div className="w-px h-5 bg-white/10"></div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-bold text-slate-300">
                Rank #{userRank}
              </span>
            </div>
            <div className="w-px h-5 bg-white/10"></div>
            <div className="flex items-center gap-2 cursor-pointer transition-colors hover:text-emerald-400" onClick={() => onNavigate("leaderboard")}>
              <Star className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-emerald-400">
                View Leaderboard
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-3xl border border-glass-border">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Daily Progress
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Track your daily solving & earning targets
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300 font-medium">
                    Daily Limit Target
                  </span>
                  <span className="font-bold text-white">
                    {wallet.totalTextSolved + 342} / 500
                  </span>
                </div>
                <div className="h-3 w-full bg-navy rounded-full overflow-hidden border border-glass-border shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(100, ((wallet.totalTextSolved + 342) / 500) * 100)}%`,
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300 font-medium">
                    Task Completion
                  </span>
                  <span className="font-bold text-purple-400">2 / 5 Tasks</span>
                </div>
                <div className="h-3 w-full bg-navy rounded-full overflow-hidden border border-glass-border shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "40%" }}
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300 font-medium">
                    Accuracy Rate
                  </span>
                  <span className="font-bold text-emerald-400">98.5%</span>
                </div>
                <div className="h-3 w-full bg-navy rounded-full overflow-hidden border border-glass-border shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "98.5%" }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300 font-medium">
                    Bonus Progress
                  </span>
                  <span className="font-bold text-orange-400">80%</span>
                </div>
                <div className="h-3 w-full bg-navy rounded-full overflow-hidden border border-glass-border shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-glass-border flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Bell className="w-5 h-5 text-slate-400" /> Notifications
            </h3>
            <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
              4 New
            </span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                <Wallet className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  Withdrawal Successful
                </p>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                  Your withdrawal of $5.00 has been sent to your wallet.
                </p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-medium">
                  2 hours ago
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <PlusCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex-1 border-b border-glass-border pb-1 border-transparent">
                <p className="text-sm font-bold text-white">Bonus Unlocked!</p>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                  You solved 500 captchas today. Here is +100 PTS!
                </p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-medium">
                  5 hours ago
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5 opacity-70">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
                <Trophy className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">Rank Up #{userRank}</p>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                  You've moved up the leaderboard! Keep going.
                </p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-medium">
                  Yesterday
                </p>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-bold transition-all text-slate-300 hover:text-white">
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
}
