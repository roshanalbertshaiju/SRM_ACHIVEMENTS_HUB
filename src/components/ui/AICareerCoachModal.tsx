'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, Bot, User, Zap, Target, Rocket, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  recommendation?: {
    title: string;
    type: 'hackathon' | 'certification' | 'research';
    xp: number;
    impact: string;
  };
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: `Hello! I am your CseHub AI Career & Skill Advisor. I've analyzed your profile and current Career Score. You are currently in the top percentile on campus! How can I assist your career progression today?`,
    timestamp: 'Just now',
  },
];

const QUICK_PROMPTS = [
  'How do I raise my Career Score above 900?',
  'What hackathons should I participate in this month?',
  'How do I optimize my IEEE research citations?',
  'Recommend skills for Senior AI Systems roles',
];

export const AICareerCoachModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { currentStudent, themeConfig } = useApp();
  const isLight = themeConfig.isLight;
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [enrolledGoals, setEnrolledGoals] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Simulate AI intelligent response
    setTimeout(() => {
      let aiText = '';
      let rec: Message['recommendation'] = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('career score') || lower.includes('raise') || lower.includes('900')) {
        aiText = `To push your Career Score from ${currentStudent.careerScore} to 900+, focus on high-yield accomplishments: (1) Winning national hackathons (+150 XP), (2) Publishing an IEEE paper (+300 XP), and (3) Getting 10+ peer endorsements on Rust/PyTorch.`;
        rec = {
          title: 'SRM National AI Systems Sprint 2026',
          type: 'hackathon',
          xp: 200,
          impact: '+18 Career Score • Verified Hardware Badge',
        };
      } else if (lower.includes('hackathon')) {
        aiText = `Here are the top 2 upcoming university hackathons tailored to your skill set in Distributed Systems & AI:`;
        rec = {
          title: 'CNCF Global Campus Cloud Hackathon',
          type: 'hackathon',
          xp: 250,
          impact: '+22 Career Score • Open Source Contributor Badge',
        };
      } else if (lower.includes('ieee') || lower.includes('research') || lower.includes('citation')) {
        aiText = `Research publications increase recruiter interview callbacks by 2.4x! Ensure your paper DOI link is verified in your ATS Resume generator.`;
        rec = {
          title: 'Submit Paper to IEEE Access Transactions',
          type: 'research',
          xp: 300,
          impact: '+25 Career Score • Verified DOI Badge',
        };
      } else {
        aiText = `Based on your profile as ${currentStudent.name} (${currentStudent.department}), I recommend completing 1 verified certification or hackathon victory this sprint to boost your recruiter radar index.`;
        rec = {
          title: 'AWS Solutions Architect Associate Certification',
          type: 'certification',
          xp: 180,
          impact: '+15 Career Score • Recruiter Spotlight',
        };
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendation: rec,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleEnrollGoal = (title: string) => {
    if (enrolledGoals.includes(title)) return;
    setEnrolledGoals((prev) => [...prev, title]);
    toast.success('Goal Added to Student Roadmap!', {
      description: `Track "${title}" on your dashboard to claim XP upon completion.`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className={cn(
          "relative w-full max-w-3xl rounded-3xl border text-slate-100 shadow-2xl overflow-hidden flex flex-col h-[85vh] max-h-[700px]",
          themeConfig.bgClass,
          themeConfig.cardBorderClass
        )}
      >
        <div className={cn("p-4 sm:p-5 border-b flex items-center justify-between", isLight ? "bg-white border-slate-200" : "bg-slate-900 border-slate-800")}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className={cn("text-base font-black flex items-center space-x-2", isLight ? "text-slate-900" : "text-slate-100")}>
                <span>AI Skill & Career Coach</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 dark:text-amber-400 text-[10px] font-extrabold border border-amber-500/30 uppercase">
                  ACTIVE ADVISOR
                </span>
              </h2>
              <p className={cn("text-xs", isLight ? "text-slate-500" : "text-slate-400")}>Real-time career guidance for {currentStudent.name}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={cn("p-2 rounded-xl transition-colors", isLight ? "bg-slate-100 hover:bg-slate-200 text-slate-700" : "bg-slate-800 hover:bg-slate-700 text-slate-300")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isUser
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : isLight
                      ? 'bg-slate-100 text-amber-600 border border-slate-300'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`space-y-2 max-w-[80%] ${isUser ? 'text-right' : 'text-left'}`}>
                  <div
                    className={cn(
                      'p-4 rounded-2xl text-xs leading-relaxed inline-block border shadow-sm',
                      isUser
                        ? 'bg-amber-500 text-slate-950 font-semibold rounded-tr-none border-amber-400'
                        : isLight
                        ? 'bg-white border-slate-200 text-slate-900 rounded-tl-none'
                        : 'bg-slate-900 border-slate-800 text-slate-100 rounded-tl-none'
                    )}
                  >
                    <p>{msg.text}</p>

                    {msg.recommendation && (
                      <div className={cn(
                        'mt-3 p-3 rounded-xl border text-left space-y-2',
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/80 border-slate-700'
                      )}>
                        <div className="flex items-center justify-between text-xs font-bold text-amber-500 dark:text-amber-400">
                          <span className="uppercase text-[10px] tracking-wider font-extrabold">{msg.recommendation.type}</span>
                          <span className="font-numeric">+{msg.recommendation.xp} XP</span>
                        </div>
                        <h4 className={cn("font-extrabold text-xs", isLight ? "text-slate-900" : "text-slate-100")}>{msg.recommendation.title}</h4>
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">{msg.recommendation.impact}</p>

                        <button
                          onClick={() => handleEnrollGoal(msg.recommendation!.title)}
                          className={cn(
                            'w-full py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1 tactile-btn',
                            enrolledGoals.includes(msg.recommendation.title)
                              ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                          )}
                        >
                          {enrolledGoals.includes(msg.recommendation.title) ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Enrolled in Roadmap</span>
                            </>
                          ) : (
                            <>
                              <span>Add to Career Roadmap</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 block px-1">{msg.timestamp}</span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center space-x-2 text-xs text-slate-400 p-2">
              <Bot className="w-4 h-4 text-amber-500 animate-spin" />
              <span>Analyzing SRM career graph...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className={cn("p-2 px-4 border-t flex items-center space-x-2 overflow-x-auto text-[11px]", isLight ? "bg-slate-50 border-slate-200" : "bg-slate-900/60 border-slate-800")}>
          <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className={cn(
                "px-2.5 py-1 rounded-lg border whitespace-nowrap transition-colors font-medium tactile-btn",
                isLight ? "bg-white border-slate-300 text-slate-700 hover:bg-slate-100" : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
              )}
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className={cn("p-4 border-t flex items-center space-x-2", isLight ? "bg-white border-slate-200" : "bg-slate-900 border-slate-800")}>
          <input
            type="text"
            placeholder="Ask AI Advisor about your career trajectory..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className={cn(
              "flex-1 p-3 rounded-xl border text-xs focus:outline-none focus:border-amber-500 font-medium",
              isLight ? "bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-500" : "bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400"
            )}
          />
          <button
            onClick={() => handleSendMessage()}
            className="p-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors tactile-btn shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
