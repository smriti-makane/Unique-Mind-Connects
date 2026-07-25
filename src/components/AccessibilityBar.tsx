import React from 'react';
import { AccessibilitySettings } from '../types';
import { Type, Eye, Volume2, Sparkles, SlidersHorizontal, Layers } from 'lucide-react';

interface AccessibilityBarProps {
  settings: AccessibilitySettings;
  setSettings: React.Dispatch<React.SetStateAction<AccessibilitySettings>>;
}

export const AccessibilityBar: React.FC<AccessibilityBarProps> = ({
  settings,
  setSettings,
}) => {
  const toggleSetting = (key: keyof AccessibilitySettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const speakHelper = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text =
        "Welcome to Unique Minds Connect. Accessibility options are enabled. You can toggle Dyslexia Friendly font, High Contrast mode, and large text size at any time.";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 shadow-inner">
      <div className="flex items-center space-x-2">
        <SlidersHorizontal className="w-4 h-4 text-teal-400" />
        <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
          Neurodiverse Accessibility Suite:
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Dyslexia Font Toggle */}
        <button
          onClick={() => toggleSetting('dyslexiaFont')}
          className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            settings.dyslexiaFont
              ? 'bg-amber-400 text-slate-950 shadow-xs'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>Dyslexia Font</span>
        </button>

        {/* High Contrast Mode Toggle */}
        <button
          onClick={() => toggleSetting('highContrast')}
          className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            settings.highContrast
              ? 'bg-teal-400 text-slate-950 shadow-xs'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>High Contrast</span>
        </button>

        {/* Large Text Size Toggle */}
        <button
          onClick={() => toggleSetting('largeText')}
          className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            settings.largeText
              ? 'bg-emerald-400 text-slate-950 shadow-xs'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Large Text</span>
        </button>

        {/* Text-To-Speech Reader Helper */}
        <button
          onClick={speakHelper}
          className="px-3 py-1 bg-teal-800/80 hover:bg-teal-700 text-teal-200 border border-teal-600/40 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5"
          title="Read accessibility guide aloud"
        >
          <Volume2 className="w-3.5 h-3.5 text-teal-300" />
          <span>Read Aloud</span>
        </button>
      </div>
    </div>
  );
};
