import React, { useState, useLayoutEffect } from 'react';
import anime from 'animejs';

const Test = () => {
  const [playAnimation, setPlayAnimation] = useState(false);
  const animationRef = React.useRef(null);

  React.useEffect(() => {
    animationRef.current = anime({
      targets: '.inner',
      keyframes: [{ scale: 1.2 }, { scale: 0.0 }],
      delay: function (el, i) {
        return i * 100;
      },
      autoplay: playAnimation,
      loop: false,
      direction: 'forward',
      easing: 'easeInOutSine',
    });
  }, [playAnimation]);
  return (
    <div className="outer">
      <div
        className="inner"
        ref={animationRef}
        onClick={() => setPlayAnimation(true)}
      ></div>
    </div>
  );
};

export default Test;
