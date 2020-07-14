import React from "react";

interface WINNER  {
  restart: () => void;
}

const Winner = ({ ...props }: WINNER) => {
  return (
    <div className="Winnner Restart">
      <h1>Congratulations &#128079; you Winn &#128175;</h1>
      <button onClick={props.restart}>Restart the Game</button>
    </div>
  );
};

export default Winner;