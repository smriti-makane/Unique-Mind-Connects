import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Sliders, 
  Eye, 
  Volume2, 
  Touchpad, 
  ArrowRight,
  Lightbulb,
  Check
} from 'lucide-react';
import { UserData, LearningResource } from '../types';
import { LEARNING_RESOURCES } from '../data/learningData';

interface AdaptiveLearningProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onEarnPoints: (points: number, reason: string) => void;
}

export const AdaptiveLearning: React.FC<AdaptiveLearningProps> = ({
  userData,
  setUserData,
  onEarnPoints,
}) => {
  const [resources, setResources] = useState<LearningResource[]>(LEARNING_RESOURCES);
  const [activeResource, setActiveResource] = useState<LearningResource | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const updatePace = (pace: 'gentle' | 'balanced' | 'accelerated') => {
    setUserData((prev) => ({ ...prev, learningPace: pace }));
  };

  const updateStyle = (style: 'visual' | 'auditory' | 'interactive') => {
    setUserData((prev) => ({ ...prev, learningStyle: style }));
  };

  const handleCompleteResource = (resId: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === resId ? { ...r, completed: true } : r))
    );
    onEarnPoints(30, 'Completed adaptive learning module!');
    setActiveResource(null);
  };

  return (
    <div className="space-y-8">
      {/* Hero Intro Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-100 text-teal-800 text-xs font-bold rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Personalized Pathway
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              Adaptive Learning Paths
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
              Educational content tailored dynamically to your comfort level, sensory preferences, and pacing. Learn at your own comfortable speed.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-xs border border-teal-100 flex items-center space-x-4">
            <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center font-bold text-lg">
              🎯
            </div>
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Current Pace</p>
              <p className="text-base font-bold text-slate-800 capitalize">{userData.learningPace} Pace</p>
              <p className="text-xs text-teal-600 font-medium capitalize">Style: {userData.learningStyle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customization Preferences Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex items-center space-x-2 text-slate-800 font-bold text-lg">
          <Sliders className="w-5 h-5 text-teal-600" />
          <h3>Personalize Your Learning Preferences</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pacing Option */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Learning Pace
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['gentle', 'balanced', 'accelerated'] as const).map((pace) => (
                <button
                  key={pace}
                  onClick={() => updatePace(pace)}
                  className={`py-2 px-3 rounded-lg border text-xs font-bold capitalize transition-all cursor-pointer ${
                    userData.learningPace === pace
                      ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {pace}
                </button>
              ))}
            </div>
          </div>

          {/* Style Option */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Primary Learning Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'visual', label: 'Visual', icon: Eye },
                { id: 'auditory', label: 'Auditory', icon: Volume2 },
                { id: 'interactive', label: 'Hands-on', icon: Touchpad },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => updateStyle(id as any)}
                  className={`flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                    userData.learningStyle === id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Adaptive Resource Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-teal-600" />
          Recommended Adaptive Modules
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((res) => (
            <div
              key={res.id}
              className={`bg-white border rounded-2xl p-6 shadow-xs flex flex-col justify-between transition-all hover:shadow-md ${
                res.completed ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-teal-100 text-teal-800 rounded-md">
                    {res.category}
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      res.difficulty === 'Easy'
                        ? 'bg-emerald-100 text-emerald-800'
                        : res.difficulty === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {res.difficulty}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-800">{res.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{res.summary}</p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                {res.completed ? (
                  <span className="inline-flex items-center text-xs font-bold text-emerald-600">
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Module Mastered
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 font-medium">Earn +30 pts</span>
                )}

                <button
                  onClick={() => {
                    setActiveResource(res);
                    setActiveStep(0);
                  }}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  {res.completed ? 'Review' : 'Start Lesson'} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Lesson Modal */}
      {activeResource && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-slate-100">
            <div className="flex items-center justify-between border-b pb-4 border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase text-teal-600 tracking-wider">
                  {activeResource.category}
                </span>
                <h3 className="text-2xl font-black text-slate-800">{activeResource.title}</h3>
              </div>
              <button
                onClick={() => setActiveResource(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl px-2 py-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Interactive Flashcard Step */}
            <div className="bg-slate-50 border border-teal-100 rounded-xl p-6 min-h-[160px] flex flex-col justify-center items-center text-center space-y-3">
              <span className="text-xs text-teal-600 font-bold uppercase">
                Step {activeStep + 1} of {activeResource.content.length}
              </span>
              <p className="text-lg font-bold text-slate-800 leading-snug">
                {activeResource.content[activeStep]}
              </p>
            </div>

            {/* Tip Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3 text-xs text-amber-900">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Adaptive Learning Tip:</p>
                <p>{activeResource.tips}</p>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((s) => s - 1)}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 disabled:opacity-40 cursor-pointer"
              >
                Previous
              </button>

              {activeStep < activeResource.content.length - 1 ? (
                <button
                  onClick={() => setActiveStep((s) => s + 1)}
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1"
                >
                  Next Step <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => handleCompleteResource(activeResource.id)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Complete Lesson
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
