import Tile from "../components/Tile";
import { Guesses, Word } from "../types";

const drawTiles = (
  guesses: Guesses,
  guessSize: number,
  word: Word,
  kl: { incorrect: Set<string>; correct: Set<string>; perfect: Set<string> }
) => {
  const tiles: JSX.Element[] = [];

  let k = 0;
  for (let i = 0; i < guessSize; i++) {
    const letterCount = { ...word.letters };

    // Remove perfect letters from letter count to prevent duplicates
    for (let j = 0; j < word.answer.length; j++) {
      if (!guesses.guesses[i]) break;

      const letter = guesses.guesses[i][j];
      if (letter === word.answer[j]) {
        letterCount[letter]--;
      }
    }

    // Check remaining letters
    for (let j = 0; j < word.answer.length; j++) {
      if (guesses.guesses.length === i) {
        tiles.push(
          <Tile
            key={++k}
            letter={guesses.current[j]}
            state={i === 0 && j === 0 && guesses.current[j] === word.answer[0] ? "perfect" : undefined}
          />
        );
      } else if (guesses.guesses[i]) {
        const letter = guesses.guesses[i][j];
        let state;

        if (letter === word.answer[j]) {
          state = "perfect";

          // Remove from correct if needed and add to perfect for keyboard styling
          if (kl.correct.has(letter)) kl.correct.delete(letter);
          kl.perfect.add(letter);
        } else if (letterCount[letter]) {
          state = "correct";

          // Only add to correct if not already perfect
          if (!kl.perfect.has(letter)) kl.correct.add(letter);
          // Decrement to prevent duplicate corrects
          letterCount[letter]--;
        } else {
          state = "incorrect";
          kl.incorrect.add(letter);
        }

        tiles.push(<Tile letter={letter} state={state} key={++k} />);
      } else {
        tiles.push(<Tile key={++k} />);
      }
    }
  }

  return tiles;
};

const drawAnswer = (word: Word) => {
  const tiles = [];
  let k = Math.random();
  for (const letter of word.answer) {
    tiles.push(<Tile key={++k} letter={letter} state={"perfect"} />);
  }
  return tiles;
};

export { drawTiles, drawAnswer };
