import React from "react";

const Tile = ({letter, state}) => {
  const classes = ["tile", state].filter(a => a).join(" ");

  return <div className={classes}>{letter || ""}</div>;
};

export default Tile;
