import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  Smile, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Calendar, 
  MessageSquare,
  ShieldCheck,
  Bell
} from 'lucide-react';
import { UserData } from '../types';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

interface ParentDashboardProps {
  userData: UserData;
}

const EMOTION_SUMMARY = [
  { name: 'Calm & Focused', value: 65, color: '#0d9488' },
  { name: 'Energetic', value: 20, color: '#10b981' },
  { name: 'Anxious / Tired', value: 10, color: '#f59e0b' },
  { name: 'Overwhelmed', value: 5, color: '#ef4444' },
];

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ userData }) => {
  const [pacingLimit, setPacingLimit] = useState(45); // Max mins per day

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-teal-800">
        <div className="flex items-center space-x-3 mb-2">
          <Users className="w-8 h-8 text-teal-300" />
          <h2 className="text-2xl sm:text-3xl font-black">Parent Portal & Insights</h2>
        </div>
        <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
          Monitor your child's learning engagement, emotional wellness trends, and customized sensory break recommendations in real time.
        </p>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase">Child Account</p>
          <p className="text-xl font-black text-slate-800">{userData.userName || 'Learner'}</p>
          <p className="text-[11px] text-teal-600 font-bold">Grade 3 (Adaptive Track)</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase">Weekly Study Time</p>
          <p className="text-xl font-black text-slate-800">4 Hours 15 Mins</p>
          <p className="text-[11px] text-emerald-600 font-bold">Within healthy pacing goals</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase">Active Streak</p>
          <p className="text-xl font-black text-amber-500">🔥 {userData.streakDays} Days</p>
          <p className="text-[11px] text-slate-500 font-bold">Consistent daily check-ins</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase">Overall Wellness</p>
          <p className="text-xl font-black text-emerald-600">Thriving (92%)</p>
          <p className="text-[11px] text-teal-600 font-bold">High Focus, Low Anxiety</p>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Emotional Wellness Pie Chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <Smile className="w-5 h-5 text-teal-600" /> 30-Day Emotion Breakdown
            </h3>
            <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-lg">
              Camera AI Data
            </span>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={EMOTION_SUMMARY}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  innerRadius={45}
                  paddingAngle={3}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                >
                  {EMOTION_SUMMARY.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-xl border border-slate-200">
            "Your child demonstrates strong focus during visual phonics and math. Sensory breathing breaks have successfully lowered anxiety spikes."
          </p>
        </div>

        {/* Pacing Controls & Teacher Feedback */}
        <div className="space-y-6">
          {/* Daily Screen Time & Pacing Limits */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-600" /> Daily Screen Time & Sensory Pacing
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Maximum Daily Study Limit</span>
                <span className="text-teal-600">{pacingLimit} Minutes / Day</span>
              </div>
              <input
                type="range"
                min="15"
                max="90"
                step="5"
                value={pacingLimit}
                onChange={(e) => setPacingLimit(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                When the limit is reached, the app gently prompts the learner to take an offline sensory break.
              </p>
            </div>
          </div>

          {/* Teacher Feedback Notes */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-teal-600" /> Educator Notes & Recommendations
            </h3>

            <div className="space-y-3">
              <div className="p-3 bg-teal-50/60 border border-teal-200 rounded-xl space-y-1">
                <div className="flex justify-between text-xs font-bold text-teal-900">
                  <span>Ms. Evelyn (Special Ed Lead)</span>
                  <span className="text-slate-400 font-normal">Yesterday</span>
                </div>
                <p className="text-xs text-teal-800 leading-relaxed">
                  "Alex excelled on the letter shape matching exercise! We recommend continuing visual math dot grids for next week's homework."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
