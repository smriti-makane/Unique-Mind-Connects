import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  BrainCircuit, 
  Gamepad2, 
  Smile, 
  HeartHandshake, 
  Trophy, 
  MessageSquare,
  Award,
  Zap,
  User
} from 'lucide-react';
import { NavigationTab, UserData } from '../types';

interface NavbarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  userData: UserData;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, userData }) => {
  const tabs: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'adaptive', label: 'Adaptive Learning', icon: BookOpen },
    { id: 'assessments', label: 'Assessments', icon: BrainCircuit },
    { id: 'gamified', label: 'Gamified Games', icon: Gamepad2 },
    { id: 'emotions', label: 'Emotion AI', icon: Smile },
    { id: 'supportive', label: 'Supportive Tools', icon: HeartHandshake },
    { id: 'quests', label: 'Quests & Badges', icon: Trophy },
    { id: 'profile', label: 'Profile & Streak', icon: User },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
  ];

  return (
    <header className="bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-800 text-white shadow-md sticky top-0 z-50">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 border-b border-teal-600/40 gap-4">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-emerald-400 text-teal-950 rounded-xl flex items-center justify-center font-bold shadow-inner">
              <Sparkles className="w-6 h-6 text-teal-900 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                Unique Minds Connect
              </h1>
              <p className="text-xs text-teal-200 font-medium">
                Tailored Education & Emotion Intelligence Platform
              </p>
            </div>
          </div>

          {/* User Stats Bar */}
          <div className="flex items-center flex-wrap gap-3">
            <div className="bg-teal-900/60 backdrop-blur border border-teal-500/30 px-3 py-1.5 rounded-lg flex items-center space-x-2 text-sm font-semibold">
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Level {userData.level}</span>
            </div>

            <div className="bg-teal-900/60 backdrop-blur border border-teal-500/30 px-3 py-1.5 rounded-lg flex items-center space-x-2 text-sm font-semibold">
              <Award className="w-4 h-4 text-emerald-300" />
              <span className="text-emerald-200">{userData.points} Points</span>
            </div>

            <button
              onClick={() => setActiveTab('profile')}
              className="bg-teal-900/60 hover:bg-teal-900/90 backdrop-blur border border-teal-500/30 px-3 py-1.5 rounded-lg flex items-center space-x-2 text-sm font-semibold cursor-pointer transition-all"
            >
              <span className="text-amber-400 font-bold">🔥 {userData.streakDays} Day Streak</span>
            </button>
          </div>

        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white text-teal-900 shadow-sm font-bold'
                    : 'text-teal-100 hover:bg-teal-700/60 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-700' : 'text-teal-200'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
