import { Quest, QuizQuestion, LearningResource, CourseModule, StudentProgress, ChatMessage } from '../types';

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'course_1',
    title: 'Visual Phonics & Letter Shapes',
    description: 'Learn letter sounds, spatial recognition, and color-coded vocabulary cards.',
    category: 'Alphabet & Literacy',
    duration: '15 Mins / Day',
    difficulty: 'Gentle',
    progress: 75,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80',
    tags: ['Visual Cards', 'Sensory', 'Phonics'],
    lessonsCount: 8,
  },
  {
    id: 'course_2',
    title: 'Visual Math & Number Chunking',
    description: 'Master addition, subtraction, and pattern recognition with dot grids.',
    category: 'Mathematics',
    duration: '20 Mins / Day',
    difficulty: 'Adaptive',
    progress: 45,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    tags: ['Chunking', 'Patterns', 'Interactive'],
    lessonsCount: 12,
  },
  {
    id: 'course_3',
    title: 'Social-Emotional AI & Self-Regulation',
    description: 'Identify facial expressions, manage sensory input, and practice belly breathing.',
    category: 'Wellness & Emotion',
    duration: '10 Mins / Day',
    difficulty: 'Gentle',
    progress: 90,
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    tags: ['Emotion AI', 'Calmness', 'Breathing'],
    lessonsCount: 6,
  },
  {
    id: 'course_4',
    title: 'Spatial Logic & Jigsaw Puzzles',
    description: 'Develop spatial reasoning and sequential logic with interactive grid games.',
    category: 'Gamified Logic',
    duration: '15 Mins / Day',
    difficulty: 'Advanced',
    progress: 30,
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&auto=format&fit=crop&q=80',
    tags: ['Grid Puzzles', 'Sudoku', 'Spatial'],
    lessonsCount: 10,
  },
];

export const STUDENT_PROGRESS_LIST: StudentProgress[] = [
  {
    studentName: 'Alex Morgan',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    grade: 'Grade 3 (Adaptive)',
    focusScore: 92,
    weeklyHours: 4.5,
    completedLessons: 18,
    dominantMood: 'Focused & Calm',
    status: 'Thriving',
    recentAchievement: 'First Steps Explorer',
  },
  {
    studentName: 'Sam Rivera',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    grade: 'Grade 4 (ADHD Support)',
    focusScore: 84,
    weeklyHours: 3.2,
    completedLessons: 12,
    dominantMood: 'Energetic',
    status: 'Consistent',
    recentAchievement: 'Word Wizard',
  },
  {
    studentName: 'Taylor Chen',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    grade: 'Grade 2 (Dyslexia Friendly)',
    focusScore: 78,
    weeklyHours: 2.8,
    completedLessons: 9,
    dominantMood: 'Calm',
    status: 'Needs Break',
    recentAchievement: 'Mindfulness Hero',
  },
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg_1',
    sender: 'ai',
    text: "Hello! I'm your AI Learning Companion. How are you feeling today? I can explain math with colors, help with reading, or offer a calming break whenever you need!",
    timestamp: 'Just now',
    actionable: {
      type: 'breathing',
      label: 'Try 1-Min Breathing',
    },
  },
];

