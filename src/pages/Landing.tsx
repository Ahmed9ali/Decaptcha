import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Key,
  ChevronRight,
  Menu,
  X,
  ShieldCheck,
  Zap,
  Coins,
  ArrowRight,
  CheckCircle,
  FileText,
  Image as ImageIcon,
  Headphones,
  Calculator,
  SlidersHorizontal,
  Blocks,
  Gift,
  Users,
  Wallet,
  Star,
  ChevronDown,
  MessageSquare,
  Mail,
} from "lucide-react";

import { ThemeToggle } from "../App";

export default function Landing({
  onLogin,
  onNavigate,
}: {
  onLogin: (role?: "user" | "admin") => void;
  onNavigate: (page: string) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShake(false);

    setTimeout(() => {
      if (accessKey === "1234") {
        onLogin("user");
      } else if (accessKey === "Administrator") {
        onLogin("admin");
      } else {
        setError("Invalid Access Key");
        setShake(true);
        setLoading(false);
        setTimeout(() => setShake(false), 500);
      }
    }, 800);
  };

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Rewards", href: "#rewards" },
  ];

  return (
    <div className="min-h-screen bg-navy text-slate-100 flex flex-col font-sans overflow-x-hidden selection:bg-blue-500/30">
      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-50 glass-panel border-x-0 border-t-0 bg-navy/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="material-symbols-outlined text-white text-[24px]">
                fingerprint
              </span>
            </div>
            <span className="text-2xl font-bold tracking-tight">DeCaptcha</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="h-6 w-px bg-glass-border"></div>
            <ThemeToggle className="w-10 h-10 rounded-xl" />
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-medium transition-all border border-white/5 flex items-center gap-2"
            >
              <Key className="w-4 h-4" />
              Access Dashboard
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle className="w-10 h-10 rounded-lg" />
            <button
              className="p-2 text-slate-300 bg-white/5 rounded-lg border border-white/5"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy/90 backdrop-blur-md z-50 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-navy-light border-l border-glass-border z-50 p-6 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-xl font-bold">Menu</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2bg-white/5 rounded-lg text-slate-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-4 flex-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
              <div className="pt-6 border-t border-glass-border mt-auto">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowLoginModal(true);
                  }}
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 flex justify-center items-center gap-2"
                >
                  <Key className="w-5 h-5" />
                  Access Dashboard
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-navy/80 backdrop-blur-md z-[60] flex items-center justify-center p-4"
              onClick={() => setShowLoginModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className={`glass-panel w-full max-w-md p-8 rounded-3xl relative flex flex-col items-center bg-navy ${shake ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
              >
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-6 ring-1 ring-blue-500/50 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                  <span className="material-symbols-outlined text-blue-400 text-[32px]">
                    fingerprint
                  </span>
                </div>

                <h2 className="text-2xl font-bold mb-2 tracking-tight">
                  Enter Access Key
                </h2>
                <p
                  className="text-slate-400 text-sm mb-8 text-center"
                  style={{ minHeight: "40px" }}
                >
                  {loading && accessKey === "Administrator"
                    ? "Verifying admin credentials. Establishing secure connection..."
                    : "Solve Captchas. Earn Rewards. Fast & Secure."}
                </p>

                <form onSubmit={handleUnlock} className="w-full space-y-4">
                  <div className="relative">
                    <input
                      type="password"
                      value={accessKey}
                      onChange={(e) => setAccessKey(e.target.value)}
                      placeholder="Enter key or admin access"
                      className={`w-full bg-navy-light/50 border ${error ? "border-red-500/50" : "border-glass-border"} rounded-xl px-4 py-4 pl-12 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-accent transition-all`}
                      autoFocus
                      disabled={loading}
                    />
                    <Key className="w-5 h-5 text-slate-500 absolute left-4 top-4.5" />
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 text-sm text-center font-medium"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all flex justify-center items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Unlock Now
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <main className="flex-1 pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-8 min-h-screen">
        <div className="flex-1 text-center lg:text-left z-10 w-full relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Now Accepting New Solvers
          </motion.div>
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
          >
            Turn your free time into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              real rewards.
            </span>
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
          >
            Join the premium captcha-solving platform. We offer the highest
            rates, instant crypto payouts, and a seamless mobile-first
            experience.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <button
              onClick={() => setShowLoginModal(true)}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-2 text-lg"
            >
              Start Earning Now
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#features"
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] text-slate-200 hover:text-white font-medium py-4 px-8 rounded-xl border border-glass-border hover:border-white/30 transition-all text-center text-lg"
            >
              Learn More
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 font-medium"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Fast
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> 0% Fees
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Anonymous
            </div>
          </motion.div>
        </div>

        <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
          {/* Abstract heroic visual */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-1/4 right-1/4 w-[50%] h-[50%] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
          >
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
              <div>
                <p className="text-slate-400 text-sm mb-1">Today's Earnings</p>
                <div className="text-4xl font-bold text-emerald-400 font-mono">
                  $18.45
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Coins className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold">Text Captcha</div>
                    <div className="text-xs text-slate-400">2s avg time</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-400">+$0.02</div>
                  <div className="text-xs text-slate-500">Just now</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold">Image Match</div>
                    <div className="text-xs text-slate-400">5s avg time</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-400">+$0.05</div>
                  <div className="text-xs text-slate-500">2 min ago</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <SlidersHorizontal className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold">Slider Captcha</div>
                    <div className="text-xs text-slate-400">3s avg time</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-400">+$0.03</div>
                  <div className="text-xs text-slate-500">5 min ago</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl text-center shadow-lg shadow-blue-600/20">
                Keep Earning
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Live Earnings Ticker */}
      <div className="w-full bg-blue-600/10 border-y border-blue-500/20 overflow-hidden py-3 relative flex items-center">
        <div className="absolute left-0 w-20 h-full bg-gradient-to-r from-navy to-transparent z-10" />
        <div className="absolute right-0 w-20 h-full bg-gradient-to-l from-navy to-transparent z-10" />
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex whitespace-nowrap gap-12 items-center text-sm font-medium"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />{" "}
                User29** earned{" "}
                <span className="text-emerald-400 font-bold">$0.05</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />{" "}
                User78** completed{" "}
                <span className="text-blue-400 font-bold">Audio Captcha</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />{" "}
                User45** withdrew{" "}
                <span className="text-purple-400 font-bold">$5.00</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />{" "}
                New referral joined{" "}
                <span className="text-orange-400 font-bold">User99**</span>
              </div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Trust Stats Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10+</div>
              <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">
                Captcha Types
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">Fast</div>
              <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">
                Rewards
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">
                Secure Withdrawals
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">
                Anti-Cheat Protection
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium section removed */}

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-24 bg-navy-light/30 border-y border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Get started in seconds. No complex registration required.
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-glass-border -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {[
                {
                  step: "01",
                  title: "Enter Access Key",
                  desc: "Use a unique access key to instantly securely unlock your personal dashboard.",
                  icon: Key,
                },
                {
                  step: "02",
                  title: "Solve Captchas & Tasks",
                  desc: "Choose from multiple challenge types and complete tasks to earn rewards.",
                  icon: Zap,
                },
                {
                  step: "03",
                  title: "Earn Rewards & Withdraw",
                  desc: "Watch your balance grow and withdraw directly to your preferred wallet.",
                  icon: Wallet,
                },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 border-4 border-navy flex items-center justify-center text-white mb-6 shadow-xl shadow-blue-600/20">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <div className="text-blue-400 font-bold mb-2 uppercase tracking-widest text-xs">
                    Step {s.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p className="text-slate-400">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security & Fair Play section */}
      <section className="py-24 border-y border-white/5 relative overflow-hidden bg-red-900/10">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-red-500/5 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Security & Fair Play
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
                To maintain high payout rates globally, our platform strictly
                enforces fair-play rules using advanced heuristics.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 glass-panel rounded-xl border border-red-500/20">
                  <ShieldCheck className="w-6 h-6 text-red-400" /> Auto-Clicker
                  Block
                </div>
                <div className="flex items-center gap-3 p-4 glass-panel rounded-xl border border-red-500/20">
                  <ShieldCheck className="w-6 h-6 text-red-400" /> AI Solver
                  Detection
                </div>
                <div className="flex items-center gap-3 p-4 glass-panel rounded-xl border border-red-500/20">
                  <ShieldCheck className="w-6 h-6 text-red-400" /> No VPN /
                  Proxy
                </div>
                <div className="flex items-center gap-3 p-4 glass-panel rounded-xl border border-red-500/20">
                  <ShieldCheck className="w-6 h-6 text-red-400" /> Anti
                  Adblocker
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-6">
                * Strictly no VPN, custom DNS, or Adblockers allowed. Usage may
                lead to immediate account ban.
              </p>
            </div>
            <div className="flex-1 relative w-full flex justify-center">
              <div className="w-full max-w-sm glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl relative">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6 ring-4 ring-red-500/10 mx-auto">
                  <ShieldCheck className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4">
                  Fraud Monitoring
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Trust Score</span>
                    <span className="font-bold text-emerald-400">
                      98/100 (Excellent)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-navy rounded-full overflow-hidden">
                    <div className="w-[98%] h-full bg-emerald-500"></div>
                  </div>
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl mt-6 text-center text-sm text-red-300">
                    Using automated bots will immediately reduce your score to 0
                    and ban the account.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inside Decaptcha section removed */}

      {/* Rewards Preview Section */}
      <section id="rewards" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Transparent Rewards
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Understand exactly how your earnings are calculated.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Coins className="w-24 h-24" />
              </div>
              <h3 className="text-xl font-bold mb-2">Base Rates</h3>
              <p className="text-slate-400 text-sm mb-6">
                Earn consistently for every successful solve.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-slate-300">Text Captcha</span>
                  <span className="font-bold text-emerald-400">$0.001</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-slate-300">Image Select</span>
                  <span className="font-bold text-emerald-400">$0.003</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Complex Puzzle</span>
                  <span className="font-bold text-emerald-400">$0.010</span>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-blue-500/20 bg-blue-600/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Gift className="w-24 h-24 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-400">
                Bonus & Limits
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Boost your earnings through consistency.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-blue-500/10">
                  <span className="text-slate-300">Daily check-in</span>
                  <span className="font-bold text-blue-400">Pts</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-blue-500/10">
                  <span className="text-slate-300">Social Tasks</span>
                  <span className="font-bold text-blue-400">Pts</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Promo codes</span>
                  <span className="font-bold text-slate-100">Every day</span>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-red-500/20 bg-red-500/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldCheck className="w-24 h-24 text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-red-400">
                Quality Control
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                We reward quality and penalize bots and spam.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-red-500/10">
                  <span className="text-slate-300">Wrong Answer</span>
                  <span className="font-bold text-red-400">-$0.005</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-red-500/10">
                  <span className="text-slate-300">Timeout Rejection</span>
                  <span className="font-bold text-slate-100">No Pay</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Bot Behavior</span>
                  <span className="font-bold text-red-500">Ban</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="py-24 bg-navy-light/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Top Earners This Week
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Climb the ranks and earn additional weekly bonuses.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { rank: 1, name: "CryptoKing99", earn: "$142.50", acc: "99.8%" },
              { rank: 2, name: "SolverPro", earn: "$128.20", acc: "98.5%" },
              { rank: 3, name: "FastFingers", earn: "$115.00", acc: "99.1%" },
              { rank: 4, name: "CaptchaMaster", earn: "$98.45", acc: "97.9%" },
              { rank: 5, name: "NightOwl", earn: "$95.10", acc: "99.5%" },
            ].map((u, i) => (
              <div
                key={i}
                className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-transform hover:-translate-y-2 flex flex-col items-center text-center relative overflow-hidden group"
              >
                {i < 3 && (
                  <div
                    className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${i === 0 ? "from-yellow-400 to-yellow-600" : i === 1 ? "from-slate-300 to-slate-500" : "from-orange-400 to-orange-600"}`}
                  ></div>
                )}

                <div
                  className={`absolute -top-4 -right-4 w-16 h-16 rounded-full blur-[20px] ${i === 0 ? "bg-yellow-500/20" : i === 1 ? "bg-slate-400/20" : i === 2 ? "bg-orange-500/20" : "bg-transparent"}`}
                ></div>

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4 ${
                    i === 0
                      ? "bg-yellow-500/20 text-yellow-400 ring-1 ring-yellow-400/50"
                      : i === 1
                        ? "bg-slate-300/20 text-slate-300 ring-1 ring-slate-300/50"
                        : i === 2
                          ? "bg-orange-600/20 text-orange-400 ring-1 ring-orange-500/50"
                          : "bg-white/5 text-slate-500 border border-white/10"
                  }`}
                >
                  #{u.rank}
                </div>

                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xl mb-3 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                  {u.name[0]}
                </div>

                <span className="font-bold text-md text-white mb-1">
                  {u.name}
                </span>
                <span className="text-xs text-slate-400 mb-4 h-4 bg-navy px-2 py-0.5 rounded-full border border-white/5">
                  Acc: {u.acc}
                </span>

                <div className="text-2xl font-bold text-emerald-400 font-mono mt-auto">
                  {u.earn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Program */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 glass-panel p-10 rounded-3xl border border-blue-500/30 bg-blue-600/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Users className="w-48 h-48 text-blue-400" />
              </div>
              <h3 className="text-sm font-bold text-blue-400 tracking-widest uppercase mb-4">
                Referral Program
              </h3>
              <h2 className="text-4xl font-bold mb-6">
                Earn{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  10% Lifetime
                </span>{" "}
                Commision
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-md">
                Invite friends and colleagues to join DeCaptcha. When they earn,
                you earn. Automatically credited to your wallet.
              </p>
              <div className="flex items-center gap-4 bg-navy-light/50 border border-white/10 rounded-xl p-4 w-full max-w-sm">
                <div className="flex-1 font-mono text-sm truncate text-slate-300">
                  decaptcha.app/ref/Y7X9P2
                </div>
                <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                  Copy
                </button>
              </div>
            </div>
            <div className="flex-1 w-full flex flex-col gap-4">
              {[
                {
                  step: "1",
                  title: "Share your link",
                  desc: "Send your unique referral link to friends on social media or forums.",
                },
                {
                  step: "2",
                  title: "Friends start solving",
                  desc: "They sign up and start completing tasks to earn their own rewards.",
                },
                {
                  step: "3",
                  title: "You earn automatically",
                  desc: "10% of their total earnings is instantly added to your balance.",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex gap-6 items-start glass-panel p-6 rounded-2xl border border-white/5"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center shrink-0 text-lg">
                    {s.step}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{s.title}</h4>
                    <p className="text-slate-400">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparisons Removed */}

      {/* Testimonials */}
      <section className="py-24 overflow-hidden relative">
        <div className="absolute top-1/2 right-0 w-1/3 h-1/2 bg-blue-600/10 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              See what our top earners have to say about their experience.
            </p>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory px-4 md:px-0">
            {[
              {
                name: "Sarah J.",
                earn: "$1.4K Earned",
                text: "The UI is so much better than other sites. I can solve captchas on my phone during my commute and the payouts are instant.",
                rating: 5,
              },
              {
                name: "Mike T.",
                earn: "$4.2K Earned",
                text: "Zero withdrawal fees and the accuracy bonus really adds up. Best side hustle for free time.",
                rating: 5,
              },
              {
                name: "Elena R.",
                earn: "$800 Earned",
                text: "The variety of captchas keeps it from getting boring. The dark mode is super easy on the eyes for long sessions.",
                rating: 5,
              },
              {
                name: "James L.",
                earn: "$2.1K Earned",
                text: "Customer support is actually helpful. Had an issue with a withdrawal and it was sorted in minutes.",
                rating: 5,
              },
            ].map((t, i) => (
              <div
                key={i}
                className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col min-w-[300px] md:min-w-[350px] snap-center hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-300 italic mb-6 flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white border border-white/10">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{t.name}</h4>
                    <p className="text-xs text-emerald-400">{t.earn}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Updates Removed */}

      {/* FAQ */}
      <section className="py-24 bg-navy-light/30 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How do rewards work?",
                a: "You are credited instantly for every correctly solved captcha. Different types of captchas pay different amounts. Your total is updated in real-time on your dashboard.",
              },
              {
                q: "How do withdrawals work?",
                a: "Once you reach the minimum threshold ($5.00), you can request a withdrawal to your crypto wallet or other supported payment methods. Processing is instant.",
              },
              {
                q: "Why is an access key required?",
                a: "We use access keys instead of traditional passwords to streamline the login process and maintain anonymity while ensuring maximum security.",
              },
              {
                q: "Is my data secure?",
                a: "Yes. We do not require unnecessary personal information. Our platform utilizes advanced encryption and runs securely in the cloud.",
              },
              {
                q: "Can users get banned for fraud?",
                a: "Yes. Using bots, automated solvers, or purposely providing incorrect answers will negatively impact your trust score and result in permanent account bans and forfeiture of funds.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="glass-panel rounded-2xl group border border-white/5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg select-none">
                  {faq.q}
                  <span className="transition duration-300 group-open:-rotate-180">
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="py-24 border-t border-white/5 bg-gradient-to-b from-navy to-blue-900/20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
                <span>v2.4 Available Now</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Earn on the Go.
              </h2>
              <p className="text-xl text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0">
                Download the DeCaptcha Android app to solve captchas faster,
                receive push notifications for high-paying tasks, and withdraw
                funds with a tap.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-3 text-lg">
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                    <path d="M17.523 15.3414C17.523 17.536 15.823 19.3371 13.7299 19.4925H13.6872V19.4975H10.317V19.4925H10.2743C8.18121 19.3371 6.4812 17.536 6.4812 15.3414V11.2335C6.4812 9.03887 8.18121 7.23783 10.2743 7.08241H10.317V7.0774H13.6872V7.08241H13.7299C15.823 7.23783 17.523 9.03887 17.523 11.2335V15.3414ZM12.0022 5.0934C9.25615 5.0934 6.96811 7.09144 6.55009 9.71158V10.7416H4.49601V9.71158C5.06503 6.13038 8.23211 3.33333 12.0022 3.33333C15.7723 3.33333 18.9394 6.13038 19.5084 9.71158V10.7416H17.4543V9.71158C17.0363 7.09144 14.7482 5.0934 12.0022 5.0934ZM10.5982 12.2486L12.0022 13.6526L14.8293 10.8255L16.2433 12.2395L12.0022 16.4806L9.18414 13.6626L10.5982 12.2486Z" />
                  </svg>
                  Download APK
                </button>
                <div className="flex flex-col items-center sm:items-start text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Secure
                    Download
                  </div>
                  <div>Play Store coming soon</div>
                </div>
              </div>
            </div>

            <div className="flex-1 relative w-full max-w-sm lg:max-w-none flex justify-center">
              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>
              {/* Fake Phone */}
              <div className="relative w-72 h-[600px] bg-navy border-8 border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col z-10">
                <div className="absolute top-0 inset-x-0 h-6 bg-slate-800 rounded-b-xl w-32 mx-auto z-20"></div>
                <div className="flex-1 bg-navy-light pt-12 px-4 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20"></div>
                    <div className="w-20 h-8 rounded-full bg-emerald-500/20"></div>
                  </div>
                  <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-4">
                    <div className="w-16 h-4 bg-white/20 rounded mb-2"></div>
                    <div className="w-32 h-8 bg-white/40 rounded"></div>
                  </div>
                  <div className="w-full h-24 rounded-2xl bg-white/5 border border-white/5"></div>
                  <div className="w-full h-24 rounded-2xl bg-white/5 border border-white/5"></div>
                  <div className="w-full h-24 rounded-2xl bg-white/5 border border-white/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="glass-panel p-12 lg:p-20 rounded-[3rem] border border-blue-500/30 text-center relative z-10 bg-gradient-to-b from-blue-900/40 to-navy overflow-hidden">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Ready to Start Earning?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Claim your access key and join thousands of solvers making real
              rewards every day.
            </p>
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 px-10 rounded-2xl shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all text-xl inline-flex items-center gap-3 group"
            >
              Unlock DeCaptcha
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 border-t border-white/5 bg-navy-light/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Never Miss a Bonus
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter for exclusive multiplier events, new
            captcha types, and platform updates.
          </p>
          <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-navy/50 border border-glass-border rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-accent transition-all"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl transition-all whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-navy/80 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[20px]">
                    fingerprint
                  </span>
                </div>
                <span className="text-xl font-bold text-white">DeCaptcha</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                The world's fastest and most secure platform for earning crypto
                by solving captchas.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full inline-flex">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>{" "}
                Systems Operational
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Platform</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li>
                  <button
                    onClick={() => onNavigate("dashboard")}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("how-it-works")}
                    className="hover:text-blue-400 transition-colors"
                  >
                    How it Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("about")}
                    className="hover:text-blue-400 transition-colors"
                  >
                    About DeCaptcha
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("contact")}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Contact Support
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Legal</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li>
                  <button
                    onClick={() => onNavigate("terms")}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("privacy")}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Fair Play Rules
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Connect</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-blue-500 border border-blue-400 flex items-center justify-center text-white hover:bg-blue-400 transition-colors shadow-lg shadow-blue-500/20"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.539.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.68c.223-.198-.054-.31-.346-.116l-6.405 4.04-2.76-.86c-.6-.188-.61-.6.126-.89l10.814-4.17c.502-.18.946.108.825.931z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm border-t border-white/5 pt-8">
            <div>
              &copy; {new Date().getFullYear()} DeCaptcha Platform. All rights
              reserved.
            </div>
            <div className="mt-4 md:mt-0 font-mono text-xs">
              Version 2.4.1 (Build 805)
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
