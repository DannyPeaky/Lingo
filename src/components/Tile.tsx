import React from "react";

interface Props {
  letter?: string;
  state?: string;
}

const Tile: React.FC<Props> = ({ letter, state }) => {
  const classes = ["tile", state].filter(a => a).join(" ");

  return <div className={classes}>{letter || ""}</div>;
};

export default Tile;
