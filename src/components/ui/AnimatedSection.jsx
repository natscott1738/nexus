import useScrollAnimation from '../../hooks/useScrollAnimation';

const AnimatedSection = ({ children, delay = 0, direction = 'up', style = {} }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const dirs = { up:'translateY(40px)', down:'translateY(-40px)', left:'translateX(40px)', right:'translateX(-40px)' };
  return (
    <div ref={ref} style={{
      opacity:isVisible?1:0, transform:isVisible?'translate(0)':dirs[direction],
      transition:`opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
};

export default AnimatedSection;
