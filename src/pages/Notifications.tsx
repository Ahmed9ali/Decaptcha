import React, { useState } from "react";
import {
  Bell,
  CheckCircle,
  Zap,
  ShieldAlert,
  Gift,
  Star,
  Clock,
} from "lucide-react";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "reward",
    title: "Withdrawal Processed",
    message:
      "Your withdrawal of $5.00 has been sent to your FaucetPay account successfully.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "alert",
    title: "Suspicious Activity Warning",
    message:
      "We detected multiple fast solves. Please ensure you are solving captchas manually.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "system",
    title: "New Reward Rates",
    message:
      "Text captcha base reward has been increased temporarily. Solve now!",
    time: "1 day ago",
    read: true,
  },
  {
    id: 4,
    type: "reward",
    title: "Daily Streak Bonus",
    message: "You kept your streak! 100 PTS have been added to your balance.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 5,
    type: "system",
    title: "Maintenance Upcoming",
    message:
      "Scheduled maintenance this weekend. The app will be down for 2 hours.",
    time: "3 days ago",
    read: true,
  },
];

export default function Notifications() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const getIcon = (type: string) => {
    switch (type) {
      case "reward":
        return <Gift className="w-5 h-5 text-emerald-400" />;
      case "alert":
        return <ShieldAlert className="w-5 h-5 text-red-400" />;
      case "system":
        return <Zap className="w-5 h-5 text-blue-400" />;
      default:
        return <Bell className="w-5 h-5 text-slate-400" />;
    }
  };

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const filtered = notifications.filter((n) => {
    if (activeFilter === "all") return true;
    return n.type === activeFilter;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Bell className="w-6 h-6 text-blue-400" /> Notifications
          </h1>
          <p className="text-slate-400 mt-1">
            Stay updated with your account activity.
          </p>
        </div>
        <button
          onClick={markAllRead}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
        >
          <CheckCircle className="w-4 h-4" /> Mark all as read
        </button>
      </div>

      <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5 w-max">
        {["all", "reward", "alert", "system"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              activeFilter === filter
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((note) => (
            <div
              key={note.id}
              className={`bg-white/40 dark:bg-[#0b1121]/40 backdrop-blur-xl p-4 rounded-2xl flex items-center gap-4 transition-all border shadow-sm hover:shadow-md cursor-pointer group ${!note.read ? "border-blue-500/30 dark:border-blue-500/30 bg-blue-50/50 dark:bg-blue-900/20" : "border-slate-200 dark:border-white/10"}`}
            >
              <div className={`p-2.5 rounded-xl shrink-0 ${!note.read ? 'bg-white dark:bg-blue-500/20 shadow-sm' : 'bg-slate-100 dark:bg-white/5'}`}>
                {getIcon(note.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3
                    className={`font-bold text-sm sm:text-base truncate ${!note.read ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}
                  >
                    {note.title}
                  </h3>
                  <span className="text-slate-300 dark:text-slate-600 hidden sm:block">•</span>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate hidden sm:block">
                    {note.message}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate sm:hidden mb-1.5">
                  {note.message}
                </p>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5 mt-0.5">
                   <Clock className="w-3 h-3" /> {note.time}
                </span>
              </div>
              {!note.read && (
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-20 px-4 glass-panel border border-glass-border border-dashed rounded-3xl">
            <Bell className="w-12 h-12 text-slate-600 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-slate-300 mb-2">
              You're all caught up!
            </h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              No new notifications for this category. Check back later for
              updates and rewards.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
