import { drawTiles, drawAnswer } from "../functions/drawTiles";
import type { Guesses } from "../types";

interface Props {
  guesses: Guesses;
  guessSize: number;
  word: { answer: string; letters: Record<string, number>; correct?: boolean };
  game: { isPlaying: boolean; timerEnabled: boolean };
  hasStarted: boolean;
  letters: { current: { incorrect: Set<string>; correct: Set<string>; perfect: Set<string> } };
  board: React.MutableRefObject<HTMLDivElement | null>;
}

const Board: React.FC<Props> = ({ guesses, guessSize, word, game, hasStarted, letters, board }) => {
  const gridTemplateColumns = `repeat(${word.answer.length}, 1fr)`;

  return (
    <>
      <div className="board" ref={board} style={{ gridTemplateColumns }}>
        {drawTiles(guesses, guessSize, word, letters.current)}
      </div>
      {hasStarted && guesses.guesses[guesses.guesses.length - 1] !== word.answer && !game.isPlaying && (
        <div className="board" style={{ gridTemplateRows: "1fr", marginTop: "10px", gridTemplateColumns }}>
          {drawAnswer(word)}
        </div>
      )}
    </>
  );
};

export default Board;
