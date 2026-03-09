import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Trophy, RotateCcw, Play } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const gameLoopRef = useRef<number | null>(null);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setIsGameOver(false);
    setScore(0);
    setIsPaused(false);
    generateFood();
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y,
      };

      // Check collision with borders
      if (
        newHead.x < 0 || 
        newHead.x >= GRID_SIZE || 
        newHead.y < 0 || 
        newHead.y >= GRID_SIZE
      ) {
        setIsGameOver(true);
        return prevSnake;
      }

      // Check collision with self
      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check collision with food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 10);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  }, [moveSnake]);

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div className="flex items-center justify-between w-full max-w-[400px] mb-4 font-pixel">
        <div className="flex items-center gap-2 text-magenta">
          <Trophy size={16} />
          <span className="text-sm glitch-text" data-text={score}>{score}</span>
        </div>
        <div className="text-cyan text-[10px] tracking-widest">
          {isPaused ? '>>_HALTED' : '>>_RUNNING'}
        </div>
      </div>

      <div className="relative">
        <div 
          className="grid bg-dark border-4 border-cyan/50 rounded-none overflow-hidden shadow-[4px_4px_0_#ff00ff]"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            width: 'min(80vw, 400px)',
            height: 'min(80vw, 400px)',
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isSnake = snake.some((s) => s.x === x && s.y === y);
            const isHead = snake[0].x === x && snake[0].y === y;
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={i}
                className={`w-full h-full border-[0.5px] border-white/5 ${
                  isHead ? 'bg-cyan shadow-[0_0_8px_#00ffff]' :
                  isSnake ? 'bg-cyan/30' :
                  isFood ? 'bg-magenta animate-pulse shadow-[0_0_12px_#ff00ff]' :
                  ''
                }`}
              />
            );
          })}
        </div>

        {(isGameOver || isPaused) && (
          <div className="absolute inset-0 bg-dark/90 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-6 text-center border-2 border-magenta">
            {isGameOver ? (
              <>
                <h2 className="text-2xl font-pixel text-magenta mb-4 glitch-text" data-text="CRITICAL_FAILURE">CRITICAL_FAILURE</h2>
                <p className="text-cyan text-xs mb-8 font-pixel">RECOVERY_SCORE: {score}</p>
                <button 
                  onClick={resetGame}
                  className="flex items-center gap-2 px-6 py-3 bg-magenta text-dark font-pixel text-[10px] hover:bg-cyan transition-colors pixel-border"
                >
                  <RotateCcw size={14} /> REBOOT_SYSTEM
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-pixel text-cyan mb-8 glitch-text" data-text="INIT_SEQUENCE">INIT_SEQUENCE</h2>
                <button 
                  onClick={() => setIsPaused(false)}
                  className="flex items-center gap-2 px-8 py-4 bg-cyan text-dark font-pixel text-xs hover:bg-magenta transition-colors pixel-border"
                >
                  <Play size={16} fill="currentColor" /> EXECUTE
                </button>
                <p className="mt-8 text-magenta/60 text-[8px] font-pixel uppercase tracking-[0.2em]">Input_Map: Arrow_Keys</p>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-4">
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 border border-neon-blue/30 rounded flex items-center justify-center text-neon-blue">↑</div>
          <div className="flex gap-1">
            <div className="w-10 h-10 border border-neon-blue/30 rounded flex items-center justify-center text-neon-blue">←</div>
            <div className="w-10 h-10 border border-neon-blue/30 rounded flex items-center justify-center text-neon-blue">↓</div>
            <div className="w-10 h-10 border border-neon-blue/30 rounded flex items-center justify-center text-neon-blue">→</div>
          </div>
        </div>
      </div>
    </div>
  );
};
