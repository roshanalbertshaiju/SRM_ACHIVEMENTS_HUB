'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, ShieldCheck, Download, ExternalLink, FileText, CheckCircle2, Award, Calendar, Building2, Lock } from 'lucide-react';
import { Achievement } from '@/types';
import { toast } from 'sonner';

interface ProofViewerModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export const ProofViewerModal: React.FC<ProofViewerModalProps> = ({ achievement, onClose }) => {
  if (!achievement) return null;

  const handleDownloadProof = () => {
    toast.success('Official Certificate Downloaded', {
      description: `${achievement.title.replace(/\s+/g, '_')}_Verification_Credential.pdf downloaded.`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl rounded-3xl border border-slate-700 bg-slate-900 text-slate-100 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center space-x-2">
                <span>Verified Credential Record</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 text-[10px] font-bold border border-emerald-500/40 uppercase">
                  {achievement.verificationStatus}
                </span>
              </h2>
              <p className="text-xs text-slate-400">Issued via SRM Academic Verification Protocol</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate / Proof Document Viewport */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5 text-xs relative overflow-hidden">
          {/* Top Seal Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-indigo-400" />
              <span className="font-bold text-slate-200 uppercase tracking-widest text-[11px]">SRM INSTITUTE OF SCIENCE & TECHNOLOGY</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">HASH: {achievement.id.toUpperCase()}</span>
          </div>

          {/* Body Document Content */}
          <div className="space-y-2 py-2">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">Official Achievement Title</span>
            <h3 className="text-xl font-extrabold text-white tracking-tight">{achievement.title}</h3>
            <p className="text-slate-300 text-xs leading-relaxed pt-1">{achievement.description}</p>
          </div>

          {/* Details Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-[11px]">
            <div>
              <span className="text-slate-500 font-semibold block">Student Recipient</span>
              <strong className="text-white font-bold block pt-0.5">{achievement.studentName}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">Event Category</span>
              <strong className="text-indigo-400 font-bold block pt-0.5">{achievement.category}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block">XP Granted</span>
              <strong className="text-amber-400 font-bold block pt-0.5">+{achievement.pointsEarned} XP</strong>
            </div>
          </div>

          {/* Verification Audit Stamp */}
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verified by {achievement.verifiedBy || 'Departmental Review Committee'}</span>
            </div>
            <span className="font-bold text-[10px] uppercase text-emerald-400">Cryptographically Signed</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2 text-xs">
          <button
            onClick={handleDownloadProof}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center space-x-2 shadow-lg transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Official PDF Proof</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </motion.div>
    </div>
  );
};
