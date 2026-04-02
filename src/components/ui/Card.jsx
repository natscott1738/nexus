import React from 'react';
import theme from '../../utils/theme';

const Card = ({ children, style={}, hoverable=true }) => {
  const [h, setH] = React.useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{
        background:h&&hoverable?theme.colors.bgCardHover:theme.colors.bgCard,
        border:`1px solid ${h&&hoverable?'rgba(108,99,255,0.35)':theme.colors.border}`,
        borderRadius:theme.radius.lg, padding:24,
        transition:'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        transform:h&&hoverable?'translateY(-6px) scale(1.01)':'translateY(0) scale(1)',
        boxShadow:h&&hoverable?`0 20px 50px rgba(0,0,0,0.4), 0 0 40px ${theme.colors.glow}`:'0 4px 20px rgba(0,0,0,0.2)',
        backdropFilter:'blur(10px)', position:'relative', overflow:'hidden', ...style,
      }}>
      {h&&hoverable&&<div style={{ position:'absolute', top:0, left:0, right:0, height:2,
        background:theme.colors.gradient1, opacity:0.8 }} />}
      {h&&hoverable&&<div style={{ position:'absolute', top:0, left:'-100%', width:'60%', height:'100%',
        background:'linear-gradient(90deg,transparent,rgba(108,99,255,0.04),transparent)',
        animation:'glow-line 1.5s ease-in-out' }} />}
      {children}
    </div>
  );
};

export default Card;
