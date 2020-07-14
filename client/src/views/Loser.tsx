import React from "react";

interface LOSER  {
  restart: () => void;
}

const Loser = ({ ...props }: LOSER) => {
  console.log('Lose props', props)
  return (
    <div className="Loser Restart">
      <h1>Sorry &#128557; You lose</h1>
      <button onClick={props.restart}>Restart the Game</button>
    </div>
  );
};

export default Loser;
