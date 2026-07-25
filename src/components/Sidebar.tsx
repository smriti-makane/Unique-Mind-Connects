import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Bot, 
  Smile, 
  Sliders, 
  HelpCircle, 
  Gamepad2, 
  HeartHandshake, 
  Trophy, 
  Users, 
  GraduationCap, 
  User, 
  MessageSquare, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Flame,
  Globe
} from 'lucide-react';
import { NavigationTab, UserData } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  userData: UserData;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  userData,
  collapsed,
  setCollapsed,
}) => {
  const mainNav = [
    { id: 'landing' as NavigationTab, label: 'Overview & Hero', icon: Globe },
    { id: 'dashboard' as NavigationTab, label: 'Student Dashboard', icon: LayoutDashboard },
    { id: 'courses' as NavigationTab, label: 'Course Catalog', icon: BookOpen },
    { id: 'aitutor' as NavigationTab, label: 'AI Tutor Chat', icon: Bot, badge: 'AI' },
    { id: 'emotions' as NavigationTab, label: 'Emotion Recognition', icon: Smile, badge: 'Camera' },
  ];

  const practiceNav = [
    { id: 'adaptive' as NavigationTab, label: 'Adaptive Learning', icon: Sliders },
    { id: 'assessments' as NavigationTab, label: 'Quizzes & Tests', icon: HelpCircle },
    { id: 'gamified' as NavigationTab, label: 'Gamified Puzzles', icon: Gamepad2 },
    { id: 'supportive' as NavigationTab, label: 'Sensory Tools', icon: HeartHandshake },
    { id: 'quests' as NavigationTab, label: 'Quests & Badges', icon: Trophy },
  ];

  const portalNav = [
    { id: 'parent' as NavigationTab, label: 'Parent Portal', icon: Users },
    { id: 'teacher' as NavigationTab, label: 'Teacher Portal', icon: GraduationCap },
    { id: 'profile' as NavigationTab, label: 'Profile & Streak', icon: User },
    { id: 'feedback' as NavigationTab, label: 'Feedback', icon: MessageSquare },
  ];

  const renderGroup = (items: typeof mainNav, groupTitle?: string) => (
    <div className="space-y-1">
      {groupTitle && !collapsed && (
        <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mt-4 mb-1">
          {groupTitle}
        </p>
      )}
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            title={collapsed ? item.label : undefined}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs transition-all cursor-pointer ${
              isActive
                ? 'bg-teal-700 text-white shadow-sm font-bold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3 min-w-0">
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-teal-200' : 'text-slate-400'}`} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </div>
            {!collapsed && item.badge && (
              <span className="text-[9px] font-black bg-teal-500/20 text-teal-300 border border-teal-500/30 px-1.5 py-0.5 rounded-md uppercase shrink-0">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <aside
      className={`bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col justify-between transition-all duration-300 z-30 shrink-0 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Sidebar Header & Brand Logo */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        {!collapsed ? (
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center text-white shadow-md font-black text-sm">
              ✨
            </div>
            <div>
              <h1 className="font-black text-sm text-white tracking-wide leading-tight">
                Unique Minds
              </h1>
              <p className="text-[10px] text-teal-400 font-semibold tracking-wider">
                CONNECT AI
              </p>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center text-white mx-auto font-bold text-xs">
            UM
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 hover:bg-slate-800 text-slate-400 rounded-lg cursor-pointer transition-colors hidden sm:block"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {renderGroup(mainNav, 'Core Experience')}
        {renderGroup(practiceNav, 'Adaptive Practice')}
        {renderGroup(portalNav, 'Community & Portals')}
      </div>

      {/* Footer User Widget */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/50">
        {!collapsed ? (
          <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 min-w-0">
                <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {userData.userName ? userData.userName[0] : 'U'}
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-white truncate">{userData.userName || 'Learner'}</p>
                  <p className="text-[10px] text-teal-400 capitalize">{userData.role}</p>
                </div>
              </div>
              <span className="text-xs font-black text-amber-400 flex items-center gap-0.5">
                <Flame className="w-3.5 h-3.5" /> {userData.streakDays}d
              </span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, (userData.points % 250) / 2.5)}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 text-right font-semibold">
              Level {userData.level} ({userData.points} XP)
            </p>
          </div>
        ) : (
          <div
            onClick={() => setActiveTab('profile')}
            className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold mx-auto cursor-pointer hover:bg-teal-600 transition-colors"
            title="View Profile"
          >
            L{userData.level}
          </div>
        )}
      </div>
    </aside>
  );
};
