'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Zap,
  ShieldCheck,
  Briefcase,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Star,
  Users,
  Award,
  BarChart3,
  Flame,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const LandingScreen: React.FC = () => {
  const { setActiveScreen, themeConfig } = useApp();

  return (
    <div className="min-h-screen space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        {/* Soft Ambient Organic Backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs font-semibold"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Academic Achievement Engine</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-70" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto"
          >
            Build Your <span className={`bg-gradient-to-r ${themeConfig.accentGradient} bg-clip-text text-transparent`}>Reputation.</span><br />
            Turn Campus Impact Into Verified Proof.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
          >
            The verified student achievement platform for university growth. Track XP, earn department badges, showcase portfolio proof, and connect with faculty & recruiters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => setActiveScreen('dashboard')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 shadow-natural transition-all duration-200 tactile-btn group"
            >
              <span>Explore Student Dashboard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveScreen('recruiter')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-slate-700/80 bg-slate-800/40 hover:bg-slate-800/80 font-semibold text-sm flex items-center justify-center space-x-2 transition-all duration-200 tactile-btn"
            >
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>Launch Recruiter Portal</span>
            </button>
          </motion.div>

          {/* Floating UI Hero Mockup Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="pt-10 max-w-5xl mx-auto"
          >
            <div className="p-4 sm:p-6 rounded-3xl border border-white/15 bg-slate-900/80 backdrop-blur-2xl shadow-2xl space-y-4 text-left relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-semibold text-slate-400">studenthub.university.edu/roshanalbert</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
                    <span>TOP RANK #1</span>
                    <Flame className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-lg">Roshan Albert Shaiju</h3>
                  <p className="text-xs text-slate-400">CSE Senior • Emerald Tier</p>
                  <div className="pt-2 flex items-center space-x-2 text-xs font-bold text-emerald-400">
                    <Zap className="w-4 h-4" />
                    <span>28,450 XP (Lvl 28)</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                  <span className="text-xs text-slate-400 font-semibold">Career Reputation Score</span>
                  <div className="text-3xl font-black text-blue-400">948 / 1000</div>
                  <p className="text-xs text-emerald-400 font-medium">Top 0.5% Nationwide</p>
                  <div className="w-full h-1.5 rounded-full bg-blue-500/20">
                    <div className="h-full w-[94%] bg-blue-500 rounded-full" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                  <span className="text-xs text-slate-400 font-semibold">Verification Queue</span>
                  <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Faculty Verified ✓</span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">HackMIT Grand Winner & IEEE Paper</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Platform Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-blue-400">100+</div>
            <div className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-wider">Verified Achievements</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-purple-400">480+</div>
            <div className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-wider">Active University Students</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400">95%</div>
            <div className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-wider">Recruiter Match Rate</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400">42 Days</div>
            <div className="text-xs text-slate-400 font-semibold mt-1 uppercase tracking-wider">Avg Student Streak</div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Engineered Like a Startup. Built for Students.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Combining gamification, verified proof documents, ATS resume generation, and recruiter search.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 space-y-4 hover:border-blue-500/50 transition-colors">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 w-fit">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl">Duolingo-Style Gamification</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Earn XP for hackathons, open source PRs, research papers, and club events. Level up from Bronze to Emerald tier.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 space-y-4 hover:border-purple-500/50 transition-colors">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl">Faculty Verification Engine</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Zero fake claims. Department HODs and faculty advisors verify uploaded certificates and DOIs before granting score points.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 space-y-4 hover:border-emerald-500/50 transition-colors">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl">Recruiter Radar & ATS Resume</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Top recruiters filter candidates by verified skill mastery and career score. Generate 94+ ATS resumes instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Wall of Love Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Loved by Students & Faculty HODs</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 space-y-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm text-slate-300 italic">
              "This looks like a real funded startup platform. Our HOD was instantly impressed by the streak heatmap and faculty approval queue!"
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Roshan"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <h4 className="font-bold text-xs">Roshan Albert Shaiju</h4>
                <p className="text-[10px] text-slate-400">CSE Senior • Rank #1</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 space-y-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm text-slate-300 italic">
              "The ATS Resume generator saved me hours! It pulls all my verified hackathon wins automatically."
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                alt="Sophia"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <h4 className="font-bold text-xs">Sophia Chen</h4>
                <p className="text-[10px] text-slate-400">Data Science Junior</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 space-y-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm text-slate-300 italic">
              "As a department HOD, having a single dashboard to review student research papers and grant approvals is a game-changer."
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                alt="Faculty"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <h4 className="font-bold text-xs">Dr. Elizabeth Vance</h4>
                <p className="text-[10px] text-slate-400">HOD Computer Science</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 pt-10 text-center text-xs text-slate-400">
        <p>© 2026 SRM Hub • University Career & Reputation System</p>
      </footer>
    </div>
  );
};
