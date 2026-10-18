interface ResultScreenProps {
  won: boolean;
  level: number;
  score: number;
  onPlayAgain: () => void;
  onNextLevel: () => void;
  onMenu: () => void;
}

export default function ResultScreen({ won, level, score, onPlayAgain, onNextLevel, onMenu }: ResultScreenProps) {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${
      won 
        ? 'bg-gradient-to-b from-green-900 via-emerald-900 to-black' 
        : 'bg-gradient-to-b from-red-900 via-gray-900 to-black'
    }`}>
      {/* Result Content */}
      <div className="text-center max-w-lg">
        {won ? (
          <>
            {/* Win Screen */}
            <div className="animate-bounce">
              <p className="text-6xl mb-4">🏆</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 mb-4">
              WINNER!
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">
              Winner Mahira Bhaiya!
            </h2>
            <p className="text-2xl text-pink-300 font-bold mb-4">
              Proud of U! 💖✨
            </p>
            <div className="bg-green-800/50 rounded-xl p-4 mb-6">
              <p className="text-lg text-green-200">
                🎉 Mahira successfully escaped from Muzamill Bhaiya's snake! 🎉
              </p>
              <p className="text-sm text-gray-300 mt-2">
                Level {level} Complete | Food Eaten: {score}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-4xl mb-6">
              <span className="animate-pulse">🎊</span>
              <span className="animate-bounce">🎉</span>
              <span className="animate-pulse">🥳</span>
              <span className="animate-bounce">💪</span>
              <span className="animate-pulse">🌟</span>
            </div>
          </>
        ) : (
          <>
            {/* Lose Screen */}
            <div>
              <p className="text-6xl mb-4">💀</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-red-500 mb-4">
              GAME OVER
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-orange-400 mb-2">
              Muzamill Bhaiya Digested Mahira!
            </h2>
            <p className="text-xl text-red-300 font-bold mb-4">
              🐍 The snake caught Mahira! 🐍
            </p>
            <div className="bg-red-800/50 rounded-xl p-4 mb-6">
              <p className="text-lg text-red-200">
                😱 Muzamill Bhaiya's snake was too fast for Mahira! 😱
              </p>
              <p className="text-sm text-gray-300 mt-2">
                Level {level} | Score: {score}
              </p>
              <p className="text-xs text-gray-400 mt-2 italic">
                "Don't worry Mahira, try again! You can do it!" 💪
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-4xl mb-6">
              <span>🐍</span>
              <span>😵</span>
              <span>💀</span>
              <span>🐍</span>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          {won && level < 100 && (
            <button
              onClick={onNextLevel}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              ▶ Next Level ({level + 1})
            </button>
          )}
          <button
            onClick={onPlayAgain}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            🔄 Play Again
          </button>
          <button
            onClick={onMenu}
            className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            🏠 Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}
