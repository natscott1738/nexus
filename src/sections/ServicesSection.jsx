import theme from '../utils/theme';
import FloatingOrb from '../components/ui/FloatingOrb';
import SectionTitle from '../components/ui/SectionTitle';
import AnimatedSection from '../components/ui/AnimatedSection';
import Card from '../components/ui/Card';
import RotatingCube from '../components/3d/RotatingCube';
import FloatingDiamond from '../components/3d/FloatingDiamond';
import HolographicSphere from '../components/3d/HolographicSphere';
import FloatingPyramid from '../components/3d/FloatingPyramid';
import DNAHelix from '../components/3d/DNA_Helix';
import OrbitingRing from '../components/3d/OrbitingRing';

const ServicesSection = () => {
  const services = [
    { icon:'🌐', title:'Web Development', desc:'Custom websites and web applications built with modern frameworks, optimized for performance and scalability.', tags:['React','Next.js','Node.js'], model:'cube' },
    { icon:'📱', title:'Mobile Apps', desc:'Native and cross-platform mobile applications with intuitive UX and seamless device integration.', tags:['React Native','Flutter','iOS'], model:'diamond' },
    { icon:'🎨', title:'UI/UX Design', desc:'User-centered design that creates meaningful, delightful experiences through research-driven interfaces.', tags:['Figma','Prototyping','Research'], model:'sphere' },
    { icon:'☁️', title:'Cloud Solutions', desc:'Scalable cloud infrastructure and DevOps solutions that keep your applications running at peak performance.', tags:['AWS','Docker','CI/CD'], model:'pyramid' },
    { icon:'🤖', title:'AI & Machine Learning', desc:'Intelligent chatbots, AI assistants, and ML-powered solutions that automate processes and unlock insights from your data.', tags:['Python','GPT','NLP'], model:'helix' },
    { icon:'📊', title:'Data Analytics', desc:'Transform raw data into actionable intelligence with custom dashboards and analytics platforms.', tags:['D3.js','Tableau','BigQuery'], model:'ring' },
  ];
  const models = {
    cube: <RotatingCube size={50} />, diamond: <FloatingDiamond size={55} />,
    sphere: <HolographicSphere size={55} />, pyramid: <FloatingPyramid size={50} />,
    helix: <DNAHelix width={30} height={55} />, ring: <OrbitingRing size={55} />,
  };
  return (
    <section id="services" style={{ padding:'120px 24px', position:'relative', background:theme.colors.surface, overflow:'hidden' }}>
      <FloatingOrb color1="#B24BF3" color2="#6C63FF" size={400} bottom="-10%" right="-10%" delay={2} />
      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:2 }}>
        <SectionTitle badge="Services" title="What We Do Best" subtitle="End-to-end digital services designed to help your business thrive in the modern landscape." />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap:24 }}>
          {services.map((s,i) => (
            <AnimatedSection key={i} delay={i*0.08}>
              <Card style={{ padding:'36px 28px', height:'100%', display:'flex', flexDirection:'column' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
                  <div style={{ width:56, height:56, borderRadius:14, background:'rgba(108,99,255,0.1)',
                    border:`1px solid ${theme.colors.border}`, display:'flex', alignItems:'center',
                    justifyContent:'center', fontSize:28 }}>{s.icon}</div>
                  <div style={{ opacity:0.6 }}>{models[s.model]}</div>
                </div>
                <h3 style={{ fontSize:20, fontWeight:700, color:theme.colors.text, marginBottom:12 }}>{s.title}</h3>
                <p style={{ fontSize:15, color:theme.colors.textMuted, lineHeight:1.7, marginBottom:20, flex:1 }}>{s.desc}</p>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {s.tags.map((t,j) => (
                    <span key={j} style={{ padding:'4px 12px', background:'rgba(108,99,255,0.08)',
                      border:`1px solid ${theme.colors.border}`, borderRadius:theme.radius.pill,
                      fontSize:12, fontWeight:500, color:theme.colors.primary }}>{t}</span>
                  ))}
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
