import React from 'react';
import theme from '../../utils/theme';

const Button = ({ children, variant='primary', onClick, style={} }) => {
  const [hovered, setHovered] = React.useState(false);
  const base = { display:'inline-flex', alignItems:'center', gap:8, padding:'14px 32px', fontSize:15,
    fontWeight:600, fontFamily:theme.fonts.body, borderRadius:theme.radius.pill, cursor:'pointer',
    border:'none', transition:'all 0.3s cubic-bezier(0.16,1,0.3,1)', position:'relative', overflow:'hidden',
    textDecoration:'none', letterSpacing:'0.02em' };
  const variants = {
    primary: { background:hovered?theme.colors.primaryLight:theme.colors.primary, color:'#fff',
      boxShadow:hovered?`0 8px 30px ${theme.colors.glow}`:`0 4px 15px rgba(108,99,255,0.25)`,
      transform:hovered?'translateY(-2px) scale(1.02)':'translateY(0) scale(1)' },
    outline: { background:hovered?'rgba(108,99,255,0.1)':'transparent', color:theme.colors.primary,
      border:`2px solid ${hovered?theme.colors.primary:theme.colors.border}`,
      transform:hovered?'translateY(-2px)':'translateY(0)' },
  };
  return <button style={{...base,...variants[variant],...style}}
    onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onClick={onClick}>{children}</button>;
};

export default Button;
