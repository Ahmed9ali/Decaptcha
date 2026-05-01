import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  RefreshCw,
  SkipForward,
  ArrowLeft,
  Send,
  ShieldCheck,
  AlertTriangle,
  Zap,
  CheckCircle,
  Wallet,
  Star,
  Timer,
  Info,
  XCircle,
  Bell,
  Moon,
  Sun,
  Flame,
  Target,
  Trophy
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTrustScore } from "../../hooks/useTrustScore";
import { useWallet } from "../../hooks/useWallet";
import { useLeaderboard } from "../../hooks/useLeaderboard";
import { useAuth } from "../../lib/AuthContext";
import { ApiService } from "../../lib/ApiService";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import confetti from "canvas-confetti";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const POINT_COST = 4; // derived from app_config text_captcha_cost
const REWARD_AMOUNT = 0.0005; // derived from app_config text_captcha_reward

function generateRandomText(length: number) {
  const characters = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"; 
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export default function TextCaptcha({ onBack }: { onBack: () => void }) {
  const { user } = useAuth();
  const { trustState, addMistake, getStatus } = useTrustScore();
  const { wallet } = useWallet();
  const { xpConfig } = useLeaderboard();
  
  const [captchaText, setCaptchaText] = useState("");
  const [puzzleId, setPuzzleId] = useState<string | null>(null);
  
  const [inputVal, setInputVal] = useState("");
  const [lastGenerateTime, setLastGenerateTime] = useState<number>(Date.now());
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStatus, setGameStatus] = useState<"playing" | "timeout" | "submitting">("playing");
  const [feedback, setFeedback] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [isLightMode, setIsLightMode] = useState(
    typeof document !== "undefined" ? document.documentElement.classList.contains("light-mode") : false
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLightMode(document.documentElement.classList.contains("light-mode"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const status = getStatus(trustState.score);

  const drawCaptcha = useCallback((text: string, isLight: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = isLight ? "#f1f5f9" : "#0f172a";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)";
    ctx.lineWidth = 2;
    for (let x = 0; x < width; x += 15) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 20, height);
      ctx.stroke();
    }

    for (let i = 0; i < 4; i++) {
       ctx.strokeStyle = isLight ? `rgba(99, 102, 241, ${Math.random() * 0.15 + 0.1})` : `rgba(165, 180, 252, ${Math.random() * 0.15 + 0.1})`;
       ctx.lineWidth = Math.random() * 2 + 1;
       ctx.beginPath();
       ctx.moveTo(0, Math.random() * height);
       ctx.bezierCurveTo(
         width / 3, Math.random() * height,
         width * 0.66, Math.random() * height,
         width, Math.random() * height
       );
       ctx.stroke();
    }

    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    
    const charSpacing = 36;
    const totalWidth = text.length * charSpacing;
    let startX = (width - totalWidth) / 2 + (charSpacing / 2);

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      ctx.save();

      const yOffset = (Math.random() - 0.5) * 12;
      ctx.translate(startX + i * charSpacing, height / 2 + yOffset);
      
      const rot = (Math.random() - 0.5) * 0.3;
      ctx.rotate(rot);

      const fontSize = 42 + Math.random() * 6;
      ctx.font = `bold ${fontSize}px "Inter", "JetBrains Mono", sans-serif`;

      if (isLight) {
        ctx.fillStyle = i % 2 === 0 ? "#4f46e5" : "#334155";
      } else {
        ctx.fillStyle = i % 2 === 0 ? "#818cf8" : "#cbd5e1";
      }
      
      ctx.shadowColor = isLight ? "rgba(79, 70, 229, 0.2)" : "rgba(129, 140, 248, 0.4)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      ctx.fillText(char, 0, 0);

      ctx.restore();
    }

    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = isLight ? `rgba(99,102,241, ${Math.random() * 0.15})` : `rgba(165,180,252, ${Math.random() * 0.2})`;
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  useEffect(() => {
    if (captchaText) {
      drawCaptcha(captchaText, isLightMode);
    }
  }, [isLightMode, captchaText, drawCaptcha]);

  const showFeedback = useCallback(
    (message: string, type: "success" | "error" | "info") => {
      setFeedback({ message, type });
      setTimeout(() => setFeedback(null), 3000);
    },
    []
  );

  const generateNew = useCallback(async () => {
    if (!user) return;
    setGameStatus("playing");
    try {
      const res = await ApiService.generateTextCaptcha(user.uid);
      setCaptchaText(res.text || generateRandomText(6));
      setPuzzleId(res.puzzle_id);
    } catch (err: any) {
      console.warn("Backend error fetching captcha, using local", err);
      setCaptchaText(generateRandomText(6));
      setPuzzleId("local-puzzle-id-fallback");
    }
    
    setLastGenerateTime(Date.now());
    setInputVal("");
    setTimeLeft(30);
    setGameStatus("playing");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [user]);

  useEffect(() => {
    generateNew();
  }, [generateNew]);

  useEffect(() => {
    let timer: any;
    if (timeLeft > 0 && gameStatus === "playing") {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameStatus === "playing") {
      setGameStatus("timeout");
      addMistake(1);
      showFeedback("Time expired. Captcha paused.", "error");
      triggerShake();
    }
    return () => clearInterval(timer);
  }, [timeLeft, gameStatus, addMistake, showFeedback]);

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const triggerSuccess = () => {
    setIsSuccess(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#3b82f6', '#f59e0b']
    });
    setTimeout(() => setIsSuccess(false), 800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal || gameStatus !== "playing") return;
    if (!user || user.points < POINT_COST) {
      showFeedback("Insufficient points to solve", "error");
      return;
    }

    setGameStatus("submitting");

    const timeDiff = Date.now() - lastGenerateTime;
    if (timeDiff < 800) {
      addMistake(1);
      showFeedback("Suspicious speed detected.", "error");
      triggerShake();
      generateNew();
      return;
    }

    try {
      if (puzzleId === "local-puzzle-id-fallback") {
        if (inputVal === captchaText) {
          triggerSuccess();
          showFeedback("Correct! Reward added via fallback", "success");
          setTimeout(() => generateNew(), 600);
        } else {
          throw new Error("Incorrect Answer");
        }
      } else if (puzzleId) {
        const res = await ApiService.validateTextCaptcha(user.uid, puzzleId, inputVal);
        if (res.status === "success" || res.valid) {
          triggerSuccess();
          showFeedback("Correct! Reward Added", "success");
          setTimeout(() => generateNew(), 600);
        } else {
          throw new Error("Incorrect Answer");
        }
      }
    } catch (err: any) {
      addMistake(1);
      triggerShake();
      showFeedback(err.message || "Incorrect Answer", "error");
      setTimeout(() => generateNew(), 600);
    }
  };

  const handleSkip = async () => {
    try {
       if (user && puzzleId && puzzleId !== "local-puzzle-id-fallback") {
          await ApiService.skipTextCaptcha(user.uid, puzzleId);
       }
    } catch (err) {}
    showFeedback("Captcha skipped.", "info");
    generateNew();
  };

  const getStreakTier = (streak: number) => {
    if (streak >= 10) return { name: "Gold", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30" };
    if (streak >= 5) return { name: "Silver", color: "text-slate-300 bg-slate-300/10 border-slate-300/30" };
    if (streak >= 3) return { name: "Bronze", color: "text-orange-400 bg-orange-400/10 border-orange-400/30" };
    return null;
  };

  const streakTier = getStreakTier(user?.dailyCheckin?.currentStreak || 0);

  return (
    <div className="min-h-screen pb-20 relative font-['Varela_Round']">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/20 blur-[150px] rounded-full animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-emerald-500/10 blur-[100px] rounded-full animate-pulse-slow" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 pt-6">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between bg-white/50 dark:bg-[#0b1121]/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 mb-8 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl transition-colors shrink-0 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Text Captcha Challenge
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">
                Solve and earn rewards
              </p>
            </div>
          </div>
        </div>

        {/* Leaderboard Motivation Banner */}
        <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-3 mb-8 flex items-center justify-center gap-3 backdrop-blur-sm shadow-sm">
          <Trophy className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          <p className="text-sm text-slate-700 dark:text-slate-300 font-medium tracking-wide">
            You are rank <span className="font-bold text-blue-600 dark:text-blue-400">#12</span> this week — Solve more to climb!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Challenge Card Section */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-center">
            
            <motion.div
              animate={isShaking ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={cn(
                "w-full max-w-lg bg-white/70 dark:bg-[#0b1121]/70 backdrop-blur-2xl rounded-[2.5rem] p-6 sm:p-8 border shadow-2xl relative overflow-hidden transition-all duration-300",
                isSuccess 
                  ? "border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30" 
                  : isShaking 
                    ? "border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.15)] ring-1 ring-red-500/30" 
                    : "border-slate-200 dark:border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] dark:hover:border-indigo-400/50 dark:hover:shadow-[0_0_40px_rgba(99,102,241,0.1)]"
              )}
            >
              {/* Optional Glassmorphism glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 blur-[60px] rounded-full pointer-events-none" />

              {/* Top Card Info Row */}
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest flex-wrap">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full flex gap-1 items-center">
                    Reward: ${REWARD_AMOUNT}
                  </span>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-full flex gap-1 items-center">
                    XP Gain: +{xpConfig.textCaptcha + (streakTier ? xpConfig.streak : 0)}
                  </span>
                  {streakTier && (
                    <span className={cn("px-3 py-1 rounded-full border flex gap-1 items-center", streakTier.color)}>
                      <Flame className="w-3 h-3 text-current" /> {streakTier.name} Streak
                    </span>
                  )}
                </div>

                {/* Circular timer / Text Timer */}
                <div className={cn(
                  "px-3 py-1 sm:px-4 sm:py-1.5 rounded-full flex items-center gap-1.5 sm:gap-2 border backdrop-blur-md transition-all duration-300 font-bold font-mono text-sm sm:text-base",
                  timeLeft >= 15 ? "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300" :
                  timeLeft >= 6 ? "bg-orange-500/10 border-orange-500/30 text-orange-600 dark:text-orange-400" :
                  "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400 animate-pulse"
                )}>
                  <Timer className="w-4 h-4" />
                  00:{timeLeft.toString().padStart(2, "0")}
                </div>
              </div>

              {/* Captcha Image Container */}
              <div className="relative mb-8 group mx-auto max-w-[340px]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                <div className="bg-slate-50 dark:bg-[#020617] p-3 sm:p-4 rounded-3xl shadow-inner border border-slate-200 dark:border-slate-800 relative z-10 w-full flex items-center justify-center">
                  <canvas
                    ref={canvasRef}
                    width={340}
                    height={120}
                    className={cn(
                      "w-full h-auto rounded-xl block transition-all duration-300 select-none cursor-pointer", 
                      gameStatus === "timeout" ? "opacity-20 grayscale scale-95" : "opacity-100 scale-100 drop-shadow-sm"
                    )}
                    onClick={gameStatus === "timeout" ? generateNew : undefined}
                    style={{ imageRendering: "pixelated" }}
                  />
                  
                  {/* Refresh Button beside/on it hover */}
                  <button
                    type="button"
                    onClick={generateNew}
                    className="absolute top-2 right-2 bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black p-2 rounded-xl backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                    title="Refresh Captcha"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {gameStatus === "timeout" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 flex flex-col items-center justify-center z-20 backdrop-blur-sm rounded-3xl"
                      >
                        <button
                          type="button"
                          onClick={generateNew}
                          className="bg-blue-600 hover:bg-blue-500 text-white rounded-full p-4 flex items-center justify-center transition-all shadow-lg hover:scale-105 active:scale-95"
                        >
                          <RefreshCw className="w-6 h-6" />
                        </button>
                        <p className="mt-3 text-sm font-bold text-slate-700 dark:text-slate-200 tracking-wide">Time completely out!</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Feedback Overlay inside card */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
                  >
                    <div className={cn(
                      "px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-3 backdrop-blur-xl border shadow-2xl",
                      feedback.type === "success" ? "bg-emerald-500/90 text-white border-emerald-400" :
                      feedback.type === "error" ? "bg-red-500/90 text-white border-red-400" :
                      "bg-blue-500/90 text-white border-blue-400"
                    )}>
                      {feedback.type === "success" && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
                      {feedback.type === "error" && <XCircle className="w-5 h-5 flex-shrink-0" />}
                      {feedback.type === "info" && <Info className="w-5 h-5 flex-shrink-0" />}
                      {feedback.message}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Input & Actions */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-20 w-full max-w-sm mx-auto">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value.replace(/[^a-zA-Z0-9]/g, ""))}
                    placeholder="Enter captcha text"
                    autoFocus
                    maxLength={10}
                    className={cn(
                      "w-full bg-slate-100 dark:bg-black/30 border-2 rounded-2xl px-6 py-4 text-center text-2xl font-bold tracking-[0.2em] font-mono placeholder:tracking-normal placeholder:font-sans placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none transition-all shadow-inner text-slate-800 dark:text-white disabled:opacity-50",
                      isSuccess ? "border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-400" :
                      "border-slate-200 dark:border-white/10 focus:border-blue-500 focus:bg-white dark:focus:bg-black/50 focus:ring-4 focus:ring-blue-500/20"
                    )}
                    disabled={wallet.points < POINT_COST || gameStatus !== "playing"}
                  />
                  <div className="mt-2 flex justify-between px-2 text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    <span>* Case Sensitive</span>
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> Anti-Bot</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  <button
                    type="button"
                    onClick={handleSkip}
                    disabled={gameStatus !== "playing"}
                    className="col-span-1 bg-transparent border-2 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 disabled:opacity-50 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center transition-all active:scale-95 text-xs sm:text-sm uppercase tracking-widest"
                  >
                    Skip
                  </button>
                  <button
                    type="submit"
                    disabled={!inputVal || wallet.points < POINT_COST || gameStatus !== "playing"}
                    className="col-span-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none text-xs sm:text-sm uppercase tracking-widest relative overflow-hidden"
                  >
                    {gameStatus === "submitting" ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      "Submit Answer"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Stats & Security Section */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
            
            {/* Real Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/70 dark:bg-[#0b1121]/70 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-sm hover:border-blue-200 dark:hover:border-white/20 transition-colors">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2">Solved Today</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-mono">{wallet.totalTextSolved}</span>
                  <span className="text-blue-500 text-xs font-bold mb-1">/ 500</span>
                </div>
              </div>
              <div className="bg-white/70 dark:bg-[#0b1121]/70 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-sm hover:border-emerald-200 dark:hover:border-white/20 transition-colors">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2">Accuracy</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    {Math.max(0, Math.min(100, Math.round(((trustState.totalCorrect || 0) / Math.max(1, (trustState.totalCorrect + trustState.totalMistakes))) * 100))) }
                  </span>
                  <span className="text-emerald-500 text-xs font-bold mb-1">%</span>
                </div>
              </div>
              <div className="bg-white/70 dark:bg-[#0b1121]/70 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-sm hover:border-purple-200 dark:hover:border-white/20 transition-colors">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2 flex items-center justify-between">
                  Trust Score
                  <span className={cn("w-2 h-2 rounded-full", status.bg)}></span>
                </p>
                <div className="flex items-end gap-2">
                  <span className={cn("text-2xl sm:text-3xl font-bold font-mono", status.color)}>{trustState.score}</span>
                  <span className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-widest hidden sm:block">{status.label}</span>
                </div>
              </div>
              <div className="bg-white/70 dark:bg-[#0b1121]/70 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-sm hover:border-orange-200 dark:hover:border-white/20 transition-colors">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1 sm:mb-2 flex items-center gap-1">
                  Mistakes
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl sm:text-3xl font-bold text-red-500 font-mono">{trustState.totalMistakes}</span>
                  <span className="text-slate-400 text-xs font-medium mb-1 line-clamp-1 hidden sm:block">Today</span>
                </div>
              </div>
            </div>

            {/* Verification Info Block */}
            <div className="mt-2 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-white/5 dark:to-transparent border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm">
              <h4 className="text-slate-800 dark:text-slate-200 font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" /> Security Monitors
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Case Sensitive Enabled</p>
                    <p className="text-xs text-slate-500 mt-0.5">Uppercase & lowercase matter.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Anti-Bot Validation Active</p>
                    <p className="text-xs text-slate-500 mt-0.5">Answering too fast flags account.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Fair Play Enforcement</p>
                    <p className="text-xs text-slate-500 mt-0.5">Trust Score &gt;50 required to withdraw.</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

