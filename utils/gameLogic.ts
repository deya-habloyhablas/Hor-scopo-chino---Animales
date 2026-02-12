/**
 * Normalizes a string to remove accents.
 * e.g., "DRAGÓN" -> "DRAGON"
 */
export const normalizeChar = (char: string): string => {
  return char.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

/**
 * Checks if a letter is in the word, handling accents.
 * If word is "DRAGÓN" and letter is "O", returns true.
 */
export const isLetterInWord = (word: string, letter: string): boolean => {
  const normalizedWord = normalizeChar(word);
  const normalizedLetter = normalizeChar(letter);
  return normalizedWord.includes(normalizedLetter);
};

/**
 * Returns a set of indices to pre-reveal to make the game easier.
 * Reveal roughly 30% of the letters.
 */
export const getInitialRevealedIndices = (word: string): number[] => {
  const length = word.length;
  // Determine how many hints to give (at least 1, approx 1/3 of word)
  const numberOfHints = Math.max(1, Math.floor(length / 3));
  
  const indices = Array.from({ length }, (_, i) => i);
  // Shuffle indices
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  
  return indices.slice(0, numberOfHints);
};

/**
 * Helper to get the initial letters set based on indices
 */
export const getInitialLetters = (word: string): Set<string> => {
    const indices = getInitialRevealedIndices(word);
    const initialSet = new Set<string>();
    
    indices.forEach(index => {
        // We add the normalized version of the letter at that index
        initialSet.add(normalizeChar(word[index]));
    });
    
    return initialSet;
};

/**
 * Generates a list of past years for a given animal base year.
 * Returns 4 dates: e.g. 2024, 2012, 2000, 1988
 */
export const getZodiacYears = (baseYear: number, count: number = 5): number[] => {
  const years = [];
  const currentYear = new Date().getFullYear();
  // Adjust base year to be the most recent occurrence if it's in the past relative to current loop, 
  // or future if we want future dates. The constants have future/recent dates.
  
  // We just subtract multiples of 12 from the base provided in constants.
  for (let i = 0; i < count; i++) {
    years.push(baseYear - (i * 12));
  }
  return years;
};
