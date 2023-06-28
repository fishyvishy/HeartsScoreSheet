import { useState } from "react";
import PlayerCard from "./PlayerCard";
import AddRoundModal from "./AddRoundModal";

export default function ScoreCard(props) {
  const [showModal, setShowModal] = useState(false);
  function toggleModal() {
    setShowModal((prevState) => !prevState);
  }

  const names = Object.values(props.names);
  let scoreBuilder = {};
  for (let i in names) {
    scoreBuilder[names[i]] = [];
  }
  const [scores, setScores] = useState(scoreBuilder);

  function updateScores(roundScores) {
    setScores((prevScores) => {
      const newScores = { ...prevScores };
      for (var n in names) {
        newScores[names[n]] = [...newScores[names[n]], roundScores[n]];
      }
      return newScores;
    });
  }

  function deleteRound() {
    setScores((prevScores) => {
      let newScores = { ...prevScores };
      for (var n in names) {
        let name = names[n];
        newScores[name].pop();
      }
      return newScores;
    });
  }

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
      {showModal && (
        <AddRoundModal
          toggle={toggleModal}
          names={names}
          scoreUpdater={updateScores}
        />
      )}
      <div className="score-card">{playerCards}</div>
      <div className="score-card-info">
        <h2 className="roundNum">Round {round + 1}</h2>
        <h2 className="changeMsg">{changeMsg}</h2>
        <div className="game-button-grid">
          <button onClick={toggleModal}>Add</button>
          {round > 0 && <button onClick={deleteRound}>Delete</button>}
        </div>
      </div>
    </div>
  );
}
