import { useState } from "react";

export default function AddRoundModal(props) {
  const { names, toggle, scoreUpdater } = props;
  const [playerPoints, setPlayerPoints] = useState([0, 0, 0, 0]);
  const [shake, setShake] = useState(false);

  const formInputs = names.map((name) => {
    const index = names.indexOf(name);
    const val = playerPoints[index].toString();
    return (
      <div key={name} className="modal-input">
        <label htmlFor={name}>{name}</label>
        <input
          type="number"
          min="0"
          max="26"
          value={val}
          id={name}
          onChange={(e) => handleChange(index, e)}
        />
      </div>
    );
  });

  function handleChange(index, event) {
    setPlayerPoints((prevPoints) => {
      let updatedPoints = [...prevPoints];
      const val = event.target.value;
      updatedPoints[index] = Number(val);
      return updatedPoints;
    });
  }

  function submitPoints(event) {
    event.preventDefault();
    const inRange = playerPoints.every((num) => num === 26 || num === 0);
    const sum = playerPoints.reduce(
      (accumulator, runner) => (runner += accumulator),
      0
    );
    if (sum === 26) {
      const qSpadePlayed = playerPoints.some((num) => num >= 13);
      if (!qSpadePlayed) {
        console.log("queen of spades must be played");
        setShake(true);
      } else {
        scoreUpdater(playerPoints);
        toggle();
      }
    } else {
      if (inRange && sum === 78) {
        console.log("someone shot the moon");
      } else {
        setShake(true);
      }
    }
  }

  return (
    <>
      <div className="modal-container">
        <div className={`add-round-modal ${shake ? "modal-shake" : ""}`}>
          <h1>Enter Scores</h1>
          <form className="add-round-modal-form">
            {formInputs}
            <div>
              <button onClick={submitPoints}>Add Points</button>
              <button onClick={toggle}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
