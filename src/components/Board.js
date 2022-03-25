import {drawTiles, drawAnswer} from "../functions/drawTiles";

const Board = ({guesses, guessSize, word, game, hasStarted, letters, board}) => {
  const gridTemplateColumns = `repeat(${word.answer.length}, 1fr)`;

  return (
    <>
      <div className="board" ref={board} style={{gridTemplateColumns}}>
        {drawTiles(guesses, guessSize, word, letters.current, hasStarted)}
      </div>
      {hasStarted && guesses.guesses[guesses.guesses.length - 1] !== word.answer && !game.isPlaying && (
        <div className="board" style={{gridTemplateRows: "1fr", marginTop: "10px", gridTemplateColumns}}>
          {drawAnswer(word)}
        </div>
      )}
    </>
  );
};

export default Board;
