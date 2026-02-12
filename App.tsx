import React, { useState, useEffect, useCallback } from 'react';
import { ANIMALS, MAX_LIVES } from './constants';
import { Animal, GameStatus } from './types';
import { normalizeChar, getInitialLetters } from './utils/gameLogic';
import Keyboard from './components/Keyboard';
import WordDisplay from './components/WordDisplay';
import ZodiacWheel from './components/ZodiacWheel';
import { RefreshCw, Home } from 'lucide-react';

// Custom Lantern Icon Component
const LanternIcon: React.FC<{ className?: string; filled: boolean }> = ({ className, filled }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2v2" />
    <path d="M8 4h8" />
    <path d="M5 10c0-3.5 3-5 7-5s7 1.5 7 5v2c0 3.5-3 5-7 5s-7-1.5-7-5v-2z" />
    <path d="M8 17h8" />
    <path d="M12 17v4" />
    <path d="M10 21l2 2 2-2" />
  </svg>
);

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentAnimal, setCurrentAnimal] = useState<Animal | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [status, setStatus] = useState<GameStatus>('playing');

  // Initialize a new game round
  const startNewGame = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * ANIMALS.length);
    const newAnimal = ANIMALS[randomIndex];
    
    // Get easier initial state
    const initialLetters = getInitialLetters(newAnimal.name);
    
    setCurrentAnimal(newAnimal);
    setGuessedLetters(initialLetters);
    setMistakes(0);
    setStatus('playing');
  }, []);

  // Handler to enter game from wheel
  const handleStartGame = () => {
    startNewGame();
    setShowIntro(false);
  };

  const handleReturnHome = () => {
    setShowIntro(true);
  };

  // Initial load logic (not needed as strictly as before due to Intro screen, but good to keep ready)
  useEffect(() => {
    if (!currentAnimal) {
        startNewGame();
    }
  }, [startNewGame, currentAnimal]);

  // Handle letter guess
  const handleGuess = (letter: string) => {
    if (status !== 'playing' || !currentAnimal) return;

    setGuessedLetters(prev => {
      const newSet = new Set(prev);
      newSet.add(letter);
      return newSet;
    });

    const normalizedWord = normalizeChar(currentAnimal.name);
    
    if (!normalizedWord.includes(letter)) {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      if (newMistakes >= MAX_LIVES) {
        setStatus('lost');
      }
    } else {
        // Check win condition
        const allLettersGuessed = normalizedWord.split('').every(char => 
             guessedLetters.has(char) || char === letter
        );
        
        if (allLettersGuessed) {
            setStatus('won');
        }
    }
  };

  // --- RENDER: Intro Screen ---
  if (showIntro) {
    return <ZodiacWheel onStart={handleStartGame} />;
  }

  // --- RENDER: Game Screen ---
  if (!currentAnimal) return <div className="min-h-screen flex items-center justify-center text-chineseRed-800">Cargando...</div>;

  return (
    <div className="min-h-screen flex flex-col font-serif text-stone-800 pb-12">
      
      {/* Header / Banner */}
      <header className="lantern-pattern w-full py-6 px-4 shadow-lg border-b-4 border-chineseGold-600 relative overflow-hidden">
        <div className="max-w-4xl mx-auto flex justify-between items-center relative z-10">
          <div>
            <h1 className="text-3xl sm:text-5xl font-bold text-stone-50 drop-shadow-md tracking-wide font-chinese">
              HORÓSCOPO CHINO
            </h1>
            <p className="text-chineseGold-400 mt-1 italic text-lg opacity-90">Adivina el animal</p>
          </div>
          <div className="flex gap-2">
            <button 
                onClick={handleReturnHome}
                className="bg-chineseRed-800 hover:bg-chineseRed-700 text-stone-50 p-3 rounded-full shadow-lg border border-chineseRed-600 transition-transform hover:scale-105"
                aria-label="Volver al inicio"
            >
                <Home size={28} strokeWidth={2} />
            </button>
            <button 
                onClick={startNewGame}
                className="bg-chineseGold-600 hover:bg-chineseGold-500 text-chineseRed-900 p-3 rounded-full shadow-lg transition-transform hover:rotate-180 active:scale-90"
                aria-label="Reiniciar juego"
            >
                <RefreshCw size={28} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center w-full max-w-4xl mx-auto p-4 sm:p-6">
        
        {/* Lives Counter */}
        <div className="w-full flex justify-end mb-4">
             <div className="flex items-center gap-1 bg-white/60 px-4 py-2 rounded-full border border-red-200 shadow-sm">
                <span className="text-chineseRed-700 font-bold mr-2">Vidas:</span>
                {Array.from({ length: MAX_LIVES }).map((_, i) => (
                    <LanternIcon 
                        key={i} 
                        className={`w-6 h-6 transition-colors duration-300 ${i < (MAX_LIVES - mistakes) ? 'text-chineseRed-600' : 'text-stone-300'}`} 
                        filled={i < (MAX_LIVES - mistakes)}
                    />
                ))}
             </div>
        </div>

        {/* Game Card */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-stone-200 w-full relative">
            
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-chineseRed-800 rounded-tl-xl opacity-20"></div>
            <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-chineseRed-800 rounded-tr-xl opacity-20"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-chineseRed-800 rounded-bl-xl opacity-20"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-chineseRed-800 rounded-br-xl opacity-20"></div>

            {/* Animal Image / Icon Area */}
            <div className="flex flex-col items-center justify-center mb-6">
                <div className="relative">
                    {/* Circle Background */}
                    <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-orange-50 border-4 border-chineseGold-500 flex items-center justify-center shadow-inner overflow-hidden">
                       <span className="text-8xl sm:text-9xl filter drop-shadow-md transform hover:scale-110 transition-transform duration-500 cursor-default select-none">
                           {currentAnimal.emoji}
                       </span>
                    </div>
                    {/* Chinese Character Badge */}
                    <div className="absolute -bottom-2 -right-2 bg-chineseRed-700 text-chineseGold-400 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-3xl font-chinese font-bold border-4 border-white shadow-md">
                        {currentAnimal.chineseChar}
                    </div>
                </div>
            </div>

            {/* Status Messages */}
            {status === 'playing' && (
                <div className="text-center mb-2 h-8">
                     <p className="text-stone-500 font-serif italic text-lg">¿Cuál es este animal?</p>
                </div>
            )}
            
            {status === 'won' && (
                <div className="text-center mb-4 animate-bounce">
                     <h2 className="text-3xl font-bold text-green-600">¡Correcto!</h2>
                     <p className="text-stone-600">{currentAnimal.description}</p>
                </div>
            )}

            {status === 'lost' && (
                <div className="text-center mb-4">
                     <h2 className="text-3xl font-bold text-chineseRed-700">¡Oh no!</h2>
                     <p className="text-stone-600">Era el <strong>{currentAnimal.name}</strong></p>
                </div>
            )}

            {/* The Word */}
            <WordDisplay 
                word={currentAnimal.name} 
                guessedLetters={guessedLetters} 
                revealed={status !== 'playing'}
            />

        </div>

        {/* Keyboard */}
        <Keyboard 
            guessedLetters={guessedLetters} 
            onGuess={handleGuess} 
            disabled={status !== 'playing'}
            wordToGuess={currentAnimal.name}
        />

      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-chineseRed-900/40 text-sm font-serif">
         Clase de Español • Año Nuevo Chino
      </footer>

    </div>
  );
};

export default App;