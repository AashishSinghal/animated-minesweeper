import React, { useEffect } from 'react';
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
  useEffect(() => {
    animationRef.current = anime({
      targets: '.cell',
      keyframes: [{ scale: 1.2 }, { scale: 0.0 }],
      delay: function (el, i) {
        return i * 100;
      },
      autoplay: value.isRevealed,
      loop: false,
      direction: 'forward',
      easing: 'easeInOutSine',
    });
  }, [playAnimation]);

  let className =
    'cell' +
    (value.isRevealed ? '' : ' hidden') +
    (value.isMine ? ' is-mine' : '') +
    (value.isFlagged ? ' is-flag' : '');

  return (
    <div onClick={onClick} className={className} onContextMenu={cMenu}>
      <div className="cell"></div>
      {getValue()}
    </div>
  );
}
