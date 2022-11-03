import React, { useEffect, useState } from "react";
import anime from "animejs";

export default function Cell({ value, onClick, cMenu }) {
  const [playAnimation, setPlayAnimation] = useState(false);
  const animationRef = React.useRef(null);
  function getValue() {
    if (!value.isRevealed) {
      return value.isFlagged ? "🚩" : null;
    }
    if (value.isMine) {
      return "💣";
    }
    if (value.neighbour === 0) {
      return null;
    }
    return value.neighbour;
  }
  useEffect(() => {
    animationRef.current = anime({
      targets: `.cover${value.x}${value.y}`,
      keyframes: [{ scale: 1.2 }, { scale: 0.0 }],
      delay: function (el, i) {
        return i * 100;
      },
      autoplay: playAnimation,
      loop: false,
      direction: "forward",
      easing: "easeInOutSine",
    });
  }, []);

  const handleOnClick = () => {
    setPlayAnimation(true);
    onClick();
  };

  let className =
    "cell" +
    (value.isRevealed ? "" : " hidden") +
    (value.isMine ? " is-mine" : "") +
    (value.isFlagged ? " is-flag" : "");

  return (
    <div onClick={handleOnClick} className={className} onContextMenu={cMenu}>
      {/* <div className="value"></div> */}
      {getValue()}
      <div
        className={`${value.isRevealed ? "shown" : "cover"}`}
        style={{
          position: "absolute",
          backgroundColor: "#349334",
          border: "none",
          lineHeight: "34px",
          height: "34px",
          width: "34px",
          pointerEvents: "none",
        }}
      >
        {value.isFlagged && "🚩"}
      </div>
    </div>
  );
}
