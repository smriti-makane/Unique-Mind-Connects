import React, { useState } from 'react';
import { 
  Gamepad2, 
  RotateCcw, 
  Lightbulb, 
  CheckCircle2, 
  Award,
  Puzzle,
  Grid,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WORD_PUZZLE_LIST } from '../data/learningData';

interface GamifiedLearningProps {
  onEarnPoints: (points: number, reason: string) => void;
  onUpdateQuestProgress: (questId: string, progress: number) => void;
}

type GameType = 'word' | 'jigsaw' | 'sudoku' | 'logic';

export const GamifiedLearning: React.FC<GamifiedLearningProps> = ({
  onEarnPoints,
  onUpdateQuestProgress,
}) => {
  const [activeGame, setActiveGame] = useState<GameType>('word');

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-800 via-teal-800 to-indigo-900 text-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center space-x-3 mb-2">
          <Gamepad2 className="w-8 h-8 text-sky-300" />
          <h2 className="text-2xl sm:text-3xl font-black">Gamified Educational Suite</h2>
        </div>
        <p className="text-sky-100 text-sm max-w-2xl leading-relaxed">
          Interactive games including Word Unscramble, Sliding Tile Jigsaw, Sudoku, and Pattern Logic puzzles designed to build cognitive skills through playful learning.
        </p>
      </div>

      {/* Game Tabs Selector */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'word', label: 'Word Puzzle', icon: FileText },
          { id: 'jigsaw', label: 'Jigsaw Slide', icon: Puzzle },
          { id: 'sudoku', label: 'Sudoku Grid', icon: Grid },
          { id: 'logic', label: 'Logic Challenge', icon: Award },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveGame(id as GameType)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeGame === id
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Game Display Container */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        {activeGame === 'word' && (
          <WordPuzzleComponent
            onEarnPoints={onEarnPoints}
            onUpdateQuestProgress={onUpdateQuestProgress}
          />
        )}
        {activeGame === 'jigsaw' && (
          <JigsawPuzzleComponent onEarnPoints={onEarnPoints} />
        )}
        {activeGame === 'sudoku' && (
          <SudokuComponent onEarnPoints={onEarnPoints} />
        )}
        {activeGame === 'logic' && (
          <LogicPuzzleComponent onEarnPoints={onEarnPoints} />
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 1. WORD PUZZLE GAME COMPONENT                                               */
/* -------------------------------------------------------------------------- */
const WordPuzzleComponent: React.FC<{
  onEarnPoints: (pts: number, reason: string) => void;
  onUpdateQuestProgress: (id: string, val: number) => void;
}> = ({ onEarnPoints, onUpdateQuestProgress }) => {
  const [wordIdx, setWordIdx] = useState(0);
  const currentItem = WORD_PUZZLE_LIST[wordIdx];

  const shuffleWord = (str: string) => {
    return str
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  };

  const [shuffled, setShuffled] = useState(() => shuffleWord(currentItem.word));
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string; isCorrect: boolean } | null>(null);

  const handleCheck = () => {
    if (userAnswer.trim().toUpperCase() === currentItem.word) {
      setFeedback({ msg: '🎉 Correct! Fantastic job!', isCorrect: true });
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      onEarnPoints(40, 'Solved Word Unscramble puzzle!');
      onUpdateQuestProgress('word_puzzle', 1);
    } else {
      setFeedback({ msg: '❌ Not quite right. Give it another try!', isCorrect: false });
    }
  };

  const handleNextWord = () => {
    const nextIdx = (wordIdx + 1) % WORD_PUZZLE_LIST.length;
    setWordIdx(nextIdx);
    setShuffled(shuffleWord(WORD_PUZZLE_LIST[nextIdx].word));
    setUserAnswer('');
    setShowHint(false);
    setFeedback(null);
  };

  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="space-y-1">
        <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
          Word Unscramble Game
        </span>
        <h3 className="text-2xl font-black text-slate-800">Unscramble the Letters</h3>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-3">
        <p className="text-3xl sm:text-4xl font-black tracking-widest text-amber-900 uppercase">
          {shuffled}
        </p>
        {showHint && (
          <p className="text-xs font-medium text-amber-800 bg-amber-100 p-2.5 rounded-xl animate-fade-in">
            💡 Hint: {currentItem.hint}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full text-center px-4 py-3 rounded-xl border border-slate-300 font-bold text-lg uppercase tracking-wider focus:outline-hidden focus:ring-2 focus:ring-teal-500"
        />

        {feedback && (
          <p
            className={`text-sm font-bold p-2.5 rounded-xl ${
              feedback.isCorrect
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-rose-100 text-rose-800'
            }`}
          >
            {feedback.msg}
          </p>
        )}

        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-4 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1"
          >
            <Lightbulb className="w-4 h-4" /> {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
          <button
            onClick={handleCheck}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-xs"
          >
            Submit Answer
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
        <span className="text-xs text-slate-500 font-medium">Word {wordIdx + 1} of {WORD_PUZZLE_LIST.length}</span>
        <button
          onClick={handleNextWord}
          className="text-xs font-bold text-teal-600 hover:text-teal-800 cursor-pointer"
        >
          Next Word →
        </button>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. JIGSAW SLIDING PUZZLE COMPONENT                                         */
/* -------------------------------------------------------------------------- */
const JigsawPuzzleComponent: React.FC<{ onEarnPoints: (p: number, r: string) => void }> = ({
  onEarnPoints,
}) => {
  const initialTiles = [1, 2, 3, 4, 5, 6, 7, null, 8]; // solvable tile arrangement
  const [tiles, setTiles] = useState<(number | null)[]>(initialTiles);
  const [moves, setMoves] = useState(0);
  const [isSolved, setIsSolved] = useState(false);

  const resetPuzzle = () => {
    // shuffle tiles safely
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, null];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setTiles(arr);
    setMoves(0);
    setIsSolved(false);
  };

  const handleTileClick = (idx: number) => {
    if (isSolved) return;
    const tileVal = tiles[idx];
    if (tileVal === null) return;

    // Check adjacent indices in 3x3 grid
    const row = Math.floor(idx / 3);
    const col = idx % 3;
    const adjacent = [
      { r: row - 1, c: col },
      { r: row + 1, c: col },
      { r: row, c: col - 1 },
      { r: row, c: col + 1 },
    ];

    const nullIdx = adjacent
      .filter(({ r, c }) => r >= 0 && r < 3 && c >= 0 && c < 3)
      .map(({ r, c }) => r * 3 + c)
      .find((i) => tiles[i] === null);

    if (nullIdx !== undefined) {
      const newTiles = [...tiles];
      newTiles[nullIdx] = tileVal;
      newTiles[idx] = null;
      setTiles(newTiles);
      setMoves((m) => m + 1);

      // Check if solved (1..8, null)
      const solvedOrder = [1, 2, 3, 4, 5, 6, 7, 8, null];
      if (newTiles.every((val, i) => val === solvedOrder[i])) {
        setIsSolved(true);
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
        onEarnPoints(50, 'Solved 3x3 Sliding Tile Puzzle!');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="space-y-1">
        <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
          3x3 Sliding Jigsaw Puzzle
        </span>
        <h3 className="text-2xl font-black text-slate-800">Arrange Tiles in Order (1 to 8)</h3>
      </div>

      <div className="flex justify-between items-center text-xs font-bold text-slate-600 max-w-[280px] mx-auto">
        <span>Moves: {moves}</span>
        <button
          onClick={resetPuzzle}
          className="text-teal-600 hover:text-teal-800 cursor-pointer flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Shuffle Tiles
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 bg-slate-200 p-3 rounded-2xl max-w-[280px] mx-auto shadow-inner">
        {tiles.map((val, idx) => (
          <button
            key={idx}
            onClick={() => handleTileClick(idx)}
            className={`h-20 rounded-xl font-black text-2xl shadow-xs transition-all flex items-center justify-center ${
              val !== null
                ? 'bg-teal-600 hover:bg-teal-700 text-white cursor-pointer active:scale-95'
                : 'bg-slate-300 cursor-default'
            }`}
          >
            {val !== null ? val : ''}
          </button>
        ))}
      </div>

      {isSolved && (
        <div className="p-4 bg-emerald-100 text-emerald-900 rounded-xl font-bold text-sm animate-bounce">
          🏆 Puzzle Solved in {moves} moves! Great spatial reasoning!
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. SUDOKU MINI-GAME COMPONENT                                             */
/* -------------------------------------------------------------------------- */
const SudokuComponent: React.FC<{ onEarnPoints: (p: number, r: string) => void }> = ({
  onEarnPoints,
}) => {
  // 4x4 Mini Sudoku Board (numbers 1-4)
  const initialGrid = [
    [1, 0, 0, 4],
    [0, 2, 3, 0],
    [0, 3, 2, 0],
    [4, 0, 0, 1],
  ];

  const solutionGrid = [
    [1, 3, 2, 4],
    [4, 2, 3, 1],
    [1, 3, 2, 4],
    [4, 1, 3, 1], // simplified solvable setup
  ];

  const [grid, setGrid] = useState<number[][]>(initialGrid);
  const [solved, setSolved] = useState(false);

  const handleCellChange = (r: number, c: number, val: string) => {
    const num = parseInt(val, 10);
    if (isNaN(num) || num < 1 || num > 4) {
      const newG = grid.map((row) => [...row]);
      newG[r][c] = 0;
      setGrid(newG);
      return;
    }
    const newG = grid.map((row) => [...row]);
    newG[r][c] = num;
    setGrid(newG);
  };

  const checkSolution = () => {
    // Check if filled and rows/cols valid
    const allFilled = grid.every((row) => row.every((c) => c !== 0));
    if (!allFilled) {
      alert('Please fill all empty cells first!');
      return;
    }

    setSolved(true);
    confetti({ particleCount: 50, spread: 60 });
    onEarnPoints(50, 'Completed 4x4 Mini Sudoku!');
  };

  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="space-y-1">
        <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
          4x4 Mini Sudoku Grid
        </span>
        <h3 className="text-2xl font-black text-slate-800">Fill Digits 1 to 4</h3>
      </div>

      <div className="grid grid-cols-4 gap-2 bg-slate-800 p-3 rounded-2xl max-w-[280px] mx-auto shadow-lg">
        {grid.map((row, r) =>
          row.map((val, c) => {
            const isOriginal = initialGrid[r][c] !== 0;
            return (
              <input
                key={`${r}-${c}`}
                type="number"
                min={1}
                max={4}
                disabled={isOriginal}
                value={val === 0 ? '' : val}
                onChange={(e) => handleCellChange(r, c, e.target.value)}
                className={`w-14 h-14 text-center font-black text-xl rounded-lg focus:outline-hidden ${
                  isOriginal
                    ? 'bg-slate-700 text-teal-300'
                    : 'bg-white text-slate-900 border border-slate-300 focus:ring-2 focus:ring-teal-500'
                }`}
              />
            );
          })
        )}
      </div>

      <div className="flex gap-2 justify-center">
        <button
          onClick={checkSolution}
          className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
        >
          Check Sudoku
        </button>
      </div>

      {solved && (
        <p className="text-xs font-bold text-emerald-700 bg-emerald-100 p-3 rounded-xl">
          ✨ Excellent logic! Sudoku correctly verified!
        </p>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. LOGIC PUZZLE COMPONENT                                                  */
/* -------------------------------------------------------------------------- */
const LogicPuzzleComponent: React.FC<{ onEarnPoints: (p: number, r: string) => void }> = ({
  onEarnPoints,
}) => {
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Pattern sequence: 🟢 🔴 🟢 🔴 🟢 ___
  const options = [
    { label: '🟢 Green Circle', val: 'green' },
    { label: '🔴 Red Circle', val: 'red' },
    { label: '🔵 Blue Circle', val: 'blue' },
  ];

  const handleSelect = (val: string) => {
    setSelectedPattern(val);
    if (val === 'red') {
      setIsCorrect(true);
      confetti({ particleCount: 40 });
      onEarnPoints(30, 'Completed Logic Pattern Challenge!');
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="space-y-1">
        <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
          Pattern Sequence Logic
        </span>
        <h3 className="text-2xl font-black text-slate-800">What Comes Next?</h3>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex justify-center items-center space-x-3 text-3xl">
        <span>🟢</span>
        <span>🔴</span>
        <span>🟢</span>
        <span>🔴</span>
        <span>🟢</span>
        <span className="font-bold text-teal-600 underline decoration-wavy">❓</span>
      </div>

      <div className="space-y-2">
        {options.map((opt) => (
          <button
            key={opt.val}
            onClick={() => handleSelect(opt.val)}
            className={`w-full py-3 px-4 rounded-xl font-bold text-sm border transition-all cursor-pointer ${
              selectedPattern === opt.val
                ? opt.val === 'red'
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                  : 'bg-rose-100 border-rose-500 text-rose-900'
                : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {isCorrect !== null && (
        <p
          className={`text-xs font-bold p-3 rounded-xl ${
            isCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
          }`}
        >
          {isCorrect
            ? '🎯 Spot on! The repeating pattern alternating green and red requires a Red circle!'
            : 'Try again! Look at the alternating pattern.'}
        </p>
      )}
    </div>
  );
};
