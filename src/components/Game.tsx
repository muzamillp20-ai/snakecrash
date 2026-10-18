import { useEffect, useRef, useState, useCallback } from 'react';
import { snakeVarieties, boardThemes, LevelConfig } from '../gameData';

interface Position {
  x: number;
  y: number;
}

interface GameProps {
  level: LevelConfig;
  onWin: () => void;
  onLose: () => void;
  onBack: () => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export default function Game({ level, onWin, onLose, onBack }: GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [obstacles, setObstacles] = useState<Position[]>([]);
  
  const directionRef = useRef<Direction>('RIGHT');
  const gameLoopRef = useRef<number | null>(null);
  const snakeRef = useRef(snake);
  const foodRef = useRef(food);
  const obstaclesRef = useRef(obstacles);
  const scoreRef = useRef(0);
  const gameOverRef = useRef(false);
  
  const snakeVariety = snakeVarieties.find(s => s.id === level.snakeId) || snakeVarieties[0];
  const boardTheme = boardThemes.find(b => b.id === level.boardId) || boardThemes[0];
  
  const CELL_SIZE = Math.floor(500 / level.gridSize);
  const CANVAS_SIZE = CELL_SIZE * level.gridSize;

  // Generate obstacles for the level
  useEffect(() => {
    const newObstacles: Position[] = [];
    for (let i = 0; i < level.obstacles; i++) {
      let pos: Position;
      let attempts = 0;
      do {
        pos = {
          x: Math.floor(Math.random() * level.gridSize),
          y: Math.floor(Math.random() * level.gridSize),
        };
        attempts++;
      } while (
        attempts < 100 &&
        (newObstacles.some(o => o.x === pos.x && o.y === pos.y) ||
          (pos.x < 5 && pos.y < 5))
      );
      newObstacles.push(pos);
    }
    setObstacles(newObstacles);
    obstaclesRef.current = newObstacles;
  }, [level]);

  // Generate food
  const generateFood = useCallback((snakeBody: Position[], obs: Position[]) => {
    let newFood: Position;
    let attempts = 0;
    do {
      newFood = {
        x: Math.floor(Math.random() * level.gridSize),
        y: Math.floor(Math.random() * level.gridSize),
      };
      attempts++;
    } while (
      attempts < 200 &&
      (snakeBody.some(s => s.x === newFood.x && s.y === newFood.y) ||
        obs.some(o => o.x === newFood.x && o.y === newFood.y))
    );
    setFood(newFood);
    foodRef.current = newFood;
  }, [level.gridSize]);

  // Initialize game
  useEffect(() => {
    const initialSnake = [
      { x: 5, y: Math.floor(level.gridSize / 2) },
      { x: 4, y: Math.floor(level.gridSize / 2) },
      { x: 3, y: Math.floor(level.gridSize / 2) },
    ];
    setSnake(initialSnake);
    snakeRef.current = initialSnake;
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setScore(0);
    scoreRef.current = 0;
    setGameOver(false);
    gameOverRef.current = false;
    setWon(false);
    generateFood(initialSnake, obstaclesRef.current);
  }, [level, generateFood]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOverRef.current) return;
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (directionRef.current !== 'DOWN') {
            directionRef.current = 'UP';
            setDirection('UP');
          }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (directionRef.current !== 'UP') {
            directionRef.current = 'DOWN';
            setDirection('DOWN');
          }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (directionRef.current !== 'RIGHT') {
            directionRef.current = 'LEFT';
            setDirection('LEFT');
          }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (directionRef.current !== 'LEFT') {
            directionRef.current = 'RIGHT';
            setDirection('RIGHT');
          }
          break;
        case ' ':
          setIsPaused(p => !p);
          break;
      }
      e.preventDefault();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Game loop
  useEffect(() => {
    if (gameOver || won || isPaused) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    const moveSnake = () => {
      const currentSnake = snakeRef.current;
      const currentDirection = directionRef.current;
      const currentFood = foodRef.current;
      const currentObstacles = obstaclesRef.current;
      
      const head = { ...currentSnake[0] };
      
      switch (currentDirection) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }
      
      // Wall passing - wrap around
      if (head.x < 0) head.x = level.gridSize - 1;
      if (head.x >= level.gridSize) head.x = 0;
      if (head.y < 0) head.y = level.gridSize - 1;
      if (head.y >= level.gridSize) head.y = 0;
      
      // Check self collision
      if (currentSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOverRef.current = true;
        setGameOver(true);
        return;
      }
      
      // Check obstacle collision
      if (currentObstacles.some(obs => obs.x === head.x && obs.y === head.y)) {
        gameOverRef.current = true;
        setGameOver(true);
        return;
      }
      
      const newSnake = [head, ...currentSnake];
      
      // Check food collision
      if (head.x === currentFood.x && head.y === currentFood.y) {
        const newScore = scoreRef.current + 1;
        scoreRef.current = newScore;
        setScore(newScore);
        
        if (newScore >= level.foodRequired) {
          gameOverRef.current = true;
          setWon(true);
          setGameOver(true);
          return;
        }
        
        generateFood(newSnake, currentObstacles);
      } else {
        newSnake.pop();
      }
      
      snakeRef.current = newSnake;
      setSnake([...newSnake]);
    };

    gameLoopRef.current = window.setInterval(moveSnake, level.speed);
    
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameOver, won, isPaused, level, generateFood]);

  // Render game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = boardTheme.bgColor;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw grid
    ctx.strokeStyle = boardTheme.gridColor;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= level.gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw border
    ctx.strokeStyle = boardTheme.borderColor;
    ctx.lineWidth = 3;
    if (boardTheme.wallPattern === 'glow') {
      ctx.shadowColor = boardTheme.borderColor;
      ctx.shadowBlur = 10;
    }
    ctx.strokeRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.shadowBlur = 0;

    // Draw obstacles
    obstacles.forEach(obs => {
      ctx.fillStyle = '#555555';
      ctx.fillRect(obs.x * CELL_SIZE + 1, obs.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
      ctx.fillStyle = '#333333';
      ctx.fillRect(obs.x * CELL_SIZE + 3, obs.y * CELL_SIZE + 3, CELL_SIZE - 6, CELL_SIZE - 6);
    });

    // Draw food (Mahira)
    ctx.font = `${CELL_SIZE - 2}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('👧', food.x * CELL_SIZE + CELL_SIZE / 2, food.y * CELL_SIZE + CELL_SIZE / 2);

    // Draw snake
    snake.forEach((segment, index) => {
      const isHead = index === 0;
      
      if (snakeVariety.pattern === 'rainbow') {
        const hue = (index * 30) % 360;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      } else if (snakeVariety.pattern === 'striped') {
        ctx.fillStyle = index % 2 === 0 ? snakeVariety.bodyColor : snakeVariety.headColor;
      } else if (snakeVariety.pattern === 'dotted') {
        ctx.fillStyle = snakeVariety.bodyColor;
        if (index % 3 === 0) {
          ctx.fillStyle = snakeVariety.headColor;
        }
      } else if (snakeVariety.pattern === 'gradient') {
        const opacity = 1 - (index / snake.length) * 0.5;
        ctx.globalAlpha = opacity;
        ctx.fillStyle = snakeVariety.bodyColor;
      } else {
        ctx.fillStyle = isHead ? snakeVariety.headColor : snakeVariety.bodyColor;
      }
      
      ctx.beginPath();
      if (isHead) {
        ctx.roundRect(
          segment.x * CELL_SIZE + 1,
          segment.y * CELL_SIZE + 1,
          CELL_SIZE - 2,
          CELL_SIZE - 2,
          [CELL_SIZE / 3, CELL_SIZE / 3, CELL_SIZE / 6, CELL_SIZE / 6]
        );
      } else {
        ctx.roundRect(
          segment.x * CELL_SIZE + 2,
          segment.y * CELL_SIZE + 2,
          CELL_SIZE - 4,
          CELL_SIZE - 4,
          CELL_SIZE / 4
        );
      }
      ctx.fill();
      ctx.globalAlpha = 1;

      // Draw eyes on head
      if (isHead) {
        ctx.fillStyle = snakeVariety.eyeColor;
        const eyeSize = CELL_SIZE / 6;
        const eyeOffset = CELL_SIZE / 4;
        
        let eye1X = segment.x * CELL_SIZE + CELL_SIZE / 2 - eyeOffset;
        let eye1Y = segment.y * CELL_SIZE + CELL_SIZE / 3;
        let eye2X = segment.x * CELL_SIZE + CELL_SIZE / 2 + eyeOffset;
        let eye2Y = segment.y * CELL_SIZE + CELL_SIZE / 3;

        if (directionRef.current === 'DOWN') {
          eye1Y = segment.y * CELL_SIZE + CELL_SIZE * 0.7;
          eye2Y = segment.y * CELL_SIZE + CELL_SIZE * 0.7;
        } else if (directionRef.current === 'LEFT') {
          eye1X = segment.x * CELL_SIZE + CELL_SIZE / 3;
          eye1Y = segment.y * CELL_SIZE + CELL_SIZE / 2 - eyeOffset / 2;
          eye2X = segment.x * CELL_SIZE + CELL_SIZE / 3;
          eye2Y = segment.y * CELL_SIZE + CELL_SIZE / 2 + eyeOffset / 2;
        } else if (directionRef.current === 'RIGHT') {
          eye1X = segment.x * CELL_SIZE + CELL_SIZE * 0.7;
          eye1Y = segment.y * CELL_SIZE + CELL_SIZE / 2 - eyeOffset / 2;
          eye2X = segment.x * CELL_SIZE + CELL_SIZE * 0.7;
          eye2Y = segment.y * CELL_SIZE + CELL_SIZE / 2 + eyeOffset / 2;
        }

        ctx.beginPath();
        ctx.arc(eye1X, eye1Y, eyeSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(eye2X, eye2Y, eyeSize, 0, Math.PI * 2);
        ctx.fill();
      }
    });

  }, [snake, food, obstacles, level, snakeVariety, boardTheme, CELL_SIZE, CANVAS_SIZE]);

  // Handle game over
  useEffect(() => {
    if (gameOver && won) {
      const timer = setTimeout(onWin, 1500);
      return () => clearTimeout(timer);
    } else if (gameOver && !won) {
      const timer = setTimeout(onLose, 1500);
      return () => clearTimeout(timer);
    }
  }, [gameOver, won, onWin, onLose]);

  // Touch controls
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || gameOverRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 20 && directionRef.current !== 'LEFT') {
        directionRef.current = 'RIGHT';
        setDirection('RIGHT');
      } else if (dx < -20 && directionRef.current !== 'RIGHT') {
        directionRef.current = 'LEFT';
        setDirection('LEFT');
      }
    } else {
      if (dy > 20 && directionRef.current !== 'UP') {
        directionRef.current = 'DOWN';
        setDirection('DOWN');
      } else if (dy < -20 && directionRef.current !== 'DOWN') {
        directionRef.current = 'UP';
        setDirection('UP');
      }
    }
    touchStartRef.current = null;
  };

  return (
    <div className="flex flex-col items-center gap-3 p-4">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-[520px]">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-bold transition-colors"
        >
          ← Back
        </button>
        <div className="text-center">
          <h2 className="text-lg font-bold text-yellow-400">Level {level.level}: {level.name}</h2>
          <p className="text-sm text-gray-300">🐍 {snakeVariety.name} | Score: {score}/{level.foodRequired}</p>
        </div>
        <button
          onClick={() => setIsPaused(p => !p)}
          className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-bold transition-colors"
        >
          {isPaused ? '▶' : '⏸'}
        </button>
      </div>

      {/* Game Canvas */}
      <div
        className="relative border-4 rounded-lg overflow-hidden shadow-2xl"
        style={{ borderColor: boardTheme.borderColor }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="block"
        />
        
        {/* Pause Overlay */}
        {isPaused && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="text-center">
              <p className="text-4xl font-bold text-white">⏸ PAUSED</p>
              <p className="text-gray-300 mt-2">Press Space or tap to continue</p>
            </div>
          </div>
        )}

        {/* Win Overlay */}
        {won && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="text-center animate-bounce">
              <p className="text-3xl font-bold text-green-400">🏆 WINNER!</p>
              <p className="text-2xl font-bold text-yellow-300 mt-2">Winner Mahira Bhaiya</p>
              <p className="text-xl text-pink-300 mt-1">Proud of U! 💖</p>
              <p className="text-gray-300 mt-2">Mahira escaped Muzamill Bhaiya!</p>
            </div>
          </div>
        )}

        {/* Lose Overlay */}
        {gameOver && !won && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-red-500">💀 GAME OVER</p>
              <p className="text-xl font-bold text-orange-400 mt-2">Muzamill Bhaiya Digested Mahira!</p>
              <p className="text-lg text-gray-300 mt-1">🐍 The snake got Mahira! 🐍</p>
              <p className="text-sm text-gray-400 mt-2">Score: {score}/{level.foodRequired}</p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Controls */}
      <div className="grid grid-cols-3 gap-2 mt-2 md:hidden">
        <div></div>
        <button
          onClick={() => { if (directionRef.current !== 'DOWN') { directionRef.current = 'UP'; setDirection('UP'); }}}
          className="p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-2xl font-bold active:bg-gray-500"
        >
          ↑
        </button>
        <div></div>
        <button
          onClick={() => { if (directionRef.current !== 'RIGHT') { directionRef.current = 'LEFT'; setDirection('LEFT'); }}}
          className="p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-2xl font-bold active:bg-gray-500"
        >
          ←
        </button>
        <button
          onClick={() => { if (directionRef.current !== 'UP') { directionRef.current = 'DOWN'; setDirection('DOWN'); }}}
          className="p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-2xl font-bold active:bg-gray-500"
        >
          ↓
        </button>
        <button
          onClick={() => { if (directionRef.current !== 'LEFT') { directionRef.current = 'RIGHT'; setDirection('RIGHT'); }}}
          className="p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-2xl font-bold active:bg-gray-500"
        >
          →
        </button>
      </div>

      {/* Game Info */}
      <div className="text-center text-sm text-gray-400 mt-2">
        <p>🐍 Snake: {snakeVariety.name} | Board: {boardTheme.name}</p>
        <p>Use Arrow Keys / WASD / Swipe to move | Space to pause</p>
        <p className="text-yellow-400 mt-1">Eat 👧 {level.foodRequired} times to win! Snakes pass through walls!</p>
      </div>
    </div>
  );
}
