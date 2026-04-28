import React, { useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  Users,
  Download,
  Activity,
  Ban,
  RotateCcw,
  DollarSign,
  Wallet,
  Settings,
  Bell,
  ChevronRight,
  CheckCircle,
  Edit3,
  Gift,
  PlusCircle,
  Trash2,
  Trophy,
  Star,
  FileText,
  HelpCircle,
  MessageSquare,
  Clock
} from "lucide-react";
import { useSocialPromos } from "../hooks/useSocialPromos";
import { useLeaderboard } from "../hooks/useLeaderboard";
import { usePolicies } from "../hooks/usePolicies";
import { useFaqs, Faq } from "../hooks/useFaqs";
import { useMessages, Message } from "../hooks/useMessages";
import { motion } from "motion/react";

export default function Admin() {
  const { tasks, addTask, removeTask } = useSocialPromos();
  const { xpConfig, setXpConfig, rewardsConfig, setRewardsConfig, forceReset } = useLeaderboard();
  const { policies, updatePolicies } = usePolicies();
  const { faqs, addFaq, updateFaq, deleteFaq } = useFaqs();
  const { messages, markAsRead, deleteMessage } = useMessages();

  const [rewardAmount, setRewardAmount] = useState("0.0001");
  const [dailyLimit, setDailyLimit] = useState("10000");
  const [banThreshold, setBanThreshold] = useState("49");

  const [localXpConfig, setLocalXpConfig] = useState(xpConfig);
  const [localRewardsConfig, setLocalRewardsConfig] = useState(rewardsConfig);
  const [localPolicies, setLocalPolicies] = useState({ terms: policies.terms, privacy: policies.privacy });
  
  const [activeTab, setActiveTab] = useState('overview');
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    url: "",
    secretCode: "",
    rewardPoints: 50,
    type: "youtube" as const,
  });

  const handleAddTask = () => {
    if (!newTask.title || !newTask.url || !newTask.secretCode) {
      alert("Please fill in title, url, and secret code.");
      return;
    }
    addTask(newTask);
    setNewTask({
      title: "",
      description: "",
      url: "",
      secretCode: "",
      rewardPoints: 50,
      type: "youtube",
    });
  };

  const handleSaveXpRewards = () => {
    setXpConfig(localXpConfig);
    setRewardsConfig(localRewardsConfig);
    alert("XP and Rewards configuration saved successfully!");
  };

  const handleSavePolicies = () => {
    updatePolicies(localPolicies);
    alert("Policies saved successfully!");
  };

  const handleAddFaq = () => {
    if (!newFaq.question || !newFaq.answer) {
      alert("Please fill in both question and answer.");
      return;
    }
    addFaq(newFaq);
    setNewFaq({ question: "", answer: "" });
  };

  const overallStats = [
    {
      title: "Total Users",
      value: "14,239",
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      title: "Total Earnings",
      value: "$84,291.50",
      icon: DollarSign,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      title: "Total Withdrawals",
      value: "$61,420.00",
      icon: Wallet,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      title: "Active Bans",
      value: "342",
      icon: Ban,
      color: "text-red-400",
      bg: "bg-red-400/10",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-6rem)] gap-8">
      {/* Admin Sidebar */}
      <div className="lg:w-64 shrink-0 space-y-2">
        <div className="mb-6 px-4">
          <h1 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Workspace</h1>
          <p className="text-xs font-semibold text-emerald-500 flex items-center gap-2 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            System Online
          </p>
        </div>

        {[
          { id: 'overview', label: 'Overview', icon: Activity },
          { id: 'tasks', label: 'Tasks', icon: Gift },
          { id: 'economy', label: 'Economy', icon: DollarSign },
          { id: 'content', label: 'Content', icon: FileText },
          { id: 'messages', label: 'Messages', icon: MessageSquare, badge: messages.filter(m => !m.read).length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all font-bold text-sm ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </div>
            {tab.badge ? (
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                activeTab === tab.id 
                  ? 'bg-white/20 dark:bg-black/20' 
                  : 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400'
              }`}>
                {tab.badge}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {/* Admin Content Area */}
      <div className="flex-1 min-w-0 space-y-8">
        
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Top Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {overallStats.map((stat, i) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/60 dark:bg-[#0b1121]/60 backdrop-blur-xl p-5 rounded-2xl flex items-center justify-between border border-slate-200 dark:border-white/10 shadow-sm"
                >
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 font-bold uppercase tracking-wider">{stat.title}</p>
                    <h3 className="text-2xl font-black font-mono text-slate-800 dark:text-white">{stat.value}</h3>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} shadow-sm`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Configuration Settings */}
              <div className="bg-white/60 dark:bg-[#0b1121]/60 backdrop-blur-xl p-8 rounded-3xl space-y-6 shadow-sm border border-slate-200 dark:border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold flex items-center gap-3 text-slate-800 dark:text-white">
                    <div className="p-2.5 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl">
                      <Settings className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    Platform Limits
                  </h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                      Text Captcha Reward ($)
                    </label>
                    <div className="relative">
                      <DollarSign className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                      <input
                        type="text"
                        value={rewardAmount}
                        onChange={(e) => setRewardAmount(e.target.value)}
                        className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 font-mono shadow-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                        Daily Verification Limit
                      </label>
                      <input
                        type="text"
                        value={dailyLimit}
                        onChange={(e) => setDailyLimit(e.target.value)}
                        className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 font-mono shadow-sm transition-all"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                        Auto-Ban Threshold (%)
                      </label>
                      <input
                        type="text"
                        value={banThreshold}
                        onChange={(e) => setBanThreshold(e.target.value)}
                        className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 font-mono shadow-sm transition-all"
                      />
                    </div>
                  </div>

                  <button className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex justify-center items-center gap-2 mt-6 active:scale-[0.98]">
                    <CheckCircle className="w-4 h-4" /> Save Settings
                  </button>
                </div>
              </div>

              {/* Trust Score Warnings / Logs */}
              <div className="bg-white/60 dark:bg-[#0b1121]/60 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-white/10 flex flex-col min-h-[400px]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-3 text-slate-800 dark:text-white">
                    <div className="p-2.5 bg-red-100 dark:bg-red-500/20 rounded-xl">
                      <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    Security Logs
                  </h2>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                  {[
                    { user: 'user_3892', time: '2m ago', msg: 'Banned: Score dropped to 48%.',  bg: 'bg-red-50 dark:bg-red-500/10', border: 'border-red-100 dark:border-red-500/20', text: 'text-red-600 dark:text-red-400' },
                    { user: 'user_1021', time: '14m ago', msg: 'Warning: Fast solves (0.8s avg).', bg: 'bg-orange-50 dark:bg-orange-500/10', border: 'border-orange-100 dark:border-orange-500/20', text: 'text-orange-600 dark:text-orange-400' },
                    { user: 'user_8829', time: '1h ago', msg: 'Flagged: High mistake ratio (40%).', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-100 dark:border-amber-500/20', text: 'text-amber-600 dark:text-amber-400' }
                  ].map((log, i) => (
                    <div key={i} className={`p-4 ${log.bg} border ${log.border} rounded-2xl text-sm`}>
                      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-2 font-mono font-bold">
                        <span>{log.user}</span>
                        <span>{log.time}</span>
                      </div>
                      <div className={`${log.text} font-bold text-sm`}>
                        {log.msg}
                      </div>
                    </div>
                  ))}
                </div>

                <button className="flex items-center justify-center gap-2 mt-4 px-4 py-3.5 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl w-full text-sm font-bold transition-colors text-slate-700 dark:text-slate-300 active:scale-95">
                  <Download className="w-4 h-4" /> Export Logs
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'economy' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* XP and Rewards Config */}
            <div className="bg-white/60 dark:bg-[#0b1121]/60 backdrop-blur-xl p-8 rounded-3xl space-y-6 shadow-sm border border-slate-200 dark:border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold flex items-center gap-3 text-slate-800 dark:text-white">
                  <div className="p-2.5 bg-orange-100 dark:bg-orange-500/20 rounded-xl">
                    <Star className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                  </div>
                  Economy & Rewards Settings
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* XP Settings */}
                <div className="space-y-5">
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-white/5"><Activity className="w-4 h-4 text-orange-500" /> XP Values</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Captcha XP</label>
                      <input
                        type="number"
                        value={localXpConfig.textCaptcha}
                        onChange={(e) => setLocalXpConfig({...localXpConfig, textCaptcha: parseInt(e.target.value) || 0})}
                        className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-3 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500 font-mono shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Daily Login</label>
                      <input
                        type="number"
                        value={localXpConfig.dailyLogin}
                        onChange={(e) => setLocalXpConfig({...localXpConfig, dailyLogin: parseInt(e.target.value) || 0})}
                        className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-3 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500 font-mono shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Streak Bonus</label>
                      <input
                        type="number"
                        value={localXpConfig.streak}
                        onChange={(e) => setLocalXpConfig({...localXpConfig, streak: parseInt(e.target.value) || 0})}
                        className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-3 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500 font-mono shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Promo XP</label>
                      <input
                        type="number"
                        value={localXpConfig.promo}
                        onChange={(e) => setLocalXpConfig({...localXpConfig, promo: parseInt(e.target.value) || 0})}
                        className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-3 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-orange-500 font-mono shadow-sm"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Rewards Settings */}
                <div className="space-y-5">
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-white/5"><Trophy className="w-4 h-4 text-emerald-500" /> Weekly Pool</h3>
                  
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-black/20 p-2.5 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400 font-black flex items-center justify-center shrink-0">#1</div>
                      <input
                        type="text"
                        value={localRewardsConfig.rank1}
                        onChange={(e) => setLocalRewardsConfig({...localRewardsConfig, rank1: e.target.value})}
                        className="w-full bg-transparent border-none text-sm text-slate-800 dark:text-white focus:outline-none font-mono placeholder:text-slate-400"
                      />
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-black/20 p-2.5 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-600 dark:bg-slate-500/20 dark:text-slate-300 font-black flex items-center justify-center shrink-0">#2</div>
                      <input
                        type="text"
                        value={localRewardsConfig.rank2}
                        onChange={(e) => setLocalRewardsConfig({...localRewardsConfig, rank2: e.target.value})}
                        className="w-full bg-transparent border-none text-sm text-slate-800 dark:text-white focus:outline-none font-mono placeholder:text-slate-400"
                      />
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-black/20 p-2.5 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 font-black flex items-center justify-center shrink-0">#3</div>
                      <input
                        type="text"
                        value={localRewardsConfig.rank3}
                        onChange={(e) => setLocalRewardsConfig({...localRewardsConfig, rank3: e.target.value})}
                        className="w-full bg-transparent border-none text-sm text-slate-800 dark:text-white focus:outline-none font-mono placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                </div>
                
              </div>
            
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-white/5">
                <button onClick={handleSaveXpRewards} className="flex-[2] bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex justify-center items-center gap-2 active:scale-[0.98]">
                    <CheckCircle className="w-4 h-4" /> Save Economy Config
                </button>
                <button onClick={() => { if(window.confirm('Are you sure you want to end the week early and distribute rewards? This cannot be undone.')) { forceReset(); alert('Leaderboard Reset and Rewards Distributed!'); } }} className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-500/10 dark:hover:bg-red-500/20 dark:text-red-400 border border-red-200 dark:border-red-500/30 font-bold py-3.5 px-4 rounded-xl transition-all flex justify-center items-center gap-2 active:scale-[0.98]">
                    <RotateCcw className="w-4 h-4" /> Trigger Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

        {activeTab === 'tasks' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Manage Social Promo Tasks */}
            <div className="bg-white/60 dark:bg-[#0b1121]/60 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <h2 className="text-xl font-bold flex items-center gap-3 text-slate-800 dark:text-white">
                  <div className="p-2.5 bg-pink-100 dark:bg-pink-500/20 rounded-xl">
                    <Gift className="w-5 h-5 text-pink-600 dark:text-pink-400" /> 
                  </div>
                  Manage Social Tasks
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Add Task Form */}
                <div className="md:col-span-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl p-6 space-y-4 h-fit shadow-sm">
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-white/5 pb-2 mb-4">Create New Task</h3>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-3 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-pink-500 transition-colors shadow-sm"
                      placeholder="E.g., Watch YouTube Video"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={newTask.description}
                      onChange={(e) =>
                        setNewTask({ ...newTask, description: e.target.value })
                      }
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-3 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-pink-500 transition-colors shadow-sm"
                      placeholder="Find the secret code..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                      Link URL
                    </label>
                    <input
                      type="text"
                      value={newTask.url}
                      onChange={(e) =>
                        setNewTask({ ...newTask, url: e.target.value })
                      }
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-3 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-pink-500 transition-colors shadow-sm"
                      placeholder="https://"
                    />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-[3]">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                        Secret Code
                      </label>
                      <input
                        type="text"
                        value={newTask.secretCode}
                        onChange={(e) =>
                          setNewTask({ ...newTask, secretCode: e.target.value })
                        }
                        className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-3 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-pink-500 font-mono transition-colors shadow-sm"
                        placeholder="CODE123"
                      />
                    </div>
                    <div className="flex-[2]">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                        Reward (Pts)
                      </label>
                      <input
                        type="number"
                        value={newTask.rewardPoints}
                        onChange={(e) =>
                          setNewTask({
                            ...newTask,
                            rewardPoints: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-3 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-pink-500 font-mono transition-colors shadow-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                      Task Type
                    </label>
                    <select
                      value={newTask.type}
                      onChange={(e) =>
                        setNewTask({ ...newTask, type: e.target.value as any })
                      }
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-3 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-pink-500 transition-colors cursor-pointer shadow-sm"
                    >
                      <option value="youtube">YouTube</option>
                      <option value="facebook">Facebook</option>
                      <option value="telegram">Telegram</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <button
                    onClick={handleAddTask}
                    className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-bold py-3 rounded-xl transition-all shadow-md flex justify-center items-center gap-2 mt-6 active:scale-[0.98]"
                  >
                    <PlusCircle className="w-4 h-4" /> Add Task
                  </button>
                </div>

                {/* Active Tasks List */}
                <div className="md:col-span-3 space-y-4">
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-white/5 pb-2">Active Tasks</h3>
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {tasks.length === 0 ? (
                      <div className="text-center py-12 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 border-dashed">
                        <Gift className="w-8 h-8 text-slate-400 mx-auto mb-3 opacity-50" />
                        <p className="text-slate-500 dark:text-slate-400 text-sm">No tasks created yet.</p>
                      </div>
                    ) : (
                      tasks.map((task) => (
                        <div
                          key={task.id}
                          className="bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-pink-500/30 shadow-sm transition-colors group"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-bold text-slate-800 dark:text-white truncate">
                                {task.title}
                              </h4>
                              <span className="shrink-0 text-[10px] font-bold bg-pink-100 dark:bg-pink-500/10 border border-pink-200 dark:border-pink-500/20 px-2 py-0.5 rounded-md text-pink-600 dark:text-pink-400 uppercase tracking-widest">
                                {task.type}
                              </span>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 truncate">{task.url}</p>
                            <div className="flex flex-wrap gap-3 text-xs bg-slate-50 dark:bg-black/40 p-2.5 rounded-lg border border-slate-200 dark:border-white/5 font-mono inline-flex">
                              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                Code: <span className="text-slate-700 dark:text-slate-300 font-bold bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded">{task.secretCode}</span>
                              </span>
                              <div className="w-px h-4 bg-slate-300 dark:bg-white/10"></div>
                              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                Reward: <span className="text-slate-700 dark:text-slate-300 font-bold bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded">{task.rewardPoints} Pts</span>
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeTask(task.id)}
                            className="shrink-0 w-10 h-10 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white rounded-xl transition-all border border-red-100 dark:border-red-500/20 active:scale-95"
                            title="Delete Task"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Policy Settings */}
            <div className="bg-white/60 dark:bg-[#0b1121]/60 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-white/10">
              <div className="flex items-center justify-between mb-8 gap-4">
                <h2 className="text-xl font-bold flex items-center gap-3 text-slate-800 dark:text-white">
                  <div className="p-2.5 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  Policy Management
                </h2>
                <button
                  onClick={handleSavePolicies}
                  className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md flex justify-center items-center gap-2 active:scale-95"
                >
                  <CheckCircle className="w-4 h-4" /> Save Policies
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-500" /> Terms & Conditions (Markdown)
                  </label>
                  <textarea
                    value={localPolicies.terms}
                    onChange={(e) => setLocalPolicies({ ...localPolicies, terms: e.target.value })}
                    rows={12}
                    className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 font-mono shadow-sm transition-colors resize-y custom-scrollbar"
                  />
                </div>
                <div className="space-y-4">
                  <label className="block font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-500" /> Privacy Policy (Markdown)
                  </label>
                  <textarea
                    value={localPolicies.privacy}
                    onChange={(e) => setLocalPolicies({ ...localPolicies, privacy: e.target.value })}
                    rows={12}
                    className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 font-mono shadow-sm transition-colors resize-y custom-scrollbar"
                  />
                </div>
              </div>
            </div>

            {/* FAQ Management */}
            <div className="bg-white/60 dark:bg-[#0b1121]/60 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-white/10">
              <div className="flex items-center justify-between mb-8 gap-4">
                <h2 className="text-xl font-bold flex items-center gap-3 text-slate-800 dark:text-white">
                  <div className="p-2.5 bg-blue-100 dark:bg-blue-500/20 rounded-xl">
                    <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  FAQ Management
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add new FAQ */}
                <div className="lg:col-span-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl p-6 space-y-4 h-fit shadow-sm">
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 pb-2 mb-4 border-b border-slate-200 dark:border-white/5">Add New FAQ</h3>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                      Question
                    </label>
                    <input
                      type="text"
                      value={newFaq.question}
                      onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-3 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
                      placeholder="e.g. How do I withdraw?"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">
                      Answer
                    </label>
                    <textarea
                      value={newFaq.answer}
                      onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                      rows={4}
                      className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-3 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-blue-500 transition-colors shadow-sm resize-y"
                      placeholder="e.g. You can withdraw by..."
                    />
                  </div>
                  <button
                    onClick={handleAddFaq}
                    className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-bold py-3 rounded-xl transition-all shadow-md flex justify-center items-center gap-2 mt-4 active:scale-[0.98]"
                  >
                    <PlusCircle className="w-4 h-4" /> Add FAQ
                  </button>
                </div>

                {/* Existing FAQs */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 pb-2 border-b border-slate-200 dark:border-white/5">Existing FAQs</h3>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {faqs.length === 0 ? (
                          <div className="text-center py-12 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 border-dashed">
                              <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-3 opacity-50" />
                              <p className="text-slate-500 dark:text-slate-400 text-sm">No FAQs found.</p>
                          </div>
                      ) : (
                          faqs.map((faq) => (
                              <div key={faq.id} className="bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl p-5 shadow-sm group">
                                  <div className="flex justify-between items-start gap-4 mb-2">
                                      <h4 className="font-bold text-slate-800 dark:text-white">{faq.question}</h4>
                                      <button 
                                          onClick={() => deleteFaq(faq.id)}
                                          className="text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 p-2 rounded-lg transition-colors border border-red-100 dark:border-red-500/20 md:opacity-0 md:group-hover:opacity-100 shrink-0"
                                      >
                                          <Trash2 className="w-4 h-4" />
                                      </button>
                                  </div>
                                  <p className="text-slate-600 dark:text-slate-400 text-sm whitespace-pre-wrap">{faq.answer}</p>
                              </div>
                          ))
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Contact Messages */}
            <div className="bg-white/60 dark:bg-[#0b1121]/60 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-white/10 flex flex-col h-[calc(100vh-10rem)]">
              <div className="flex items-center justify-between mb-8 gap-4">
                <h2 className="text-xl font-bold flex items-center gap-3 text-slate-800 dark:text-white">
                  <div className="p-2.5 bg-purple-100 dark:bg-purple-500/20 rounded-xl relative">
                    <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    {messages.filter(m => !m.read).length > 0 && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white dark:border-[#0b1121] rounded-full animate-bounce"></span>
                    )}
                  </div>
                  User Messages
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                  {messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-500">
                          <MessageSquare className="w-12 h-12 mb-4 opacity-50" />
                          <p>No messages received yet.</p>
                      </div>
                  ) : (
                      messages.slice().reverse().map(msg => (
                          <div 
                              key={msg.id} 
                              className={`bg-white dark:bg-black/20 border rounded-2xl p-6 transition-all shadow-sm ${
                                  msg.read 
                                  ? 'border-slate-200 dark:border-white/10 opacity-75' 
                                  : 'border-purple-200 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/5'
                              }`}
                          >
                              <div className="flex justify-between items-start mb-4 gap-4">
                                  <div>
                                      <div className="flex items-center gap-3 mb-1">
                                          <h4 className="font-bold text-slate-800 dark:text-white text-lg">{msg.name}</h4>
                                          {!msg.read && (
                                              <span className="bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-purple-200 dark:border-purple-500/30">New</span>
                                          )}
                                      </div>
                                      <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">{msg.email}</p>
                                  </div>
                                  <div className="text-xs text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5 bg-slate-50 dark:bg-white/5 py-1 px-3 rounded-lg border border-slate-100 dark:border-white/5">
                                      <Clock className="w-3.5 h-3.5" />
                                      {new Date(msg.date).toLocaleString()}
                                  </div>
                              </div>
                              <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 mb-4 shadow-inner">
                                  <p className="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                              </div>
                              <div className="flex justify-end gap-3 pt-2">
                                  {!msg.read && (
                                      <button 
                                          onClick={() => markAsRead(msg.id)}
                                          className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-500/10 dark:border-blue-500/20 dark:hover:bg-blue-500/20 px-4 py-2.5 rounded-xl transition-colors"
                                      >
                                          <CheckCircle className="w-4 h-4" /> Mark as Read
                                      </button>
                                  )}
                                  <button 
                                      onClick={() => {
                                          if (window.confirm('Are you sure you want to delete this message?')) {
                                              deleteMessage(msg.id);
                                          }
                                      }}
                                      className="flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 dark:text-red-400 dark:bg-red-500/10 dark:border-red-500/20 dark:hover:bg-red-500/20 px-4 py-2.5 rounded-xl transition-colors"
                                  >
                                      <Trash2 className="w-4 h-4" /> Delete
                                  </button>
                              </div>
                          </div>
                      ))
                  )}
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
