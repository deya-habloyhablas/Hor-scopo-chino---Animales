import React from 'react';
import { ANIMALS } from '../constants';
import { getZodiacYears } from '../utils/gameLogic';
import { Play } from 'lucide-react';

interface ZodiacWheelProps {
  onStart: () => void;
}

const ZodiacWheel: React.FC<ZodiacWheelProps> = ({ onStart }) => {
  const radius = 280; // Radius of the wheel in px (for desktop)
  const mobileRadius = 160;
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full p-4 overflow-hidden">
      
      <div className="text-center mb-8 z-10">
        <h1 className="text-4xl sm:text-6xl font-bold text-chineseRed-800 font-chinese drop-shadow-sm mb-2">
          HORÓSCOPO CHINO
        </h1>
        <p className="text-chineseRed-600/80 font-serif text-xl">Descubre los animales</p>
      </div>

      <div className="relative w-[340px] h-[340px] sm:w-[600px] sm:h-[600px]">
        {/* Outer Rim */}
        <div className="absolute inset-0 rounded-full border-[8px] sm:border-[12px] border-chineseRed-800 bg-chineseRed-50 shadow-2xl overflow-hidden">
           {/* Decorative concentric circles */}
           <div className="absolute inset-[20px] rounded-full border border-chineseRed-200 opacity-50"></div>
           <div className="absolute inset-[80px] rounded-full border border-chineseRed-100 opacity-50"></div>
        </div>

        {/* The Spokes/Slices */}
        {ANIMALS.map((animal, index) => {
          const angle = (index * 30); // 360 / 12 animals
          const years = getZodiacYears(animal.year, 4); // Get 4 recent years
          
          return (
            <div
              key={animal.id}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            >
               {/* Separator Line */}
               <div className="absolute top-0 left-1/2 w-px h-1/2 bg-chineseRed-300 origin-bottom -translate-x-1/2"></div>

               {/* Content Container */}
               <div 
                 className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 text-center flex flex-col items-center gap-0 sm:gap-1"
                 style={{
                    // No counter rotation, we want them to radiate like the photo
                 }}
               >
                  {/* Animal Emoji */}
                  <span className="text-2xl sm:text-4xl filter drop-shadow-sm transform translate-y-2">{animal.emoji}</span>
                  
                  {/* Name */}
                  <span className="font-chinese font-bold text-chineseRed-900 text-[10px] sm:text-sm tracking-widest uppercase mt-1">
                    {animal.name}
                  </span>
                  
                  {/* Years */}
                  <div className="flex flex-col text-[8px] sm:text-[10px] text-stone-500 font-serif leading-tight mt-1">
                      {years.map(y => <span key={y}>{y}</span>)}
                  </div>
               </div>
            </div>
          );
        })}

        {/* Center - Play Button / Yin Yang */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <button 
            onClick={onStart}
            className="group relative w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-2xl border-4 border-chineseGold-500 bg-stone-50 overflow-hidden transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
            aria-label="Empezar Juego"
          >
            {/* Yin Yang Graphic Construction using CSS */}
            <div className="absolute inset-0 bg-stone-900 w-1/2 h-full left-0"></div>
            <div className="absolute inset-0 bg-stone-50 w-1/2 h-full left-1/2"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 rounded-full bg-stone-900 flex items-center justify-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-stone-50 rounded-full"></div>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 rounded-full bg-stone-50 flex items-center justify-center">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-stone-900 rounded-full"></div>
            </div>

            {/* Play Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-chineseRed-900/0 group-hover:bg-chineseRed-900/30 transition-colors duration-300">
                <div className="bg-chineseRed-600/90 text-white px-4 py-1 rounded-full font-bold shadow-lg backdrop-blur-sm transform group-hover:scale-110 transition-all border-2 border-chineseGold-400">
                    JUGAR
                </div>
            </div>
          </button>
        </div>
      </div>
      
      <p className="mt-8 text-chineseRed-800/60 font-serif italic max-w-md text-center">
        Gira la rueda del destino y aprende español
      </p>
    </div>
  );
};

export default ZodiacWheel;
