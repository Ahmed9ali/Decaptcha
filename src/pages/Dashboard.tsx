import React, { useState, useEffect } from "react";
import {
  Wallet,
  Target,
  Trophy,
  Activity,
  CheckCircle,
  Zap,
  ShieldCheck,
  Bell,
  ArrowRight,
  Smartphone,
  Coins,
  Star
} from "lucide-react";
import { motion } from "motion/react";
import { useTrustScore } from "../hooks/useTrustScore";
import { useAuth } from "../lib/AuthContext"; // Import Auth to get the real user object
import { ref, onValue } from "firebase/database";
import { db } from "../lib/firebase"; // Import db for notifications

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
  const { user } = useAuth(); // Get real Firebase user data
  const status = getStatus(trustState.score);

  const [notifications, setNotifications] = useState<any[]>([]);

  // Safely extract all required values from the user node (defaults to 0 if they don't exist yet)
  // Fetching balance from adState as shown in your screenshot!
  const userBalance = (user as any)?.adState?.balance || 0;
  const userPoints = user?.points || 0;
  
  // New Web nodes exactly as requested
  const webTextCaptcha = (user as any)?.web_text_captcha || 0;
  const webStreak = (user as any)?.web_streak || 0;
  const webRank = (user as any)?.web_rank || "-";
  const webXp = (user as any)?.web_xp || 0;

  // Real-time Notification Fetcher
  useEffect(() => {
    if (!user?.uid) return;
    const notifRef = ref(db, `notifications/${user.uid}`);
    
    const unsubscribe = onValue(notifRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Convert object to array and reverse to show newest first
        const notifArray = Object.keys(data)
          .map((key) => ({ id: key, ...data[key] }))
          .reverse();
        setNotifications(notifArray);
      } else {
        setNotifications([]);
      }
    });

    return () => unsubscribe();
  }, [user?.uid]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24 lg:pb-8">
      {/* Sleek Welcome Section (Removed Avatars/Gender) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Welcome back, {user?.username || "Solver"}!
          </h1>
          <p className="text-slate-400 text-sm mt-1">Ready to earn some rewards today?</p>
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
            <p className="text-slate-500 dark:text-emerald-200/80 text-sm font-medium">Claim your daily streak rewards now</p>
          </div>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-2.5 rounded-xl font-bold shadow-md transform hover:scale-105 transition-all text-sm flex items-center justify-center gap-2 w-full sm:w-auto">
          Claim Now <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Cleaned Up Balance & Points Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CURRENT BALANCE */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden bg-gradient-to-br from-blue-600/10 to-indigo-600/5 group border border-blue-500/20 flex flex-col justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 px-3 py-1.5 rounded-full shadow-sm text-blue-100 backdrop-blur-sm w-fit mb-4">
            <Wallet className="w-4 h-4 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            <span className="font-bold uppercase tracking-widest text-xs text-shadow-sm">
              Current Balance
            </span>
          </div>

          <div className="relative z-10 my-4">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white filter drop-shadow-lg font-mono flex items-baseline gap-1">
              <span className="text-blue-400/80 transition-all font-sans">$</span>
              <CountUp value={userBalance} isCurrency={true} />
            </h2>
          </div>
        </div>

        {/* TOTAL POINTS */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden bg-gradient-to-br from-orange-600/10 to-pink-600/5 border border-orange-500/20 group flex flex-col justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 px-3 py-1.5 rounded-full shadow-sm text-orange-100 backdrop-blur-sm w-fit mb-4">
            <Coins className="w-4 h-4 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]" />
            <span className="font-bold uppercase tracking-widest text-xs text-shadow-sm">
              Total Points
            </span>
          </div>

          {userPoints === 0 ? (
            <div className="relative z-10 flex flex-col items-start justify-center h-[100px] my-4">
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
            <div className="relative z-10 my-4 flex items-end justify-between">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white filter drop-shadow-lg font-mono flex items-center">
                  <CountUp value={userPoints} />
                  <span className="text-xl font-sans text-orange-300/50 font-bold ml-3 uppercase tracking-widest">
                    pts
                  </span>
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trust Score */}
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
            <span className={`px-2 py-1 bg-white/5 rounded-full text-[10px] font-bold tracking-wider ${status.color} uppercase border border-white/5 backdrop-blur-sm`}>
              {status.label}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 relative z-10 my-2">
            <div className="relative w-32 h-32 flex items-center justify-center filter drop-shadow-lg">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" className="stroke-white/10" strokeWidth="10" fill="none" />
                <motion.circle
                  cx="64" cy="64" r="56" className={`stroke-current ${status.color}`}
                  strokeWidth="10" fill="none" strokeDasharray="351.86"
                  initial={{ strokeDashoffset: 351.86 }}
                  animate={{ strokeDashoffset: 351.86 - (351.86 * trustState.score) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }} strokeLinecap="round"
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

        {/* Captchas Solved & New Web Nodes Stats */}
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
                  Total text captchas completed
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                Total Web XP
              </p>
              <p className="text-xl font-bold text-purple-400 font-mono">
                {webXp.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-end gap-6">
            <h2 className="text-7xl font-bold text-white font-mono drop-shadow-md tracking-tighter">
              {/* Pointing to your new web_text_captcha node */}
              <CountUp value={webTextCaptcha} />
            </h2>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-4 bg-navy/40 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-bold text-slate-300">
                {webStreak} Day Streak
              </span>
            </div>
            <div className="w-px h-5 bg-white/10"></div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-bold text-slate-300">
                Global Rank #{webRank}
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
        
        {/* Progress Targets */}
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
                  <span className="text-slate-300 font-medium">Daily Limit Target</span>
                  <span className="font-bold text-white">{webTextCaptcha} / 500</span>
                </div>
                <div className="h-3 w-full bg-navy rounded-full overflow-hidden border border-glass-border shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (webTextCaptcha / 500) * 100)}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300 font-medium">Accuracy Rate</span>
                  <span className="font-bold text-emerald-400">98.5%</span>
                </div>
                <div className="h-3 w-full bg-navy rounded-full overflow-hidden border border-glass-border shadow-inner">
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: "98.5%" }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Notifications Panel */}
        <div className="glass-panel p-6 rounded-3xl border border-glass-border flex flex-col h-[350px]">
          <div className="flex items-center justify-between mb-6 shrink-0">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Bell className="w-5 h-5 text-slate-400" /> Notifications
            </h3>
            {notifications.length > 0 && (
              <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                {notifications.length} New
              </span>
            )}
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <Bell className="w-8 h-8 mb-2 opacity-20" />
                <p className="text-sm">No new notifications</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div key={notif.id} className="flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                    <Bell className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">{notif.title || "System Message"}</p>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                      {notif.message || notif.body || "You have a new update."}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
