import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  CheckCircle,
  Gift,
  Wallet,
  Trophy,
  Target,
  ShieldCheck,
  Mail,
  FileText,
  Key,
  Menu,
  X,
  LogOut,
  ChevronRight,
  User as UserIcon,
  Sun,
  Moon,
  AlertTriangle,
  Bell,
  History as HistoryIcon,
  Users,
} from "lucide-react";
import Dashboard from "./pages/Dashboard";
import CaptchaEarnings from "./pages/CaptchaEarnings";
import Rewards from "./pages/Rewards";
import Notifications from "./pages/Notifications";
import History from "./pages/History";
import Leaderboard from "./pages/Leaderboard";
import Tasks from "./pages/Tasks";
import Security from "./pages/Security";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Landing from "./pages/Landing";
import ProfileSettings from "./pages/ProfileSettings";
import Admin from "./pages/Admin";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import DailyCheckin from "./pages/DailyCheckin";
import Referrals from "./pages/Referrals";
import SocialPromo from "./pages/SocialPromo";
import { useTrustScore } from "./hooks/useTrustScore";

import { useGender } from "./hooks/useGender";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("decaptcha_theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark-mode");
      root.classList.remove("light-mode");
      localStorage.setItem("decaptcha_theme", "dark");
    } else {
      root.classList.add("light-mode");
      root.classList.remove("dark-mode");
      localStorage.setItem("decaptcha_theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={`p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center text-slate-300 hover:text-white ${className}`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-500" />
      )}
    </button>
  );
}

