import { ShieldCheck, Lock, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { usePolicies } from '../hooks/usePolicies';

export default function Privacy() {
  const { policies } = usePolicies();

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="text-center relative py-12 glass-panel border border-slate-200 dark:border-white/10 rounded-[2rem] overflow-hidden shadow-sm bg-gradient-to-b from-emerald-50 to-white dark:from-[#0b1121]/80 dark:to-transparent">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
        <ShieldCheck className="w-16 h-16 text-emerald-500 mx-auto mb-6 relative z-10" />
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800 dark:text-white mb-4 relative z-10">
          Privacy <span className="text-emerald-500">Policy</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto px-4 relative z-10 leading-relaxed font-medium">
          We take your privacy seriously. Here is how we handle your data.
        </p>
      </div>

      <div className="bg-white/40 dark:bg-[#0b1121]/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-6 sm:p-10 rounded-[2rem] shadow-sm">
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-slate-800 dark:prose-headings:text-white prose-a:text-emerald-500 hover:prose-a:text-emerald-600 prose-strong:text-slate-800 dark:prose-strong:text-white prose-li:text-slate-600 dark:prose-li:text-slate-400 marker:text-emerald-500 prose-p:text-slate-600 dark:prose-p:text-slate-400 leading-loose prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-white/10 prose-h2:pb-3 prose-h2:mb-6">
          <ReactMarkdown>
            {policies.privacy}
          </ReactMarkdown>
        </div>
      </div>
      
      {/* Footer Banner */}
      <div className="mt-8 p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-500/20 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left justify-center">
        <Lock className="w-8 h-8 text-emerald-500 shrink-0" />
        <p className="text-sm text-emerald-800 dark:text-emerald-200/80 font-medium leading-relaxed">
          Your data is encrypted and securely stored. We prioritize your privacy above all.
        </p>
      </div>
    </div>
  );
}
