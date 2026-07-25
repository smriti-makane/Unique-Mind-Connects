import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Smile, 
  BookOpen, 
  Clock, 
  Trophy, 
  Zap, 
  ArrowRight, 
  Play, 
  Bot, 
  TrendingUp, 
  HeartHandshake,
  CheckCircle2,
  Award
} from 'lucide-react';
import { UserData, NavigationTab, CourseModule } from '../types';
import { COURSE_MODULES } from '../data/learningData';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface DashboardHomeProps {
  userData: UserData;
  onNavigate: (tab: NavigationTab) => void;
  onEarnPoints: (points: number, reason: string) => void;
}

const WEEKLY_ACTIVITY = [
  { day: 'Mon', focusMins: 35, lessons: 3 },
  { day: 'Tue', focusMins: 45, lessons: 4 },
  { day: 'Wed', focusMins: 30, lessons: 2 },
  { day: 'Thu', focusMins: 50, lessons: 5 },
  { day: 'Fri', focusMins: 40, lessons: 3 },
  { day: 'Sat', focusMins: 60, lessons: 6 },
  { day: 'Sun', focusMins: 25, lessons: 2 },
];

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  userData,
  onNavigate,
  onEarnPoints,
}) => {
  return (
    <div className="space-y-8">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-teal-600/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="bg-teal-500/30 text-teal-200 border border-teal-400/30 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Good Day, {userData.userName || 'Learner'} 👋
              </span>
              <span className="bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> {userData.streakDays} Day Streak
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black">
              You're doing fantastic! Ready for today's lesson?
            </h2>

            <p className="text-teal-100 text-xs sm:text-sm max-w-xl leading-relaxed">
              "Every small step in learning creates new pathways in your mind. Take your time, stay curious, and enjoy the journey."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onNavigate('courses')}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Resume Active Lesson</span>
            </button>
            <button
              onClick={() => onNavigate('emotions')}
              className="px-5 py-3.5 bg-teal-900/80 hover:bg-teal-900 text-teal-200 border border-teal-500/40 font-bold text-xs rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <Smile className="w-4 h-4 text-emerald-300" />
              <span>Emotion Check-in</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Completed Lessons</span>
            <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-800">{userData.completedLessonsCount || 14}</p>
          <p className="text-[11px] text-teal-600 font-bold">+3 completed this week</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Today's Focus Time</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-800">{userData.focusMinutesToday || 35} Mins</p>
          <p className="text-[11px] text-emerald-600 font-bold">Gentle Pacing Active</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Weekly Score</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-800">{userData.points} XP</p>
          <p className="text-[11px] text-amber-600 font-bold">Level {userData.level} Scholar</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Current Mood</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Smile className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-800">Calm & Focused</p>
          <p className="text-[11px] text-indigo-600 font-bold">94% Confidence</p>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: AI Learning Hero & Module Cards */}
        <div className="lg:col-span-2 space-y-8">
          {/* AI Recommendation Hero Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-slate-800 text-lg">AI Recommended Lesson</h3>
              </div>
              <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-lg">
                Adaptive
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
              <img
                src={COURSE_MODULES[0].image}
                alt="Course"
                className="w-full sm:w-32 h-24 rounded-lg object-cover"
              />
              <div className="flex-1 space-y-2">
                <h4 className="font-bold text-slate-800 text-sm">{COURSE_MODULES[0].title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{COURSE_MODULES[0].description}</p>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-600 h-full rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
              <button
                onClick={() => onNavigate('courses')}
                className="w-full sm:w-auto px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl cursor-pointer shrink-0"
              >
                Continue (75%)
              </button>
            </div>
          </div>

          {/* Course Modules Catalog Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-lg">Active Course Modules</h3>
              <button
                onClick={() => onNavigate('courses')}
                className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                View All Courses <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COURSE_MODULES.map((course) => (
                <div
                  key={course.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3 hover:border-teal-300 transition-all"
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-28 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-teal-600 uppercase">
                      {course.category}
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm mt-0.5">{course.title}</h4>
                    <p className="text-slate-500 text-xs line-clamp-2 mt-1">{course.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                    <span className="text-slate-500 font-medium">{course.duration}</span>
                    <button
                      onClick={() => onNavigate('courses')}
                      className="text-teal-600 font-bold hover:underline cursor-pointer"
                    >
                      Open Lesson →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Weekly Focus Chart & Quick Actions */}
        <div className="space-y-8">
          {/* Weekly Focus Time Chart */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-teal-600" /> Weekly Focus Mins
              </h3>
              <span className="text-xs text-slate-400 font-semibold">Last 7 Days</span>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WEEKLY_ACTIVITY}>
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} />
                  <YAxis stroke="#94a3b8" fontSize={10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="focusMins" fill="#0d9488" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick AI Tutor Callout */}
          <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-2xl p-6 shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-teal-300">
              <Bot className="w-5 h-5" />
              <h4 className="font-bold text-sm">Need Help with Homework?</h4>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Your AI Tutor can explain reading passages, convert math to visual drawings, or guide you through a sensory break.
            </p>
            <button
              onClick={() => onNavigate('aitutor')}
              className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer transition-colors"
            >
              Ask AI Tutor Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
