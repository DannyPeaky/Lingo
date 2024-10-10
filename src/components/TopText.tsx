interface Props {
  hasStarted: boolean;
  currentRound: { current: number };
}

const TopText: React.FC<Props> = ({ hasStarted, currentRound }) => {
  return <div className="title">{hasStarted ? <h2>Round: {currentRound.current}</h2> : <h1>Peaky Lingo</h1>}</div>;
};

export default TopText;
