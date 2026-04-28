import React, { useState } from "react";
import {
  Clock,
  HelpCircle,
  FileText,
  Image as ImageIcon,
  SlidersHorizontal,
  Smile,
  MousePointerClick,
  Calculator,
  Blocks,
  LayoutGrid,
  Cpu,
  Headphones,
  Target,
  X,
  AlertTriangle,
  Smartphone,
  Download,
  Lock,
  Wallet,
  Zap,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTrustScore } from "../hooks/useTrustScore";
import TextCaptcha from "./modules/TextCaptcha";

export default function CaptchaEarnings() {
  const { addCorrect, addMistake } = useTrustScore();
  const [activeCaptcha, setActiveCaptcha] = useState<string | null>(null);

  if (activeCaptcha === "Text Captcha") {
    return <TextCaptcha onBack={() => setActiveCaptcha(null)} />;
  }

  const captchas = [
    {
      title: "Text Captcha",
      icon: FileText,
      rate: "$0.0005",
      pts: "1",
      time: "4s",
      limit: "10k/day",
      difficulty: "Easy",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
  ];

  const appExclusiveCaptchas = [
    {
      title: "Image Captcha",
      icon: ImageIcon,
      rate: "$0.0010",
      pts: "2",
      time: "8s",
      limit: "5k/day",
      difficulty: "Medium",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      title: "Slider Captcha",
      icon: SlidersHorizontal,
      rate: "$0.0015",
      pts: "3",
      time: "5s",
      limit: "3k/day",
      difficulty: "Medium",
      color: "text-orange-400",
      bg: "bg-orange-400/10",
    },
    {
      title: "Emoji Captcha",
      icon: Smile,
      rate: "$0.0010",
      pts: "2",
      time: "6s",
      limit: "2k/day",
      difficulty: "Easy",
      color: "text-pink-400",
      bg: "bg-pink-400/10",
    },
    {
      title: "Math Captcha",
      icon: Calculator,
      rate: "$0.0020",
      pts: "4",
      time: "12s",
      limit: "1k/day",
      difficulty: "Hard",
      color: "text-red-400",
      bg: "bg-red-400/10",
    },
    {
      title: "Audio Captcha",
      icon: Headphones,
      rate: "$0.0025",
      pts: "5",
      time: "20s",
      limit: "500/day",
      difficulty: "Hard",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
  ];

  const handleSimulateCorrect = () => {
    addCorrect();
    setActiveCaptcha(null);
  };

  const handleSimulateMistake = () => {
    addMistake(1);
    setActiveCaptcha(null);
  };

  const handleSimulateSpam = () => {
    addMistake(4);
    setActiveCaptcha(null);
  };

  return (
    <div className="space-y-8 relative">
      <AnimatePresence>
        {activeCaptcha && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-navy/90 backdrop-blur-sm"
              onClick={() => setActiveCaptcha(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel p-8 max-w-sm w-full rounded-3xl relative z-10 border-blue-500/30"
            >
              <button
                onClick={() => setActiveCaptcha(null)}
                className="absolute top-4 right-4 p-2 bg-white/5 rounded-full hover:bg-white/10 text-slate-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-xl font-bold mb-2">Simulate Answer</h3>
              <p className="text-slate-400 text-sm mb-6">
                Choose an outcome to test Trust Score system. (Note: Text
                Captcha uses real gameplay!)
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSimulateCorrect}
                  className="bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 py-3 rounded-xl font-bold transition-all"
                >
                  Correct Answer
                </button>
                <button
                  onClick={handleSimulateMistake}
                  className="bg-orange-500/20 hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500/30 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  Wrong Answer (+1 Mistake)
                </button>
                <button
                  onClick={handleSimulateSpam}
                  className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4" /> Random Guess Spam (+4)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center text-center gap-4 mb-10 mt-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">
            Available Captchas
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            Choose a captcha type to start earning rewards instantly.
          </p>
        </div>
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.15)] bg-blue-500/10 backdrop-blur-md relative overflow-hidden group transition-all hover:bg-blue-500/20 hover:border-blue-500/50">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 -translate-x-full group-hover:translate-x-full duration-1000 transition-transform"></div>
          <Zap className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
          <div className="flex flex-wrap justify-center items-center gap-2">
            <span className="text-[11px] uppercase tracking-widest font-bold text-blue-300">Current Rate</span>
            <span className="font-bold text-white font-mono bg-blue-500/20 px-2.5 py-0.5 rounded-md border border-blue-500/30 text-sm">2000 PTS = $1.00</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {captchas.map((item, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={item.title}
            className="glass-panel p-6 sm:p-8 rounded-[2rem] hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)] transition-all group relative overflow-hidden flex flex-col border border-white/5 bg-navy/40"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className={`p-4 rounded-2xl ${item.bg} border border-white/5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-inner`}>
                <item.icon className={`w-8 h-8 ${item.color}`} />
              </div>
              <div className="flex flex-col items-end bg-navy/80 px-4 py-2 rounded-xl border border-white/10 shadow-sm">
                <span className="text-base font-bold text-emerald-400 flex items-center gap-1 font-mono">
                  {item.rate}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.pts} PTS per solve</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6 relative z-10 text-white tracking-tight">
              {item.title}
            </h3>

            <div className="space-y-4 mb-8 flex-1 relative z-10">
              <div className="flex justify-between items-center text-sm p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-slate-400 flex items-center gap-3 font-medium">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20"><Clock className="w-4 h-4 text-blue-400" /></div>
                  Avg Time
                </span>
                <span className="font-bold text-slate-200">{item.time}</span>
              </div>
              <div className="flex justify-between items-center text-sm p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-slate-400 flex items-center gap-3 font-medium">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20"><HelpCircle className="w-4 h-4 text-purple-400" /></div>
                  Difficulty
                </span>
                <span
                  className={`font-bold px-3 py-1 rounded-lg text-xs uppercase tracking-wider ${item.difficulty === "Easy" ? "bg-green-500/10 text-green-400 border border-green-500/20" : item.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" : item.difficulty === "Hard" ? "bg-red-500/10 text-red-400 border border-red-500/20" : "text-slate-300"}`}
                >
                  {item.difficulty}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-slate-400 flex items-center gap-3 font-medium">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20"><Target className="w-4 h-4 text-orange-400" /></div>
                  Daily Limit
                </span>
                <span className="font-bold text-slate-200">{item.limit}</span>
              </div>
            </div>

            <button
              onClick={() => setActiveCaptcha(item.title)}
              className="w-full py-4 bg-blue-600/10 text-blue-400 rounded-2xl font-bold text-[15px] border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] group-hover:border-transparent active:scale-[0.98] transition-all relative z-10 flex items-center justify-center gap-3"
            >
              START SOLVING <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ))}

        {/* Merged Download App Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass-panel p-8 sm:p-10 rounded-[2rem] transition-all relative overflow-hidden flex flex-col md:flex-row items-center border border-transparent hover:border-indigo-500/30 bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-emerald-600/10 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="flex-1 pr-0 md:pr-12 mb-10 md:mb-0 relative z-10 text-center md:text-left flex flex-col justify-center">
            <div className="inline-flex flex-wrap justify-center md:justify-start items-center gap-2 mb-6">
              <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Smartphone className="w-4 h-4" /> Mobile App Available
              </span>
              <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> 10x More Earnings
              </span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-tight">
              Unlock the Full <br className="hidden md:block" /> Experience
            </h3>
            <p className="text-slate-300 text-sm md:text-base mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
              The web version only supports Text Captchas. Download our highly-rated mobile app to access premium tasks and secure withdrawals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
              <div className="flex items-center gap-4 bg-navy/60 p-4 rounded-2xl border border-white/5 backdrop-blur-md shadow-inner flex-1">
                 <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                   <LayoutGrid className="w-6 h-6 text-indigo-400" />
                 </div>
                 <div className="text-left">
                   <div className="text-sm font-bold text-white mb-0.5">More Captchas</div>
                   <div className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">Image, Audio, 3D</div>
                 </div>
              </div>
              <div className="flex items-center gap-4 bg-navy/60 p-4 rounded-2xl border border-white/5 backdrop-blur-md shadow-inner flex-1">
                 <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                   <Wallet className="w-6 h-6 text-emerald-400" />
                 </div>
                 <div className="text-left">
                   <div className="text-sm font-bold text-white mb-0.5">Instant Payouts</div>
                   <div className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">Crypto & Wallets</div>
                 </div>
              </div>
            </div>
            
            <button 
              onClick={() => alert("Download the official DeCaptcha App on your mobile device.")}
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-600/25 flex items-center justify-center gap-3 w-full md:w-auto active:scale-[0.98]"
            >
              <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" /> 
              Get It Now
            </button>
          </div>

          <div className="relative shrink-0 w-56 h-56 md:w-72 md:h-72 z-10 mx-auto md:mx-0">
            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-[50px] animate-pulse" />
            
            {/* 3D-ish Phone Representation */}
            <div className="w-full h-full bg-navy/90 border-2 border-white/10 rounded-[2.5rem] md:rounded-[3rem] rotate-12 shadow-[30px_30px_60px_rgba(0,0,0,0.5)] flex flex-col relative overflow-hidden backdrop-blur-xl group-hover:rotate-6 transition-transform duration-700 ease-out">
                {/* Status Bar */}
                <div className="absolute top-0 w-full h-12 bg-black/40 flex justify-center items-start pt-3 px-6 shrink-0 z-20">
                   <div className="w-20 h-1.5 bg-white/20 rounded-full" />
                </div>
                
                {/* Screen Content */}
                <div className="flex-1 mt-12 bg-gradient-to-b from-navy/50 to-indigo-900/40 p-4 relative flex items-center justify-center">
                  
                  {/* Floating elements inside phone */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30 shadow-lg animate-[bounce_3s_ease-in-out_infinite]">
                    <ImageIcon className="w-5 h-5 text-orange-400" />
                  </div>
                  
                  <div className="absolute bottom-16 left-4 w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shadow-lg animate-[bounce_4s_ease-in-out_infinite_reverse]">
                    <Wallet className="w-5 h-5 text-emerald-400" />
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center blur-sm" />
                  <LayoutGrid className="w-16 h-16 text-blue-400/80 relative z-10 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                  
                </div>
                
                {/* Home Indicator */}
                <div className="absolute bottom-2 w-full flex justify-center z-20">
                  <div className="w-24 h-1 bg-white/20 rounded-full" />
                </div>
            </div>
            
          </div>
        </motion.div>
      </div>
    </div>
  );
}

