'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  X,
  Trophy,
  BookOpen,
  GitMerge,
  Crown,
  Award,
  Upload,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  FileCheck,
  Users,
} from 'lucide-react';
import { AchievementCategory } from '@/types';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';

const CATEGORIES: { name: AchievementCategory; icon: React.ComponentType<{ className?: string }>; desc: string; xp: number }[] = [
  { name: 'Hackathon', icon: Trophy, desc: 'Hackathon victories, sprint competitions, hack demos', xp: 850 },
  { name: 'Research Paper', icon: BookOpen, desc: 'Conference publications, DOI papers, journals', xp: 1000 },
  { name: 'Open Source', icon: GitMerge, desc: 'Merged PRs, open source packages, core maintenance', xp: 500 },
  { name: 'Leadership', icon: Crown, desc: 'Club presidencies, event organizing, mentoring', xp: 450 },
  { name: 'Certification', icon: Award, desc: 'AWS, PyTorch, LeetCode ratings, cloud badges', xp: 300 },
  { name: 'Sports & Culture', icon: Sparkles, desc: 'Inter-university championships, debate tournaments', xp: 350 },
];

export const AddAchievementModal: React.FC = () => {
  const { isAddModalOpen, setIsAddModalOpen, addAchievement } = useApp();
  const [step, setStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory>('Hackathon');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [proofTitle, setProofTitle] = useState('');
  const [proofType, setProofType] = useState<'PDF Certificate' | 'GitHub Repository' | 'DOI Publication' | 'Official Letter'>('PDF Certificate');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  if (!isAddModalOpen) return null;

  const currentCategoryObj = CATEGORIES.find((c) => c.name === selectedCategory) || CATEGORIES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addAchievement({
      title: title || `${selectedCategory} Victory`,
      category: selectedCategory,
      date: 'Just now',
      pointsEarned: currentCategoryObj.xp,
      verificationStatus: 'Pending Review',
      proofTitle: proofTitle || `${selectedCategory} Official Proof.pdf`,
      proofType: proofType,
      description: description || 'Verified student accomplishment logged on campus network.',
      rarity: currentCategoryObj.xp >= 800 ? 'Legendary' : currentCategoryObj.xp >= 500 ? 'Epic' : 'Rare',
    });

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });

    toast.success(`Achievement Shared! +${currentCategoryObj.xp} XP Queued`, {
      description: 'Your milestone is now queued for Faculty verification & campus feed broadcast.',
    });

    setIsAddModalOpen(false);
    setStep(1);
    setTitle('');
    setDescription('');
    setProofTitle('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-xl rounded-2xl border border-[#1b2234] bg-[#0e1320] text-slate-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#1b2234] flex items-center justify-between bg-[#141a29]">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-blue-600">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Share Campus Achievement</h3>
              <p className="text-xs text-slate-400">Step {step} of 3 • Log win & gain XP reputation</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddModalOpen(false)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Line */}
        <div className="h-1 w-full bg-slate-900">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {step === 1 && (
            <div className="space-y-3">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Select Category</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`p-3.5 rounded-xl border text-left flex items-start space-x-3 transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-600/10 text-white font-semibold shadow-sm'
                          : 'border-[#1f283d] bg-[#141a29] hover:bg-[#1b2338] text-slate-300'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs">{cat.name}</h4>
                          <span className="text-[11px] font-bold text-amber-400">+{cat.xp} XP</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{cat.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3.5">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Achievement Details</span>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Achievement Title</label>
                <input
                  type="text"
                  placeholder="e.g. 1st Winner at HackMIT 2026 / IEEE Paper"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#141a29] border border-[#1f283d] focus:border-blue-500 focus:outline-none text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Description & Key Highlights</label>
                <textarea
                  rows={3}
                  placeholder="Describe your role, impact, technologies used, and outcomes..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#141a29] border border-[#1f283d] focus:border-blue-500 focus:outline-none text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Proof Document Title / DOI Link</label>
                <input
                  type="text"
                  placeholder="e.g. HackMIT Certificate.pdf / DOI Link"
                  value={proofTitle}
                  onChange={(e) => setProofTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#141a29] border border-[#1f283d] focus:border-blue-500 focus:outline-none text-xs text-white"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3.5">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Upload Certificate / Proof</span>

              <div
                onClick={() => setUploadedFile('official_achievement_certificate.pdf')}
                className="p-6 border-2 border-dashed border-[#1f283d] hover:border-blue-500 rounded-xl bg-[#141a29] flex flex-col items-center justify-center text-center space-y-2 cursor-pointer transition-colors"
              >
                <div className="p-2.5 rounded-full bg-blue-500/10 text-blue-400">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-slate-200">Click to attach document or drag file here</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Supports PDF, PNG, JPG (Max 25MB)</p>
                </div>
                {uploadedFile && (
                  <div className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center space-x-1">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>{uploadedFile} Attached</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#1b2234] flex items-center justify-between bg-[#141a29]">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs flex items-center space-x-1.5 text-white"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-bold text-xs flex items-center space-x-1.5 text-slate-950 shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>Share & Earn +{currentCategoryObj.xp} XP</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
