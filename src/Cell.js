import React from 'react';
import { anime } from 'animejs';

export default function Cell({ value, onClick, cMenu }) {
  function getValue() {
    console.log(value);
    if (!value.isRevealed) {
      return value.isFlagged ? '🚩' : null;
    }
    if (value.isMine) {
      return '💣';
    }
    if (value.neighbour === 0) {
      return null;
    }
    return value.neighbour;
  }

  let className =
    'cell' +
    (value.isRevealed ? '' : ' hidden') +
    (value.isMine ? ' is-mine' : '') +
    (value.isFlagged ? ' is-flag' : '');

  return (
    <div
      // ref="cell"
      onClick={onClick}
      className={className}
      onContextMenu={cMenu}
    >
      {getValue()}
    </div>
  );
}
