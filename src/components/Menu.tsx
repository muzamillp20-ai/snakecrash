interface MenuProps {
  onPlay: () => void;
  onSnakeInfo: () => void;
}

export default function Menu({ onPlay, onSnakeInfo }: MenuProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-gray-900 to-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background snakes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 text-5xl animate-pulse opacity-20">🐍</div>
        <div className="absolute top-32 right-8 text-4xl animate-bounce opacity-20">🐍</div>
        <div className="absolute bottom-32 left-8 text-5xl animate-pulse opacity-15">🐍</div>
        <div className="absolute bottom-16 right-5 text-4xl animate-bounce opacity-20">🐍</div>
      </div>

      {/* Title */}
      <div className="text-center mb-6 relative z-10 w-full max-w-sm">
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 mb-1 leading-tight">
          🐍 MAHIRA MANSHA 🐍
        </h1>
        <h2 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 leading-tight">
          SNAKE CRASH
        </h2>
        <p className="text-base md:text-lg text-yellow-300 mt-2 font-bold">
          ⚡ Muzamill Bhaiya Edition ⚡
        </p>
        <div className="mt-3 flex items-center justify-center gap-4">
          <span className="text-3xl">🐍</span>
          <span className="text-xl text-gray-300 font-bold">vs</span>
          <span className="text-3xl">👧</span>
        </div>
        <p className="text-xs text-gray-400 mt-2 italic px-4">
          "Muzamill Bhaiya's snake chases Mahira through 100 dangerous levels!"
        </p>
      </div>

      {/* Menu Buttons */}
      <div className="flex flex-col gap-3 w-full max-w-xs relative z-10">
        <button
          onClick={onPlay}
          className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-800 active:from-green-500 active:to-green-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-900/50"
        >
          🎮 PLAY GAME
        </button>
        
        <button
          onClick={onSnakeInfo}
          className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-800 active:from-purple-500 active:to-purple-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-purple-900/50"
        >
          🐍 Snake Gallery
        </button>

        <button
          onClick={() => window.open('https://github.com', '_blank')}
          className="w-full px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-800 active:from-gray-600 active:to-gray-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-gray-900/50"
        >
          ⭐ GitHub Repository
        </button>
      </div>

      {/* Game Info */}
      <div className="mt-6 text-center text-gray-400 text-xs max-w-sm relative z-10 w-full">
        <div className="bg-gray-800/50 rounded-xl p-3 backdrop-blur-sm border border-gray-700">
          <h3 className="text-yellow-400 font-bold text-sm mb-2">📋 How to Play</h3>
          <ul className="text-left space-y-1 px-2">
            <li>🎯 Control the snake to eat 👧 (Mahira)</li>
            <li>🐍 Snake grows bigger with each food eaten</li>
            <li>💀 Don't let the snake touch itself!</li>
            <li>🌀 Snakes pass through walls (wrap around)</li>
            <li>⚠️ Avoid obstacles on the board</li>
            <li>🏆 Complete all 100 levels to win!</li>
          </ul>
          <div className="mt-2 p-2 bg-green-900/30 rounded-lg">
            <p className="text-green-300 text-xs">
              💡 Win: "Winner Mahira Mansha - Proud of U!"
            </p>
            <p className="text-red-300 text-xs mt-1">
              💀 Lose: "Muzamill Bhaiya Digested Mahira!"
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-gray-500 text-xs relative z-10">
        <p>Mahira Mansha Snake Crash © 2024</p>
        <p>100 Levels | 12 Snakes | 10 Boards</p>
      </div>
    </div>
  );
}
