import React from 'react';
import theme from '../utils/theme';
import HolographicSphere from '../components/3d/HolographicSphere';
import RotatingCube from '../components/3d/RotatingCube';
import FloatingDiamond from '../components/3d/FloatingDiamond';
import FloatingOrb from '../components/ui/FloatingOrb';
import DNAHelix from '../components/3d/DNA_Helix';
import SectionTitle from '../components/ui/SectionTitle';
import AnimatedSection from '../components/ui/AnimatedSection';
import Card from '../components/ui/Card';

const TeamSection = () => {
  const team = [
    { name:'Matthew Waweru', role:'CEO & Founder', bio:'Visionary leader driving Nexus\'s mission to deliver world-class digital solutions across Africa and beyond.', color:'#6C63FF', initials:'MW' },
    { name:'Nathan Baraka', role:'Tech Lead', bio:'Full-stack architect with deep expertise in scalable systems, modern frameworks, and technical leadership.', color:'#00D4AA', initials:'NB' },
    { name:'Charles Fortunatius', role:'DevOps Engineer', bio:'Cloud infrastructure specialist ensuring seamless deployments, 99.9% uptime, and peak system performance.', color:'#B24BF3', initials:'CF' },
    { name:'Joe Osumba', role:'Head of Business development', bio:'Business growth strategist focused on partnerships, market expansion, and long-term client success.', color:'#FF8A3D', initials:'JO' },
  ];
  const memberModels = [
    <HolographicSphere size={44} />,
    <RotatingCube size={36} />,
    <FloatingDiamond size={40} />,
    <RotatingCube size={32} />,
  ];

  return (
    <section id="team" style={{ padding:'120px 24px', position:'relative', overflow:'hidden' }}>
      <FloatingOrb color1="#00D4AA" color2="#6C63FF" size={350} top="20%" right="-5%" delay={3} />
      <div style={{ position:'absolute', left:'3%', top:'50%', opacity:0.4, transform:'translateY(-50%)' }}>
        <DNAHelix width={50} height={300} />
      </div>
      <div style={{ maxWidth:1000, margin:'0 auto', position:'relative', zIndex:2 }}>
        <SectionTitle badge="Our Team" title="Meet the Creators" subtitle="A talented trio united by a shared passion for building exceptional digital products." />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap:28 }}>
          {team.map((m,i) => (
            <AnimatedSection key={i} delay={i*0.12}>
              <Card style={{ textAlign:'center', padding:'44px 28px' }}>
                <div style={{ position:'relative', width:100, height:100, margin:'0 auto 24px' }}>
                  <div style={{ width:100, height:100, borderRadius:'50%',
                    background:`linear-gradient(135deg,${m.color}33,${m.color}11)`,
                    border:`2px solid ${m.color}55`, display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:28, fontWeight:800, color:m.color, position:'relative', zIndex:1 }}>
                    {m.initials}
                  </div>
                  <div style={{ position:'absolute', inset:-6, borderRadius:'50%', border:`1px solid ${m.color}22`,
                    animation:'ring-pulse 2.5s ease-in-out infinite' }} />
                  <div style={{ position:'absolute', inset:-12, borderRadius:'50%', border:`1px solid ${m.color}11`,
                    animation:'ring-pulse 2.5s ease-in-out 0.5s infinite' }} />
                </div>
                <div style={{ position:'absolute', top:16, right:16, opacity:0.5 }}>{memberModels[i]}</div>
                <h3 style={{ fontSize:20, fontWeight:700, color:theme.colors.text, marginBottom:6 }}>{m.name}</h3>
                <p style={{ fontSize:14, fontWeight:600, color:m.color, marginBottom:14,
                  display:'inline-block', padding:'4px 14px', background:`${m.color}11`,
                  borderRadius:theme.radius.pill, border:`1px solid ${m.color}22` }}>{m.role}</p>
                <p style={{ fontSize:14, color:theme.colors.textMuted, lineHeight:1.7, marginTop:8 }}>{m.bio}</p>
                <div style={{ display:'flex', justifyContent:'center', gap:10, marginTop:20 }}>
                  {['in','𝕏','◻'].map((social,j) => {
                    const [sh, setSh] = React.useState(false);
                    return <div key={j}
                      onMouseEnter={()=>setSh(true)} onMouseLeave={()=>setSh(false)}
                      style={{ width:34, height:34, borderRadius:'50%',
                        background:sh?`${m.color}22`:'rgba(255,255,255,0.04)',
                        border:`1px solid ${sh?m.color+'44':theme.colors.border}`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:12, color:sh?m.color:theme.colors.textDim, cursor:'pointer',
                        transition:'all 0.3s ease', transform:sh?'translateY(-2px)':'translateY(0)',
                      }}>{social}</div>;
                  })}
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
