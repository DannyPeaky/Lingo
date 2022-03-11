import {useEffect, useRef} from "react";

const TimerBar = ({percent}) => {
  const progress = useRef();

  useEffect(() => {
    progress.current.style.width = `${percent}%`;
  }, [percent]);

  return (
    <div className="timer">
      <div className="bar" ref={progress} />
    </div>
  );
};

export default TimerBar;
