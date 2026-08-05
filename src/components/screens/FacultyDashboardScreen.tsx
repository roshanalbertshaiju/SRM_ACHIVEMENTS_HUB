'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  BarChart2,
  PieChart as PieIcon,
  Users,
  ShieldCheck,
  TrendingUp,
  FileCheck,
  Award,
  Download,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { DEPARTMENTS, CLUBS } from '@/data/mockData';
import { toast } from 'sonner';

const CHART_DATA_GROWTH = [
  { month: 'Jan', submissions: 45, verified: 40 },
  { month: 'Feb', submissions: 62, verified: 58 },
  { month: 'Mar', submissions: 80, verified: 75 },
  { month: 'Apr', submissions: 95, verified: 88 },
  { month: 'May', submissions: 110, verified: 102 },
  { month: 'Jun', submissions: 135, verified: 125 },
];

const CHART_DATA_DISTRIBUTION = [
  { name: 'Hackathons', value: 35, color: '#F59E0B' },
  { name: 'Research Papers', value: 25, color: '#818CF8' },
  { name: 'Open Source', value: 20, color: '#10B981' },
  { name: 'Leadership', value: 12, color: '#38BDF8' },
  { name: 'Certifications', value: 8, color: '#FB7185' },
];

export const FacultyDashboardScreen: React.FC = () => {
  const { students, approveVerification, rejectVerification } = useApp();
  const [selectedDeptId, setSelectedDeptId] = useState('dept-cse');

  // Collect all pending items
  const allPendingAchievements = students.flatMap((s) =>
    s.achievements.filter((a) => a.verificationStatus === 'Pending Review')
  );

  const handleApprove = (id: string, title: string) => {
    approveVerification(id);
    toast.success(`Achievement Approved!`, {
      description: `"${title}" has been verified and added to student record.`,
    });
  };

  const handleReject = (id: string, title: string) => {
    rejectVerification(id);
    toast.error(`Achievement Rejected`, {
      description: `"${title}" was removed from the verification queue.`,
    });
  };

  const exportFacultyReportCSV = () => {
    const headers = ['Student Name', 'Department', 'Achievement Title', 'Category', 'Date', 'Verification Status', 'Points Earned'];
    const allAchievements = students.flatMap((s) =>
      s.achievements.map((ach) => [
        `"${s.name}"`,
        `"${s.department}"`,
        `"${ach.title}"`,
        `"${ach.category}"`,
        `"${ach.date}"`,
        `"${ach.verificationStatus}"`,
        ach.pointsEarned,
      ])
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...allAchievements.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SRM_Department_Faculty_Report_July_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Department Report Exported!', {
      description: `Generated CSV containing ${allAchievements.length} student achievement records.`,
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Building2 className="w-7 h-7 text-blue-400" />
            <h1 className="text-3xl font-black tracking-tight">Faculty & HOD Verification Command</h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Departmental analytics, OCR verification queue, and academic reputation control panel.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={exportFacultyReportCSV}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-blue-900/30 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export Department CSV</span>
          </button>
          <div className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>CSE Department Portal</span>
          </div>
        </div>
      </div>

      {/* Quick Overview Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-5 space-y-2 border-blue-500/30">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pending Verifications</span>
          <div className="text-3xl font-black text-blue-400">{allPendingAchievements.length + 8} Items</div>
          <span className="text-xs text-slate-400">Avg review time: 4.2 hours</span>
        </GlassCard>

        <GlassCard className="p-5 space-y-2 border-emerald-500/30">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Department Avg Score</span>
          <div className="text-3xl font-black text-emerald-400">842 / 1000</div>
          <span className="text-xs text-emerald-400 font-semibold">Rank #1 Campus-wide</span>
        </GlassCard>

        <GlassCard className="p-5 space-y-2 border-purple-500/30">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Published IEEE Papers</span>
          <div className="text-3xl font-black text-purple-400">42 Papers</div>
          <span className="text-xs text-purple-400 font-semibold">+18% vs last semester</span>
        </GlassCard>

        <GlassCard className="p-5 space-y-2 border-amber-500/30">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Tech Clubs</span>
          <div className="text-3xl font-black text-amber-400">6 Guilds</div>
          <span className="text-xs text-slate-400">1,175 Total Members</span>
        </GlassCard>
      </div>

      {/* Main Grid: Pending Approval Queue Left, Recharts Analytics Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Pending Verification Inbox (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base">Pending Verification Queue</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                {allPendingAchievements.length + 3} Submissions
              </span>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {allPendingAchievements.length > 0 ? (
                allPendingAchievements.map((ach) => (
                  <div key={ach.id} className="p-4 rounded-2xl bg-black/20 dark:bg-white/5 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img src={ach.studentAvatar} alt={ach.studentName} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <h4 className="font-bold text-xs">{ach.studentName}</h4>
                          <span className="text-[10px] text-slate-400">{ach.studentDept}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {ach.category}
                      </span>
                    </div>

                    <div>
                      <h5 className="font-bold text-sm text-slate-100">{ach.title}</h5>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">{ach.description}</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-300 truncate max-w-[200px]">{ach.proofTitle}</span>
                      <span className="text-amber-400 font-bold">+{ach.pointsEarned} XP</span>
                    </div>

                    <div className="flex items-center justify-end space-x-2 pt-1">
                      <button
                        onClick={() => handleReject(ach.id, ach.title)}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs flex items-center space-x-1 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                      <button
                        onClick={() => handleApprove(ach.id, ach.title)}
                        className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center space-x-1 shadow-lg shadow-emerald-900/40 transition-transform hover:scale-105"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve & Grant XP</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs">Verification queue clear! All submissions processed.</div>
              )}
            </div>
          </GlassCard>
        </div>

        {/* Recharts Analytics & Growth Graphs (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Monthly Growth Bar Chart */}
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <BarChart2 className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-base">Monthly Submissions & Verification Trend</h3>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA_GROWTH}>
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Bar dataKey="submissions" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Submitted" />
                  <Bar dataKey="verified" fill="#10b981" radius={[4, 4, 0, 0]} name="Faculty Verified" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Achievement Category Distribution Pie */}
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <PieIcon className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-base">Achievement Category Distribution</h3>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="h-48 w-48 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={CHART_DATA_DISTRIBUTION} dataKey="value" innerRadius={50} outerRadius={70} paddingAngle={4}>
                      {CHART_DATA_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 text-xs flex-1">
                {CHART_DATA_DISTRIBUTION.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-300">{item.name}</span>
                    </span>
                    <span className="font-bold text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
