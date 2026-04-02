import React from 'react';

const useMouseParallax = (intensity = 0.02) => {
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    const handle = (e) => {
      const x = (e.clientX - window.innerWidth / 2) * intensity;
      const y = (e.clientY - window.innerHeight / 2) * intensity;
      setOffset({ x, y });
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, [intensity]);
  return offset;
};

export default useMouseParallax;
