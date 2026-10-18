interface MenuProps {
  onPlay: () => void;
  onSnakeInfo: () => void;
}

export default function Menu({ onPlay, onSnakeInfo }: MenuProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-gray-900 to-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background snakes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-pulse opacity-20">🐍</div>
        <div className="absolute top-40 right-20 text-5xl animate-bounce opacity-20">🐍</div>
        <div className="absolute bottom-20 left-30 text-7xl animate-pulse opacity-15">🐍</div>
        <div className="absolute bottom-40 right-10 text-4xl animate-bounce opacity-20">🐍</div>
        <div className="absolute top-60 left-1/2 text-5xl animate-pulse opacity-10">🐍</div>
      </div>

      {/* Title */}
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 mb-2 animate-pulse">
          🐍 MAHIRA MANSHA 🐍
        </h1>
        <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
          SNAKE CRASH
        </h2>
        <p className="text-lg md:text-xl text-yellow-300 mt-3 font-bold">
          ⚡ Muzamill Bhaiya Edition ⚡
        </p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <span className="text-3xl">🐍</span>
          <span className="text-2xl text-gray-300">vs</span>
          <span className="text-3xl">👧</span>
        </div>
        <p className="text-sm text-gray-400 mt-2 italic">
          "Muzamill Bhaiya's snake chases Mahira through 100 dangerous levels!"
        </p>
      </div>

      {/* Menu Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-sm relative z-10">
        <button
          onClick={onPlay}
          className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-lg shadow-green-900/50"
        >
          🎮 PLAY GAME
        </button>
        
        <button
          onClick={onSnakeInfo}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-lg shadow-purple-900/50"
        >
          🐍 Snake Gallery
        </button>

        <button
          onClick={() => window.open('https://github.com', '_blank')}
          className="px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-lg shadow-gray-900/50"
        >
          ⭐ GitHub Repository
        </button>
      </div>

      {/* Game Info */}
      <div className="mt-8 text-center text-gray-400 text-sm max-w-md relative z-10">
        <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm">
          <h3 className="text-yellow-400 font-bold text-lg mb-2">📋 How to Play</h3>
          <ul className="text-left space-y-1">
            <li>🎯 Control the snake to eat 👧 (Mahira)</li>
            <li>🐍 Snake grows bigger with each food eaten</li>
            <li>💀 Don't let the snake touch itself!</li>
            <li>🌀 Snakes pass through walls (wrap around)</li>
            <li>⚠️ Avoid obstacles on the board</li>
            <li>🏆 Complete all 100 levels to win!</li>
          </ul>
          <div className="mt-3 p-2 bg-green-900/30 rounded-lg">
            <p className="text-green-300 text-xs">
              💡 If Mahira wins: "Winner Mahira Bhaiya - Proud of U!"
            </p>
            <p className="text-red-300 text-xs mt-1">
              💀 If snake catches: "Muzamill Bhaiya Digested Mahira!"
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-center text-gray-500 text-xs">
        <p>Mahira Mansha Snake Crash © 2024 | Muzamill Bhaiya Edition</p>
        <p>100 Levels | 12 Snake Varieties | 10 Board Themes</p>
      </div>
    </div>
  );
}
