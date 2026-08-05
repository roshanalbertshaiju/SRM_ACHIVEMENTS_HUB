'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Eye,
  ShieldCheck,
  Building2,
  Mail,
  Globe,
  Github,
  Linkedin,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { toast } from 'sonner';

export const ResumeGeneratorScreen: React.FC = () => {
  const { currentStudent } = useApp();
  const [includeAIKeywords, setIncludeAIKeywords] = useState(true);
  const [selectedLayout, setSelectedLayout] = useState<'Modern Minimal' | 'Executive Harvard' | 'Tech Specialist'>('Tech Specialist');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = () => {
    toast.success('Opening Printable ATS Resume...', {
      description: `${currentStudent.name.replace(/\s+/g, '_')}_ATS_Resume.pdf prepared for print/export.`,
    });
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleApplyAISuggestion = (suggestionText: string) => {
    toast.success('AI Suggestion Applied to Resume!', {
      description: suggestionText,
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Print-specific style override */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-resume, #printable-resume * {
            visibility: visible;
          }
          #printable-resume {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 24px;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <FileText className="w-7 h-7 text-emerald-400" />
            <h1 className="text-3xl font-black tracking-tight">AI ATS Resume Generator</h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Auto-compiles verified achievements, publication DOIs, and skill endorsements into ATS-optimized PDF layouts.
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center space-x-2 shadow-xl shadow-emerald-900/40 transition-all hover:scale-105 print:hidden"
        >
          <Download className="w-4 h-4" />
          <span>Export ATS PDF Resume</span>
        </button>
      </div>

      {/* Main Split Layout: Customizer & AI Feedback Left, Live PDF Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: ATS Score Gauge & Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* ATS Gauge Card */}
          <GlassCard className="p-6 space-y-4 border-emerald-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ATS Optimization Index</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-400 text-[10px] font-extrabold border border-emerald-500/40 tracking-wider">
                ATS OPTIMIZED
              </span>
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/10 border-4 border-emerald-400 text-center">
                <div>
                  <span className="text-3xl font-black text-emerald-400">{currentStudent.atsResumeScore}</span>
                  <span className="text-[10px] text-slate-400 block font-bold">/ 100</span>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <h4 className="font-bold text-slate-200 text-sm">Target Role: Senior Software Engineer</h4>
                <p className="text-slate-400">0 Parsing Errors • Action verbs verified • Quantified metrics included</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Quantified Metric Sentences</span>
                </span>
                <span className="font-bold text-emerald-400">100%</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified IEEE / DOI Citations</span>
                </span>
                <span className="font-bold text-emerald-400">100%</span>
              </div>
            </div>
          </GlassCard>

          {/* AI Suggestions Drawer Card */}
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center space-x-2 text-amber-400">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-bold text-base text-slate-100">AI Enhancement Recommendations</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <div className="flex items-center justify-between font-bold text-amber-300">
                  <span>Highlight Rust & WebAssembly Performance</span>
                  <button
                    onClick={() => handleApplyAISuggestion('Added WebAssembly benchmarks to technical skills.')}
                    className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black hover:bg-amber-300"
                  >
                    Apply Auto-Fix
                  </button>
                </div>
                <p className="text-slate-300 text-[11px]">
                  Recruiters searching for systems performance roles respond 40% better when benchmark numbers are in the summary.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <div className="flex items-center justify-between font-bold text-amber-500 dark:text-amber-300">
                  <span>Add IEEE Paper DOI Link</span>
                  <button
                    onClick={() => handleApplyAISuggestion('Integrated IEEE DOI publication link.')}
                    className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-black hover:bg-amber-400 tactile-btn"
                  >
                    Apply Auto-Fix
                  </button>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                  Including verified research paper DOIs increases interview callback rates by 2.4x.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Resume Customizer Controls */}
          <GlassCard className="p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Layout Preset</h3>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {['Tech Specialist', 'Modern Minimal', 'Executive Harvard'].map((layout) => (
                <button
                  key={layout}
                  onClick={() => setSelectedLayout(layout as any)}
                  className={`p-2.5 rounded-xl border text-center font-bold transition-all tactile-btn ${
                    selectedLayout === layout
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {layout}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Live Printable PDF Resume Document Preview (7 cols) */}
        <div className="lg:col-span-7">
          <div id="printable-resume" className="p-8 rounded-3xl bg-white text-slate-900 shadow-2xl space-y-6 font-sans text-xs min-h-[750px] border border-slate-200 relative overflow-hidden">
            {/* Top Watermark / Verified Badge */}
            <div className="absolute top-4 right-4 flex items-center space-x-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>OFFICIAL CSEHUB RECORD</span>
            </div>

            {/* Resume Header */}
            <div className="border-b border-slate-300 pb-4 space-y-1">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">{currentStudent.name}</h1>
              <p className="text-xs font-bold text-slate-600">{currentStudent.headline}</p>
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center space-x-1">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span>{currentStudent.email}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Building2 className="w-3 h-3 text-slate-400" />
                  <span>{currentStudent.department} ({currentStudent.year})</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Globe className="w-3 h-3 text-slate-400" />
                  <span>{currentStudent.socialLinks.website || 'roshanalbert.dev'}</span>
                </span>
              </div>
            </div>

            {/* Section 1: Executive Summary */}
            <div className="space-y-1">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-0.5">
                Executive Profile & Reputation Score ({currentStudent.careerScore} PTS)
              </h2>
              <p className="text-slate-700 leading-relaxed pt-1">{currentStudent.bio}</p>
            </div>

            {/* Section 2: Verified Key Achievements */}
            <div className="space-y-2">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-0.5">
                Verified Major Achievements & Honors
              </h2>
              <div className="space-y-2">
                {currentStudent.achievements.map((ach) => (
                  <div key={ach.id} className="space-y-0.5">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{ach.title}</span>
                      <span className="text-[10px] text-slate-500">{ach.date}</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{ach.description}</p>
                    <span className="text-[10px] font-semibold text-blue-700 block">
                      Proof: {ach.proofTitle} ({ach.verificationStatus})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Technical Skills */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-0.5">
                Technical Competencies & Peer Endorsements
              </h2>
              <div className="flex flex-wrap gap-2 pt-1">
                {currentStudent.skills.map((sk, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-300">
                    {sk.name} • {sk.level}% ({sk.endorsements} Endorsements)
                  </span>
                ))}
              </div>
            </div>

            {/* Section 4: Education */}
            <div className="space-y-1">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-0.5">
                University Education
              </h2>
              <div className="flex items-center justify-between font-bold text-slate-900 pt-1">
                <span>{currentStudent.location}</span>
                <span>Expected May 2026</span>
              </div>
              <p className="text-slate-600 text-[11px]">Bachelor of Technology in {currentStudent.department} • Level {currentStudent.level} Scholar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
