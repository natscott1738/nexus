import React from 'react';
import theme from '../utils/theme';
import useTypingEffect from '../hooks/useTypingEffect';
import useMouseParallax from '../hooks/useMouseParallax';
import useScrollAnimation from '../hooks/useScrollAnimation';
import useCountUp from '../hooks/useCountUp';
import ParticleField from '../components/ParticleField';
import FloatingOrb from '../components/ui/FloatingOrb';
import GradientText from '../components/ui/GradientText';
import Button from '../components/ui/Button';
import OrbitingRing from '../components/3d/OrbitingRing';
import RotatingCube from '../components/3d/RotatingCube';

const HeroSection = () => {
  const typedText = useTypingEffect(['Innovation', 'Excellence', 'Creativity', 'Solutions'], 100, 60, 2000);
  const parallax = useMouseParallax(0.015);
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => { setTimeout(()=>setLoaded(true), 100); }, []);
  const [statsRef, statsVis] = useScrollAnimation();
  const stat1 = useCountUp(50, 2000, statsVis);
  const stat2 = useCountUp(98, 2500, statsVis);
  const stat3 = useCountUp(3, 1500, statsVis);

  return (
    <section id="home" style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
      position:'relative', overflow:'hidden', padding:'120px 24px 80px' }}>
      <ParticleField />
      <FloatingOrb color1="#6C63FF" color2="#B24BF3" size={500} top="-10%" left="-10%" />
      <FloatingOrb color1="#00D4AA" color2="#6C63FF" size={400} bottom="-5%" right="-5%" delay={2} />
      <FloatingOrb color1="#B24BF3" color2="#00D4AA" size={300} top="30%" right="15%" delay={4} />

      <div style={{ maxWidth:1200, width:'100%', display:'flex', alignItems:'center',
        justifyContent:'space-between', gap:60, position:'relative', zIndex:2, flexWrap:'wrap' }}>
        <div style={{ flex:'1 1 500px', maxWidth:640 }}>
          <div style={{ opacity:loaded?1:0, transform:loaded?'translateY(0)':'translateY(30px)',
            transition:'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'8px 18px',
              background:'rgba(108,99,255,0.08)', border:`1px solid ${theme.colors.border}`,
              borderRadius:theme.radius.pill, marginBottom:24, fontSize:13, fontWeight:600,
              color:theme.colors.primary, letterSpacing:'0.05em' }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:theme.colors.accent,
                boxShadow:`0 0 10px ${theme.colors.glowAccent}`, animation:'pulse-glow 2s infinite' }} />
              Welcome to the Future
            </div>
          </div>
          <h1 style={{ fontSize:'clamp(36px,5.5vw,72px)', fontWeight:900, lineHeight:1.05,
            letterSpacing:'-0.03em', marginBottom:12,
            opacity:loaded?1:0, transform:loaded?'translateY(0)':'translateY(30px)',
            transition:'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s' }}>
            We Build Digital<br />
            <GradientText>{typedText}</GradientText>
            <span style={{ display:'inline-block', width:3, height:'0.9em', background:theme.colors.primary,
              marginLeft:4, animation:'pulse-glow 1s infinite', verticalAlign:'text-bottom' }} />
          </h1>
          <p style={{ fontSize:'clamp(16px,1.6vw,20px)', color:theme.colors.textMuted, lineHeight:1.7,
            marginBottom:36, maxWidth:520, opacity:loaded?1:0, transform:loaded?'translateY(0)':'translateY(30px)',
            transition:'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s' }}>
            A passionate team of designers, developers, and strategists crafting beautiful, high-performance digital experiences that push boundaries.
          </p>
          <div style={{ display:'flex', gap:16, flexWrap:'wrap',
            opacity:loaded?1:0, transform:loaded?'translateY(0)':'translateY(30px)',
            transition:'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.8s' }}>
            <Button onClick={()=>document.getElementById('projects')?.scrollIntoView({ behavior:'smooth' })}>
              View Our Work <span style={{fontSize:18}}>→</span>
            </Button>
            <Button variant="outline" onClick={()=>document.getElementById('about')?.scrollIntoView({ behavior:'smooth' })}>
              Learn More
            </Button>
          </div>
          <div ref={statsRef} style={{ display:'flex', gap:40, marginTop:48, flexWrap:'wrap',
            opacity:loaded?1:0, transition:'all 0.8s cubic-bezier(0.16,1,0.3,1) 1s' }}>
            {[{ n:stat1, s:'+', l:'Projects Delivered' }, { n:stat2, s:'%', l:'Client Satisfaction' }, { n:stat3, s:'', l:'Team Members' }].map((s,i) => (
              <div key={i}>
                <div style={{ fontSize:28, fontWeight:800, letterSpacing:'-0.02em' }}><GradientText>{s.n}{s.s}</GradientText></div>
                <div style={{ fontSize:13, color:theme.colors.textDim, marginTop:4, fontWeight:500 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex:'1 1 300px', display:'flex', justifyContent:'center', alignItems:'center', position:'relative',
          opacity:loaded?1:0, transition:'all 1s cubic-bezier(0.16,1,0.3,1) 0.6s',
          transform:loaded?`translate(${parallax.x}px,${parallax.y}px)`:'translateY(40px)' }}>
          <OrbitingRing size={320} />
          <div style={{ position:'absolute' }}>
            <RotatingCube size={100} />
          </div>
        </div>
      </div>

      <div style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)',
        display:'flex', flexDirection:'column', alignItems:'center', gap:8,
        opacity:loaded?0.6:0, transition:'opacity 1s ease 1.5s', cursor:'pointer' }}
        onClick={()=>document.getElementById('about')?.scrollIntoView({ behavior:'smooth' })}>
        <span style={{ fontSize:12, letterSpacing:'0.1em', color:theme.colors.textDim, textTransform:'uppercase' }}>Scroll</span>
        <div style={{ width:20, height:32, border:`2px solid ${theme.colors.textDim}`, borderRadius:10,
          display:'flex', justifyContent:'center', paddingTop:6 }}>
          <div style={{ width:3, height:8, background:theme.colors.primary, borderRadius:2, animation:'float 1.5s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
