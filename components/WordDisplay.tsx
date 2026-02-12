import React from 'react';
import { normalizeChar } from '../utils/gameLogic';

interface WordDisplayProps {
  word: string;
  guessedLetters: Set<string>;
  revealed?: boolean; // If true, show full word (game over)
}

const WordDisplay: React.FC<WordDisplayProps> = ({ word, guessedLetters, revealed = false }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 my-8">
      {word.split('').map((char, index) => {
        const normalizedChar = normalizeChar(char);
        const isGuessed = guessedLetters.has(normalizedChar);
        const showChar = isGuessed || revealed;

        return (
          <div key={index} className="flex flex-col items-center gap-1">
             {/* The Character Tile */}
            <div 
                className={`
                    w-12 h-16 sm:w-16 sm:h-20 flex items-center justify-center 
                    border-b-4 
                    text-4xl sm:text-5xl font-serif font-bold transition-all duration-500
                    ${showChar 
                        ? (revealed && !isGuessed ? "text-chineseRed-500 border-chineseRed-300" : "text-chineseRed-800 border-chineseRed-800") 
                        : "text-transparent border-stone-400"
                    }
                `}
            >
              {showChar ? char : '_'}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WordDisplay;
