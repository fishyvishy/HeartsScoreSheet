import { useState } from "react";
import heartslogo from "./assets/hearts-logo2.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      <div className="titleBar">
        <h1>Hearts Scoresheet</h1>
        <img src={heartslogo} />
      </div>
      <div className="button-panel">
        <button>New Game</button>
        <button>Rules</button>
      </div>
      <h2>Hi</h2>
    </>
  );
}

export default App;
