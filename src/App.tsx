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

// Snake Info / Gallery Screen
function SnakeInfoScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-green-900/20 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-bold transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-yellow-400">
            🐍 Snake Gallery 🐍
          </h1>
          <div></div>
        </div>

        {/* Snake Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {snakeVarieties.map((snake, index) => (
            <div
              key={snake.id}
              className="bg-gray-800/80 rounded-xl p-4 border border-gray-700 hover:border-green-500 transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-full border-4 flex items-center justify-center text-xl"
                  style={{ backgroundColor: snake.bodyColor, borderColor: snake.headColor }}
                >
                  🐍
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{snake.name}</h3>
                  <p className="text-xs text-gray-400">#{index + 1} of 12</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-2">{snake.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Speed:</span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < Math.ceil(snake.speed * 3) ? 'bg-yellow-400' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-gray-400">Pattern:</span>
                <span className="text-xs text-green-400 capitalize">{snake.pattern}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Board Themes */}
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">🎨 Board Themes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {boardThemes.map((board) => (
            <div
              key={board.id}
              className="rounded-xl p-4 border-2 hover:scale-[1.02] transition-all"
              style={{ backgroundColor: board.bgColor, borderColor: board.borderColor }}
            >
              <h3 className="text-lg font-bold text-white">{board.name}</h3>
              <p className="text-sm text-gray-300">{board.description}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: board.gridColor }} />
                <span className="text-xs text-gray-300">Grid</span>
                <div className="w-4 h-4 rounded" style={{ backgroundColor: board.borderColor }} />
                <span className="text-xs text-gray-300">Border</span>
                <span className="text-xs text-gray-300">Wall: {board.wallPattern}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Game Stats */}
        <div className="bg-gray-800/50 rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-yellow-400 mb-3">📊 Game Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-3">
              <p className="text-2xl font-bold text-green-400">100</p>
              <p className="text-xs text-gray-400">Total Levels</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <p className="text-2xl font-bold text-purple-400">12</p>
              <p className="text-xs text-gray-400">Snake Types</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <p className="text-2xl font-bold text-blue-400">10</p>
              <p className="text-xs text-gray-400">Board Themes</p>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <p className="text-2xl font-bold text-red-400">1</p>
              <p className="text-xs text-gray-400">Default Game</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
