import React from 'react';
import theme from '../utils/theme';
import FloatingOrb from '../components/ui/FloatingOrb';
import DNAHelix from '../components/3d/DNA_Helix';
import SectionTitle from '../components/ui/SectionTitle';
import AnimatedSection from '../components/ui/AnimatedSection';
import Card from '../components/ui/Card';

const AboutSection = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const tabs = [
    { icon:'🎯', title:'Our Mission', desc:'We strive to deliver cutting-edge digital solutions that transform businesses and elevate user experiences. Our mission is to bridge the gap between innovative technology and practical business needs.' },
    { icon:'👁️', title:'Our Vision', desc:'To become a globally recognized digital innovation studio known for pushing creative boundaries while maintaining the highest standards of quality and performance.' },
    { icon:'💎', title:'Our Values', desc:'Integrity, innovation, and collaboration form the foundation of everything we do. We believe in transparent communication, continuous learning, and delivering value that exceeds expectations.' },
  ];
  return (
    <section id="about" style={{ padding:'120px 24px', position:'relative', overflow:'hidden' }}>
      <FloatingOrb color1="#6C63FF" color2="#00D4AA" size={350} top="10%" left="-8%" delay={1} />
      <div style={{ position:'absolute', right:'-5%', top:'15%', opacity:0.5 }}>
        <DNAHelix width={60} height={250} />
      </div>
      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:2 }}>
        <SectionTitle badge="About Us" title="Crafting Digital Excellence" subtitle="We're a team of passionate creators who believe great design and powerful technology can change the world." />
        <div style={{ display:'flex', gap:8, justifyContent:'center', marginBottom:40, flexWrap:'wrap' }}>
          {tabs.map((t,i) => (
            <button key={i} onClick={()=>setActiveTab(i)} style={{
              display:'flex', alignItems:'center', gap:8, padding:'12px 24px',
              background:activeTab===i?'rgba(108,99,255,0.15)':'rgba(255,255,255,0.03)',
              border:`1px solid ${activeTab===i?'rgba(108,99,255,0.4)':theme.colors.border}`,
              borderRadius:theme.radius.pill, color:activeTab===i?theme.colors.primary:theme.colors.textMuted,
              fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:theme.fonts.body, transition:'all 0.3s ease',
            }}><span style={{fontSize:18}}>{t.icon}</span>{t.title}</button>
          ))}
        </div>
        <AnimatedSection key={activeTab}>
          <Card style={{ maxWidth:700, margin:'0 auto', textAlign:'center', padding:'48px 40px' }} hoverable={false}>
            <div style={{ fontSize:48, marginBottom:16 }}>{tabs[activeTab].icon}</div>
            <h3 style={{ fontSize:24, fontWeight:700, marginBottom:16, color:theme.colors.text }}>{tabs[activeTab].title}</h3>
            <p style={{ fontSize:16, color:theme.colors.textMuted, lineHeight:1.8 }}>{tabs[activeTab].desc}</p>
          </Card>
        </AnimatedSection>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap:20, marginTop:56 }}>
          {[
            { icon:'🚀', title:'Fast Delivery', desc:'Agile workflows for rapid, quality results' },
            { icon:'🎨', title:'Design-First', desc:'Beautiful interfaces that users love' },
            { icon:'⚡', title:'Performance', desc:'Optimized for speed and scalability' },
            { icon:'🔒', title:'Secure & Reliable', desc:'Enterprise-grade security standards' },
          ].map((item,i) => (
            <AnimatedSection key={i} delay={i*0.1}>
              <Card style={{ textAlign:'center', padding:'32px 24px' }}>
                <div style={{ fontSize:36, marginBottom:12 }}>{item.icon}</div>
                <h4 style={{ fontSize:16, fontWeight:700, color:theme.colors.text, marginBottom:8 }}>{item.title}</h4>
                <p style={{ fontSize:14, color:theme.colors.textMuted, lineHeight:1.6 }}>{item.desc}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
