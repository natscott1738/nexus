import React from 'react';

const useCountUp = (target, duration = 2000, isVisible = false) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);
  return count;
};

export default useCountUp;