export const INITIAL_QUESTS: Quest[] = [

  {
    id: 'daily_login',
    name: 'Daily Explorer',
    description: 'Log in and explore the platform today.',
    reward: 50,
    completionCriteria: 1,
    currentProgress: 1,
    completed: true,
    category: 'Daily'
  },
  {
    id: 'complete_quiz',
    name: 'Quiz Master',
    description: 'Complete any quiz with a score of 80% or higher.',
    reward: 100,
    completionCriteria: 80,
    currentProgress: 0,
    completed: false,
    category: 'Academic'
  },
  {
    id: 'word_puzzle',
    name: 'Word Unscrambler',
    description: 'Successfully solve a Word Puzzle game.',
    reward: 75,
    completionCriteria: 1,
    currentProgress: 0,
    completed: false,
    category: 'Games'
  },
  {
    id: 'emotion_check',
    name: 'Self-Awareness Hero',
    description: 'Run an emotion check-in analysis with your webcam.',
    reward: 60,
    completionCriteria: 1,
    currentProgress: 0,
    completed: false,
    category: 'Wellness'
  },
  {
    id: 'calm_session',
    name: 'Peaceful Mind',
    description: 'Complete a 1-minute guided breathing session.',
    reward: 50,
    completionCriteria: 1,
    currentProgress: 0,
    completed: false,
    category: 'Wellness'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Alphabet
  {
    id: 'a1',
    category: 'Alphabet',
    question: "What letter comes immediately after 'A' in the alphabet?",
    options: ['B', 'C', 'D', 'E'],
    answer: 'B',
    difficulty: 'Easy',
    explanation: "The alphabet begins with A, followed by B."
  },
  {
    id: 'a2',
    category: 'Alphabet',
    question: "Which letter is used in 'Hello' and 'Help'?",
    options: ['H', 'S', 'Z', 'M'],
    answer: 'H',
    difficulty: 'Easy',
    explanation: "Both words start with the letter H."
  },
  {
    id: 'a3',
    category: 'Alphabet',
    question: "Which letter is found in 'Apple' but NOT in 'Banana'?",
    options: ['A', 'P', 'N', 'B'],
    answer: 'P',
    difficulty: 'Medium',
    explanation: "'Apple' has two P's, whereas 'Banana' has no P."
  },
  {
    id: 'a4',
    category: 'Alphabet',
    question: "How many vowels are in the word 'EDUCATION'?",
    options: ['3', '4', '5', '6'],
    answer: '5',
    difficulty: 'Hard',
    explanation: "The vowels are E, U, A, I, O (all 5 standard vowels are in EDUCATION!)."
  },

  // Numbers
  {
    id: 'n1',
    category: 'Numbers',
    question: "What is 1 + 1?",
    options: ['1', '2', '3', '4'],
    answer: '2',
    difficulty: 'Easy',
    explanation: "Adding one items to one item gives two items."
  },
  {
    id: 'n2',
    category: 'Numbers',
    question: "What is 5 - 3?",
    options: ['1', '2', '3', '4'],
    answer: '2',
    difficulty: 'Easy',
    explanation: "Taking away 3 from 5 leaves 2."
  },
  {
    id: 'n3',
    category: 'Numbers',
    question: "What is 2 × 3?",
    options: ['4', '5', '6', '8'],
    answer: '6',
    difficulty: 'Medium',
    explanation: "Two sets of three equal six."
  },
  {
    id: 'n4',
    category: 'Numbers',
    question: "If you have 12 apples and share them equally among 3 friends, how many does each get?",
    options: ['3', '4', '5', '6'],
    answer: '4',
    difficulty: 'Hard',
    explanation: "12 divided by 3 equals 4."
  },

  // Logic
  {
    id: 'l1',
    category: 'Logic',
    question: "What comes next in the sequence: 2, 4, 6, 8, ___?",
    options: ['9', '10', '11', '12'],
    answer: '10',
    difficulty: 'Easy',
    explanation: "This is counting by even numbers (adding 2 each time)."
  },
  {
    id: 'l2',
    category: 'Logic',
    question: "If Red = Circle, Blue = Square, then Red + Blue pattern is:",
    options: ['Circle & Square', 'Triangle & Star', 'Hexagon', 'Diamond'],
    answer: 'Circle & Square',
    difficulty: 'Medium',
    explanation: "Combining Red and Blue yields Circle and Square."
  },
  {
    id: 'l3',
    category: 'Logic',
    question: "All dogs are animals. Max is a dog. What can we conclude about Max?",
    options: ['Max is a cat', 'Max is an animal', 'Max can fly', 'Max is a robot'],
    answer: 'Max is an animal',
    difficulty: 'Easy',
    explanation: "Since Max is a dog and all dogs are animals, Max is an animal."
  }
];

export const LEARNING_RESOURCES: LearningResource[] = [
  {
    id: 'res_1',
    title: 'Visual Alphabet Explorer',
    category: 'Alphabet & Phonics',
    difficulty: 'Easy',
    summary: 'Master letter sounds and shapes with multi-sensory color-coded cards.',
    content: [
      'Letter A: A is for Apple. (Red, crisp, sweet)',
      'Letter B: B is for Butterfly. (Fluttering, colorful wings)',
      'Letter C: C is for Cat. (Soft fur, purring sound)',
      'Letter D: D is for Dolphin. (Playful, ocean swimmer)'
    ],
    tips: 'Use finger tracing on textured surfaces or screen to reinforce letter memory.'
  },
  {
    id: 'res_2',
    title: 'Number Patterns & Grouping',
    category: 'Mathematics',
    difficulty: 'Medium',
    summary: 'Understand numbers visually using dot arrays and color blocks.',
    content: [
      'Group of 2: Pair of shoes, pair of eyes.',
      'Group of 5: Five fingers on a hand.',
      'Group of 10: Ten toes, 10-frame visual counting grid.'
    ],
    tips: 'Break larger numbers into friendly chunks of 5 and 10.'
  },
  {
    id: 'res_3',
    title: 'Sensory Regulation & Emotional Mastery',
    category: 'Social-Emotional Learning',
    difficulty: 'Easy',
    summary: 'Recognize bodily cues when overwhelmed and use calming tools.',
    content: [
      'Notice: Are your shoulders tense? Is your heart beating fast?',
      'Pause: Take 3 slow, deep belly breaths.',
      'Action: Switch to a sensory calming activity or sound.'
    ],
    tips: 'Practice breathing exercises during relaxed times so they become natural.'
  }
];

export const WORD_PUZZLE_LIST = [
  { word: 'PYTHON', hint: 'Popular coding language named after a reptile!' },
  { word: 'PUZZLE', hint: 'A fun game or problem to solve step-by-step.' },
  { word: 'NEURO', hint: 'Related to the brain and how we uniquely process the world.' },
  { word: 'SMART', hint: 'Having a bright, creative, and capable mind.' },
  { word: 'FOCUS', hint: 'Directing your attention calmly on a single task.' },
  { word: 'CREATIVE', hint: 'Using imagination to invent new ideas and art.' }
];
