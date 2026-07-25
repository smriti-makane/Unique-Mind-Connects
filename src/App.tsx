import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { AccessibilityBar } from './components/AccessibilityBar';
import { LandingPage } from './components/LandingPage';
import { DashboardHome } from './components/DashboardHome';
import { CoursesView } from './components/CoursesView';
import { AITutor } from './components/AITutor';
import { ParentDashboard } from './components/ParentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdaptiveLearning } from './components/AdaptiveLearning';
import { PersonalizedAssessments } from './components/PersonalizedAssessments';
import { GamifiedLearning } from './components/GamifiedLearning';
import { EmotionRecognition } from './components/EmotionRecognition';
import { SupportiveResources } from './components/SupportiveResources';
import { QuestsAndRewards } from './components/QuestsAndRewards';
import { ProfileSection } from './components/ProfileSection';
import { FeedbackForm } from './components/FeedbackForm';

import { NavigationTab, UserData, Quest, AccessibilitySettings, UserRole } from './types';
import { INITIAL_QUESTS } from './data/learningData';
import { 
  Search, 
  Bell, 
  User, 
  Flame, 
  Sparkles, 
  ChevronDown, 
  ShieldCheck, 
  BookOpen, 
  Menu, 
  X 
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('landing');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  /* Accessibility Settings State */
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(() => {
    return {
      dyslexiaFont: false,
      highContrast: false,
      largeText: false,
      textToSpeech: false,
      reducedMotion: false,
    };
  });

  /* User Data Persistence */
  const [userData, setUserData] = useState<UserData>(() => {
    const saved = localStorage.getItem('umc_user_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          role: 'student',
          userName: 'Alex',
          focusMinutesToday: 35,
          completedLessonsCount: 14,
          ...parsed,
        };
      } catch (e) {
        console.error('Failed to parse saved user data', e);
      }
    }
    return {
      points: 150,
      level: 1,
      completedQuests: ['daily_login'],
      rewardsEarned: ['First Explorer'],
      streakDays: 4,
      learningPace: 'balanced',
      learningStyle: 'visual',
      role: 'student',
      userName: 'Alex Morgan',
      focusMinutesToday: 35,
      completedLessonsCount: 14,
    };
  });

  const [quests, setQuests] = useState<Quest[]>(() => {
    const saved = localStorage.getItem('umc_quests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved quests', e);
      }
    }
    return INITIAL_QUESTS;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('umc_user_data', JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    localStorage.setItem('umc_quests', JSON.stringify(quests));
  }, [quests]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleEarnPoints = (earned: number, reason: string) => {
    setUserData((prev) => {
      const newPoints = prev.points + earned;
      const newLevel = Math.floor(newPoints / 250) + 1;
      if (newLevel > prev.level) {
        showToast(`🎉 LEVEL UP! You reached Level ${newLevel}!`);
      } else {
        showToast(`+${earned} XP: ${reason}`);
      }
      return {
        ...prev,
        points: newPoints,
        level: newLevel,
      };
    });
  };

  const handleUpdateQuestProgress = (questId: string, progress: number) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === questId) {
          const updatedVal = Math.max(q.currentProgress, progress);
          const isNowCompleted = updatedVal >= q.completionCriteria;
          return {
            ...q,
            currentProgress: updatedVal,
            completed: q.completed || isNowCompleted,
          };
        }
        return q;
      })
    );
  };

  const handleRoleChange = (role: UserRole) => {
    setUserData((prev) => ({ ...prev, role }));
    if (role === 'parent') setActiveTab('parent');
    else if (role === 'teacher') setActiveTab('teacher');
    else setActiveTab('dashboard');
  };

  return (
    <div
      className={`min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-teal-100 selection:text-teal-900 transition-all ${
        accessibility.dyslexiaFont ? 'dyslexia-font' : ''
      } ${accessibility.highContrast ? 'high-contrast' : ''} ${
        accessibility.largeText ? 'large-text' : ''
      }`}
    >
      <div>
        {/* Top Accessibility Bar */}
        <AccessibilityBar settings={accessibility} setSettings={setAccessibility} />

        {/* Global SaaS App Shell */}
        <div className="flex h-[calc(100vh-36px)] overflow-hidden">
          {/* Desktop Left Sidebar */}
          <div className="hidden md:flex">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setMobileMenuOpen(false);
              }}
              userData={userData}
              collapsed={sidebarCollapsed}
              setCollapsed={setSidebarCollapsed}
            />
          </div>

          {/* Main Content Workspace Area */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50">
            {/* SaaS Top Navigation Header */}
            <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between gap-4 z-20 shrink-0">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl md:hidden cursor-pointer"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                {/* Search Bar */}
                <div className="relative hidden sm:block w-64 lg:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search courses, lessons, AI tutor..."
                    onClick={() => setActiveTab('courses')}
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Right Controls Header */}
              <div className="flex items-center space-x-3">
                {/* Role Switcher Dropdown */}
                <div className="relative">
                  <select
                    value={userData.role}
                    onChange={(e) => handleRoleChange(e.target.value as UserRole)}
                    className="bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-teal-500 capitalize"
                  >
                    <option value="student">🎓 Student View</option>
                    <option value="parent">👨‍👩‍👧 Parent View</option>
                    <option value="teacher">👩‍🏫 Teacher View</option>
                  </select>
                </div>

                {/* Notifications Drawer Toggle */}
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl relative cursor-pointer"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="w-2 h-2 bg-emerald-500 rounded-full absolute top-1.5 right-1.5" />
                </button>

                {/* Notification Dropdown Panel */}
                {showNotifications && (
                  <div className="absolute top-14 right-16 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 text-xs space-y-3 animate-fade-in">
                    <div className="flex justify-between items-center border-b pb-2 border-slate-100">
                      <span className="font-bold text-slate-800">Notifications</span>
                      <span className="text-[10px] text-teal-600 font-bold">2 New</span>
                    </div>
                    <div className="space-y-2">
                      <div className="p-2.5 bg-teal-50 rounded-xl border border-teal-100">
                        <p className="font-bold text-teal-900">🎉 Daily Quest Complete</p>
                        <p className="text-[11px] text-teal-700">You maintained your 4-day active streak!</p>
                      </div>
                      <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-100">
                        <p className="font-bold text-amber-900">💡 AI Recommendation</p>
                        <p className="text-[11px] text-amber-800">Time for a 1-minute visual breathing break.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* User Profile Pill */}
                <button
                  onClick={() => setActiveTab('profile')}
                  className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 p-1.5 pr-3 rounded-xl cursor-pointer transition-colors"
                >
                  <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center text-xs font-bold">
                    {userData.userName ? userData.userName[0] : 'U'}
                  </div>
                  <span className="text-xs font-bold text-slate-700 hidden sm:inline">
                    {userData.userName || 'Learner'}
                  </span>
                </button>
              </div>
            </header>

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
              <div className="md:hidden fixed inset-0 z-40 bg-slate-950/60 flex">
                <div className="w-64 bg-slate-900 h-full">
                  <Sidebar
                    activeTab={activeTab}
                    setActiveTab={(tab) => {
                      setActiveTab(tab);
                      setMobileMenuOpen(false);
                    }}
                    userData={userData}
                    collapsed={false}
                    setCollapsed={() => {}}
                  />
                </div>
                <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
              </div>
            )}

            {/* Main Scrollable Canvas */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
              {activeTab === 'landing' && (
                <LandingPage onNavigate={setActiveTab} userData={userData} />
              )}

              {activeTab === 'dashboard' && (
                <DashboardHome
                  userData={userData}
                  onNavigate={setActiveTab}
                  onEarnPoints={handleEarnPoints}
                />
              )}

              {activeTab === 'courses' && (
                <CoursesView onEarnPoints={handleEarnPoints} />
              )}

              {activeTab === 'aitutor' && (
                <AITutor onNavigate={setActiveTab} onEarnPoints={handleEarnPoints} />
              )}

              {activeTab === 'emotions' && (
                <EmotionRecognition
                  onEarnPoints={handleEarnPoints}
                  onUpdateQuestProgress={handleUpdateQuestProgress}
                  onNavigateToSupportive={() => setActiveTab('supportive')}
                />
              )}

              {activeTab === 'adaptive' && (
                <AdaptiveLearning
                  userData={userData}
                  setUserData={setUserData}
                  onEarnPoints={handleEarnPoints}
                />
              )}

              {activeTab === 'assessments' && (
                <PersonalizedAssessments
                  onEarnPoints={handleEarnPoints}
                  onUpdateQuestProgress={handleUpdateQuestProgress}
                />
              )}

              {activeTab === 'gamified' && (
                <GamifiedLearning
                  onEarnPoints={handleEarnPoints}
                  onUpdateQuestProgress={handleUpdateQuestProgress}
                />
              )}

              {activeTab === 'supportive' && (
                <SupportiveResources
                  onEarnPoints={handleEarnPoints}
                  onUpdateQuestProgress={handleUpdateQuestProgress}
                />
              )}

              {activeTab === 'quests' && (
                <QuestsAndRewards quests={quests} userData={userData} />
              )}

              {activeTab === 'parent' && <ParentDashboard userData={userData} />}

              {activeTab === 'teacher' && <TeacherDashboard />}

              {activeTab === 'profile' && (
                <ProfileSection
                  userData={userData}
                  setUserData={setUserData}
                  onEarnPoints={handleEarnPoints}
                />
              )}

              {activeTab === 'feedback' && <FeedbackForm />}
            </main>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-teal-900 text-white border border-emerald-400 px-5 py-3 rounded-2xl shadow-2xl font-bold text-sm flex items-center space-x-2 animate-bounce">
            <span>✨ {toastMessage}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-4 px-4 text-center text-xs shrink-0">
        <p className="font-bold text-slate-300">
          © 2026 Unique Minds Connect — Empowering Neurodiverse Learners Everywhere
        </p>
      </footer>
    </div>
  );
}

export default App;
