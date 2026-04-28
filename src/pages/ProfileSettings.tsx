import {
  User,
  Mail,
  Key,
  CheckCircle,
  Copy,
  Eye,
  EyeOff,
  Download,
  Smartphone
} from "lucide-react";
import { useState } from "react";

export default function ProfileSettings() {
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [showAccessKey, setShowAccessKey] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);

  const handleCopy = () => {
    const key =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("decaptcha_role") === "admin"
          ? "Administrator"
          : "1234"
        : "1234";
    navigator.clipboard.writeText(key);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const handleSave = () => {
    setSaveStatus("Saving...");
    setTimeout(() => {
      setSaveStatus("Settings saved successfully");
      setTimeout(() => setSaveStatus(null), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
          <User className="w-8 h-8 text-slate-600 dark:text-slate-300" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white mb-1">
            Profile Settings
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage your account preferences and security.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Form Content */}
        <div className="md:col-span-12 space-y-6">
          <div className="bg-white/40 dark:bg-[#0b1121]/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-6 sm:p-8 rounded-[2rem] shadow-sm">
            <h3 className="text-xl font-bold mb-6 border-b border-slate-200 dark:border-white/10 pb-4 text-slate-800 dark:text-white">
              Account Information
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Display Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    defaultValue="Alex H."
                    className="w-full bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 pl-11 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                  />
                  <User className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                </div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-500" /> 
                  The name saved here will be shown in the dashboard.
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    defaultValue="alex@example.com"
                    className="w-full bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 pl-11 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
                  />
                  <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                </div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-2">
                  Email is used for withdrawal notifications only.
                </p>
              </div>

              <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white mb-1">Make a Withdrawal</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Download the mobile app to make a withdrawal.</p>
                  </div>
                </div>
                <button className="whitespace-nowrap px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2 shadow-sm w-full sm:w-auto justify-center">
                  <Download className="w-4 h-4" /> Download App
                </button>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-white/10">
                <div className="flex justify-between items-start md:items-center mb-4 flex-col md:flex-row gap-4">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white mb-1">
                      Your Access Key
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Use this key to securely log in to your account.
                    </p>
                  </div>
                  <div className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-500 dark:text-slate-400">
                    Cannot generate new key
                  </div>
                </div>

                <div className="relative mt-2">
                  <input
                    type={showAccessKey ? "text" : "password"}
                    readOnly
                    value={
                      typeof localStorage !== "undefined"
                        ? localStorage.getItem("decaptcha_role") === "admin"
                          ? "Administrator"
                          : "1234"
                        : "1234"
                    }
                    className="w-full bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 pl-11 pr-24 text-slate-800 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all shadow-sm selection:bg-blue-500/30"
                  />
                  <Key className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
                  <div className="absolute right-2 top-2 flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-white/10 shadow-sm">
                    <button
                      onClick={handleCopy}
                      className="text-slate-500 hover:text-slate-800 dark:hover:text-white p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                    >
                      {copyStatus ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <div className="w-px h-4 bg-slate-200 dark:bg-white/10 mx-0.5" />
                    <button
                      onClick={() => setShowAccessKey(!showAccessKey)}
                      className="text-slate-500 hover:text-slate-800 dark:hover:text-white p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                    >
                      {showAccessKey ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-emerald-500 md:text-emerald-500 flex items-center gap-2">
              {saveStatus === "Settings saved successfully" && (
                <>
                  <CheckCircle className="w-4 h-4" /> {saveStatus}
                </>
              )}
              {saveStatus === "Saving..." && (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin" />{" "}
                  Saving...
                </>
              )}
            </div>
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-[0_4px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 transition-all w-full sm:w-auto"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
