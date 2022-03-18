import React from "react";
import {IoFlagOutline, IoInformationCircleOutline, IoTimerOutline} from "react-icons/io5";
import {BiBarChartAlt2} from "react-icons/bi";
import axios from "axios";

const Settings = ({game, setGame, word, showStats}) => {
  const toggleTimer = () => {
    const toggle = !game.timerEnabled;
    localStorage.setItem("timer", JSON.stringify(toggle));
    setGame({...game, timerEnabled: toggle});
  };

  const flagWord = () => {
    if (window.confirm(`Flag the word: ${word.answer}?`)) {
      window.alert(`${word.answer} has been flagged.`);
      axios.patch("https://api.peaky.uk/peaky/items/lingo/" + word.answer, {flagged: 1});
    }
  };

  const leaderboard = () => showStats(true);

  const define = () => {
    window.open(`https://www.google.com/search?q=define+${word.answer.toLowerCase()}`, "_blank");
  };

  return (
    <div className="settings">
      <div
        className={`timerIcon${game.timerEnabled ? " active" : ""}`}
        title="Toggle Timer"
        onClick={toggleTimer}
        onTouchEnd={toggleTimer}
      >
        <IoTimerOutline />
      </div>

      {!(game.isPlaying || word.answer === "LINGO ") && (
        <>
          <div className="infoIcon" title="Google Definition" onClick={define} onTouchEnd={define}>
            <IoInformationCircleOutline />
          </div>
          <div className="flagIcon" title="Flag Word" onClick={flagWord} onTouchEnd={flagWord}>
            <IoFlagOutline />
          </div>
        </>
      )}

      <div className="leaderIcon" title="Show Leaderboard" onClick={leaderboard} onTouchEnd={leaderboard}>
        <BiBarChartAlt2 />
      </div>
    </div>
  );
};

export default Settings;
