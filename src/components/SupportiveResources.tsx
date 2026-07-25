import React, { useState, useEffect } from 'react';
import { 
  HeartHandshake, 
  Wind, 
  Volume2, 
  Clock, 
  BookOpen, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface SupportiveResourcesProps {
  onEarnPoints: (points: number, reason: string) => void;
  onUpdateQuestProgress: (questId: string, progress: number) => void;
}

export const SupportiveResources: React.FC<SupportiveResourcesProps> = ({
  onEarnPoints,
  onUpdateQuestProgress,
}) => {
  /* ---------------- Breathing Tool State ---------------- */
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathCycles, setBreathCycles] = useState(0);

  useEffect(() => {
    if (!isBreathingActive) return;

    const interval = setInterval(() => {
      setBreathPhase((prev) => {
        if (prev === 'Inhale') return 'Hold';
        if (prev === 'Hold') return 'Exhale';
        setBreathCycles((c) => {
          const next = c + 1;
          if (next >= 4) {
            setIsBreathingActive(false);
            onEarnPoints(50, 'Completed 1-minute Guided Breathing session!');
            onUpdateQuestProgress('calm_session', 1);
          }
          return next;
        });
        return 'Inhale';
      });
    }, 4000); // 4 sec per phase

    return () => clearInterval(interval);
  }, [isBreathingActive]);

  /* ---------------- Audio Synthesizer State ---------------- */
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null);
  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const noiseNodeRef = React.useRef<AudioNode | null>(null);

  const toggleSound = (soundType: 'white' | 'rain' | 'chime') => {
    if (audioPlaying === soundType) {
      // Stop audio
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setAudioPlaying(null);
      return;
    }

    // Stop existing audio
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
    }

    // Create new Web Audio synth sound
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioCtxRef.current = ctx;

    if (soundType === 'white' || soundType === 'rain') {
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      // Filter for rain / white noise soft spectrum
      const filter = ctx.createBiquadFilter();
      filter.type = soundType === 'rain' ? 'lowpass' : 'bandpass';
      filter.frequency.value = soundType === 'rain' ? 800 : 1000;

      const gain = ctx.createGain();
      gain.gain.value = 0.15;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
      noiseNodeRef.current = noise;
    } else if (soundType === 'chime') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, ctx.currentTime); // 528Hz Solfeggio frequency
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      noiseNodeRef.current = osc;
    }

    setAudioPlaying(soundType);
  };

  /* ---------------- Visual Timer State ---------------- */
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 min focus
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let timer: any = null;
    if (timerRunning && timerSeconds > 0) {
      timer = setInterval(() => {
        setTimerSeconds((s) => s - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
      onEarnPoints(30, 'Completed 5-minute Focus Session!');
    }
    return () => clearInterval(timer);
  }, [timerRunning, timerSeconds]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-900 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center space-x-3 mb-2">
          <HeartHandshake className="w-8 h-8 text-emerald-300" />
          <h2 className="text-2xl sm:text-3xl font-black">Supportive Sensory Resources</h2>
        </div>
        <p className="text-emerald-100 text-sm max-w-2xl leading-relaxed">
          Calming tools designed for sensory regulation, deep focus, and self-soothing during study sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Guided Breathing Widget */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider flex items-center gap-1">
              <Wind className="w-4 h-4" /> Deep Breathing Guide
            </span>
            <h3 className="text-xl font-bold text-slate-800">1-Minute Sensory Reset</h3>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <div
              className={`w-32 h-32 rounded-full border-4 flex items-center justify-center text-center transition-all duration-1000 shadow-md ${
                isBreathingActive
                  ? breathPhase === 'Inhale'
                    ? 'scale-110 bg-teal-100 border-teal-500 text-teal-900'
                    : breathPhase === 'Hold'
                    ? 'scale-105 bg-amber-100 border-amber-500 text-amber-900'
                    : 'scale-90 bg-emerald-100 border-emerald-500 text-emerald-900'
                  : 'bg-slate-50 border-slate-300 text-slate-600'
              }`}
            >
              <div>
                <p className="font-black text-lg">{isBreathingActive ? breathPhase : 'Ready'}</p>
                {isBreathingActive && (
                  <p className="text-[10px] font-bold text-slate-500">Cycle {breathCycles + 1}/4</p>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setIsBreathingActive(!isBreathingActive);
              if (!isBreathingActive) setBreathCycles(0);
            }}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-xs ${
              isBreathingActive
                ? 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                : 'bg-teal-600 text-white hover:bg-teal-700'
            }`}
          >
            {isBreathingActive ? 'Pause Session' : 'Start Breathing Session'}
          </button>
        </div>

        {/* 2. Ambient Focus Synthesizer */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider flex items-center gap-1">
              <Volume2 className="w-4 h-4" /> Sound Synthesizer
            </span>
            <h3 className="text-xl font-bold text-slate-800">Calming Ambient Audio</h3>
          </div>

          <div className="space-y-3">
            {[
              { id: 'rain', label: 'Gentle Rain Filter', desc: 'Soft soothing raindrop frequency' },
              { id: 'white', label: 'White Noise Spectrum', desc: 'Continuous gentle background masking' },
              { id: 'chime', label: '528Hz Harmonic Tone', desc: 'Peaceful resonance frequency' },
            ].map((sound) => {
              const isPlaying = audioPlaying === sound.id;
              return (
                <button
                  key={sound.id}
                  onClick={() => toggleSound(sound.id as any)}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isPlaying
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <div>
                    <p className="font-bold text-xs">{sound.label}</p>
                    <p className="text-[10px] text-slate-500">{sound.desc}</p>
                  </div>
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Play className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-400 font-medium text-center">
            Generated client-side using Web Audio API for continuous playback.
          </p>
        </div>

        {/* 3. Visual Focus Timer */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-4 h-4" /> Sensory Timer
            </span>
            <h3 className="text-xl font-bold text-slate-800">Visual Focus Timer</h3>
          </div>

          <div className="text-center py-4">
            <div className="text-5xl font-black tracking-tight text-slate-800 font-mono">
              {formatTimer(timerSeconds)}
            </div>
            <p className="text-xs text-slate-500 mt-2 font-medium">5-Minute Quiet Focus Interval</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-xs"
            >
              {timerRunning ? 'Pause Timer' : 'Start Focus'}
            </button>
            <button
              onClick={() => {
                setTimerRunning(false);
                setTimerSeconds(300);
              }}
              className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
