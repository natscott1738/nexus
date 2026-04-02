import useScrollAnimation from '../../hooks/useScrollAnimation';
import theme from '../../utils/theme';

const SectionDivider = () => {
  const [ref, vis] = useScrollAnimation();
  return (
    <div ref={ref} style={{ display:'flex', justifyContent:'center', alignItems:'center', padding:'8px 0', position:'relative', zIndex:2 }}>
      <div style={{ display:'flex', gap:6, alignItems:'center' }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{
            width: i===2 ? 40 : i===1||i===3 ? 20 : 8,
            height: 2, borderRadius: 1,
            background: i===2 ? theme.colors.gradient1 : `rgba(108,99,255,${0.15+i*0.05})`,
            transform: vis ? 'scaleX(1)' : 'scaleX(0)',
            transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i*0.1}s`,
          }} />
        ))}
      </div>
    </div>
  );
};

export default SectionDivider;
