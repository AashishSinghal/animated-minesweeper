import React from 'react';
import './style.css';
import Board from './Board';
import Theme from './Theme';
import { BiLeftArrowAlt } from 'react-icons/bi';
import MineSVG from './mine.svg';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <Theme />
            <h1>Minesweeper 💣</h1>
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25 25"
              className="mine-svg"
            >
              <title>Bomb Threat</title>
              <path
                id="Bomb_Threat"
                data-name="Bomb Threat"
                d="M12.5,8A8.5,8.5,0,1,0,21,16.5,8.51,8.51,0,0,0,12.5,8ZM16,19l-1,1-2.5-2.51L10,20,9,19l2.51-2.5L9,14l1-1,2.5,2.51L15,13l1,1-2.51,2.5ZM21.65.64c-1.33,1.28-2.17.85-3.42.21A5.78,5.78,0,0,0,15.52,0,3.79,3.79,0,0,0,12,4H10.25A1.25,1.25,0,0,0,9,5.25V7.68a9.35,9.35,0,0,1,7,0V5.25A1.25,1.25,0,0,0,14.75,4H13a2.8,2.8,0,0,1,2.52-3,5,5,0,0,1,2.25.73c1.27.66,2.72,1.41,4.58-.37Z"
                fill="#349334"
              />
            </svg>
            <div>
              <label htmlFor="level">Select Level : </label>
              <select name="level" id="level" className="level-select">
                <option value={1}>Beginner</option>
                <option value={2}>Medium</option>
                <option value={3}>Hard</option>
              </select>
            </div>
            <Link to="/new-game">
              <button className="new-game">New Game</button>
            </Link>
            <p>
              Inspired by the <a href="">Minesweeper</a> game on Playstore.
            </p>
          </div>
        </Route>
        <Route exact path="/new-game">
          <Board height={15} width={10} mine={15} />
        </Route>
      </Switch>
    </Router>
  );
}
