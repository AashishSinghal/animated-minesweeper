import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cell from './Cell';
import Theme from './Theme';
import { BiLeftArrowAlt } from 'react-icons/bi';
import MineSVG from './mine.svg';
import {
  getFlags,
  getHidden,
  getMines,
  getRandomNumber,
  initBoardData,
  traverseBoard,
} from './Utils';

export default function Board(props) {
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState('unknown');
  const [state, setState] = useState({
    boardData: initBoardData(props.height, props.width, props.mine),
    gameWon: false,
    mineCount: props.mine,
  });

  // reveals the whole board
  function revealBoard() {
    let updatedData = state.boardData;
    updatedData.map((datarow) => {
      datarow.map((dataitem) => {
        dataitem.isRevealed = true;
      });
    });
    setState({
      ...state,
      boardData: updatedData,
    });
  }

  /* reveal logic for empty cell */
  function revealEmpty(x, y, data, height, width) {
    let area = traverseBoard(x, y, data, height, width);
    area.map((value) => {
      if (!value.isRevealed && (value.isEmpty || !value.isMine)) {
        data[value.x][value.y].isRevealed = true;
        if (value.isEmpty) {
          revealEmpty(value.x, value.y, data, height, width);
        }
      }
    });
    return data;
  }

  // Handle User Events

  function handleCellClick(x, y) {
    let win = false;

    // check if revealed. return if true.
    if (state.boardData[x][y].isRevealed) return null;

    // check if mine. game over if true
    if (state.boardData[x][y].isMine) {
      revealBoard();
      setTimeout(() => {
        setShowModal(true);
        setResult('Game Over !');
      }, 2000);
    }

    let updatedData = state.boardData;
    updatedData[x][y].isFlagged = false;
    updatedData[x][y].isRevealed = true;

    if (updatedData[x][y].isEmpty) {
      updatedData = revealEmpty(x, y, updatedData, props.height, props.width);
    }

    if (getHidden(updatedData).length === props.mine) {
      win = true;
      revealBoard();
      setTimeout(() => {
        setShowModal(true);
        setResult('You Won !');
      }, 2000);
    }

    setState({
      ...state,
      boardData: updatedData,
      mineCount: props.mine - getFlags(updatedData).length,
      gameWon: win,
    });
  }

  function _handleContextMenu(e, x, y) {
    e.preventDefault();
    let updatedData = state.boardData;
    let mines = state.mineCount;
    let win = false;

    // check if already revealed
    if (updatedData[x][y].isRevealed) return;

    if (updatedData[x][y].isFlagged) {
      updatedData[x][y].isFlagged = false;
      mines++;
    } else {
      updatedData[x][y].isFlagged = true;
      mines--;
    }

    if (mines === 0) {
      const mineArray = getMines(updatedData);
      const FlagArray = getFlags(updatedData);
      win = JSON.stringify(mineArray) === JSON.stringify(FlagArray);
      if (win) {
        revealBoard();
        alert('You Win');
      }
    }

    setState({
      ...state,
      boardData: updatedData,
      mineCount: mines,
      gameWon: win,
    });
  }

  function renderBoard(data) {
    return data.map((datarow) => {
      return datarow.map((dataitem) => {
        return (
          <Cell
            key={dataitem.x * datarow.length + dataitem.y}
            onClick={() => handleCellClick(dataitem.x, dataitem.y)}
            cMenu={(e) => _handleContextMenu(e, dataitem.x, dataitem.y)}
            value={dataitem}
            width={props.width}
          />
        );
      });
    });
  }

  return (
    <div className="App">
      <div className="nav-panel">
        <Link to="/">
          <BiLeftArrowAlt className="back-arrow" />
        </Link>
        <div className="mine-info">
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 25"
            className="mine-svg-small"
          >
            <title>Bomb Threat</title>
            <path
              id="Bomb_Threat"
              data-name="Bomb Threat"
              d="M12.5,8A8.5,8.5,0,1,0,21,16.5,8.51,8.51,0,0,0,12.5,8ZM16,19l-1,1-2.5-2.51L10,20,9,19l2.51-2.5L9,14l1-1,2.5,2.51L15,13l1,1-2.51,2.5ZM21.65.64c-1.33,1.28-2.17.85-3.42.21A5.78,5.78,0,0,0,15.52,0,3.79,3.79,0,0,0,12,4H10.25A1.25,1.25,0,0,0,9,5.25V7.68a9.35,9.35,0,0,1,7,0V5.25A1.25,1.25,0,0,0,14.75,4H13a2.8,2.8,0,0,1,2.52-3,5,5,0,0,1,2.25.73c1.27.66,2.72,1.41,4.58-.37Z"
              fill="#349334"
            />
          </svg>{' '}
          : {state.mineCount}
        </div>
        <Theme />
      </div>
      {showModal && (
        <div className="game-over-modal">
          {result}
          <Link to="/">
            <button className="new-game">Okay</button>
          </Link>
        </div>
      )}
      <div className="board">
        <div
          className="cell-container"
          style={{
            width: `${props.width * 34}px`,
          }}
        >
          {renderBoard(state.boardData)}
        </div>
      </div>
    </div>
  );
}
