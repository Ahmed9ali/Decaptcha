import React, { useState } from 'react';
import { Users, Copy, CheckCircle, Share2, Target, Gift, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { useWallet } from '../hooks/useWallet';

export default function Referrals() {
  const { wallet } = useWallet();
  const [copied, setCopied] = useState(false);
  const referralCode = "DEC-" + (wallet.userId || "8x9A2B").slice(0, 6).toUpperCase();
  const referralLink = `https://decaptcha.app/join/${referralCode}`;

  // Mock data for referrals
  const [referrals] = useState([
    { id: 1, name: "AliceSmith", captchasSolved: 120, status: "completed", reward: 500 },
    { id: 2, name: "CryptoNinja", captchasSolved: 45, status: "pending", reward: 500 },
    { id: 3, name: "MaxPower", captchasSolved: 5, status: "pending", reward: 500 }
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pb-20 relative font-['Varela_Round']">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 pt-4">
        
        {/* Header Header */}
        <div className="bg-white/60 dark:bg-[#0b1121]/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 mb-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 blur-[60px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 text-center md:text-left">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 border-4 border-white/20 shrink-0">
              <Users className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                Invite Friends, Earn Rewards
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm max-w-xl leading-relaxed mb-4">
                Share your referral link with friends. Once they sign up and solve their first <strong className="text-indigo-600 dark:text-indigo-400">100 Captchas</strong>, you both earn <strong className="text-indigo-600 dark:text-indigo-400">500 Points</strong>!
              </p>
              
              <div className="flex items-center gap-2 max-w-md mx-auto md:mx-0 bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl p-1 shadow-inner">
                <input 
                  type="text" 
                  readOnly 
                  value={referralLink}
                  className="bg-transparent border-none text-sm font-medium text-slate-600 dark:text-slate-300 px-3 w-full focus:outline-none"
                />
                <button 
                  onClick={handleCopy}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap",
                    copied ? "bg-emerald-500 text-white" : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20 active:scale-95"
                  )}
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 px-1">How it Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/70 dark:bg-[#0b1121]/70 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
              <Share2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 dark:text-white mb-1">1. Share your link</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Send your unique link to your friends or followers.</p>
          </div>
          <div className="bg-white/70 dark:bg-[#0b1121]/70 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-3">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 dark:text-white mb-1">2. They solve 100 captchas</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Your friend signs up and completes 100 accurate captchas.</p>
          </div>
          <div className="bg-white/70 dark:bg-[#0b1121]/70 backdrop-blur-xl rounded-2xl p-5 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <Gift className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-800 dark:text-white mb-1">3. You both earn!</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">You both instantly receive 500 bonus points in your wallet.</p>
          </div>
        </div>

        {/* Your Referrals */}
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 px-1">Your Referrals</h3>
        <div className="bg-white/70 dark:bg-[#0b1121]/70 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
          {referrals.length === 0 ? (
             <div className="p-8 text-center">
               <Users className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
               <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-1">No referrals yet</h4>
               <p className="text-sm text-slate-500 dark:text-slate-400">Share your link to start earning!</p>
             </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {referrals.map((ref) => {
                const progress = Math.min(100, Math.round((ref.captchasSolved / 100) * 100));
                const isComplete = ref.status === 'completed';
                
                return (
                  <div key={ref.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 shrink-0">
                      {ref.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-800 dark:text-white">{ref.name}</span>
                        {isComplete ? (
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-500/20 rounded-md">Reward Claimed</span>
                        ) : (
                          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 px-2 py-0.5 bg-amber-100 dark:bg-amber-500/20 rounded-md">In Progress</span>
                        )}
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-2">
                        <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                          <span>{ref.captchasSolved} / 100 Captchas Solved</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full rounded-full transition-all duration-1000", isComplete ? "bg-emerald-500" : "bg-indigo-500")}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
