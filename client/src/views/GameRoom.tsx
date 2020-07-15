import * as Component from "../components";

import React, { useEffect, useState } from "react";

const GameRoom = ({ ...props }: any) => {
  const [teams, setTeams] = useState([]);
  const [turn, setTurn] = useState(null);
  const [number, setNumber] = useState(0);
  const [moves, setMoves] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [time, setTime] = useState(0);

  // console.log("GameRoom", props);

  const handleChange = (input: any) => {
    // define unique id for child cmp
    if (time) clearTimeout(time);

    const timeout: any = setTimeout(async () => {
      await props.socket.emit("insert number", {
        id: props.socket.id,
        value: input,
      });
    }, 1000);

    // update number after emiting
    setTime(timeout);
  };

  const filterTeam = (teams: any[]) => {
    return teams?.filter(
      (team: any) => String(team.id) === String(props.socket.id)
    )[0];
  };

  const handleClick = (event: any) => {
    // console.log("click");
    props.socket.emit("add move", {
      id: props.socket.id,
      value: event.target.value,
    });
    props.socket.emit("get states");
  };

  const loadConversation = () => {
    return conversation
      ? conversation.map((turn, index) => (
          <Component.PlayersConversation
            key={index}
            id={props.socket.id}
            teams={teams}
            turn={turn}
          />
        ))
      : null;
  };

  const checkMoves = (move: number) => {
    return !turn ||
      moves.filter((value) => Number(value) === Number(move)).length > 0 ||
      number === 0
      ? true
      : false;
  };

  const checkNumber = () => {
    return !turn || number > 0 ? true : false;
  };

  const setStates = (states: any) => {
    // set room state
    setTeams(states.teams);
    setTurn(filterTeam(states.teams).turn);
    setNumber(states.number);
    setMoves(states.moves);
    setConversation(states.conversation);

    return filterTeam(states.teams).win !== null
      ? props.handleWinner(filterTeam(states.teams).win)
      : null;
  };

  useEffect(() => {
    // console.log("show me the props", props);
    props.socket.on("get states", (states: any) => setStates(states));
  }, []);

  return (
    <div className="GameRoom">
      {loadConversation()}
      <Component.PlayActionControls
        checkMoves={checkMoves}
        checkNumber={() => checkNumber()}
        handleClick={(e: any) => handleClick(e)}
        handleChange={(e: any) => handleChange(e)}
      />
    </div>
  );
};

export default GameRoom;
