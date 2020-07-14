import React, { useEffect } from "react";

const PlayersConversation = ({ ...props }: any) => {
  const [current, setCurrent] = React.useState<boolean | null>(null);
  const [name, setName] = React.useState<any | null>(null);

  const alignPlayer = () => {
    return props.turn.id === props.id ? setCurrent(true) : setCurrent(false);
  }
    
  const getName = () => {
    return props.teams.filter(
      (team: any) => String(team.id) === String(props.turn.id)
    )[0]
      ? setName(
          props.teams.filter(
            (team: any) => String(team.id) === String(props.turn.id)
          )[0].name
        )
      : null;
  };

  useEffect(() => {
    alignPlayer();
    getName();
  }, []);

  return (
    <div className="Conversation">
      <div
        className={`Conversation__player ${
          current ? "Conversation--right" : "Conversation--left"
        }`}
      >
        <div className="Conversation__name">{name}</div>
        {props.turn.value ? (
          <div className="Conversation__value">{props.turn.value}</div>
        ) : null}
      </div>
      <div className="Conversation__inputs">
        {props.turn.value ? (
          <input
            type="text"
            name="calc"
            value={props.turn.first}
            disabled={true}
          />
        ) : null}
        <input
          type="number"
          name="number"
          value={props.turn.second}
          disabled={true}
        />
      </div>
    </div>
  );
};

export default PlayersConversation;
