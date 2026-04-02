import AnimatedSection from './AnimatedSection';
import theme from '../../utils/theme';

const SectionTitle = ({ badge, title, subtitle, align='center' }) => (
  <AnimatedSection style={{ textAlign:align, marginBottom:56, maxWidth:700, margin:align==='center'?'0 auto 56px':'0 0 56px' }}>
    {badge && <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px',
      background:'rgba(108,99,255,0.1)', border:`1px solid ${theme.colors.border}`,
      borderRadius:theme.radius.pill, fontSize:13, fontWeight:600, color:theme.colors.primary,
      marginBottom:16, letterSpacing:'0.05em', textTransform:'uppercase' }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:theme.colors.primary, boxShadow:`0 0 8px ${theme.colors.primary}` }} />{badge}
    </div>}
    <h2 style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:800, lineHeight:1.15,
      color:theme.colors.text, marginBottom:16, letterSpacing:'-0.02em' }}>{title}</h2>
    {subtitle&&<p style={{ fontSize:'clamp(15px,1.5vw,18px)', color:theme.colors.textMuted,
      lineHeight:1.7, maxWidth:560, margin:align==='center'?'0 auto':'0' }}>{subtitle}</p>}
  </AnimatedSection>
);

export default SectionTitle;
