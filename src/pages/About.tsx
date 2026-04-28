import React from "react";
import { Target, Users, ShieldCheck, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      <div className="text-center space-y-4 mb-12">
        <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center shadow-xl shadow-blue-500/20 ring-1 ring-white/10 mb-6">
          <span className="material-symbols-outlined text-white text-[40px]">
            fingerprint
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          About DeCaptcha
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          We are building the most secure, transparent, and rewarding
          distributed human-computing network in the world.
        </p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-glass-border">
        <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
        <p className="text-slate-300 leading-relaxed max-w-3xl">
          Artificial Intelligence is advancing rapidly, and the demand for
          high-quality human verification data has never been higher. At
          DeCaptcha, we bridge the gap between businesses needing bot protection
          and people around the world looking for accessible ways to earn real
          money online. Our platform empowers individuals to monetize their free
          time by providing the human intelligence algorithms need.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col items-start gap-4">
          <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Global Access</h3>
          <p className="text-sm text-slate-400">
            Available to anyone with an internet connection, breaking down
            geographical barriers to earning.
          </p>
        </div>
        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col items-start gap-4">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Secure Eco-system</h3>
          <p className="text-sm text-slate-400">
            Proprietary dynamic Trust Scores map individual accuracy to ensure
            client delivery quality and prevent abuse.
          </p>
        </div>
        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col items-start gap-4">
          <div className="p-3 bg-orange-500/20 text-orange-400 rounded-xl">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Fair Compensation</h3>
          <p className="text-sm text-slate-400">
            Our ecosystem guarantees instant, feeless crypto payouts giving you
            complete ownership over what you earn.
          </p>
        </div>
        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col items-start gap-4">
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Community First</h3>
          <p className="text-sm text-slate-400">
            Your voice matters. Constant updates and enhancements directly
            driven by our community of dedicated solvers.
          </p>
        </div>
      </div>
    </div>
  );
}
