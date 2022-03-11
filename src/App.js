import React, {useEffect, useRef, useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import Board from "./components/Board";
import Controls from "./components/Controls";
import Settings from "./components/Settings";
import TimerBar from "./components/TimerBar";

const getTimer = () => JSON.parse(localStorage.getItem("timer") || "true");

const App = () => {
  const [words, setWords] = useState();
  const [word, setWord] = useState({answer: "LINGO ", letters: {W: 1, O: 1, R: 1, D: 1, L: 1, E: 1}, correct: false});
  const [guesses, setGuesses] = useState({current: "", guesses: ["LINGO", "WAS", "MADE", "BEFORE", "WORDLE"]});
  const [game, setGame] = useState({isPlaying: false, timerEnabled: getTimer()});

  const guessSize = 5;
  const currentRound = useRef(0);
  const letters = useRef({incorrect: new Set(), correct: new Set(), perfect: new Set(["A"])});
  const counter = useRef(50);
  const hasStarted = currentRound.current > 0;
  const board = useRef();

  // Word lists from API
  useEffect(() => {
    const getWords = async () => await axios.get("https://api.peaky.uk/peaky/items/lingo?limit=-1");
    const getDictionary = async () => await axios.get("https://www.danpeak.co.uk/dictionary.json").catch(() => []);

    const getWordLists = async () => {
      const temp = {4: [], 5: [], 6: []};

      // Get words from API, filter flagged words, and sort into word length
      const [words, dictionary] = await Promise.all([getWords(), getDictionary()]);
      for (const {word, flagged} of words.data.data) if (!flagged && temp[word.length]) temp[word.length].push(word);

      window.dictionary = dictionary.data;
      setWords(temp);
    };

    // Only run on first load
    getWordLists();
  }, []);

  // Timer
  useEffect(() => {
    if (!game.isPlaying || !game.timerEnabled) return;

    const timer = setInterval(() => {
      counter.current -= 0.25;
      if (counter.current <= 0) {
        setGame({...game, isPlaying: false});
      } else {
        setGame({...game, isPlaying: true});
      }
    }, 0.25 * 1000 * (15 / 100));

    return () => clearInterval(timer);
  }, [game]);

  const nextRound = () => {
    const rounds = Object.keys(words);
    const levels = rounds.length;
    const roundLength = 4;

    currentRound.current += 1;
    const wordLength = rounds[Math.floor((currentRound.current - 1) / roundLength) % levels];

    // Select a word from round's word length
    const availableWords = words[wordLength];
    const answer = availableWords[Math.floor(Math.random() * (availableWords.length - 1))];
    const firstLetter = answer[0];

    // Count letters to prevent duplicate letter bug
    const answerLetters = {};
    answer.split("").forEach(letter => {
      answerLetters[letter] = ++answerLetters[letter] || 1;
    });

    // Remove selected word
    const tempWords = {...words};
    tempWords[wordLength] = tempWords[wordLength].filter(word => word !== answer);

    // Reset Timer
    counter.current = 100;

    letters.current = {
      incorrect: new Set(),
      correct: new Set(),
      perfect: new Set([firstLetter]),
    };

    setWord({answer, letters: answerLetters});
    setGuesses({current: firstLetter, guesses: []});
    setGame({...game, isPlaying: true});
  };

  const makeGuess = guess => {
    if (guess.length < word.answer.length) {
      doShake("Not enough letters.");
      return false;
    }

    if (window.dictionary && !window.dictionary.includes(guesses.current.toLowerCase())) {
      doShake("Word not accepted.");
      return false;
    }

    if (guesses.guesses.length >= guessSize || counter.current <= 0) return false;

    const temp = [...guesses.guesses];
    temp.push(guess);
    setGuesses({current: "", guesses: temp});

    if (guess === word.answer || guesses.guesses.length + 1 >= guessSize) {
      setGame({...game, isPlaying: false});
    } else {
      counter.current = 100;
    }

    return true;
  };

  const doShake = message => {
    toast.error(message);
    board.current.classList.add("shake");
    setTimeout(() => {
      board.current.classList.remove("shake");
    }, 500);
  };

  return (
    <div className="game">
      <Settings game={game} setGame={setGame} word={word} />

      <div className="toast">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="dark"
        />
      </div>

      <div className="title">{hasStarted ? <h2>Round: {currentRound.current}</h2> : <h1>Peaky Lingo</h1>}</div>

      <div>
        <Board
          guessSize={guessSize}
          guesses={guesses}
          word={word}
          game={game}
          hasStarted={hasStarted}
          letters={letters}
          board={board}
        />
        {game.timerEnabled && <TimerBar percent={counter.current} />}
      </div>

      {!words ? (
        <div className="spinner" />
      ) : (
        <Controls
          game={game}
          useGuesses={[guesses, setGuesses]}
          firstLetter={word.answer[0]}
          letters={letters}
          word={word}
          hasStarted={hasStarted}
          makeGuess={makeGuess}
          nextRound={nextRound}
        />
      )}
    </div>
  );
};

export default App;
