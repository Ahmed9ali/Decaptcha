import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Gift, Lock, CalendarCheck, Zap, Star, Crown, ChevronRight, Unlock, Clock, Trophy, Target, Flame, AlertCircle } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { cn } from '../lib/utils';
import Confetti from 'react-confetti';

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

export default function DailyCheckin() {
  const { addPoints } = useWallet();
  const { xpConfig, addXp } = useLeaderboard();
  
  const [streak, setStreak] = useState(3); // Mock streak
  const [claimedToday, setClaimedToday] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [timeLeft, setTimeLeft] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    "Come tomorrow for bigger rewards!",
    "Maintain streak for bonus rewards!",
    "Day 7 Mystery Reward awaits!",
    "Don't miss a day, don't miss the XP!"
  ];

  useEffect(() => {
    const qTimer = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(qTimer);
  }, [quotes.length]);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setHours(24, 0, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();
      
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock schedule
  const days = [
    { day: 1, points: 50, xp: 10, claimed: true },
    { day: 2, points: 75, xp: 15, claimed: true },
    { day: 3, points: 100, xp: 20, claimed: true },
    { day: 4, points: 150, xp: 30, claimed: false, isToday: true },
    { day: 5, points: 200, xp: 40, claimed: false },
    { day: 6, points: 300, xp: 50, claimed: false },
    { day: 7, points: 500, xp: 100, claimed: false, isSpecial: true },
  ];

  const handleClaim = () => {
    if (claimedToday) return;
    
    // Day 4 values
    addPoints(150);
    addXp(30);
    
    setClaimedToday(true);
    setStreak(4);
    
    // Show splash animation
    setShowReward(true);
    setTimeout(() => setShowReward(false), 3500);
  };

  const progressPercentage = ((streak + (claimedToday ? 0 : 0)) / 7) * 100;

  return (
    <div className="min-h-screen pb-20 relative font-['Varela_Round']">
      {showReward && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />
        </div>
      )}
      
      <div className="absolute top-0 right-0 w-full md:w-[60%] h-[50%] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full md:w-[50%] h-[40%] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 pt-4">
        
        {/* Header Header */}
        <div className="bg-white/60 dark:bg-[#0b1121]/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 sm:p-10 mb-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 blur-[60px] rounded-full pointer-events-none" />
          
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl shadow-emerald-500/30 border-4 border-white/20 shrink-0 relative">
            <CalendarCheck className="w-10 h-10 text-white" />
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-white dark:border-slate-900 shadow-md">
              {streak} Days🔥
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3 z-10">
              Daily Check-In
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed mb-6 z-10">
              Log in every day to claim bonus points and XP. Keep your streak alive to unlock the massive <strong className="text-amber-500">Day 7 Mystery Box!</strong>
            </p>

            <button 
              onClick={handleClaim}
              disabled={claimedToday}
              className={cn(
                "py-3 px-8 rounded-2xl font-black transition-all flex flex-col items-center justify-center gap-1 w-full max-w-sm z-10 tracking-widest",
                claimedToday 
                  ? "bg-slate-100 dark:bg-white/5 text-slate-500 border-2 border-slate-200 dark:border-white/10 shadow-none cursor-not-allowed" 
                  : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-xl shadow-emerald-500/30 hover:scale-[1.02] active:scale-95 border-2 border-emerald-400/50 uppercase text-lg"
              )}
            >
              {claimedToday ? (
                <>
                  <div className="flex items-center gap-2 uppercase text-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Claimed</span>
                  </div>
                  <span className="text-xs font-bold font-mono tracking-normal opacity-80 flex items-center gap-1"><Clock className="w-3 h-3" /> Next in {timeLeft}</span>
                </>
              ) : (
                <div className="flex items-center gap-2 text-lg uppercase">Claim +150 PTS</div>
              )}
            </button>
          </div>
        </div>

        {/* 7 Day Calendar */}
        <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Your 7-Day Streak</h3>
          <span className="text-sm font-bold text-slate-500 bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full border border-slate-200 dark:border-white/10">
            {7 - streak} days till Mystery Box
          </span>
        </div>
        
        <div className="bg-white/40 dark:bg-[#0b1121]/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 mb-8 relative">
          
          {/* Progress Bar (Desktop) */}
          <div className="hidden md:block absolute top-[80px] left-10 right-10 h-2 bg-slate-200 dark:bg-slate-800 rounded-full z-0 overflow-hidden">
             <div 
               className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-1000 ease-out"
               style={{ width: `${progressPercentage}%` }}
             />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 relative z-10">
            {days.map((day) => {
              const isToday = day.isToday;
              const isClaimed = day.claimed || (isToday && claimedToday);
              const isLocked = !isToday && !day.claimed;
              
              if (day.isSpecial) {
                return (
                  <div 
                    key={day.day}
                    className={cn(
                      "col-span-2 md:col-span-4 lg:col-span-1 relative rounded-2xl flex flex-col items-center justify-center p-3 transition-all duration-500 border-2 overflow-hidden group min-h-[140px]",
                      isClaimed ? "bg-gradient-to-b from-amber-100 to-orange-100 dark:from-amber-500/20 dark:to-orange-500/20 border-amber-400" :
                      "bg-gradient-to-b from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 border-amber-200 dark:border-amber-500/30 hover:border-amber-400"
                    )}
                  >
                    <div className="absolute inset-0 bg-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-[20px]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-1 relative z-10">
                      Day {day.day}
                    </span>
                    <div className="relative w-12 h-12 flex items-center justify-center mb-1 z-10">
                      <Gift className={cn("w-10 h-10 relative z-10", isClaimed ? "text-amber-600 dark:text-amber-400" : "text-amber-500 group-hover:scale-110 transition-transform duration-300")} />
                      {!isClaimed && (
                        <div className="absolute inset-0 bg-amber-400 blur-xl opacity-50 rounded-full animate-pulse" />
                      )}
                    </div>
                    <span className="text-sm font-black text-amber-600 dark:text-amber-400 font-mono relative z-10">Mystery Box</span>
                    <span className="text-[10px] font-bold text-amber-700/60 dark:text-amber-500/60 relative z-10">Up to 5000 PTS</span>
                  </div>
                );
              }

              return (
                <div 
                  key={day.day}
                  className={cn(
                    "relative rounded-2xl flex flex-col items-center justify-center p-3 transition-all duration-300 border min-h-[140px] overflow-hidden",
                    isClaimed ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30" :
                    isToday && !claimedToday ? "bg-white dark:bg-[#0b1121] border-blue-400 shadow-xl shadow-blue-500/10 transform -translate-y-1 ring-4 ring-blue-500/20" :
                    "bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/10 opacity-70"
                  )}
                >
                  {/* Day Header */}
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest mb-2",
                    isClaimed ? "text-emerald-600 dark:text-emerald-500" :
                    isToday && !claimedToday ? "text-blue-600 dark:text-blue-400" :
                    "text-slate-500 dark:text-slate-400"
                  )}>
                    Day {day.day}
                  </span>

                  {/* Icon */}
                  <div className="mb-2 flex items-center justify-center relative">
                    {isClaimed ? (
                      <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      </div>
                    ) : isToday ? (
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center animate-pulse">
                        <Unlock className="w-4 h-4 text-blue-500" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-slate-400" />
                      </div>
                    )}
                  </div>

                  {/* Rewards */}
                  <div className="flex flex-col items-center gap-0.5">
                    <span className={cn("text-base font-black font-mono", isClaimed ? "text-emerald-600 dark:text-emerald-400" : isToday ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400")}>
                      {day.points} PTS
                    </span>
                    <span className={cn("text-[10px] font-bold font-mono tracking-widest bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded-md", isClaimed ? "text-emerald-600 dark:text-emerald-400" : isToday ? "text-blue-500 dark:text-blue-400" : "text-slate-500 dark:text-slate-400")}>
                      +{day.xp} XP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Motivational Line */}
        <div className="flex justify-center mb-10 h-6 relative overflow-hidden w-full">
          {quotes.map((quote, idx) => (
            <p 
              key={idx}
              className={cn(
                "absolute text-sm font-bold text-emerald-600 dark:text-emerald-400 tracking-wide transition-all duration-500 text-center w-full",
                idx === quoteIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              {quote}
            </p>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 relative z-10">
          <div className="bg-white/60 dark:bg-[#0b1121]/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl sm:rounded-3xl p-3 sm:p-5 flex items-center gap-2 sm:gap-4 shadow-sm hover:-translate-y-1 transition-transform overflow-hidden">
            <div className="bg-blue-100/80 dark:bg-blue-500/20 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl text-blue-500 shadow-inner shrink-0">
              <CalendarCheck className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 truncate">Total Valid</p>
              <p className="text-lg sm:text-2xl md:text-3xl font-black text-slate-800 dark:text-white font-mono truncate"><CountUp value={24} /></p>
            </div>
          </div>
          
          <div className="bg-white/60 dark:bg-[#0b1121]/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl sm:rounded-3xl p-3 sm:p-5 flex items-center gap-2 sm:gap-4 shadow-sm hover:-translate-y-1 transition-transform overflow-hidden">
            <div className="bg-orange-100/80 dark:bg-orange-500/20 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl text-orange-500 shadow-inner shrink-0">
              <Flame className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 truncate">Best Streak</p>
              <p className="text-lg sm:text-2xl md:text-3xl font-black text-slate-800 dark:text-white font-mono truncate"><CountUp value={14} /></p>
            </div>
          </div>

          <div className="bg-white/60 dark:bg-[#0b1121]/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl sm:rounded-3xl p-3 sm:p-5 flex items-center gap-2 sm:gap-4 shadow-sm hover:-translate-y-1 transition-transform overflow-hidden">
            <div className="bg-amber-100/80 dark:bg-amber-500/20 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl text-amber-500 shadow-inner shrink-0">
              <Trophy className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 truncate">Rewards</p>
              <p className="text-lg sm:text-2xl md:text-3xl font-black text-slate-800 dark:text-white font-mono truncate"><CountUp value={3250} /></p>
            </div>
          </div>

          <div className="bg-white/60 dark:bg-[#0b1121]/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl sm:rounded-3xl p-3 sm:p-5 flex items-center gap-2 sm:gap-4 shadow-sm hover:-translate-y-1 transition-transform overflow-hidden">
            <div className="bg-red-100/80 dark:bg-red-500/20 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl text-red-500 shadow-inner shrink-0">
              <AlertCircle className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 truncate">Missed</p>
              <p className="text-lg sm:text-2xl md:text-3xl font-black text-slate-800 dark:text-white font-mono truncate"><CountUp value={2} /></p>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Success Pop */}
      {showReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" />
          <div className="bg-white dark:bg-slate-900 px-10 py-10 rounded-[2rem] shadow-2xl flex flex-col items-center animate-bounce-short z-10 border border-slate-200 dark:border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none" />
            
            <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 text-emerald-500" />
            </div>
            
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Day {streak} Claimed!</h2>
            <div className="flex gap-4">
              <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 px-4 py-2 rounded-xl text-center">
                <p className="text-xl font-bold font-mono text-orange-600 dark:text-orange-400">+150</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500">Points</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 px-4 py-2 rounded-xl text-center">
                <p className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400">+30</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500">XP</p>
              </div>
            </div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-6 bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-full">
              Streak {streak} 🔥 Keep it up!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}