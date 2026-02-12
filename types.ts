export interface Animal {
  id: string;
  name: string; // The Spanish name
  emoji: string;
  year: number; // Example year
  description: string;
  chineseChar: string;
}

export type GameStatus = 'playing' | 'won' | 'lost';

export interface GameState {
  currentAnimal: Animal | null;
  guessedLetters: Set<string>;
  mistakes: number;
  status: GameStatus;
}
