import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Camera, 
  Flame, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  RefreshCw, 
  AlertCircle,
  Sliders,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { UserData, StreakDay } from '../types';
import { StreakVisualization } from './StreakVisualization';

interface ProfileSectionProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onEarnPoints: (points: number, reason: string) => void;
}

// Generate 30 days of streak data ending today
const generate30DayStreakData = (currentStreakDays: number): StreakDay[] => {
  const result: StreakDay[] = [];
  const today = new Date();

  let runningStreak = 0;

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);

    const isToday = i === 0;
    // Simulate active days over the last 30 days with a strong trend leading to currentStreakDays
    let loggedAt = true;
    if (i > currentStreakDays && i % 6 === 2) {
      loggedAt = false; // occasional gap in past
      runningStreak = 0;
    } else {
      loggedAt = true;
      runningStreak += 1;
    }

    const dayLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const dateStr = d.toISOString().split('T')[0];

    const activeMinutes = loggedAt ? Math.floor(20 + Math.random() * 45) : 0;
    const completedActivities = loggedAt ? Math.floor(1 + Math.random() * 5) : 0;

    result.push({
      date: dateStr,
      dayLabel,
      loggedAt,
      streakCount: runningStreak,
      activeMinutes,
      completedActivities,
    });
  }

  return result;
};

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  userData,
  setUserData,
  onEarnPoints,
}) => {
  const [streakData, setStreakData] = useState<StreakDay[]>(() =>
    generate30DayStreakData(userData.streakDays)
  );

  // Profile Avatar & Camera State
  const [profileAvatar, setProfileAvatar] = useState<string | null>(() => {
    return localStorage.getItem('umc_profile_avatar');
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraSuccessMsg, setCameraSuccessMsg] = useState<string | null>(null);

  // Start webcam for profile photo / verification
  const startCamera = async () => {
    setCameraError(null);
    setCameraSuccessMsg(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 400, height: 400, facingMode: 'user' },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError('Unable to access webcam for profile photo. Please enable camera permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Capture Photo & Verify Daily Login Streak via Camera
  const captureProfilePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = 300;
    canvas.height = 300;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, 300, 300);
      const photoUrl = canvas.toDataURL('image/png');
      setProfileAvatar(photoUrl);
      localStorage.setItem('umc_profile_avatar', photoUrl);

      stopCamera();
      setCameraSuccessMsg('Profile verified! Photo snapshot updated & daily camera check-in logged.');
      onEarnPoints(35, 'Verified Profile & Streak Check-in with Camera!');

      // Ensure today's streak is marked
      setStreakData((prev) => {
        const updated = [...prev];
        if (updated.length > 0) {
          const lastIdx = updated.length - 1;
          updated[lastIdx] = {
            ...updated[lastIdx],
            loggedAt: true,
            streakCount: updated[lastIdx].streakCount || userData.streakDays + 1,
            completedActivities: updated[lastIdx].completedActivities + 1,
          };
        }
        return updated;
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-indigo-900 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center space-x-3 mb-2">
          <User className="w-8 h-8 text-emerald-300" />
          <h2 className="text-2xl sm:text-3xl font-black">Learner Profile & Streak Analytics</h2>
        </div>
        <p className="text-teal-100 text-sm max-w-2xl leading-relaxed">
          Monitor your 30-day learning streak trends using custom D3 analytics and verify your daily check-in with your webcam.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card & Camera Check-in */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4 text-center">
            {/* Avatar Display */}
            <div className="relative w-32 h-32 mx-auto">
              {profileAvatar ? (
                <img
                  src={profileAvatar}
                  alt="Profile Avatar"
                  className="w-32 h-32 rounded-full object-cover border-4 border-teal-500 shadow-md"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-teal-100 border-4 border-teal-500 text-teal-800 flex items-center justify-center font-black text-4xl shadow-inner">
                  UM
                </div>
              )}

              <span className="absolute bottom-0 right-0 bg-emerald-500 text-white p-2 rounded-full shadow-md border-2 border-white">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-800">Learner Profile</h3>
              <p className="text-xs text-teal-600 font-bold uppercase tracking-wider">
                Level {userData.level} Scholar
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-left">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Points</p>
                <p className="text-lg font-black text-emerald-600">{userData.points} pts</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Active Streak</p>
                <p className="text-lg font-black text-amber-500">🔥 {userData.streakDays} Days</p>
              </div>
            </div>
          </div>

          {/* Camera Profile Verification Box */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-teal-600" />
              Camera Profile Verification
            </h4>

            {!isCameraActive ? (
              <button
                onClick={startCamera}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4" /> Take Profile Photo & Check In
              </button>
            ) : (
              <div className="space-y-3">
                <div className="relative bg-slate-900 rounded-2xl overflow-hidden aspect-square max-w-[220px] mx-auto border border-slate-700 shadow-inner">
                  <video
                    ref={videoRef}
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={captureProfilePhoto}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    Capture Snapshot
                  </button>
                  <button
                    onClick={stopCamera}
                    className="px-3 py-2 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {cameraError && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{cameraError}</span>
              </div>
            )}

            {cameraSuccessMsg && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{cameraSuccessMsg}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: D3 30-Day Streak Visualization Component */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                D3 Visualization Engine
              </span>
              <h3 className="text-xl font-bold text-slate-800">30-Day Login Streak Trends</h3>
            </div>

            <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-600" /> {userData.streakDays} Day Active
            </span>
          </div>

          {/* D3 Streak Visualization */}
          <StreakVisualization data={streakData} />
        </div>
      </div>
    </div>
  );
};
