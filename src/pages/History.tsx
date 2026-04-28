import React, { useState } from "react";
import {
  History as HistoryIcon,
  ArrowUpRight,
  CheckCircle,
  Zap,
  Trophy,
  Medal,
  CalendarDays,
  Target,
  Clock
} from "lucide-react";
import { useLeaderboard } from "../hooks/useLeaderboard";

export default function History() {
  const { history } = useLeaderboard();
  const [activeTab, setActiveTab] = useState<"activity" | "leaderboard">("activity");
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <HistoryIcon className="w-6 h-6 text-blue-400" /> History
        </h1>
      </div>
      
      <div className="flex gap-2 p-1 bg-navy/50 border border-white/5 rounded-xl w-fit mb-4">
        <button
          onClick={() => setActiveTab("activity")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === "activity"
              ? "bg-blue-600 text-white shadow-md"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Your Activity
        </button>
        <button
          onClick={() => setActiveTab("leaderboard")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === "leaderboard"
              ? "bg-emerald-600 text-white shadow-md"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Past Winners
        </button>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-glass-border">
        {activeTab === "activity" && (
          <div className="space-y-2">
            <div className="bg-slate-50 dark:bg-[#0b1121]/40 border border-slate-200 dark:border-white/5 rounded-xl p-3 flex items-center justify-between transition-colors hover:bg-slate-100 dark:hover:bg-white/5">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-bold text-sm text-slate-800 dark:text-white truncate">Withdrawal Complete</span>
                    <span className="text-slate-400 dark:text-slate-500 text-xs">—</span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs truncate">FaucetPay</span>
                  </div>
                  <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> 2 days ago
                  </div>
                </div>
              </div>
              <div className="text-right pl-3 shrink-0">
                <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400 text-sm">-$5.0000</span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-[#0b1121]/40 border border-slate-200 dark:border-white/5 rounded-xl p-3 flex items-center justify-between transition-colors hover:bg-slate-100 dark:hover:bg-white/5">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-bold text-sm text-slate-800 dark:text-white truncate">Text Captcha Solver</span>
                    <span className="text-slate-400 dark:text-slate-500 text-xs">—</span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs truncate">Batch of 50</span>
                  </div>
                  <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> 3 days ago
                  </div>
                </div>
              </div>
              <div className="text-right pl-3 shrink-0">
                <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400 text-sm">+$0.0050</span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-[#0b1121]/40 border border-slate-200 dark:border-white/5 rounded-xl p-3 flex items-center justify-between transition-colors hover:bg-slate-100 dark:hover:bg-white/5">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-bold text-sm text-slate-800 dark:text-white truncate">Daily Points Bonus</span>
                    <span className="text-slate-400 dark:text-slate-500 text-xs">—</span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs truncate">Streak maintained</span>
                  </div>
                  <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> 3 days ago
                  </div>
                </div>
              </div>
              <div className="text-right pl-3 shrink-0">
                <span className="font-bold font-mono text-orange-500 dark:text-orange-400 text-sm">+100 PTS</span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "leaderboard" && (
          <div className="space-y-8">
            {history.length === 0 ? (
               <div className="text-center py-12">
                 <div className="w-16 h-16 bg-navy/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                    <Trophy className="w-8 h-8 text-slate-600" />
                 </div>
                 <h3 className="text-lg font-bold text-white mb-2">No Past Competitions</h3>
                 <p className="text-slate-400 max-w-sm mx-auto">The weekly leaderboard history will appear here once the first competition ends.</p>
               </div>
            ) : (
              history.map((entry, idx) => (
                <div key={idx} className="bg-navy/40 border border-white/5 rounded-2xl p-6 shadow-inner">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-blue-400" />
                    {entry.weekId}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {entry.top3.map((winner, i) => (
                      <div key={i} className={`p-4 rounded-xl border flex flex-col items-center text-center relative overflow-hidden ${
                        i === 0 ? "bg-amber-500/10 border-amber-500/30" : 
                        i === 1 ? "bg-slate-300/10 border-slate-300/30" : 
                        "bg-orange-500/10 border-orange-500/30"
                      }`}>
                        <div className={`absolute top-0 right-0 w-16 h-16 rounded-full blur-[20px] pointer-events-none ${
                          i === 0 ? "bg-amber-500/20" : i === 1 ? "bg-slate-300/20" : "bg-orange-500/20"
                        }`} />
                        
                        <div className="w-12 h-12 rounded-full bg-navy mb-3 p-1 shrink-0">
                          <img 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${winner.avatarSeed}`}
                            alt={winner.name}
                            className="w-full h-full rounded-full"
                          />
                        </div>
                        
                        <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
                          i === 0 ? "text-amber-400" : i === 1 ? "text-slate-300" : "text-orange-400"
                        }`}>
                          Rank #{i + 1}
                        </div>
                        <div className="font-bold text-white text-sm mb-2">{winner.name}</div>
                        <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded w-full">
                          {winner.reward}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
