import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import {
  getFlags,
  getHidden,
  getMines,
  getRandomNumber,
  initBoardData,
  traverseBoard,
} from './Utils';

export default function Board(props) {
  const [state, setState] = useState({
    boardData: initBoardData(props.height, props.width, props.mine),
    gameWon: false,
    mineCount: props.mine,
  });
  // useEffect(
  //   (nextProps) => {
  //     if (JSON.stringify(props) !== JSON.stringify(nextProps)) {
  //       setState({
  //         boardData: initBoardData(
  //           nextProps.height,
  //           nextProps.width,
  //           nextProps.mines
  //         ),
  //         gameWon: false,
  //         mineCount: nextProps.mines
  //       });
  //     }
  //   },
  //   [props]
  // );

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
      alert('game over');
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
      alert('You Win');
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
    console.log(data);
    return data.map((datarow) => {
      return datarow.map((dataitem) => {
        return (
          <>
            {/* <div key={dataitem.x * datarow.length + dataitem.y}> */}
            <Cell
              onClick={() => handleCellClick(dataitem.x, dataitem.y)}
              cMenu={(e) => _handleContextMenu(e, dataitem.x, dataitem.y)}
              value={dataitem}
              width={props.width}
            />
            {/* {datarow[datarow.length - 1] === dataitem ? (
              <div className="clear" />
            ) : (
              ''
            )} */}
            {/* </div> */}
          </>
        );
      });
    });
  }

  // useEffect(
  //   (nextProps) => {
  //     if (JSON.stringify(props) !== JSON.stringify(nextProps)) {
  //       setState({
  //         boardData: initBoardData(
  //           nextProps.height,
  //           nextProps.width,
  //           nextProps.mines
  //         ),
  //         gameWon: false,
  //         mineCount: nextProps.mines
  //       });
  //     }
  //   },
  //   [props]
  // );

  return (
    <div className="board">
      <div className="game-info">
        <span className="info">mines: {state.mineCount}</span>
        <br />
        <span className="info">{state.gameWon ? 'You Win' : ''}</span>
      </div>
      <div
        className="cell-container"
        style={{
          width: `${props.width * 34}px`,
        }}
      >
        {renderBoard(state.boardData)}
      </div>
    </div>
  );
}
