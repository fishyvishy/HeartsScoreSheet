import { useState } from "react";

export default function AddRoundModal(props) {
  const { names, toggle, scoreUpdater } = props;
  const [playerPoints, setPlayerPoints] = useState([0, 0, 0, 0]);
  const [shake, setShake] = useState(false);
  const [error, setError] = useState("");

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

  function validate(points) {
    const sum = playerPoints.reduce(
      (accumulator, runner) => (runner += accumulator),
      0
    );
    if (sum === 26) {
      const qSpadePlayed = points.some((num) => num >= 13);
      if (!qSpadePlayed) {
        return "Some Player must have at least 13 points";
      }
      return "";
    } else {
      return "26 points must be allocated";
    }
  }

  function submitPoints(event) {
    event.preventDefault();

    const error = validate(playerPoints);
    if (error !== "") {
      setError(error);
      setShake(true);
    } else {
      const moonShot = playerPoints.some((num) => num === 26);
      if (moonShot) {
        const moonPoints = playerPoints.map((num) => (num === 26 ? 0 : 26));
        const shooter = names[playerPoints.indexOf(26)];
        console.log(`${shooter} shot the moon!!`);
        scoreUpdater(moonPoints);
      } else {
        scoreUpdater(playerPoints);
      }
      toggle();
    }
  }

  return (
    <>
      <div className="modal-container">
        <div
          className={`add-round-modal ${shake ? "modal-shake" : ""}`}
          onAnimationEnd={() => setShake(false)}
        >
          <h1>Enter Scores</h1>
          <form className="add-round-modal-form">
            {formInputs}
            <div>
              <button onClick={submitPoints}>Add Scores</button>
              <button onClick={toggle}>Cancel</button>
            </div>
          </form>
          <div className="modal-error-msg">
            {error !== "" ? `⚠ ${error}` : ""}
          </div>
        </div>
      </div>
    </>
  );
}
