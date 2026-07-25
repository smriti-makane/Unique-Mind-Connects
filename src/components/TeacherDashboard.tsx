import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  FileText, 
  Smile, 
  Plus,
  BookOpen
} from 'lucide-react';
import { STUDENT_PROGRESS_LIST } from '../data/learningData';

export const TeacherDashboard: React.FC = () => {
  const [students, setStudents] = useState(STUDENT_PROGRESS_LIST);
  const [assignmentName, setAssignmentName] = useState('');
  const [assignedCount, setAssignedCount] = useState<number | null>(null);

  const handleAssignTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentName.trim()) return;
    setAssignedCount(students.length);
    setAssignmentName('');
    setTimeout(() => setAssignedCount(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-teal-800">
        <div className="flex items-center space-x-3 mb-2">
          <GraduationCap className="w-8 h-8 text-emerald-300" />
          <h2 className="text-2xl sm:text-3xl font-black">Teacher & Special Education Portal</h2>
        </div>
        <p className="text-teal-100 text-sm max-w-2xl leading-relaxed">
          Track student neurodiverse accommodations, monitor real-time class mood trends, and deploy personalized adaptive learning assignments.
        </p>
      </div>

      {/* Class Statistics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase">Active Roster</p>
          <p className="text-2xl font-black text-slate-800">{students.length} Learners</p>
          <p className="text-[11px] text-teal-600 font-bold">100% IEP / Accommodation Active</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase">Class Avg Focus Score</p>
          <p className="text-2xl font-black text-emerald-600">85% Focus Rate</p>
          <p className="text-[11px] text-emerald-600 font-bold">Optimal learning conditions</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase">Weekly Submissions</p>
          <p className="text-2xl font-black text-teal-700">39 Lessons Completed</p>
          <p className="text-[11px] text-teal-600 font-bold">+12% vs prior week</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Student Roster */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-600" /> Student Neurodiverse Roster
            </h3>
            <span className="text-xs text-slate-500 font-semibold">{students.length} Students Active</span>
          </div>

          <div className="space-y-4">
            {students.map((st) => (
              <div
                key={st.studentName}
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={st.avatar}
                    alt={st.studentName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-teal-500 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{st.studentName}</h4>
                    <p className="text-xs text-teal-600 font-semibold">{st.grade}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Dominant Mood: <span className="font-bold text-slate-700">{st.dominantMood}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <p className="font-bold text-slate-800">{st.focusScore}% Focus</p>
                    <p className="text-[10px] text-slate-500">{st.completedLessons} Lessons Done</p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      st.status === 'Thriving'
                        ? 'bg-emerald-100 text-emerald-800'
                        : st.status === 'Needs Break'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-teal-100 text-teal-800'
                    }`}
                  >
                    {st.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Assign Adaptive Homework */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-600" /> Deploy Adaptive Homework
          </h3>

          {assignedCount !== null ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="font-bold text-sm">Assignment Deployed!</p>
              <p className="text-xs text-emerald-700">Sent to all {assignedCount} student dashboards.</p>
            </div>
          ) : (
            <form onSubmit={handleAssignTask} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Assignment Title</label>
                <input
                  type="text"
                  required
                  value={assignmentName}
                  onChange={(e) => setAssignmentName(e.target.value)}
                  placeholder="e.g. Visual Fractions & Sensory Check"
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Target Difficulty</label>
                <select className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-500">
                  <option>Gentle / Visual Cards</option>
                  <option>Balanced / Interactive</option>
                  <option>Accelerated</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Accommodations Included</label>
                <div className="space-y-1.5 mt-1 text-xs text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-teal-600" />
                    <span>Auto-embed 1-min breathing pauses</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-teal-600" />
                    <span>Enable Dyslexia-friendly font preset</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-teal-600" />
                    <span>Allow Text-to-Speech audio reader</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Deploy to Class Roster
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
