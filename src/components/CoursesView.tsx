import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Play, 
  CheckCircle2, 
  Sparkles, 
  X,
  Clock,
  Award
} from 'lucide-react';
import { COURSE_MODULES } from '../data/learningData';
import { CourseModule } from '../types';

interface CoursesViewProps {
  onEarnPoints: (points: number, reason: string) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ onEarnPoints }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCourseModal, setActiveCourseModal] = useState<CourseModule | null>(null);
  const [lessonFinished, setLessonFinished] = useState(false);

  const categories = ['All', 'Alphabet & Literacy', 'Mathematics', 'Wellness & Emotion', 'Gamified Logic'];

  const filteredCourses = COURSE_MODULES.filter((course) => {
    const matchesCat = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleFinishLesson = () => {
    setLessonFinished(true);
    onEarnPoints(40, `Completed lesson in ${activeCourseModal?.title}`);
    setTimeout(() => {
      setLessonFinished(false);
      setActiveCourseModal(null);
    }, 2500);
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-800 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center space-x-3 mb-2">
          <BookOpen className="w-8 h-8 text-teal-300" />
          <h2 className="text-2xl sm:text-3xl font-black">Adaptive Course Catalog</h2>
        </div>
        <p className="text-teal-100 text-sm max-w-2xl leading-relaxed">
          Interactive lessons designed with multi-sensory visual cues, bite-sized steps, and gentle pacing.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search course title or topic..."
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between hover:border-teal-400 transition-all hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="relative rounded-xl overflow-hidden h-40">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                  {course.duration}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                  [{course.category}]
                </span>
                <span className="text-[10px] font-extrabold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
                  {course.difficulty} Track
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-800">{course.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{course.description}</p>

              {/* Progress Bar */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-500">
                  <span>Course Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-600 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveCourseModal(course)}
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-xs flex items-center justify-center gap-2 mt-2"
            >
              <Play className="w-3.5 h-3.5 fill-white" /> Start Interactive Lesson
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Lesson Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setActiveCourseModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 cursor-pointer rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {lessonFinished ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-2xl font-black text-slate-800">Lesson Complete!</h3>
                <p className="text-sm text-slate-600">
                  Great job! You earned <span className="font-bold text-teal-600">+40 XP</span>.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-teal-600 uppercase">
                    Lesson 1 of {activeCourseModal.lessonsCount}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800">{activeCourseModal.title}</h3>
                </div>

                <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl space-y-3">
                  <p className="text-xs sm:text-sm text-teal-900 leading-relaxed font-medium">
                    "Welcome! In this lesson, we break down key concepts using color coding and spatial card pairs. Take as much time as you need."
                  </p>
                  <div className="flex gap-2">
                    {activeCourseModal.tags.map((t) => (
                      <span key={t} className="text-[10px] font-extrabold bg-white text-teal-800 px-2 py-1 rounded-md border border-teal-200">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <p className="text-xs font-bold text-slate-700">Interactive Task:</p>
                  <p className="text-xs text-slate-600">
                    Match the visual cards with their associated sounds and tap "Complete Lesson" when done!
                  </p>
                </div>

                <button
                  onClick={handleFinishLesson}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Complete Interactive Lesson
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
