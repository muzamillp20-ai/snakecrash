import { allLevels, snakeVarieties, boardThemes } from '../gameData';

interface LevelSelectProps {
  onSelectLevel: (level: number) => void;
  onBack: () => void;
  unlockedLevel: number;
}

export default function LevelSelect({ onSelectLevel, onBack, unlockedLevel }: LevelSelectProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-bold transition-colors text-lg"
          >
            ← Menu
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-yellow-400 text-center">
            🐍 Select Level 🐍
          </h1>
          <div className="text-right text-sm text-gray-400">
            <p>Unlocked: {unlockedLevel}/100</p>
          </div>
        </div>

        {/* Default Game Button */}
        <div className="mb-6">
          <button
            onClick={() => onSelectLevel(0)}
            className="w-full p-4 bg-gradient-to-r from-purple-700 to-pink-700 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-bold text-xl transition-all transform hover:scale-[1.02] shadow-lg"
          >
            🎮 DEFAULT GAME - Free Play Mode 🎮
            <p className="text-sm font-normal mt-1 text-purple-200">No obstacles, relaxed speed, infinite fun!</p>
          </button>
        </div>

        {/* Level Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {allLevels.map((level) => {
            const isUnlocked = level.level <= unlockedLevel;
            const snake = snakeVarieties.find(s => s.id === level.snakeId);
            const board = boardThemes.find(b => b.id === level.boardId);
            
            return (
              <button
                key={level.level}
                onClick={() => isUnlocked && onSelectLevel(level.level)}
                disabled={!isUnlocked}
                className={`
                  relative p-2 rounded-lg font-bold text-sm transition-all
                  ${isUnlocked
                    ? 'bg-gradient-to-br from-green-700 to-green-900 hover:from-green-600 hover:to-green-800 text-white hover:scale-110 shadow-md cursor-pointer'
                    : 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-50'
                  }
                `}
                title={isUnlocked ? `${level.name}\nSnake: ${snake?.name}\nBoard: ${board?.name}` : `Locked - Complete level ${level.level - 1}`}
              >
                <div className="text-center">
                  {isUnlocked ? (
                    <>
                      <span className="text-lg">{level.level}</span>
                      <div className="text-[8px] truncate text-green-300">{snake?.name?.split(' ')[0]}</div>
                    </>
                  ) : (
                    <span className="text-lg">🔒</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 p-4 bg-gray-800/50 rounded-xl">
          <h3 className="text-lg font-bold text-yellow-400 mb-3">🐍 Snake Varieties</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {snakeVarieties.map(snake => (
              <div key={snake.id} className="flex items-center gap-2 p-2 bg-gray-700/50 rounded-lg">
                <div
                  className="w-6 h-6 rounded-full border-2"
                  style={{ backgroundColor: snake.bodyColor, borderColor: snake.headColor }}
                />
                <div>
                  <p className="text-sm font-bold text-white">{snake.name}</p>
                  <p className="text-xs text-gray-400">Speed: {'⭐'.repeat(Math.ceil(snake.speed * 3))}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold text-yellow-400 mt-4 mb-3">🎨 Board Themes</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {boardThemes.map(board => (
              <div key={board.id} className="p-2 rounded-lg text-center" style={{ backgroundColor: board.bgColor, border: `2px solid ${board.borderColor}` }}>
                <p className="text-sm font-bold text-white">{board.name}</p>
                <p className="text-xs text-gray-300">{board.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
