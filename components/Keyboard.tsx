import React from 'react';
import { ALPHABET } from '../constants';

interface KeyboardProps {
  guessedLetters: Set<string>;
  onGuess: (letter: string) => void;
  disabled: boolean;
  wordToGuess: string;
}

const Keyboard: React.FC<KeyboardProps> = ({ guessedLetters, onGuess, disabled, wordToGuess }) => {
  const normalize = (c: string) => c.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedWord = normalize(wordToGuess);

  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto mt-8 p-4 bg-red-50/50 rounded-xl border-2 border-red-100">
      {ALPHABET.map((letter) => {
        const isGuessed = guessedLetters.has(letter);
        
        // Determine button style based on state
        let btnClass = "w-10 h-12 sm:w-12 sm:h-14 rounded-lg font-serif font-bold text-lg transition-all duration-200 shadow-md ";
        
        if (isGuessed) {
            const isCorrect = normalizedWord.includes(letter);
            if (isCorrect) {
                 btnClass += "bg-green-600 text-white opacity-90 cursor-not-allowed border-b-4 border-green-800 transform translate-y-1";
            } else {
                 btnClass += "bg-stone-300 text-stone-500 opacity-50 cursor-not-allowed border-b-0 translate-y-1";
            }
        } else {
            btnClass += "bg-chineseRed-700 text-stone-50 border-b-4 border-chineseRed-900 hover:bg-chineseRed-600 hover:text-white hover:-translate-y-0.5 active:translate-y-1 active:border-b-0";
        }

        return (
          <button
            key={letter}
            onClick={() => onGuess(letter)}
            disabled={isGuessed || disabled}
            className={btnClass}
            aria-label={`Adivinar letra ${letter}`}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
