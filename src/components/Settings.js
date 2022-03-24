import React, {useEffect, useState, useRef} from "react";
import {IoFlagOutline, IoInformationCircleOutline, IoTimerOutline, IoReloadCircleOutline} from "react-icons/io5";
import {BiBarChartAlt2} from "react-icons/bi";
import axios from "axios";

const Settings = ({game, setGame, word, showStats}) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const serviceWorker = useRef();

  useEffect(() => {
    const handleUpdate = e => {
      serviceWorker.current = e.detail;
      if (serviceWorker.current) setShowUpdate(true);
      else setShowUpdate(false);
    };

    window.addEventListener("updateIsReady", handleUpdate);
    return () => window.removeEventListener("updateIsReady", handleUpdate);
  });

  const reloadServiceWorker = () => {
    if (serviceWorker.current) {
      serviceWorker.current.addEventListener("statechange", e => {
        if (e.target.state === "activated") window.location.reload();
      });
      serviceWorker.current.postMessage({type: "SKIP_WAITING"});
      document.getElementById("root").innerHTML = "<h1>Updating service worker. Please wait...</h1>";
    }
  };

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
      {showUpdate && (
        <div
          className="leaderIcon"
          title="Reload Service Worker"
          onClick={reloadServiceWorker}
          onTouchEnd={reloadServiceWorker}
        >
          <IoReloadCircleOutline />
        </div>
      )}
    </div>
  );
};

export default Settings;
