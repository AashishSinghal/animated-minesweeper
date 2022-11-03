import React from 'react';
import { motion } from 'framer-motion';

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
      <motion.div
        className={`${value.isRevealed ? '' : 'hidden'}`}
        initial={{ scale: 1 }}
        animate={{ scale: [1.2, 1, 0.7, 0.5, 0] }}
        transition={{ duration: 0.5 }}
      ></motion.div>
      {getValue()}
    </div>
  );
}
