import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Brain, 
  Smile, 
  BookOpen, 
  BarChart3, 
  Users, 
  GraduationCap, 
  Bot, 
  ShieldCheck, 
  Heart,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { NavigationTab, UserData } from '../types';

interface LandingPageProps {
  onNavigate: (tab: NavigationTab) => void;
  userData: UserData;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, userData }) => {
  const FEATURES = [
    {
      icon: Brain,
      title: 'AI Adaptive Learning',
      desc: 'Smart algorithms adjust lesson pacing, sensory load, and question difficulty in real time based on learner focus.',
      color: 'from-teal-600 to-emerald-600',
    },
    {
      icon: Smile,
      title: 'Real-Time Emotion AI',
      desc: 'Webcam-based facial emotion detection measures confidence, frustration, and calm states to recommend timely breaks.',
      color: 'from-emerald-600 to-teal-700',
    },
    {
      icon: Bot,
      title: 'Interactive AI Tutor',
      desc: 'A patient, empathetic companion that answers questions using multi-sensory visual metaphors, audio, and simplified steps.',
      color: 'from-amber-600 to-teal-800',
    },
    {
      icon: BookOpen,
      title: 'Multi-Sensory Lessons',
      desc: 'Color-coded phonics, visual math dot grids, and interactive pattern puzzles optimized for ADHD, Autism, and Dyslexia.',
      color: 'from-teal-700 to-indigo-800',
    },
    {
      icon: BarChart3,
      title: 'D3 Progress Analytics',
      desc: '30-day streak monitoring, focus minute tracking, and visual milestone heatmaps for comprehensive growth tracking.',
      color: 'from-emerald-700 to-teal-800',
    },
    {
      icon: Users,
      title: 'Parent & Teacher Portals',
      desc: 'Dedicated views for parents and educators to track emotional wellness, task completion, and custom accommodations.',
      color: 'from-teal-800 to-slate-800',
    },
  ];

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-teal-700/40">
        {/* Animated Floating Gradient Blobs */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-teal-500/20 text-teal-300 border border-teal-400/30 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-teal-300 animate-spin" />
            <span>AI-Powered Education for Neurodiverse Learners</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Learn Smarter. <br />
            <span className="bg-gradient-to-r from-teal-200 via-emerald-300 to-amber-200 bg-clip-text text-transparent">
              Learn Your Way.
            </span>
          </h1>

          <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
            Unique Minds Connect is an intelligent, compassionate learning platform designed specifically for students with Autism, ADHD, Dyslexia, and unique learning styles. Empowered by real-time emotion recognition and adaptive AI tutoring.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm rounded-2xl shadow-lg cursor-pointer transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('courses')}
              className="px-8 py-4 bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-600 font-bold text-sm rounded-2xl cursor-pointer transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <BookOpen className="w-4 h-4 text-teal-300" />
              <span>Explore Courses</span>
            </button>

            <button
              onClick={() => onNavigate('aitutor')}
              className="px-8 py-4 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 font-bold text-sm rounded-2xl cursor-pointer transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <Bot className="w-4 h-4 text-amber-300" />
              <span>Talk to AI Tutor</span>
            </button>
          </div>

          <div className="pt-6 border-t border-teal-700/50 flex flex-wrap items-center gap-6 text-xs text-teal-200 font-semibold">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Camera Emotion Checks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Dyslexia-Friendly Typography</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>D3 30-Day Analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Showcase Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-teal-600 uppercase tracking-widest">
            ENGINEERED FOR INCLUSIVITY
          </span>
          <h2 className="text-3xl font-black text-slate-900">
            Comprehensive Adaptive Features
          </h2>
          <p className="text-slate-600 text-sm">
            Every component is tailored to provide gentle pacing, emotional grounding, and positive gamified feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all hover:-translate-y-1 group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.color} text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{feat.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Role Switch Callout Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-black text-amber-400 uppercase tracking-widest">
            MULTI-STAKEHOLDER SUPPORT
          </span>
          <h3 className="text-2xl font-black">Tailored Portals for Everyone</h3>
          <p className="text-slate-300 text-xs max-w-xl">
            Switch views anytime to access dedicated dashboards for Students, Parents, and Special Education Teachers.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-5 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            Student View
          </button>
          <button
            onClick={() => onNavigate('parent')}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 font-bold text-xs rounded-xl cursor-pointer"
          >
            Parent View
          </button>
          <button
            onClick={() => onNavigate('teacher')}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 font-bold text-xs rounded-xl cursor-pointer"
          >
            Teacher View
          </button>
        </div>
      </div>
    </div>
  );
};
