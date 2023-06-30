import { useState } from "react";
import PlayerCard from "./PlayerCard";
import AddRoundModal from "./AddRoundModal";
import ScoreCardInfo from "./ScoreCardInfo";
import WinnerCard from "./WinnerCard";

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
  let sums = [];
  for (var name in scores) {
    let sum = scores[name].reduce(
      (accumulator, running) => (running += accumulator),
      0
    );
    sums.push(sum);
  }
  const gameOver = sums.some((num) => num >= 100);

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
      {!gameOver ? (
        <ScoreCardInfo
          round={round}
          toggleModal={toggleModal}
          deleteRound={deleteRound}
        />
      ) : (
        <WinnerCard pointTotals={sums} round={round} names={names} />
        // <h3>{getWinners()}</h3>
      )}
    </div>
  );
}
