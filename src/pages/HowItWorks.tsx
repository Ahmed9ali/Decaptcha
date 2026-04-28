import React from "react";
import {
  ArrowLeft,
  CheckCircle,
  Smartphone,
  Zap,
  Wallet,
  HelpCircle,
} from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          How It Works
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Start earning money by solving simple captchas. Follow these steps to
          maximize your rewards on the DeCaptcha platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-3xl border border-glass-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full" />
          <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center font-bold text-xl mb-6 ring-1 ring-blue-500/50">
            1
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white">
            Get Your Access Key
          </h3>
          <p className="text-slate-400 leading-relaxed mb-4">
            Security is our priority. You don't need a username or password.
            Simply use your secure 4-digit access key (1234) for fast entry to
            the platform.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-glass-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[50px] rounded-full" />
          <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-xl flex items-center justify-center font-bold text-xl mb-6 ring-1 ring-orange-500/50">
            2
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white">Earn Points</h3>
          <p className="text-slate-400 leading-relaxed mb-4">
            Every captcha solved on the website costs 1 Point. Open the
            DeCaptcha mobile app to watch short ads and complete tasks to rack
            up thousands of points!
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-glass-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full" />
          <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center font-bold text-xl mb-6 ring-1 ring-emerald-500/50">
            3
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white">Solve Captchas</h3>
          <p className="text-slate-400 leading-relaxed mb-4">
            Head to the website dashboard and start solving Text Captchas. Each
            correct solve rewards you with $0.0001 straight to your wallet
            balance.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-glass-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full" />
          <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center font-bold text-xl mb-6 ring-1 ring-purple-500/50">
            4
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white">Withdraw Funds</h3>
          <p className="text-slate-400 leading-relaxed mb-4">
            Cash out your earnings instantly using crypto limits as low as
            $1.00.{" "}
            <strong>
              Note: Withdrawals are exclusively processed via our mobile app to
              prevent fraud.
            </strong>
          </p>
        </div>
      </div>

      <div className="mt-12 glass-panel p-8 rounded-3xl border border-blue-500/30 bg-blue-900/10 text-center">
        <HelpCircle className="w-12 h-12 text-blue-400 mx-auto mb-4 opacity-80" />
        <h3 className="text-xl font-bold text-white mb-2">
          Maintain Your Trust Score
        </h3>
        <p className="text-slate-300 max-w-lg mx-auto">
          Make sure to solve captchas accurately. If your Trust Score drops
          below 49% due to excessive mistakes and bot-like behavior, your
          account will be suspended.
        </p>
      </div>
    </div>
  );
}
