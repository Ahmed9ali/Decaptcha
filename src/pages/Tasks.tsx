import React from 'react';
import { Target, Share2, CheckSquare, Clock, ArrowRight, Zap } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { useSocialPromos } from '../hooks/useSocialPromos';
import { useTrustScore } from '../hooks/useTrustScore';
import { cn } from '../lib/utils';

export default function Tasks({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const { wallet } = useWallet();
  const { tasks: socialTasks, completedTaskIds } = useSocialPromos();
  const { trustState } = useTrustScore();

  // Tasks Math
  const socialCompleted = completedTaskIds.length;
  const socialTotal = socialTasks.length;
  const socialProgress = socialTotal > 0 ? (socialCompleted / socialTotal) * 100 : 0;
  
  const accuracyGoal = 100;
  const accuracyProgressVal = Math.min((trustState.totalCorrect || 0), accuracyGoal);
  const accuracyProgress = (accuracyProgressVal / accuracyGoal) * 100;

  const speedGoal = 50;
  // using text captchas solved as speed metric for showcase
  const speedProgressVal = Math.min((wallet.totalTextSolved || 0), speedGoal);
  const speedProgress = (speedProgressVal / speedGoal) * 100;

  const dailyGoal = 1;
  const dailyProgressVal = (wallet.totalTextSolved > 0 || wallet.totalImageSolved > 0) ? 1 : 0;
  const dailyProgress = (dailyProgressVal / dailyGoal) * 100;

  return (
    <div className="min-h-screen pb-20 relative font-['Varela_Round']">
      <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 pt-4">
        
        {/* Header */}
        <div className="bg-white/60 dark:bg-[#0b1121]/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 blur-[60px] rounded-full pointer-events-none" />
          
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30 border-4 border-white/20 shrink-0">
            <Target className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              Tasks & Challenges
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl leading-relaxed">
              Complete challenges to unlock huge multipliers, rare badges, and claim extra PTS directly into your wallet.
            </p>
          </div>
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          
          {/* Social Promo Task */}
          <div className="bg-white/70 dark:bg-[#0b1121]/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden transition-all hover:shadow-md hover:border-blue-300 dark:hover:border-white/20 group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500" />
            <div className="flex justify-between items-start mb-5">
              <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                <Share2 className="w-6 h-6" />
              </div>
              <span className="font-bold font-mono text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-200 dark:border-blue-500/20">
                Variable XP
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Social Promo Drop</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-1 min-h-[40px]">
              Complete social drops, follow our pages and get secret promo codes from videos.
            </p>
            <div className="mt-auto">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Progress</span>
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{socialCompleted}/{socialTotal} Codes</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800/50 overflow-hidden h-2.5 rounded-full border border-slate-200 dark:border-white/5 mb-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${socialProgress}%` }} 
                />
              </div>
              <button 
                onClick={() => onNavigate?.('social')}
                className="w-full py-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10"
              >
                Go to Promos <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Accuracy Challenge Task */}
          <div className="bg-white/70 dark:bg-[#0b1121]/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden transition-all hover:shadow-md hover:border-emerald-300 dark:hover:border-white/20 group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
            <div className="flex justify-between items-start mb-5">
              <div className="w-14 h-14 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-200 dark:border-emerald-500/20">
                1000 PTS
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Accuracy Challenge</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-1 min-h-[40px]">
              Solve 100 captchas correctly without getting your trust score affected. Accuracy matters!
            </p>
            <div className="mt-auto">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Progress</span>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">{accuracyProgressVal}/{accuracyGoal} Solved</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800/50 overflow-hidden h-2.5 rounded-full border border-slate-200 dark:border-white/5 mb-4">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${accuracyProgress}%` }} 
                />
              </div>
              <button 
                onClick={() => { if (accuracyProgress < 100) onNavigate?.('captcha'); }}
                className={cn(
                  "w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 border shadow-sm",
                  accuracyProgress >= 100 
                    ? "bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/20" 
                    : "bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10"
                )}
              >
                {accuracyProgress >= 100 ? (
                  <><CheckSquare className="w-4 h-4" /> Claim 1000 PTS</>
                ) : (
                  <>Continue Solving <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </div>

          {/* Speed Solver Task */}
          <div className="bg-white/70 dark:bg-[#0b1121]/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden transition-all hover:shadow-md hover:border-orange-300 dark:hover:border-white/20 group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-amber-500" />
            <div className="flex justify-between items-start mb-5">
              <div className="w-14 h-14 rounded-xl bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <span className="font-bold font-mono text-orange-600 dark:text-orange-400 bg-orange-100/50 dark:bg-orange-500/10 px-3 py-1 rounded-lg border border-orange-200 dark:border-orange-500/20">
                800 PTS
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Speed Solver</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-1 min-h-[40px]">
              Prove your speed. Solve 50 text captchas to earn the Quick Fingers badge and bonus points.
            </p>
            <div className="mt-auto">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Progress</span>
                <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">{speedProgressVal}/{speedGoal} Solved</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800/50 overflow-hidden h-2.5 rounded-full border border-slate-200 dark:border-white/5 mb-4">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${speedProgress}%` }} 
                />
              </div>
              <button 
                onClick={() => { if (speedProgress < 100) onNavigate?.('captcha'); }}
                className={cn(
                  "w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 border shadow-sm",
                  speedProgress >= 100 
                    ? "bg-orange-500 text-white border-orange-400 shadow-orange-500/20" 
                    : "bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10"
                )}
              >
                {speedProgress >= 100 ? (
                  <><CheckSquare className="w-4 h-4" /> Claim 800 PTS</>
                ) : (
                  <>Continue Solving <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </div>

          {/* Daily Goal */}
          <div className="bg-white/70 dark:bg-[#0b1121]/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden transition-all hover:shadow-md hover:border-purple-300 dark:hover:border-white/20 group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500" />
            <div className="flex justify-between items-start mb-5">
              <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <span className="font-bold font-mono text-purple-600 dark:text-purple-400 bg-purple-100/50 dark:bg-purple-500/10 px-3 py-1 rounded-lg border border-purple-200 dark:border-purple-500/20">
                100 PTS
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Daily Goal</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-1 min-h-[40px]">
              Log in and solve at least 1 captcha today to maintain your active solving streak.
            </p>
            <div className="mt-auto">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Progress</span>
                <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">{dailyProgressVal}/{dailyGoal} Solved</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800/50 overflow-hidden h-2.5 rounded-full border border-slate-200 dark:border-white/5 mb-4">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${dailyProgress}%` }} 
                />
              </div>
              <button 
                onClick={() => onNavigate?.('daily')}
                className={cn(
                  "w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 border shadow-sm",
                  dailyProgress >= 100
                    ? "bg-purple-500 text-white border-purple-400 shadow-purple-500/20" 
                    : "bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10"
                )}
              >
                {dailyProgress >= 100 ? (
                  <><CheckSquare className="w-4 h-4" /> Go to Daily <ArrowRight className="w-4 h-4" /></>
                ) : (
                  <>Go to Daily Check-in <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