// Main App Layout
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { trustState, toastMessage } = useTrustScore();
  const { getAvatarUrl } = useGender();

  // Check local storage for session
  useEffect(() => {
    const session = localStorage.getItem("decaptcha_auth");
    if (session === "true") {
      setIsAuthenticated(true);
      const role = localStorage.getItem("decaptcha_role");
      if (role === "admin") setActiveTab("admin");
    }
  }, []);

  const handleUnlock = (role: "user" | "admin" = "user") => {
    localStorage.setItem("decaptcha_auth", "true");
    localStorage.setItem("decaptcha_role", role);
    setIsAuthenticated(true);
    setActiveTab(role === "admin" ? "admin" : "dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("decaptcha_auth");
    localStorage.removeItem("decaptcha_role");
    setIsAuthenticated(false);
    setActiveTab("dashboard");
  };

  if (trustState.banned) {
    return (
      <div className="min-h-screen bg-navy text-slate-100 flex flex-col items-center justify-center p-6 text-center font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-10 max-w-lg w-full rounded-3xl border border-red-500/30 bg-red-950/10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[50px] rounded-full pointer-events-none" />
          <div className="w-20 h-20 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 ring-4 ring-red-500/10">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-white">
            Account Restricted
          </h1>
          <p className="text-slate-300 mb-8 leading-relaxed">
            Your Trust Score has fallen below the allowed limit (49%) due to
            repeated mistakes or suspicious activity. Action has been taken to
            protect the platform.
          </p>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8 text-sm text-red-400">
            If you believe this is an error, please contact support for a manual
            review.
          </div>
          <div className="flex flex-col gap-3">
            <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-xl transition-all w-full">
              Appeal Review
            </button>
            <button className="bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-6 rounded-xl transition-all w-full">
              Contact Us
            </button>
            <button className="text-slate-400 hover:text-white text-sm py-2">
              Read Fair Use Policy
            </button>
          </div>
        </motion.div>
        <ThemeToggle />
      </div>
    );
  }

  if (!isAuthenticated) {
    if (["dashboard", "landing"].includes(activeTab)) {
      return (
        <>
          <Landing onLogin={handleUnlock} onNavigate={setActiveTab} />
        </>
      );
    }

    // Public pages layout
    const renderPublicPage = () => {
      switch (activeTab) {
        case "contact":
          return <Contact />;
        case "terms":
          return <Terms />;
        case "privacy":
          return <Privacy />;
        case "how-it-works":
          return <HowItWorks />;
        case "about":
          return <About />;
        default:
          return null;
      }
    };

    return (
      <div className="min-h-screen bg-navy text-slate-100 flex flex-col font-sans overflow-x-hidden selection:bg-blue-500/30">
        <header className="fixed top-0 inset-x-0 z-50 glass-panel border-x-0 border-t-0 bg-navy/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setActiveTab("landing")}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="material-symbols-outlined text-white text-[24px]">
                  fingerprint
                </span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-100 drop-shadow-sm">
                DeCaptcha
              </span>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setActiveTab("landing")}
                className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-medium transition-all"
              >
                Back to Home
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {renderPublicPage()}
        </main>
      </div>
    );
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "captcha", label: "Start Captchas", icon: CheckCircle },
    { id: "tasks", label: "Tasks & Bonus", icon: Target },
    { id: "social", label: "Social Promo", icon: Gift },
    { id: "referrals", label: "Refer & Earn", icon: Users },
    { id: "daily", label: "Daily Check-in", icon: CheckCircle },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "history", label: "History", icon: HistoryIcon },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "security", label: "Fair Play Rules", icon: ShieldCheck },
  ];

  const userRole =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("decaptcha_role") || "user"
      : "user";

  const footerLinks = [
    { id: "profile", label: "Profile Settings", icon: UserIcon },
    { id: "contact", label: "Contact Us", icon: Mail },
    { id: "terms", label: "Terms & Conditions", icon: FileText },
    { id: "privacy", label: "Privacy Policy", icon: ShieldCheck },
    ...(userRole === "admin"
      ? [{ id: "admin", label: "Admin Control", icon: AlertTriangle }]
      : []),
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard onNavigate={setActiveTab} />;
      case "captcha":
        return <CaptchaEarnings />;
      case "social":
        return <SocialPromo />;
      case "referrals":
        return <Referrals />;
      case "daily":
        return <DailyCheckin />;
      case "notifications":
        return <Notifications />;
      case "history":
        return <History />;
      case "leaderboard":
        return <Leaderboard />;
      case "tasks":
        return <Tasks onNavigate={setActiveTab} />;
      case "security":
        return <Security />;
      case "profile":
        return <ProfileSettings />;
      case "contact":
        return <Contact />;
      case "terms":
        return <Terms />;
      case "privacy":
        return <Privacy />;
      case "how-it-works":
        return <HowItWorks />;
      case "about":
        return <About />;
      case "admin":
        return <Admin />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-navy text-slate-100 flex overflow-hidden p-0 lg:p-6 lg:gap-6">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[280px] glass-panel rounded-3xl border border-glass-border p-5 flex-none z-40 relative h-[calc(100vh-3rem)] overflow-hidden shadow-2xl">
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />

        <div
          className="flex items-center gap-3 px-3 mb-8 mt-2 relative z-10 cursor-pointer"
          onClick={() => setActiveTab("dashboard")}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <span className="material-symbols-outlined text-white text-[24px]">
              fingerprint
            </span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-100">
            DeCaptcha
          </span>
        </div>

        <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto w-full pr-2 custom-scrollbar relative z-10">
          <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
            Main Menu
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all border outline-none font-medium relative group ${
                activeTab === item.id
                  ? "bg-blue-600/10 text-blue-400 border-blue-500/20 font-bold shadow-[inset_0_0_20px_rgba(37,99,235,0.05)]"
                  : "text-slate-400 hover:text-white border-transparent hover:bg-white/5 cursor-pointer"
              }`}
            >
              <item.icon
                className={`w-5 h-5 transition-colors ${activeTab === item.id ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"}`}
              />
              <span className="z-10">{item.label}</span>
              {activeTab === item.id && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                />
              )}
            </button>
          ))}

          <div className="my-4 border-t border-glass-border mx-3" />
          <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
            Support & Legal
          </div>

          {footerLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all border outline-none text-sm font-medium ${
                activeTab === item.id
                  ? "bg-white/5 text-white font-bold border-white/10"
                  : "text-slate-500 hover:text-white hover:bg-white/5 border-transparent cursor-pointer"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 relative z-10">
          <div className="bg-navy/50 p-3.5 rounded-2xl border border-glass-border mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 p-[2px] shrink-0">
              <div className="w-full h-full rounded-full bg-navy border-2 border-transparent flex items-center justify-center overflow-hidden">
                <img
                  src={getAvatarUrl()}
                  alt="User Avatar"
                  className="w-full h-full object-cover bg-white/5"
                />
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-white truncate">Solver_X</p>
              <p className="text-[10px] text-emerald-400 font-medium">
                Premium Tier
              </p>
            </div>
            <button
              onClick={() => setActiveTab("profile")}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors border border-transparent hover:border-white/10"
            >
              <UserIcon className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-3 text-red-500 hover:bg-red-500/10 hover:text-red-400 rounded-xl cursor-pointer transition-all font-bold text-sm border border-transparent hover:border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-[calc(100vh-3rem)] overflow-hidden relative">
        {/* Background ambient lighting */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-accent blur-[150px] opacity-10 pointer-events-none" />

        {/* Mobile Header */}
        <header className="lg:hidden glass-panel border-x-0 border-t-0 p-4 flex items-center justify-between z-40 sticky top-0 bg-navy/90 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 bg-white/5 rounded-lg text-slate-300 border border-white/5 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <ThemeToggle className="!p-2" />
          </div>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActiveTab("dashboard")}
          >
            <span className="text-2xl font-bold tracking-tight text-slate-100 drop-shadow-sm">
              DeCaptcha
            </span>
          </div>

          <button
            onClick={() => setActiveTab("notifications")}
            className="p-2 bg-white/5 rounded-lg text-slate-300 border border-white/5 hover:text-white relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-navy"></span>
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto w-full p-4 md:p-10 hide-scrollbar pb-24">
          <header className="hidden lg:flex items-center justify-end mb-8 max-w-6xl mx-auto gap-4">
            <ThemeToggle />
            <div
              onClick={() => setActiveTab("profile")}
              className="flex items-center gap-4 bg-white/5 backdrop-blur-md rounded-full pl-6 pr-2 py-2 border border-white/10 shadow-lg cursor-pointer hover:bg-white/10 transition-colors"
            >
              <div className="flex flex-col items-end">
                <span className="text-sm text-slate-300 font-medium">
                  Verified Status
                </span>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  Premium Tier
                </span>
              </div>
              <div className="w-12 h-12 rounded-full border border-blue-500/50 p-1 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                <div className="w-full h-full bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-lg">
                  S
                </div>
              </div>
            </div>
          </header>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            {renderContent()}
          </motion.div>
        </div>
      </main>

      {/* Toast Notification (Simple) */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className={`fixed bottom-6 left-1/2 px-6 py-3 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] font-medium z-[150] flex items-center gap-2 whitespace-nowrap 
              ${
                toastMessage.includes("reduced") ||
                toastMessage.includes("mistakes") ||
                toastMessage.includes("Slow down")
                  ? "bg-red-500 text-white shadow-red-500/30"
                  : "bg-emerald-500 text-white shadow-emerald-500/30"
              }`}
          >
            {toastMessage.includes("reduced") ||
            toastMessage.includes("mistakes") ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <CheckCircle className="w-5 h-5" />
            )}
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 w-72 glass-panel border-y-0 border-r-0 z-50 flex flex-col"
            >
              <div className="p-4 flex justify-end">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 bg-white/5 rounded-lg text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === item.id
                          ? "bg-blue-accent/15 text-blue-400 font-medium"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="my-6 border-t border-glass-border mx-2" />
                <div className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Legal & Support
                </div>

                <div className="space-y-1 mb-8">
                  {footerLinks.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm ${
                        activeTab === item.id
                          ? "text-blue-400 bg-blue-accent/10"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all font-medium mt-auto"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
