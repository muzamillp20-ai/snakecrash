import { useState, useCallback } from 'react';
import Menu from './components/Menu';
import LevelSelect from './components/LevelSelect';
import Game from './components/Game';
import ResultScreen from './components/ResultScreen';
import { allLevels, LevelConfig, snakeVarieties, boardThemes } from './gameData';

type Screen = 'menu' | 'levelSelect' | 'game' | 'result' | 'snakeInfo';

// Default game config (free play)
const defaultLevel: LevelConfig = {
  level: 0,
  gridSize: 20,
  snakeId: 'cobra',
  boardId: 'jungle',
  speed: 120,
  foodRequired: 50,
  obstacles: 0,
  name: 'Free Play - Default Game',
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [currentLevel, setCurrentLevel] = useState<LevelConfig>(defaultLevel);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);
  const [unlockedLevel, setUnlockedLevel] = useState<number>(() => {
    const saved = localStorage.getItem('mahira-snake-unlocked');
    return saved ? parseInt(saved) : 1;
  });
  const [currentScore, setCurrentScore] = useState(0);
  const [gameKey, setGameKey] = useState(0);

  const handleSelectLevel = useCallback((levelNum: number) => {
    if (levelNum === 0) {
      setCurrentLevel(defaultLevel);
    } else {
      const level = allLevels.find(l => l.level === levelNum);
      if (level) {
        setCurrentLevel(level);
      }
    }
    setScreen('game');
    setGameResult(null);
    setGameKey(k => k + 1);
  }, []);

  const handleWin = useCallback(() => {
    setGameResult('win');
    setCurrentScore(currentLevel.foodRequired);
    if (currentLevel.level > 0 && currentLevel.level >= unlockedLevel) {
      const newUnlocked = Math.min(currentLevel.level + 1, 100);
      setUnlockedLevel(newUnlocked);
      localStorage.setItem('mahira-snake-unlocked', newUnlocked.toString());
    }
    setScreen('result');
  }, [currentLevel, unlockedLevel]);

  const handleLose = useCallback(() => {
    setGameResult('lose');
    setScreen('result');
  }, []);

  const handleNextLevel = useCallback(() => {
    const nextLevelNum = currentLevel.level + 1;
    if (nextLevelNum <= 100) {
      handleSelectLevel(nextLevelNum);
    }
  }, [currentLevel.level, handleSelectLevel]);

  const handlePlayAgain = useCallback(() => {
    setScreen('game');
    setGameResult(null);
    setGameKey(k => k + 1);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {screen === 'menu' && (
        <Menu
          onPlay={() => setScreen('levelSelect')}
          onSnakeInfo={() => setScreen('snakeInfo')}
        />
      )}
      
      {screen === 'levelSelect' && (
        <LevelSelect
          onSelectLevel={handleSelectLevel}
          onBack={() => setScreen('menu')}
          unlockedLevel={unlockedLevel}
        />
      )}
      
      {screen === 'game' && (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
          <Game
            key={gameKey}
            level={currentLevel}
            onWin={handleWin}
            onLose={handleLose}
            onBack={() => setScreen('levelSelect')}
          />
        </div>
      )}
      
      {screen === 'result' && (
        <ResultScreen
          won={gameResult === 'win'}
          level={currentLevel.level}
          score={currentScore}
          onPlayAgain={handlePlayAgain}
          onNextLevel={handleNextLevel}
          onMenu={() => setScreen('menu')}
        />
      )}

      {screen === 'snakeInfo' && (
        <SnakeInfoScreen onBack={() => setScreen('menu')} />
      )}
    </div>
  );
}

// Snake Info / Gallery Screen - Mobile Optimized
function SnakeInfoScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-green-900/20 to-gray-900 p-3">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-700 active:bg-gray-600 text-white rounded-lg font-bold transition-colors text-sm"
          >
            ← Back
          </button>
          <h1 className="text-lg font-bold text-yellow-400">
            🐍 Snake Gallery
          </h1>
          <div className="w-16"></div>
        </div>

        {/* Snake Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {snakeVarieties.map((snake, index) => (
            <div
              key={snake.id}
              className="bg-gray-800/80 rounded-xl p-3 border border-gray-700"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-10 h-10 rounded-full border-3 flex items-center justify-center text-lg flex-shrink-0"
                  style={{ backgroundColor: snake.bodyColor, borderColor: snake.headColor, borderWidth: '3px' }}
                >
                  🐍
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white truncate">{snake.name}</h3>
                  <p className="text-[10px] text-gray-400">#{index + 1} of 12</p>
                </div>
              </div>
              <p className="text-xs text-gray-300 mb-2">{snake.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-gray-400">Speed:</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full ${
                          i < Math.ceil(snake.speed * 3) ? 'bg-yellow-400' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-[10px] text-green-400 capitalize bg-gray-700 px-1.5 py-0.5 rounded">{snake.pattern}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Board Themes */}
        <h2 className="text-base font-bold text-yellow-400 mb-2">🎨 Board Themes</h2>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {boardThemes.map((board) => (
            <div
              key={board.id}
              className="rounded-lg p-2 border-2"
              style={{ backgroundColor: board.bgColor, borderColor: board.borderColor }}
            >
              <h3 className="text-xs font-bold text-white">{board.name}</h3>
              <p className="text-[10px] text-gray-300">{board.description}</p>
            </div>
          ))}
        </div>

        {/* Game Stats */}
        <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700">
          <h3 className="text-base font-bold text-yellow-400 mb-3">📊 Game Stats</h3>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-gray-700/50 rounded-lg p-2">
              <p className="text-xl font-bold text-green-400">100</p>
              <p className="text-[10px] text-gray-400">Levels</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-2">
              <p className="text-xl font-bold text-purple-400">12</p>
              <p className="text-[10px] text-gray-400">Snakes</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-2">
              <p className="text-xl font-bold text-blue-400">10</p>
              <p className="text-[10px] text-gray-400">Boards</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-2">
              <p className="text-xl font-bold text-red-400">1</p>
              <p className="text-[10px] text-gray-400">Default</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
