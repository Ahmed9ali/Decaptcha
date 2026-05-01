import React, { useState, useEffect } from "react";
import { Trophy, Medal, Crown, Zap, Flame, Target, Search, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLeaderboard } from "../hooks/useLeaderboard";
import { ApiService } from "../lib/ApiService";
import { useAuth } from "../lib/AuthContext";

function getNextMondayIST() {
  const now = new Date();
  const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  const istTime = new Date(utcNow.getTime() + (5.5 * 3600000));
  const day = istTime.getDay();
  const daysUntilNextMonday = (8 - day) % 7 || 7;
  const nextMonday = new Date(istTime);
  nextMonday.setDate(istTime.getDate() + daysUntilNextMonday);
  nextMonday.setHours(0, 0, 0, 0);
  const nextMondayUTC = new Date(nextMonday.getTime() - (5.5 * 3600000));
  return new Date(nextMondayUTC.getTime() - new Date().getTimezoneOffset() * 60000);
}

export default function Leaderboard() {
  const { user } = useAuth();
  const { userXp, forceReset } = useLeaderboard();
  
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number }>({ d: 0, h: 0, m: 0, s: 0 });
  const [showWinners, setShowWinners] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchLeaders = async () => {
      try {
        const topUsers = await ApiService.getTopUsers(20);
        if (active) {
           const formatted = topUsers.map((u, i) => ({
             id: u.id,
             name: u.username || `User_${u.id.substring(0, 5)}`,
             avatarSeed: u.username || u.id,
             finalScore: u.points || 0,
             isCurrentUser: user?.uid === u.id,
             rank: i + 1,
             trustScore: u.security_stats ? (u.security_stats.is_modded ? 30 : 95) : 100,
           }));
           setLeaders(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch leaders", err);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchLeaders();
    return () => { active = false; };
  }, [user]);

  const currentUser = leaders.find(l => l.isCurrentUser);
  const filteredLeaders = leaders.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    const targetDate = getNextMondayIST();
    let isResetting = false;
    
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        if (!isResetting) {
           isResetting = true;
           forceReset();
           setShowWinners(true);
           setTimeout(() => setShowWinners(false), 5000);
           // reload target date in next tick
        }
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setTimeLeft({ d, h, m, s });
        isResetting = false;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [forceReset]);

  // Fallbacks if not enough leaders
  const top1 = leaders[0] || { name: 'N/A', avatarSeed: 'N/A', finalScore: 0 };
  const top2 = leaders[1] || { name: 'N/A', avatarSeed: 'N/A', finalScore: 0 };
  const top3 = leaders[2] || { name: 'N/A', avatarSeed: 'N/A', finalScore: 0 };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 font-sans relative">
      <AnimatePresence>
        {showWinners && (
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.8 }}
             className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 backdrop-blur-sm"
           >
              <div className="bg-[#0f172a] border border-yellow-500/30 p-10 rounded-[2rem] shadow-2xl flex flex-col items-center">
                 <Trophy className="w-16 h-16 text-yellow-400 mb-4 animate-bounce" />
                 <h2 className="text-3xl font-bold text-white mb-2">Weekly Winners Announced!</h2>
                 <p className="text-slate-400">The leaderboard has been reset. New season started!</p>
                 <button onClick={() => setShowWinners(false)} className="mt-6 bg-yellow-500/20 text-yellow-400 px-6 py-2 rounded-full font-bold">Awesome</button>
              </div>
           </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center max-w-2xl mx-auto mb-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/10 blur-[100px] pointer-events-none rounded-full" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" }}
          className="w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-yellow-500/20 shadow-[0_0_40px_rgba(250,204,21,0.2)] rotate-3"
        >
          <Trophy className="w-12 h-12 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] -rotate-3" />
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-5xl font-bold tracking-tighter mb-4 text-white"
        >
          Weekly Leaderboard
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg leading-relaxed mb-6"
        >
          Top 3 earners every week receive cash bonuses directly to their
          wallet. <br /> Reset happens every Monday at 12:00 AM IST.
        </motion.p>

        {/* Countdown Timer */}
        <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="inline-flex gap-4 items-center bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-md"
        >
          <div className="flex items-center gap-2 text-slate-300 mr-2">
            <Clock className="w-5 h-5 text-blue-400"/> <span className="font-bold text-sm uppercase tracking-wider">Reset In</span>
          </div>
          <div className="flex gap-3 text-center">
            <div className="flex flex-col"><span className="text-2xl font-bold text-white font-mono leading-none">{String(timeLeft.d).padStart(2, '0')}</span><span className="text-[10px] text-slate-500 font-bold uppercase mt-1">Days</span></div>
            <span className="text-xl text-slate-600 font-bold">:</span>
            <div className="flex flex-col"><span className="text-2xl font-bold text-white font-mono leading-none">{String(timeLeft.h).padStart(2, '0')}</span><span className="text-[10px] text-slate-500 font-bold uppercase mt-1">Hrs</span></div>
            <span className="text-xl text-slate-600 font-bold">:</span>
            <div className="flex flex-col"><span className="text-2xl font-bold text-white font-mono leading-none">{String(timeLeft.m).padStart(2, '0')}</span><span className="text-[10px] text-slate-500 font-bold uppercase mt-1">Min</span></div>
            <span className="text-xl text-slate-600 font-bold">:</span>
            <div className="flex flex-col"><span className="text-2xl font-bold text-blue-400 font-mono leading-none">{String(timeLeft.s).padStart(2, '0')}</span><span className="text-[10px] text-slate-500 font-bold uppercase mt-1">Sec</span></div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Podium Area */}
        <div className="w-full lg:w-1/2">
          <div className="glass-panel rounded-[2rem] overflow-hidden border-yellow-400/20 relative shadow-2xl h-full pb-8">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-yellow-500/5 to-transparent pointer-events-none" />

            <div className="p-8 flex items-end justify-center gap-3 sm:gap-6 h-80 relative z-10">
              {/* Rank 2 */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                className="flex flex-col items-center w-1/3 max-w-[120px]"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 p-[2px] mb-3 shadow-[0_0_20px_rgba(203,213,225,0.4)]">
                  <div className="w-full h-full rounded-full bg-navy border-2 border-transparent flex items-center justify-center overflow-hidden">
                    <img
                      src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${top2.avatarSeed}&backgroundColor=transparent`}
                      alt={top2.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-full h-28 bg-gradient-to-t from-slate-400/20 to-slate-400/5 rounded-t-2xl border-t border-l border-r border-slate-400/30 flex flex-col items-center justify-start pt-3 backdrop-blur-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-slate-400/10 group-hover:bg-slate-400/20 transition-colors" />
                  <span className="text-3xl font-bold text-slate-300 drop-shadow-md">
                    2
                  </span>
                  <span className="text-xs font-bold text-white mt-1 uppercase tracking-wider text-center px-1 truncate w-full">
                    {top2.name}
                  </span>
                </div>
                <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full mt-3 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-slate-300" />
                  <span className="text-xs text-slate-300 font-mono font-bold">
                    {(top2.finalScore / 1000).toFixed(1)}k
                  </span>
                </div>
              </motion.div>

              {/* Rank 1 */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                className="flex flex-col items-center w-1/3 max-w-[140px] z-10"
              >
                <div className="mb-[-10px] z-20 relative animate-bounce">
                  <Crown className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                </div>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 p-[3px] mb-3 shadow-[0_0_30px_rgba(250,204,21,0.5)]">
                  <div className="w-full h-full rounded-full bg-navy border-2 border-transparent flex items-center justify-center overflow-hidden">
                    <img
                      src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${top1.avatarSeed}&backgroundColor=transparent`}
                      alt={top1.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-full h-36 bg-gradient-to-t from-yellow-400/20 to-yellow-400/5 rounded-t-2xl border-t border-l border-r border-yellow-400/30 flex flex-col items-center justify-start pt-3 backdrop-blur-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-yellow-400/10 group-hover:bg-yellow-400/20 transition-colors" />
                  <span className="text-4xl font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                    1
                  </span>
                  <span className="text-sm font-bold text-white mt-1 uppercase tracking-wider text-center px-1 truncate w-full">
                    {top1.name}
                  </span>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 rounded-full mt-3 flex items-center gap-1.5 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                  <Flame className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-yellow-400 font-mono font-bold">
                    {(top1.finalScore / 1000).toFixed(1)}k
                  </span>
                </div>
              </motion.div>

              {/* Rank 3 */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                className="flex flex-col items-center w-1/3 max-w-[120px]"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-700 p-[2px] mb-3 shadow-[0_0_20px_rgba(194,65,12,0.4)]">
                  <div className="w-full h-full rounded-full bg-navy border-2 border-transparent flex items-center justify-center overflow-hidden">
                    <img
                      src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${top3.avatarSeed}&backgroundColor=transparent`}
                      alt={top3.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-full h-20 bg-gradient-to-t from-orange-700/20 to-orange-700/5 rounded-t-2xl border-t border-l border-r border-orange-700/30 flex flex-col items-center justify-start pt-2 backdrop-blur-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-orange-700/10 group-hover:bg-orange-700/20 transition-colors" />
                  <span className="text-2xl font-bold text-orange-400 drop-shadow-[0_0_10px_rgba(194,65,12,0.5)]">
                    3
                  </span>
                  <span className="text-xs font-bold text-white mt-1 uppercase tracking-wider text-center px-1 truncate w-full">
                    {top3.name}
                  </span>
                </div>
                <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full mt-3 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-orange-400" />
                  <span className="text-xs text-orange-400 font-mono font-bold">
                    {(top3.finalScore / 1000).toFixed(1)}k
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="px-8 mt-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between backdrop-blur-md">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">
                    Your Rank
                  </p>
                  <p className="text-xl font-bold text-white">#{currentUser?.rank || '-'}</p>
                </div>
                <div className="h-10 w-px bg-white/10"></div>
                <div className="text-center">
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">
                    Your XP
                  </p>
                  <p className="text-xl font-bold text-blue-400 font-mono">
                    {currentUser?.finalScore.toLocaleString() || '0'}
                  </p>
                </div>
                <div className="h-10 w-px bg-white/10"></div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">
                    Trust
                  </p>
                  <p className={`text-sm font-bold font-mono mt-1 ${currentUser && currentUser.trustScore >= 80 ? 'text-emerald-400' : currentUser && currentUser.trustScore >= 50 ? 'text-orange-400' : 'text-red-400'}`}>
                    {currentUser?.trustScore || 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* List Area */}
        <div className="w-full lg:w-1/2 glass-panel rounded-[2rem] p-4 sm:p-6 relative overflow-hidden border-glass-border">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 px-2 gap-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              Top Solvers
            </h3>
            
            <div className="relative w-full sm:w-auto">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="Search user..." 
                 value={searchQuery}
                 onChange={e => setSearchQuery(e.target.value)}
                 className="bg-navy/50 border border-white/10 rounded-full pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50 w-full"
               />
            </div>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredLeaders.map((leader, i) => (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.05 * i, type: "spring", stiffness: 100 }}
                key={leader.id}
                className={`flex items-center justify-between p-3 sm:p-4 rounded-2xl group transition-all duration-300 ${leader.isCurrentUser ? 'bg-blue-500/10 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : leader.rank <= 3 ? "bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-white/20" : "hover:bg-white/5 border border-transparent hover:border-white/10"}`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`w-6 sm:w-8 text-center font-bold text-lg sm:text-xl ${leader.rank === 1 ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" : leader.rank === 2 ? "text-slate-300 drop-shadow-md" : leader.rank === 3 ? "text-orange-400 drop-shadow-md" : "text-slate-500"}`}
                  >
                    {leader.rank}
                  </span>
                  <div className="relative">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-navy border flex items-center justify-center overflow-hidden shadow-inner transition-colors ${leader.isCurrentUser ? 'border-blue-400/50' : 'border-white/10 group-hover:border-white/30'}`}>
                      <img
                        src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${leader.avatarSeed}&backgroundColor=transparent`}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {leader.rank === 1 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-navy flex items-center justify-center">
                        <StarIcon className="w-2 h-2 text-navy" />
                      </div>
                    )}
                  </div>
                  <div>
                    <span className={`font-bold text-sm sm:text-base transition-colors ${leader.isCurrentUser ? 'text-blue-400' : 'text-white group-hover:text-blue-400'}`}>
                      {leader.name} {leader.isCurrentUser && "(You)"}
                    </span>
                    <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      Trust: <span className={leader.trustScore >= 80 ? 'text-emerald-400' : leader.trustScore >= 50 ? 'text-orange-400' : 'text-red-400'}>{leader.trustScore}%</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span
                    className={`font-mono font-bold text-sm sm:text-base ${leader.rank <= 3 || leader.isCurrentUser ? "text-white drop-shadow-sm" : "text-slate-300"}`}
                  >
                    {leader.finalScore.toLocaleString()}{" "}
                    <span className="text-[10px] text-slate-500 font-sans">
                      XP
                    </span>
                  </span>
                  <span
                    className={`text-[10px] sm:text-xs font-bold mt-1 px-2 py-0.5 rounded-full ${leader.reward ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "text-slate-600 hidden sm:block opacity-0"}`}
                  >
                    {leader.reward || '-'}
                  </span>
                </div>
              </motion.div>
            ))}
            
            {filteredLeaders.length === 0 && (
               <div className="text-center py-10 text-slate-400 text-sm">
                 No users found.
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}

