export default function ScoreCardInfo(props) {
  const { round, toggleModal, deleteRound } = props;
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
    <div className="score-card-info">
      <h2 className="roundNum">Round {round + 1}</h2>
      <h2 className="changeMsg">{changeMsg}</h2>
      <div className="game-button-grid">
        <button onClick={toggleModal}>Add</button>
        {round > 0 && <button onClick={deleteRound}>Delete</button>}
      </div>
    </div>
  );
}
