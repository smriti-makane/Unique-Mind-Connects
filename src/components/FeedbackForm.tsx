import React, { useState } from 'react';
import { MessageSquare, Star, Send, CheckCircle2 } from 'lucide-react';
import { FeedbackEntry } from '../types';

export const FeedbackForm: React.FC = () => {
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState('General');
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [feedbackList, setFeedbackList] = useState<FeedbackEntry[]>(() => {
    const saved = localStorage.getItem('umc_feedback');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: '1',
            name: 'Alex M.',
            rating: 5,
            category: 'Adaptive Learning',
            comment: 'The visual cards and custom pacing made alphabet practice so peaceful and encouraging!',
            createdAt: 'Today',
          },
        ];
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newEntry: FeedbackEntry = {
      id: Date.now().toString(),
      name: name.trim() || 'Anonymous Learner',
      rating,
      category,
      comment: comment.trim(),
      createdAt: new Date().toLocaleDateString(),
    };

    const updated = [newEntry, ...feedbackList];
    setFeedbackList(updated);
    localStorage.setItem('umc_feedback', JSON.stringify(updated));

    setSubmitted(true);
    setComment('');
    setName('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-800 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center space-x-3 mb-2">
          <MessageSquare className="w-8 h-8 text-teal-300" />
          <h2 className="text-2xl sm:text-3xl font-black">Platform Feedback & Community</h2>
        </div>
        <p className="text-teal-100 text-sm leading-relaxed">
          Share your experience and help us continuously adapt Unique Minds Connect for neurodiverse learners.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
          <h3 className="text-lg font-bold text-slate-800">Share Your Experience</h3>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-center space-y-2 animate-fade-in">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="font-bold">Thank you for your feedback!</p>
              <p className="text-xs text-emerald-700">Your thoughts help improve learning outcomes.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Your Name (Optional)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sam"
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  <option>General Platform</option>
                  <option>Adaptive Learning</option>
                  <option>Quizzes & Assessments</option>
                  <option>Gamified Games</option>
                  <option>Emotion AI Recognition</option>
                  <option>Sensory Resources</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Rating</label>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer focus:outline-hidden"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Comments & Suggestions</label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you enjoyed or how we can improve..."
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Feedback
              </button>
            </form>
          )}
        </div>

        {/* Feedback List */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <h3 className="text-lg font-bold text-slate-800">Community Feedback</h3>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {feedbackList.map((item) => (
              <div key={item.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-xs text-slate-800">{item.name}</p>
                    <span className="text-[10px] text-teal-600 font-bold uppercase">{item.category}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-600 italic">"{item.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
