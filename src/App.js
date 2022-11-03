import React from 'react';
import './style.css';
import Board from './Board';

export default function App() {
  return (
    <div className="App">
      <h1>Minesweeper 💣</h1>
      <h2>
        Inspired by the <a href="">Minesweeper</a> game on Playstore.
      </h2>
      <Board height={15} width={10} mine={15} />
    </div>
  );
}
