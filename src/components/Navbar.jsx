import React from 'react';
import theme from '../utils/theme';
import GradientText from './ui/GradientText';
import Button from './ui/Button';

const Navbar = ({ activeSection }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive:true }); return () => window.removeEventListener('scroll', h);
  }, []);
  const links = [
    { id:'home', label:'Home' }, { id:'about', label:'About' },
    { id:'services', label:'Services' }, { id:'team', label:'Team' },
    { id:'projects', label:'Projects' }, { id:'contact', label:'Contact' },
  ];
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }); setMobileOpen(false); };
  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:1000,
      background:scrolled?'rgba(10,10,15,0.88)':'transparent',
      backdropFilter:scrolled?'blur(20px) saturate(180%)':'none',
      borderBottom:scrolled?`1px solid ${theme.colors.border}`:'1px solid transparent',
      transition:'all 0.4s ease', padding:scrolled?'12px 0':'20px 0',
    }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div onClick={()=>scrollTo('home')} style={{ cursor:'pointer', display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:theme.colors.gradient1,
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, fontWeight:900, color:'#fff',
            boxShadow:`0 0 15px rgba(108,99,255,0.3)` }}>N</div>
          <span style={{ fontSize:20, fontWeight:700, letterSpacing:'-0.02em' }}>
            <span style={{ color:theme.colors.text }}>Nex</span><GradientText>us</GradientText>
          </span>
        </div>
        <div style={{ display:'flex', gap:4, alignItems:'center' }} className="nav-desktop">
          {links.map(l => {
            const [h, setH] = React.useState(false);
            return <button key={l.id} onClick={()=>scrollTo(l.id)}
              onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
              style={{
                background:activeSection===l.id?'rgba(108,99,255,0.12)':h?'rgba(108,99,255,0.06)':'transparent',
                color:activeSection===l.id?theme.colors.primary:h?theme.colors.primaryLight:theme.colors.textMuted,
                border:'none', padding:'8px 16px', borderRadius:theme.radius.pill,
                fontSize:14, fontWeight:500, cursor:'pointer', fontFamily:theme.fonts.body, transition:'all 0.3s ease',
              }}>{l.label}</button>;
          })}
          <Button onClick={()=>scrollTo('contact')} style={{ padding:'10px 24px', fontSize:13, marginLeft:8 }}>Get in Touch</Button>
        </div>
        <button onClick={()=>setMobileOpen(!mobileOpen)} style={{
          display:'none', background:'none', border:'none', color:theme.colors.text, fontSize:24, cursor:'pointer', padding:8,
        }} className="nav-mobile-btn">{mobileOpen?'✕':'☰'}</button>
      </div>
      {mobileOpen && <div style={{
        position:'absolute', top:'100%', left:0, right:0, background:'rgba(10,10,15,0.95)',
        backdropFilter:'blur(20px)', borderBottom:`1px solid ${theme.colors.border}`, padding:16,
        display:'flex', flexDirection:'column', gap:4,
      }}>
        {links.map(l => (
          <button key={l.id} onClick={()=>scrollTo(l.id)} style={{
            background:activeSection===l.id?'rgba(108,99,255,0.12)':'transparent',
            color:activeSection===l.id?theme.colors.primary:theme.colors.textMuted,
            border:'none', padding:'12px 16px', borderRadius:theme.radius.md,
            fontSize:15, fontWeight:500, cursor:'pointer', fontFamily:theme.fonts.body, textAlign:'left',
          }}>{l.label}</button>
        ))}
      </div>}
    </nav>
  );
};

export default Navbar;
