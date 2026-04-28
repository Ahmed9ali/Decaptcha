import { Gift, TrendingUp, Zap, Target, Users, ShieldCheck, Star } from 'lucide-react';

export default function Rewards() {
  const multipliers = [
    { level: 'Bronze', req: '0 - 10k PTS', bonus: '+0%', color: 'text-orange-300', bg: 'bg-orange-300/10' },
    { level: 'Silver', req: '10k - 50k PTS', bonus: '+5%', color: 'text-slate-300', bg: 'bg-slate-300/10' },
    { level: 'Gold', req: '50k - 200k PTS', bonus: '+10%', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { level: 'Platinum', req: '200k+ PTS', bonus: '+20%', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <Gift className="w-8 h-8 text-blue-400" />
          Rewards System
        </h1>
        <p className="text-slate-400 max-w-2xl">Understand how our economy works. We offer dynamic pricing based on captcha difficulty, accuracy bonuses, and tiered multipliers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Base Exchange Rate */}
        <div className="glass-panel p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-500 blur-[80px] opacity-10" />
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Base Exchange Rate
          </h3>
          <div className="bg-navy-light/50 border border-glass-border rounded-2xl p-6 flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <span className="block text-4xl font-bold font-mono text-white">2000</span>
              <span className="text-sm font-semibold tracking-wider text-slate-400 uppercase mt-1 block">Points</span>
            </div>
            <div className="text-slate-500 font-bold">=</div>
            <div className="text-center">
              <span className="block text-4xl font-bold font-mono text-emerald-400">$1.00</span>
              <span className="text-sm font-semibold tracking-wider text-slate-400 uppercase mt-1 block">USD</span>
            </div>
          </div>
          <p className="text-sm text-slate-400">Rates are locked and guaranteed. No sudden drops in value. Withdrawals processed within 24 hours.</p>
        </div>

        {/* Multiplier Tiers */}
        <div className="glass-panel p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            Account Multipliers
          </h3>
          <div className="space-y-3">
            {multipliers.map((tier) => (
              <div key={tier.level} className="flex items-center justify-between p-4 rounded-xl border border-glass-border bg-white/5">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${tier.bg} flex items-center justify-center`}>
                    <ShieldCheck className={`w-4 h-4 ${tier.color}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{tier.level}</h4>
                    <p className="text-xs text-slate-400">{tier.req}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold font-mono text-emerald-400">{tier.bonus}</span>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Earnings</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bonus Structures */}
      <h3 className="text-xl font-bold mt-12 mb-6">Extra Ways to Earn</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-6 rounded-3xl border-t-2 border-t-orange-400">
          <Zap className="w-8 h-8 text-orange-400 mb-4" />
          <h4 className="font-bold text-lg mb-2">Weekend Boost</h4>
          <p className="text-sm text-slate-400 mb-4">All text and image captchas pay +15% more from Friday 5PM to Sunday 11PM UTC.</p>
          <span className="inline-block px-3 py-1 bg-white/5 rounded-lg text-xs font-medium text-slate-300">Active in 2 days</span>
        </div>
        
        <div className="glass-panel p-6 rounded-3xl border-t-2 border-t-blue-400">
          <Target className="w-8 h-8 text-blue-400 mb-4" />
          <h4 className="font-bold text-lg mb-2">Accuracy Bonus</h4>
          <p className="text-sm text-slate-400 mb-4">Maintain above 98% accuracy for 1000 consecutive captchas to receive a $5.00 instant drop.</p>
          <div className="w-full bg-navy rounded-full h-1.5 mt-auto">
            <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>
        
        <div className="glass-panel p-6 rounded-3xl border-t-2 border-t-purple-400">
          <Users className="w-8 h-8 text-purple-400 mb-4" />
          <h4 className="font-bold text-lg mb-2">Lifetime Referral</h4>
          <p className="text-sm text-slate-400 mb-4">Get 10% of what your referrals earn, without affecting their income. Paid out daily at midnight.</p>
          <span className="inline-block px-3 py-1 bg-white/5 rounded-lg text-xs font-medium text-slate-300">3 Active Referrals</span>
        </div>
      </div>
      
      {/* Penalty Warning */}
      <div className="glass-panel p-6 rounded-3xl bg-red-500/5 border-red-500/20 flex gap-4 mt-8">
        <ShieldCheck className="w-6 h-6 text-red-400 flex-shrink-0" />
        <div>
          <h4 className="font-bold text-red-200 mb-1">Quality Control Penalty</h4>
          <p className="text-sm text-slate-400">Wrong answers deduct points equivalent to 50% of the captcha's reward. Intentional spamming or use of bot software will result in immediate permanent account suspension and forfeiture of all balances.</p>
        </div>
      </div>
    </div>
  );
}
