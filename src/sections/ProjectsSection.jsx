import React from 'react';
import theme from '../utils/theme';
import RotatingCube from '../components/3d/RotatingCube';
import FloatingDiamond from '../components/3d/FloatingDiamond';
import HolographicSphere from '../components/3d/HolographicSphere';
import FloatingPyramid from '../components/3d/FloatingPyramid';
import OrbitingRing from '../components/3d/OrbitingRing';
import SectionTitle from '../components/ui/SectionTitle';
import AnimatedSection from '../components/ui/AnimatedSection';
import Card from '../components/ui/Card';

const ProjectsSection = () => {
  const [filter, setFilter] = React.useState('All');
  const projects = [
    { title:'Property Management System', cat:'Web', desc:'A comprehensive real estate platform for managing properties, tenants, leases, payments, and maintenance requests with real-time dashboards.', color:'#6C63FF', tech:['React','Node.js','PostgreSQL','Stripe'], featured:true },
    { title:'AI Chatbot & Virtual Assistant', cat:'AI', desc:'Intelligent conversational AI assistant with natural language understanding, multi-channel support, and seamless CRM integration.', color:'#50FA7B', tech:['Python','GPT-4','LangChain','FastAPI'], featured:true },
    { title:'E-Commerce Platform', cat:'Web', desc:'A high-performance online marketplace with real-time inventory management and AI-powered product recommendations.', color:'#00D4AA', tech:['Next.js','Stripe','Redis'] },
    { title:'Health & Fitness App', cat:'Mobile', desc:'Comprehensive wellness tracker with personalized workout plans, nutrition guidance, and progress analytics.', color:'#FFB86C', tech:['React Native','Firebase','ML Kit'] },
    { title:'AI Customer Support Agent', cat:'AI', desc:'Automated support system with intelligent ticket routing, sentiment analysis, and escalation workflows that reduce response times by 80%.', color:'#B24BF3', tech:['Python','RAG','Pinecone','Slack API'] },
    { title:'SaaS Analytics Dashboard', cat:'Web', desc:'Enterprise analytics dashboard with real-time data visualization, role-based access, and automated reporting.', color:'#FF6B6B', tech:['React','D3.js','AWS','GraphQL'] },
    { title:'Fintech Mobile App', cat:'Mobile', desc:'Secure banking and investment app with biometric authentication, real-time trading, and portfolio management.', color:'#6C63FF', tech:['Flutter','Kotlin','Plaid'] },
    { title:'Brand Identity System', cat:'Design', desc:'Complete brand overhaul including logo, typography, color system, motion design, and comprehensive design guidelines.', color:'#00D4AA', tech:['Figma','Illustrator','After Effects'] },
  ];
  const cats = ['All','Web','Mobile','Design','AI'];
  const filtered = filter==='All'?projects:projects.filter(p=>p.cat===filter);
  const catIcons = { Web:'🌐', Mobile:'📱', Design:'🎨', AI:'🤖' };
  const projectModels = { Web:<RotatingCube size={40}/>, Mobile:<FloatingDiamond size={40}/>, Design:<HolographicSphere size={40}/>, AI:<FloatingPyramid size={36}/> };

  return (
    <section id="projects" style={{ padding:'120px 24px', position:'relative', background:theme.colors.surface, overflow:'hidden' }}>
      <div style={{ position:'absolute', right:'2%', top:'10%', opacity:0.3 }}>
        <OrbitingRing size={200} />
      </div>
      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:2 }}>
        <SectionTitle badge="Portfolio" title="Featured Projects" subtitle="A curated selection of our most impactful work across various industries and technologies." />
        <div style={{ display:'flex', gap:8, justifyContent:'center', marginBottom:48, flexWrap:'wrap' }}>
          {cats.map(c => (
            <button key={c} onClick={()=>setFilter(c)} style={{
              padding:'10px 22px', borderRadius:theme.radius.pill, fontSize:14, fontWeight:600,
              background:filter===c?theme.colors.primary:'rgba(255,255,255,0.04)',
              color:filter===c?'#fff':theme.colors.textMuted,
              border:`1px solid ${filter===c?theme.colors.primary:theme.colors.border}`,
              cursor:'pointer', fontFamily:theme.fonts.body, transition:'all 0.3s ease',
              boxShadow:filter===c?`0 4px 15px rgba(108,99,255,0.3)`:'none',
            }}>{c}</button>
          ))}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap:24 }}>
          {filtered.map((p,i) => (
            <AnimatedSection key={p.title} delay={i*0.08}>
              <Card style={{ padding:0, overflow:'hidden' }}>
                <div style={{ height:200, background:`linear-gradient(135deg,${p.color}22,${p.color}08)`,
                  display:'flex', alignItems:'center', justifyContent:'center', position:'relative',
                  borderBottom:`1px solid ${theme.colors.border}` }}>
                  <div style={{ fontSize:60, opacity:0.25 }}>{catIcons[p.cat]}</div>
                  <div style={{ position:'absolute', bottom:12, left:16, opacity:0.5 }}>{projectModels[p.cat]}</div>
                  <div style={{ position:'absolute', top:12, right:12, display:'flex', gap:8, alignItems:'center' }}>
                    {p.featured && <span style={{ padding:'4px 10px', background:'rgba(108,99,255,0.2)',
                      border:'1px solid rgba(108,99,255,0.4)', borderRadius:theme.radius.pill,
                      fontSize:10, fontWeight:700, color:theme.colors.primary, letterSpacing:'0.05em', textTransform:'uppercase' }}>Featured</span>}
                    <span style={{ padding:'4px 12px', background:`${p.color}22`, border:`1px solid ${p.color}44`,
                      borderRadius:theme.radius.pill, fontSize:11, fontWeight:600, color:p.color }}>{p.cat}</span>
                  </div>
                </div>
                <div style={{ padding:'24px 28px' }}>
                  <h3 style={{ fontSize:18, fontWeight:700, color:theme.colors.text, marginBottom:8 }}>{p.title}</h3>
                  <p style={{ fontSize:14, color:theme.colors.textMuted, lineHeight:1.7, marginBottom:16 }}>{p.desc}</p>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    {p.tech.map((t,j) => (
                      <span key={j} style={{ padding:'3px 10px', background:'rgba(108,99,255,0.06)',
                        border:`1px solid ${theme.colors.border}`, borderRadius:theme.radius.pill,
                        fontSize:11, fontWeight:500, color:theme.colors.textMuted }}>{t}</span>
                    ))}
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
