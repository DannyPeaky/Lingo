import { useRef, useEffect } from "react";
import "react-simple-keyboard/build/css/index.css";
import ReactKeyboard from "react-simple-keyboard";
import { Guesses } from "../types";

interface Props {
  useGuesses: [Guesses, (guesses: Guesses) => void];
  game: { isPlaying: boolean };
  letters: { current: { incorrect: Set<string>; correct: Set<string>; perfect: Set<string> } };
  word: { answer: string };
  firstLetter: string;
  makeGuess: (guess: string) => boolean;
  nextRound: () => void;
  hasStarted: boolean;
  round: number;
  maxRounds: number;
}

const Controls: React.FC<Props> = ({
  useGuesses,
  game,
  letters,
  word,
  firstLetter,
  makeGuess,
  nextRound,
  hasStarted,
  round,
  maxRounds,
}) => {
  const [guesses, setGuesses] = useGuesses;
  const keyboard = useRef<any>();
  const usedFirst = useRef(false);
  const button = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    window.addEventListener("keydown", handleInput);
    return () => window.removeEventListener("keydown", handleInput);
  });

  const doubleLetter = (letter: string, isRSK?: boolean) => {
    letter = isRSK ? letter[1] : letter;
    if (letter === guesses.current?.[0] && !usedFirst.current) {
      keyboard.current.setInput(letter);
      usedFirst.current = true;
      return true;
    } else {
      usedFirst.current = true;
      return false;
    }
  };

  const handleInput = (key: KeyboardEvent | string) => {
    if (typeof key !== "string" && "key" in key) key = key.key;
    key = key.toUpperCase();

    if (!game.isPlaying) {
      if (key === "ENTER") button.current?.click();
    } else {
      if (key === "ENTER" || key === "{ENTER}") {
        const guess = guesses.current;
        if (makeGuess(guess)) {
          keyboard.current.setInput("");
        }
      } else if (key === "BACKSPACE" || key === "{BKSP}") {
        const newGuess = guesses.current.slice(0, guesses.current.length - 1);
        setGuesses({ ...guesses, current: newGuess });
        keyboard.current.setInput(newGuess);
      } else if (!doubleLetter(key) && key.length <= 1 && guesses.current.length + 1 <= word.answer.length) {
        if (!/^[A-Z]+$/.test(key)) key = "";
        const newGuess = guesses.current + key;
        setGuesses({ ...guesses, current: newGuess });
        keyboard.current.setInput(newGuess);
      }
    }
  };

  return (
    <div className="controls">
      {!game.isPlaying ? (
        <button ref={button} onTouchEnd={nextRound} onClick={nextRound}>
          {!hasStarted ? "Start Game" : round < maxRounds ? "Next Round" : "End Game"}
        </button>
      ) : (
        <ReactKeyboard
          autoUseTouchEvents={true}
          preventMouseUpDefault={true}
          disableCaretPositioning={true}
          keyboardRef={r => (keyboard.current = r)}
          layout={{
            default: ["Q W E R T Y U I O P", "A S D F G H J K L {bksp}", "Z X C V B N M {enter}"],
          }}
          buttonTheme={[
            {
              class: "incorrect",
              buttons: [...letters.current.incorrect].join(" "),
            },
            {
              class: "correct",
              buttons: [...letters.current.correct].join(" "),
            },
            {
              class: "perfect",
              buttons: [...letters.current.perfect].join(" "),
            },
          ].filter(a => a.buttons !== "")}
          display={{
            "{bksp}": "⌫",
            "{enter}": "GUESS",
          }}
          onKeyPress={handleInput}
          maxLength={word.answer.length}
          onInit={keyboard => {
            usedFirst.current = false;
            keyboard.setInput(firstLetter);
          }}
        />
      )}
    </div>
  );
};

export default Controls;
