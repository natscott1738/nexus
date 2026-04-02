import React from 'react';

const useScrollAnimation = (options = {}) => {
  const [ref, setRef] = React.useState(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const { threshold = 0.15, once = true } = options;
  React.useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); if (once) obs.unobserve(ref); }
      else if (!once) setIsVisible(false);
    }, { threshold });
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref, threshold, once]);
  return [setRef, isVisible];
};

export default useScrollAnimation;
