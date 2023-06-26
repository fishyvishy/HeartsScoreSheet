import { useState } from "react";
import heartslogo from "./assets/hearts-logo2.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      <div className="titleBar">
        <img src={heartslogo} />
        <h1>Hearts Scoresheet</h1>
      </div>
      <div className="button-panel">
        <button>New Game</button>
        <a href="https://bicyclecards.com/how-to-play/hearts/" target="_blank">
          <button>Rules</button>
        </a>
      </div>
    </>
  );
}

export default App;
