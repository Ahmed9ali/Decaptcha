import React from "react";
import { Download, Settings, Key, ArrowRight, Smartphone, ShieldCheck, Mail } from "lucide-react";

export default function GetKey() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold tracking-wide uppercase border border-blue-500/20 mb-6">
          <Key className="w-4 h-4" />
          Access Key Guide
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 mt-4">
          How to get your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Access Key</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The Decaptcha Access Key secures your earnings and synchronizes your progress across devices. Follow the steps below to find and use your strict 6-digit access key.
        </p>
      </div>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500/50 before:via-blue-500/20 before:to-transparent">
        
        {/* Step 1 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group select-none">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-navy bg-blue-500 text-white font-bold shadow-[0_0_20px_rgba(59,130,246,0.5)] z-10 shrink-0 md:order-1 md:group-odd:-ml-5 md:group-even:-mr-5 mx-0">
            1
          </div>
          <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm dark:shadow-lg dark:hover:bg-white/10 transition-colors">
            <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 border border-blue-200 dark:border-blue-500/30">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Download the App</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              First, download the Decaptcha application on your smartphone. We currently support Android devices. Register for an account to start your journey.
            </p>
            <div className="mt-4 flex gap-3">
               <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white border border-slate-300 dark:border-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-50 transition-colors text-sm font-bold text-blue-600 dark:text-blue-600 shadow-sm dark:shadow-none">
                 <Smartphone className="w-4 h-4" /> Download App
               </button>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group select-none">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-navy bg-blue-500 text-white font-bold shadow-[0_0_20px_rgba(59,130,246,0.5)] z-10 shrink-0 md:order-1 md:group-odd:-ml-5 md:group-even:-mr-5 mx-0">
            2
          </div>
          <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm dark:shadow-lg dark:hover:bg-white/10 transition-colors">
            <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 border border-emerald-200 dark:border-emerald-500/30">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Locate the Setting</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              After successful registration, open the app's settings menu. Navigate to the profile section and look for the <strong className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wide">Web Access Key</strong> option.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group select-none">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-navy bg-blue-500 text-white font-bold shadow-[0_0_20px_rgba(59,130,246,0.5)] z-10 shrink-0 md:order-1 md:group-odd:-ml-5 md:group-even:-mr-5 mx-0">
            3
          </div>
          <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm dark:shadow-lg dark:hover:bg-white/10 transition-colors">
            <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 border border-purple-200 dark:border-purple-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Copy & Paste</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Copy the unique 6-digit Web Access Key displayed in the app. Paste this key into the login modal on this website.
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group select-none">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-navy bg-blue-500 text-white font-bold shadow-[0_0_20px_rgba(59,130,246,0.5)] z-10 shrink-0 md:order-1 md:group-odd:-ml-5 md:group-even:-mr-5 mx-0">
            <ArrowRight className="w-5 h-5" />
          </div>
          <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-blue-600/20 dark:to-indigo-600/20 border border-indigo-200 dark:border-blue-500/30 backdrop-blur-md shadow-lg shadow-indigo-100 dark:shadow-[0_0_30px_rgba(59,130,246,0.15)] group-hover:shadow-xl dark:group-hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] transition-all">
            <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-blue-500/30 flex items-center justify-center text-indigo-600 dark:text-blue-300 mb-4 border border-indigo-200 dark:border-blue-400/50">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-indigo-900 dark:text-white mb-2">Access Granted</h3>
            <p className="text-indigo-800 dark:text-blue-100/70 text-sm leading-relaxed">
              Once the key is validated, your secure login is processed immediately and you can start earning on the web dashboard.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center border-t border-slate-200 dark:border-white/10 pt-10">
        <p className="text-slate-600 dark:text-slate-400 mb-6 font-medium">Need more help finding your key?</p>
        <button className="px-6 py-3 rounded-xl bg-slate-800 dark:bg-white/5 border border-slate-700 dark:border-white/10 hover:bg-slate-700 dark:hover:bg-white/10 text-white font-bold transition-colors inline-flex items-center gap-2 shadow-sm dark:shadow-none">
           <Mail className="w-5 h-5" /> Contact Support
        </button>
      </div>

    </div>
  );
}
