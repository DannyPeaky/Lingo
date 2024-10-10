interface Word {
  answer: string;
  letters: Record<string, number>;
  correct?: boolean;
}

interface Guesses {
  current: string;
  guesses: string[];
}

export type { Word, Guesses };
