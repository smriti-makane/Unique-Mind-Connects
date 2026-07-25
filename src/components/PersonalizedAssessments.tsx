import React, { useState } from 'react';
import { 
  BrainCircuit, 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/learningData';
import { QuizQuestion } from '../types';

interface PersonalizedAssessmentsProps {
  onEarnPoints: (points: number, reason: string) => void;
  onUpdateQuestProgress: (questId: string, progress: number) => void;
}

export const PersonalizedAssessments: React.FC<PersonalizedAssessmentsProps> = ({
  onEarnPoints,
  onUpdateQuestProgress,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const categories = ['Alphabet', 'Numbers', 'Logic'];

  const filteredQuestions = QUIZ_QUESTIONS.filter(
    (q) => q.category === selectedCategory
  );

  const currentQ: QuizQuestion | undefined = filteredQuestions[currentQuestionIdx];

  const handleStartCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleOptionSelect = (option: string) => {
    if (isSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || !currentQ) return;
    setIsSubmitted(true);
    if (selectedOption === currentQ.answer) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < filteredQuestions.length - 1) {
      setCurrentQuestionIdx((idx) => idx + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      // Finish Quiz
      setQuizFinished(true);
      const total = filteredQuestions.length;
      const scorePct = Math.round((score / total) * 100);

      onUpdateQuestProgress('complete_quiz', scorePct);

      if (scorePct >= 80) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        onEarnPoints(100, `Scored ${scorePct}% on ${selectedCategory} quiz!`);
      } else {
        onEarnPoints(25, `Completed ${selectedCategory} quiz!`);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-900 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center space-x-3 mb-2">
          <BrainCircuit className="w-8 h-8 text-emerald-300" />
          <h2 className="text-2xl sm:text-3xl font-black">Personalized Assessments</h2>
        </div>
        <p className="text-teal-100 text-sm max-w-2xl leading-relaxed">
          Customized quizzes and evaluation tools tailored to reinforce learning with positive, encouraging feedback.
        </p>
      </div>

      {!selectedCategory ? (
        /* Category Selection Screen */
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-600" />
            Select Quiz Category
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const questionsCount = QUIZ_QUESTIONS.filter((q) => q.category === cat).length;
              return (
                <div
                  key={cat}
                  className="bg-slate-50 border border-slate-200 hover:border-teal-400 rounded-2xl p-6 transition-all hover:shadow-md flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-3xl">
                      {cat === 'Alphabet' ? '🔤' : cat === 'Numbers' ? '🔢' : '🧩'}
                    </span>
                    <h4 className="text-xl font-bold text-slate-800">{cat} Quiz</h4>
                    <p className="text-slate-500 text-xs font-medium">
                      {questionsCount} questions tailored for practice.
                    </p>
                  </div>

                  <button
                    onClick={() => handleStartCategory(cat)}
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    Start {cat} Quiz
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : quizFinished ? (
        /* Quiz Results Screen */
        <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-xl mx-auto text-center space-y-6 shadow-md">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-800">Quiz Completed!</h3>
            <p className="text-slate-600 text-sm">
              You answered <span className="font-bold text-slate-800">{score}</span> out of{' '}
              <span className="font-bold text-slate-800">{filteredQuestions.length}</span> questions correctly.
            </p>
            <div className="text-3xl font-black text-teal-600">
              {Math.round((score / filteredQuestions.length) * 100)}%
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => handleStartCategory(selectedCategory)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
            <button
              onClick={() => setSelectedCategory(null)}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl cursor-pointer"
            >
              Choose Another Quiz
            </button>
          </div>
        </div>
      ) : (
        /* Active Quiz Screen */
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm max-w-3xl mx-auto">
          {/* Header info */}
          <div className="flex items-center justify-between border-b pb-4 border-slate-100">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                {selectedCategory} Quiz
              </span>
              <p className="text-xs text-slate-500 font-medium">
                Question {currentQuestionIdx + 1} of {filteredQuestions.length}
              </p>
            </div>

            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-bold text-slate-500 hover:text-slate-700 cursor-pointer"
            >
              Exit Quiz
            </button>
          </div>

          {currentQ && (
            <div className="space-y-6">
              {/* Question Text */}
              <div className="space-y-2">
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    currentQ.difficulty === 'Easy'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {currentQ.difficulty} Difficulty
                </span>
                <h3 className="text-xl font-bold text-slate-800">{currentQ.question}</h3>
              </div>

              {/* Options list */}
              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedOption === opt;
                  let btnStyle = 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800';

                  if (isSubmitted) {
                    if (opt === currentQ.answer) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                    } else {
                      btnStyle = 'border-slate-200 opacity-50';
                    }
                  } else if (isSelected) {
                    btnStyle = 'border-teal-600 bg-teal-50 text-teal-900 font-bold ring-2 ring-teal-600/30';
                  }

                  return (
                    <button
                      key={opt}
                      disabled={isSubmitted}
                      onClick={() => handleOptionSelect(opt)}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && opt === currentQ.answer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isSubmitted && isSelected && opt !== currentQ.answer && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation note when submitted */}
              {isSubmitted && (
                <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl space-y-1 text-xs text-teal-900">
                  <p className="font-bold flex items-center gap-1">
                    <HelpCircle className="w-4 h-4 text-teal-700" /> Explanation:
                  </p>
                  <p>{currentQ.explanation}</p>
                </div>
              )}

              {/* Action buttons */}
              <div className="pt-4 flex justify-end">
                {!isSubmitted ? (
                  <button
                    disabled={!selectedOption}
                    onClick={handleSubmitAnswer}
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl transition-all disabled:opacity-40 cursor-pointer shadow-xs"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    {currentQuestionIdx < filteredQuestions.length - 1
                      ? 'Next Question →'
                      : 'See Final Results'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
