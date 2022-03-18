import React from "react";

const TopText = ({hasStarted, currentRound}) => {
  return <div className="title">{hasStarted ? <h2>Round: {currentRound.current}</h2> : <h1>Peaky Lingo</h1>}</div>;
};

export default TopText;
