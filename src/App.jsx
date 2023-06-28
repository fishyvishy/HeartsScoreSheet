import { useState } from "react";
import ScoreCard from "./Components/ScoreCard";
import heartslogo from "./assets/hearts-logo2.svg";
import "./App.css";

function App() {
  // 0: welcome, 1: setup, 2: started, 3: over
  const [gameState, setGameState] = useState("welcome");
  const [players, setPlayers] = useState({
    P1: "",
    P2: "",
    P3: "",
    P4: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setPlayers((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function onSubmit(event) {
    event.preventDefault();
    setGameState("started");
  }

  // Conditionally Render body by gameState
  let body;
  if (gameState === "welcome") {
    body = (
      <div className="button-panel">
        <button onClick={() => setGameState("setup")}>New Game</button>
        <a href="https://bicyclecards.com/how-to-play/hearts/" target="_blank">
          <button>Rules</button>
        </a>
      </div>
    );
  } else if (gameState === "setup") {
    const numToKey = { 1: "P1", 2: "P2", 3: "P3", 4: "P4" };
    const inputs = [1, 2, 3, 4].map((num) => {
      const pKey = numToKey[num];
      return (
        <input
          placeholder={`Player ${num}`}
          name={pKey}
          value={players[pKey]}
          onChange={handleChange}
        />
      );
    });
    body = (
      <div>
        <form onSubmit={onSubmit}>
          <div>
            {inputs[0]}
            {inputs[1]}
          </div>
          <div>
            {inputs[2]}
            {inputs[3]}
          </div>
          {/* <div>
            <input
              placeholder="Player 1"
              name="P1"
              value={players.P1}
              onChange={handleChange}
            />
            <input
              placeholder="Player 2"
              name="P2"
              value={players.P2}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              placeholder="Player 3"
              name="P3"
              value={players.P3}
              onChange={handleChange}
            />
            <input
              placeholder="Player 4"
              name="P4"
              value={players.P4}
              onChange={handleChange}
            />
          </div> */}
          <button>Start Game</button>
        </form>
      </div>
    );
  } else if (gameState === "started") {
    body = <ScoreCard names={players} />;
  }

  return (
    <>
      <div className="titleBar">
        <img
          src={heartslogo}
          className={gameState === "started" ? "movingImg" : ""}
        />
        <h1>Hearts Scoresheet</h1>
      </div>
      {body}
    </>
  );
}

export default App;
