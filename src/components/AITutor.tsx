import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  Sparkles, 
  Volume2, 
  HeartHandshake, 
  HelpCircle, 
  Brain, 
  CheckCircle2, 
  RotateCcw 
} from 'lucide-react';
import { ChatMessage, NavigationTab } from '../types';
import { INITIAL_CHAT_MESSAGES } from '../data/learningData';

interface AITutorProps {
  onNavigate: (tab: NavigationTab) => void;
  onEarnPoints: (points: number, reason: string) => void;
}

export const AITutor: React.FC<AITutorProps> = ({ onNavigate, onEarnPoints }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const SUGGESTED_PROMPTS = [
    'Can you explain fractions with pizza slices?',
    'I feel a bit overwhelmed. Can we do a breathing break?',
    'What is a simple trick to remember letter sounds?',
    'Give me a fun 3-question math warm-up!',
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // AI Response generation logic tailored for neurodiverse support
    setTimeout(() => {
      let aiText = "That's a fantastic question! Let's break it down into simple, clear steps together.";
      let actionable: ChatMessage['actionable'] = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('fraction') || lower.includes('pizza') || lower.includes('math')) {
        aiText = "Think of a fraction as sharing a delicious pizza! 🍕 If you cut a pizza into 4 equal slices and eat 1 slice, you ate 1 out of 4 slices (written as 1/4). Want to try a visual math quiz?";
        actionable = { type: 'quiz', label: 'Try Personalized Quiz' };
      } else if (lower.includes('overwhelmed') || lower.includes('breathing') || lower.includes('calm') || lower.includes('break')) {
        aiText = "I hear you. Taking breaks is super smart when our minds get tired! Let's do a 1-minute calming deep breath together right now.";
        actionable = { type: 'breathing', label: 'Start 1-Min Breathing' };
      } else if (lower.includes('letter') || lower.includes('sound') || lower.includes('read')) {
        aiText = "Great phonics practice! Letters are like musical notes. For example, 'S' makes the gentle hiss of a snake 🐍 'ssss'. Would you like to play the Word Unscramble puzzle?";
        actionable = { type: 'game', label: 'Play Word Puzzle' };
      } else {
        aiText = `I loved your thought: "${text}". Learning at your own pace is wonderful! You can ask me to explain any subject, speak slowly, or switch to a calm game whenever you like.`;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionable,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      onEarnPoints(15, 'Interacted with AI Learning Tutor');
    }, 1200);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // slightly slower, gentle pace
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceInputSim = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setInput('Can you explain fractions with pizza slices?');
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-amber-800 to-teal-900 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center space-x-3 mb-2">
          <Bot className="w-8 h-8 text-amber-300" />
          <h2 className="text-2xl sm:text-3xl font-black">AI Learning Companion</h2>
        </div>
        <p className="text-teal-100 text-sm leading-relaxed">
          Ask questions in plain language. Your AI tutor uses multi-sensory visual metaphors, step-by-step guidance, and gentle encouragement.
        </p>
      </div>

      {/* Main Chat Box */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col h-[520px]">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-teal-700 text-white'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}
              >
                {msg.sender === 'user' ? 'Me' : 'AI'}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-teal-700 text-white rounded-tr-none'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none'
                }`}
              >
                <div className="flex justify-between items-center gap-2">
                  <span className="font-bold text-[10px] opacity-75">
                    {msg.sender === 'user' ? 'You' : 'AI Tutor'}
                  </span>
                  <span className="text-[10px] opacity-60">{msg.timestamp}</span>
                </div>

                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                {/* Speech Reader Button */}
                <button
                  onClick={() => speakText(msg.text)}
                  className="text-[10px] font-bold text-teal-600 hover:underline flex items-center gap-1 cursor-pointer pt-1"
                >
                  <Volume2 className="w-3 h-3" /> Read Aloud
                </button>

                {/* Actionable button if AI suggested an exercise */}
                {msg.actionable && (
                  <div className="pt-2 border-t border-slate-200/60">
                    <button
                      onClick={() => {
                        if (msg.actionable?.type === 'quiz') onNavigate('assessments');
                        else if (msg.actionable?.type === 'breathing') onNavigate('supportive');
                        else if (msg.actionable?.type === 'game') onNavigate('gamified');
                      }}
                      className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{msg.actionable.label}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-slate-400 text-xs italic p-2">
              <Bot className="w-4 h-4 text-amber-500 animate-bounce" />
              <span>AI Tutor is thinking & typing...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggested Prompts Pills */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">Suggestions:</span>
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1 bg-white hover:bg-teal-50 border border-slate-200 text-slate-700 rounded-full font-medium text-[11px] whitespace-nowrap cursor-pointer transition-colors shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <button
            type="button"
            onClick={handleVoiceInputSim}
            className={`p-2.5 rounded-xl cursor-pointer transition-colors ${
              isListening ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title="Voice Input Simulation"
          >
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? 'Listening to voice...' : 'Ask your AI tutor anything...'}
            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500"
          />

          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white rounded-xl cursor-pointer transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
