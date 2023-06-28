import { useState } from "react";

export default function AddRoundModal(props) {
  const { names, toggle, scoreUpdater } = props;
  const [playerPoints, setPlayerPoints] = useState([0, 0, 0, 0]);

  const formInputs = names.map((name) => (
    <div key={name}>
      <label>{name}</label>
      <input
        type="number"
        min="0"
        max="26"
        value={playerPoints[names.indexOf(name)]}
        onChange={(e) => handleChange(names.indexOf(name), e)}
      />
    </div>
  ));

  function handleChange(index, event) {
    setPlayerPoints((prevPoints) => {
      let updatedPoints = [...prevPoints];
      updatedPoints[index] = Number(event.target.value);
      return updatedPoints;
    });
  }

  function submitPoints() {
    scoreUpdater(playerPoints);
    toggle();
  }

  return (
    <div className="add-round-modal">
      <h1>Enter Scores</h1>
      <form className="add-round-modal-form">
        {formInputs}
        <div>
          <button onClick={submitPoints}>Add Points</button>
          <button onClick={toggle}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
