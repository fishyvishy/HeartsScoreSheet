import { useState } from "react";
import PlayerCard from "./PlayerCard";

export default function ScoreCard(props) {
  const names = Object.values(props.names);

  let s = {};
  for (let i in names) {
    s[names[i]] = [26, 26, 26, 20];
  }
  const [scores, setScores] = useState(s);

  const playerCards = names.map((name) => (
    <PlayerCard name={name} points={scores[name]} key={name} />
  ));

  let round = scores[names[0]].length;
  let changeMsg;
  switch (round % 4) {
    case 0:
      changeMsg = "Change Left";
      break;
    case 1:
      changeMsg = "Change Right";
      break;
    case 2:
      changeMsg = "Change Across";
      break;
    case 3:
      changeMsg = "No Change";
      break;
  }

  return (
    <div className="score-card-container">
      <div className="score-card">{playerCards}</div>
      <div className="score-card-info">
        <h2 className="roundNum">Round {round + 1}</h2>
        <h2 className="changeMsg">{changeMsg}</h2>
        <div className="game-button-grid">
          <button>Add Round</button>
          {round > 0 && <button>Delete Round</button>}
        </div>
      </div>
    </div>
  );
}
