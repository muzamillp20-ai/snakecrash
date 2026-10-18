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
      <div className="text-center w-full max-w-sm mx-auto">
        {won ? (
          <>
            {/* Win Screen */}
            <div className="animate-bounce mb-4">
              <p className="text-7xl">🏆</p>
            </div>
            <h1 className="text-4xl font-extrabold text-green-400 mb-2">
              WINNER!
            </h1>
            <h2 className="text-2xl font-bold text-yellow-300 mb-1">
              Winner Mahira Mansha!
            </h2>
            <p className="text-xl text-pink-300 font-bold mb-4">
              Proud of U! 💖✨
            </p>
            <div className="bg-green-800/50 rounded-xl p-4 mb-6 border border-green-600">
              <p className="text-base text-green-200">
                🎉 Mahira Mansha successfully escaped from Muzamill Bhaiya's snake! 🎉
              </p>
              <p className="text-sm text-gray-300 mt-2">
                Level {level} Complete | Score: {score}
              </p>
            </div>
            <div className="flex justify-center gap-3 text-4xl mb-6">
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
            <div className="mb-4">
              <p className="text-7xl">💀</p>
            </div>
            <h1 className="text-4xl font-extrabold text-red-500 mb-2">
              GAME OVER
            </h1>
            <h2 className="text-xl font-bold text-orange-400 mb-1">
              Muzamill Bhaiya Digested Mahira!
            </h2>
            <p className="text-lg text-red-300 font-bold mb-4">
              🐍 The snake caught Mahira! 🐍
            </p>
            <div className="bg-red-800/50 rounded-xl p-4 mb-6 border border-red-600">
              <p className="text-base text-red-200">
                😱 Muzamill Bhaiya's snake was too fast for Mahira! 😱
              </p>
              <p className="text-sm text-gray-300 mt-2">
                Level {level} | Score: {score}
              </p>
              <p className="text-xs text-gray-400 mt-2 italic">
                "Don't worry Mahira, try again! You can do it!" 💪
              </p>
            </div>
            <div className="flex justify-center gap-3 text-4xl mb-6">
              <span>🐍</span>
              <span>😵</span>
              <span>💀</span>
              <span>🐍</span>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full">
          {won && level < 100 && (
            <button
              onClick={onNextLevel}
              className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-700 active:from-green-500 active:to-emerald-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg"
            >
              ▶ Next Level ({level + 1})
            </button>
          )}
          <button
            onClick={onPlayAgain}
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 active:from-blue-500 active:to-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg"
          >
            🔄 Play Again
          </button>
          <button
            onClick={onMenu}
            className="w-full px-6 py-4 bg-gradient-to-r from-gray-600 to-gray-800 active:from-gray-500 active:to-gray-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg"
          >
            🏠 Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}
