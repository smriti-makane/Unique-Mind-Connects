import React from 'react';
import { 
  Trophy, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Star,
  Zap,
  Lock
} from 'lucide-react';
import { Quest, UserData } from '../types';

interface QuestsAndRewardsProps {
  quests: Quest[];
  userData: UserData;
}

export const QuestsAndRewards: React.FC<QuestsAndRewardsProps> = ({ quests, userData }) => {
  const BADGES = [
    { name: 'First Steps Explorer', icon: '🌟', minLevel: 1, req: 'Start using the platform' },
    { name: 'Quiz Master', icon: '🧠', minLevel: 1, req: 'Complete a quiz with 80%+' },
    { name: 'Word Wizard', icon: '🔤', minLevel: 1, req: 'Solve a word puzzle' },
    { name: 'Emotion Expert', icon: '🎭', minLevel: 2, req: 'Perform facial emotion check' },
    { name: 'Mindfulness Champion', icon: '🧘', minLevel: 2, req: 'Finish guided breathing' },
    { name: 'Streak Legend', icon: '🔥', minLevel: 3, req: 'Maintain a 3-day active streak' },
  ];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-teal-800 to-emerald-800 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center space-x-3 mb-2">
          <Trophy className="w-8 h-8 text-amber-300" />
          <h2 className="text-2xl sm:text-3xl font-black">Quests & Reward System</h2>
        </div>
        <p className="text-amber-100 text-sm max-w-2xl leading-relaxed">
          Track milestones, complete daily challenges, and earn achievement points to level up your learning profile.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Quests List */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Active Learning Quests
          </h3>

          <div className="space-y-4">
            {quests.map((q) => {
              const pct = Math.min(
                100,
                Math.round((q.currentProgress / q.completionCriteria) * 100)
              );
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border transition-all ${
                    q.completed
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-teal-600 uppercase">
                          [{q.category}]
                        </span>
                        <h4 className="font-bold text-slate-800 text-sm">{q.name}</h4>
                      </div>
                      <p className="text-slate-500 text-xs mt-0.5">{q.description}</p>
                    </div>

                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg shrink-0">
                      +{q.reward} pts
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1 mt-3">
                    <div className="flex justify-between text-[11px] font-bold text-slate-500">
                      <span>Progress</span>
                      <span>
                        {q.completed ? '100%' : `${pct}%`}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          q.completed ? 'bg-emerald-500' : 'bg-teal-600'
                        }`}
                        style={{ width: `${q.completed ? 100 : pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges & Milestone Showcase */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Award className="w-5 h-5 text-teal-600" />
            Achievement Badges
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {BADGES.map((b) => {
              const isUnlocked = userData.level >= b.minLevel;
              return (
                <div
                  key={b.name}
                  className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                    isUnlocked
                      ? 'bg-teal-50/50 border-teal-200 text-slate-800'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="text-3xl relative inline-block">
                    {b.icon}
                    {!isUnlocked && (
                      <Lock className="w-4 h-4 text-slate-500 absolute -top-1 -right-1" />
                    )}
                  </div>
                  <h4 className="font-bold text-xs">{b.name}</h4>
                  <p className="text-[10px] text-slate-500">{b.req}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
