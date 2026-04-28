import { ShieldCheck, Bot, Cpu, Globe, Smartphone, Ghost, ShieldAlert, AlertTriangle, Scale, Ban, TrendingDown } from 'lucide-react';

export default function Security() {
  const banRules = [
    { title: 'No Auto Bots', desc: 'Automated scripts or botting software is strictly prohibited.', icon: Bot },
    { title: 'No AI Tools', desc: 'Using AI to bypass or solve tasks is not allowed.', icon: Cpu },
    { title: 'No VPN/Adblock/DNS', desc: 'Manipulating network traffic or masking your real location.', icon: Globe },
    { title: 'No Modding', desc: 'Tampering with, modifying, or reverse-engineering the APK.', icon: Smartphone },
    { title: 'No Cheating', desc: 'Exploiting website features or faking tasks (e.g., using glitches).', icon: Ghost },
  ];

  const penaltyRules = [
    { title: 'Incorrect Captchas', desc: 'Repeatedly submitting wrong or gibberish captchas.', icon: ShieldAlert },
    { title: 'Faking Social Tasks', desc: 'Claiming points for promo tasks without actually completing them.', icon: AlertTriangle },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">
      {/* Header Section */}
      <div className="text-center relative py-10 glass-panel border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm bg-gradient-to-b from-slate-50 to-white dark:from-[#0b1121]/80 dark:to-transparent">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
        <Scale className="w-16 h-16 text-blue-500 mx-auto mb-6 relative z-10" />
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-800 dark:text-white mb-4 relative z-10">
          Fair Play <span className="text-blue-500">Rules</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto px-4 relative z-10 leading-relaxed">
          To ensure a healthy and sustainable reward ecosystem, strict rules apply. 
          Please read them carefully. Violations carry immediate consequences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Account Ban Section */}
        <div className="col-span-1 border-slate-200 dark:border-red-500/20 lg:col-span-7 bg-white/40 dark:bg-[#0b1121]/40 backdrop-blur-xl border rounded-[2rem] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-500 shrink-0">
              <Ban className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-red-50">Zero Tolerance</h2>
              <p className="text-sm font-semibold text-red-500 dark:text-red-400 tracking-wide uppercase mt-1">Leads to Permanent Account Ban</p>
            </div>
          </div>

          <div className="space-y-4">
            {banRules.map((rule, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-red-200 dark:hover:border-red-500/30 transition-colors group"
              >
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-black/20 text-slate-500 dark:text-slate-400 group-hover:text-red-500 group-hover:bg-red-50 dark:group-hover:bg-red-500/20 transition-all shrink-0">
                  <rule.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="pt-0.5">
                  <h3 className="font-bold text-slate-800 dark:text-white mb-1.5">{rule.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score Reduction Section */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-8">
          <div className="flex-1 bg-white/40 dark:bg-[#0b1121]/40 backdrop-blur-xl border border-slate-200 dark:border-amber-500/20 rounded-[2rem] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-amber-50">Score Penalty</h2>
                <p className="text-sm font-semibold text-amber-500 tracking-wide uppercase mt-1">Leads to Points Reduction</p>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              {penaltyRules.map((rule, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-amber-200 dark:hover:border-amber-500/30 transition-colors group"
                >
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-black/20 text-slate-500 dark:text-slate-400 group-hover:text-amber-500 group-hover:bg-amber-50 dark:group-hover:bg-amber-500/20 transition-all shrink-0">
                    <rule.icon className="w-5 h-5" />
                  </div>
                  <div className="pt-0.5">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-1.5">{rule.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{rule.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Disclaimer box */}
            <div className="mt-8 p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-500/20 text-center">
              <ShieldCheck className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200/80 font-medium leading-relaxed">
                Our system actively monitors all accounts to enforce these rules. Play fair and enjoy your rewards securely!
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
