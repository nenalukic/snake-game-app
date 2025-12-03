import { useEffect, useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { Controls } from './components/Controls';
import { ScoreInput } from './components/ScoreInput';
import { Leaderboard } from './components/Leaderboard';
import { useGame } from './hooks/useGame';

function App() {
  const { snake, food, score, gameOver, isPlaying, resetGame, changeDirection, GRID_SIZE } = useGame();
  const [leaderboardTrigger, setLeaderboardTrigger] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': changeDirection('UP'); break;
        case 'ArrowDown': changeDirection('DOWN'); break;
        case 'ArrowLeft': changeDirection('LEFT'); break;
        case 'ArrowRight': changeDirection('RIGHT'); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeDirection]);

  const handleScoreSubmitted = () => {
    setLeaderboardTrigger(prev => prev + 1);
    resetGame();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold mb-8 text-green-500">SNAKE GAME</h1>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex flex-col items-center">
          <div className="mb-4 text-2xl font-mono">Score: {score}</div>

          <GameBoard
            snake={snake}
            food={food}
            gridSize={GRID_SIZE}
            gameOver={gameOver}
          />

          {!isPlaying && !gameOver && (
            <button
              onClick={resetGame}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded text-xl font-bold"
            >
              START GAME
            </button>
          )}

          {gameOver && (
            <div className="mt-4 text-center">
              <p className="text-red-500 text-xl font-bold mb-2">GAME OVER</p>
              <button
                onClick={resetGame}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
              >
                Play Again
              </button>
              <ScoreInput score={score} onScoreSubmitted={handleScoreSubmitted} />
            </div>
          )}

          <div className="md:hidden">
            <Controls onChangeDirection={changeDirection} />
          </div>
        </div>

        <Leaderboard refreshTrigger={leaderboardTrigger} />
      </div>
    </div>
  );
}

export default App;
