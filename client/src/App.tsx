import "./App.scss";

import * as Views from "./views";

import React, { useEffect } from "react";

import SocketConfig from "./helpers/socketConection";

function App() {
  const [socket, setSocket] = React.useState<any | null>(null);
  const [winner, setWinner] = React.useState<number | null>(null);
  let connect: any = new SocketConfig();

  // set winner handler
  const handleWinner = (winner: number) => setWinner(winner);

  const restart = () => {
    socket.emit("reset game");
    setWinner(null);
    connect = new SocketConfig();
    setSocket(connect.init());
  };

  const showRoom = () => {
    return winner === null ? (
      socket ? (
        <Views.GameRoom socket={socket} handleWinner={handleWinner} />
      ) : null
    ) : winner ? (
      <Views.Winner restart={() => restart()} />
    ) : (
      <Views.Loser restart={() => restart()} />
    );
  };

  useEffect(() => {
    // restart server connection
    if (connect.hasOwnProperty("init")) restart();
    setSocket(connect.init());
  }, []);

  return (
    <div className="App">
      <header className="App--header">
        <b>Game of Three &#128515;</b>
      </header>
      {showRoom()}
    </div>
  );
}

export default App;
