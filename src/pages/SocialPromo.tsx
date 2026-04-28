import React, { useState, useEffect } from "react";
import {
  Youtube,
  Facebook,
  Send,
  ExternalLink,
  CheckCircle,
  Zap,
  Ticket,
  ArrowRight
} from "lucide-react";
import { useSocialPromos } from "../hooks/useSocialPromos";
import { useWallet } from "../hooks/useWallet";
import { useLeaderboard } from "../hooks/useLeaderboard";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function SocialPromo() {
  const { tasks, completedTaskIds, verifyTask } = useSocialPromos();
  const { wallet, addPoints } = useWallet();
  const { xpConfig, addXp } = useLeaderboard();
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<
    Record<string, { type: "error" | "success"; text: string }>
  >({});
  
  // Theme state for specific UI tweaks if needed, though Tailwind `dark:` handles most
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark-mode") || !document.documentElement.classList.contains("light-mode"));
    
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark-mode") || !document.documentElement.classList.contains("light-mode"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const handleClaim = (taskId: string) => {
    const code = inputs[taskId] || "";
    if (!code) {
      setMessages((prev) => ({
        ...prev,
        [taskId]: { type: "error", text: "Please enter a code" },
      }));
      return;
    }

    const result = verifyTask(taskId, code);
    if (result.success) {
      if (result.reward) addPoints(result.reward);
      if (xpConfig.promo > 0) addXp(xpConfig.promo);
      setMessages((prev) => ({
        ...prev,
        [taskId]: {
          type: "success",
          text: `Success! +${result.reward} Points & +${xpConfig.promo} XP`,
        },
      }));
    } else {
      setMessages((prev) => ({
        ...prev,
        [taskId]: { type: "error", text: result.message || "Invalid code" },
      }));
    }
  };

  const getTaskStyle = (type: string) => {
    switch (type) {
      case "youtube":
        return {
          icon: <Youtube className="w-7 h-7 text-[white]" />,
          bg: "bg-gradient-to-br from-red-500 to-rose-600",
          shadow: "shadow-red-500/30",
          border: "border-red-500/20"
        };
      case "facebook":
        return {
          icon: <Facebook className="w-7 h-7 text-[white]" />,
          bg: "bg-gradient-to-br from-blue-500 to-blue-700",
          shadow: "shadow-blue-500/30",
          border: "border-blue-500/20"
        };
      case "telegram":
        return {
          icon: <Send className="w-6 h-6 text-[white] ml-[-2px] mt-[2px]" />,
          bg: "bg-gradient-to-br from-sky-400 to-blue-500",
          shadow: "shadow-sky-500/30",
          border: "border-sky-500/20"
        };
      default:
        return {
          icon: <Zap className="w-7 h-7 text-[white]" />,
          bg: "bg-gradient-to-br from-orange-400 to-amber-600",
          shadow: "shadow-orange-500/30",
          border: "border-orange-500/20"
        };
    }
  };

  return (
    <div className="min-h-screen pb-20 relative font-['Varela_Round']">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-500/20 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-500/20 blur-[150px] rounded-full animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 pt-4">
        
        {/* Header Section */}
        <div className="bg-white/60 dark:bg-[#0b1121]/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-[60px] rounded-full pointer-events-none" />
          
          <div className="flex items-start sm:items-center gap-4 relative z-10 flex-col sm:flex-row">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30 border border-white/20 shrink-0">
              <Ticket className="w-6 h-6 text-[white]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
                Promo Codes & Social Tasks
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                Unlock exclusive rewards by completing tasks, following our channels, or entering secret promo codes found in our videos!
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {tasks.length === 0 ? (
            <div className="bg-white/50 dark:bg-[#0b1121]/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-8 rounded-2xl text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                <Ticket className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">No Active Promos</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Check back later or join our Telegram for drop announcements!
              </p>
            </div>
          ) : (
            tasks.map((task) => {
              const isCompleted = completedTaskIds.includes(task.id);
              const style = getTaskStyle(task.type);

              return (
                <div
                  key={task.id}
                  className={cn(
                    "bg-white/70 dark:bg-[#0b1121]/70 backdrop-blur-xl rounded-2xl p-5 border shadow-sm relative overflow-hidden group transition-all duration-300",
                    isCompleted 
                      ? "border-emerald-500/30 dark:border-emerald-500/20 opacity-80" 
                      : "border-slate-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-white/20 hover:shadow-md hover:-translate-y-0.5"
                  )}
                >
                  {/* Subtle top gradient line */}
                  <div className={cn("absolute top-0 left-0 w-full h-1 bg-gradient-to-r via-slate-200 dark:via-white/10", style.bg, isCompleted ? "from-emerald-400 to-emerald-500" : "")} />

                  <div className="flex flex-col md:flex-row gap-5 relative z-10">
                    {/* Task Info */}
                    <div className="flex-1 flex gap-4">
                      <div className={cn("w-12 h-12 shrink-0 rounded-xl flex items-center justify-center shadow-sm transform transition-transform group-hover:scale-105", style.bg, style.shadow)}>
                        {style.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                            {task.title}
                          </h3>
                          {isCompleted ? (
                            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-md border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Completed
                            </span>
                          ) : (
                            <div className="flex gap-2">
                              <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 text-[10px] font-bold uppercase tracking-widest rounded-md border border-orange-200 dark:border-orange-500/20 flex items-center gap-1 shadow-sm">
                                Reward: {task.rewardPoints} PTS
                              </span>
                              {xpConfig.promo > 0 && (
                                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-md border border-blue-200 dark:border-blue-500/20 flex items-center gap-1 shadow-sm">
                                  + {xpConfig.promo} XP
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 mb-3 leading-relaxed hidden sm:block">
                          {task.description}
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 text-xs mt-1 mb-3 leading-relaxed sm:hidden line-clamp-2">
                          {task.description}
                        </p>
                        <a
                          href={task.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100/80 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white rounded-lg text-xs font-bold transition-all border border-slate-200 dark:border-white/10 active:scale-95 shadow-sm group/link"
                        >
                          <span className="group-hover/link:underline underline-offset-4">Complete Task</span>
                          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>

                    {/* Action Area */}
                    <div className="w-full md:w-64 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-200 dark:border-white/10 pt-4 md:pt-0 md:pl-5">
                      {isCompleted ? (
                        <div className="flex-1 flex flex-col items-center justify-center bg-emerald-50 dark:bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-200 dark:border-emerald-500/20 p-4">
                          <CheckCircle className="w-8 h-8 mb-2 text-emerald-500" />
                          <span className="font-bold tracking-wide text-sm">Reward Claimed</span>
                          <span className="text-[10px] mt-1 text-emerald-600/70 dark:text-emerald-400/70 text-center">
                            + {task.rewardPoints} Points {xpConfig.promo > 0 && `& +${xpConfig.promo} XP `}added
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-2 bg-slate-50/50 dark:bg-black/20 p-3 sm:p-4 rounded-xl border border-slate-100 dark:border-white/5">
                          <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-1 block">
                            Secret Code
                          </label>
                          <input
                            type="text"
                            placeholder="Enter code here..."
                            value={inputs[task.id] || ""}
                            onChange={(e) =>
                              setInputs((prev) => ({
                                ...prev,
                                [task.id]: e.target.value.trim(),
                              }))
                            }
                            className="w-full bg-white dark:bg-[#0b1121]/50 border border-slate-200 dark:border-white/10 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-mono font-medium shadow-inner placeholder:font-sans placeholder:text-slate-400"
                          />
                          <button
                            onClick={() => handleClaim(task.id)}
                            disabled={!inputs[task.id]}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-[white] py-2.5 rounded-lg text-xs font-bold shadow-md shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:shadow-none uppercase tracking-wider"
                          >
                            Verify & Claim
                          </button>
                          {messages[task.id] && (
                            <p
                              className={cn(
                                "text-[10px] text-center font-bold px-2 py-1.5 rounded-md animated fadeIn",
                                messages[task.id].type === "error" 
                                  ? "bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20" 
                                  : "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20"
                              )}
                            >
                              {messages[task.id].text}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
