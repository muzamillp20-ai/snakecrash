import { allLevels, snakeVarieties, boardThemes } from '../gameData';

interface LevelSelectProps {
  onSelectLevel: (level: number) => void;
  onBack: () => void;
  unlockedLevel: number;
}

export default function LevelSelect({ onSelectLevel, onBack, unlockedLevel }: LevelSelectProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-3">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-700 active:bg-gray-600 text-white rounded-lg font-bold transition-colors text-sm"
          >
            ← Menu
          </button>
          <h1 className="text-lg md:text-xl font-bold text-yellow-400 text-center">
            🐍 Select Level
          </h1>
          <div className="text-right text-xs text-gray-400">
            <p>🔓 {unlockedLevel}/100</p>
          </div>
        </div>

        {/* Default Game Button */}
        <div className="mb-4">
          <button
            onClick={() => onSelectLevel(0)}
            className="w-full p-3 bg-gradient-to-r from-purple-700 to-pink-700 active:from-purple-600 active:to-pink-600 text-white rounded-xl font-bold text-base transition-all shadow-lg"
          >
            🎮 DEFAULT GAME - Free Play
            <p className="text-xs font-normal mt-1 text-purple-200">No obstacles, relaxed speed, infinite fun!</p>
          </button>
        </div>

        {/* Level Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {allLevels.map((level) => {
            const isUnlocked = level.level <= unlockedLevel;
            const snake = snakeVarieties.find(s => s.id === level.snakeId);
            
            return (
              <button
                key={level.level}
                onClick={() => isUnlocked && onSelectLevel(level.level)}
                disabled={!isUnlocked}
                className={`
                  relative aspect-square rounded-lg font-bold text-sm transition-all flex items-center justify-center
                  ${isUnlocked
                    ? 'bg-gradient-to-br from-green-700 to-green-900 active:from-green-600 active:to-green-800 text-white shadow-md border border-green-600'
                    : 'bg-gray-800 text-gray-600 border border-gray-700'
                  }
                `}
                title={isUnlocked ? `${level.name}\nSnake: ${snake?.name}` : `Locked - Complete level ${level.level - 1}`}
              >
                <div className="text-center">
                  {isUnlocked ? (
                    <span className="text-sm font-bold">{level.level}</span>
                  ) : (
                    <span className="text-sm">🔒</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 p-3 bg-gray-800/50 rounded-xl border border-gray-700">
          <h3 className="text-sm font-bold text-yellow-400 mb-2">🐍 Snake Varieties (12)</h3>
          <div className="grid grid-cols-2 gap-2">
            {snakeVarieties.map(snake => (
              <div key={snake.id} className="flex items-center gap-2 p-1.5 bg-gray-700/50 rounded-lg">
                <div
                  className="w-5 h-5 rounded-full border-2 flex-shrink-0"
                  style={{ backgroundColor: snake.bodyColor, borderColor: snake.headColor }}
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{snake.name}</p>
                  <p className="text-[10px] text-gray-400">Speed: {'⭐'.repeat(Math.ceil(snake.speed * 3))}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-bold text-yellow-400 mt-4 mb-2">🎨 Board Themes (10)</h3>
          <div className="grid grid-cols-2 gap-2">
            {boardThemes.map(board => (
              <div key={board.id} className="p-2 rounded-lg text-center" style={{ backgroundColor: board.bgColor, border: `2px solid ${board.borderColor}` }}>
                <p className="text-xs font-bold text-white">{board.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
