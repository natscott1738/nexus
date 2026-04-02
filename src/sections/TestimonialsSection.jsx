import React from 'react';
import theme from '../utils/theme';
import FloatingPyramid from '../components/3d/FloatingPyramid';
import FloatingDiamond from '../components/3d/FloatingDiamond';
import SectionTitle from '../components/ui/SectionTitle';
import AnimatedSection from '../components/ui/AnimatedSection';
import Card from '../components/ui/Card';

const TestimonialsSection = () => {
  const [active, setActive] = React.useState(0);
  const testimonials = [
    { quote:"Working with Nexus was an absolute game-changer. They delivered beyond our expectations and transformed our entire digital presence.", name:'Jennifer Walsh', title:'CEO, TechStart Inc.', color:'#6C63FF' },
    { quote:"The attention to detail and technical expertise is unmatched. Our platform performance improved by 300% after their optimization work.", name:'Robert Chang', title:'CTO, DataFlow Systems', color:'#00D4AA' },
    { quote:"They don't just build products — they craft experiences. Our user engagement skyrocketed after the redesign they delivered.", name:'Maria Santos', title:'VP Product, Innovate Labs', color:'#B24BF3' },
  ];
  React.useEffect(() => {
    const iv = setInterval(()=>setActive(a=>(a+1)%testimonials.length), 5000);
    return ()=>clearInterval(iv);
  }, []);
  return (
    <section style={{ padding:'120px 24px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', left:'5%', top:'50%', transform:'translateY(-50%)', opacity:0.3 }}>
        <FloatingPyramid size={80} />
      </div>
      <div style={{ position:'absolute', right:'5%', top:'30%', opacity:0.3 }}>
        <FloatingDiamond size={70} />
      </div>
      <div style={{ maxWidth:800, margin:'0 auto', position:'relative', zIndex:2 }}>
        <SectionTitle badge="Testimonials" title="What Clients Say" subtitle="Don't just take our word for it — hear from the people who've experienced our work firsthand." />
        <AnimatedSection>
          <Card style={{ textAlign:'center', padding:'48px 40px' }} hoverable={false}>
            <div style={{ fontSize:48, color:theme.colors.primary, marginBottom:24, opacity:0.4 }}>"</div>
            <p key={active} style={{ fontSize:'clamp(16px,2vw,20px)', color:theme.colors.text, lineHeight:1.8,
              fontWeight:400, fontStyle:'italic', marginBottom:32, minHeight:100, animation:'fadeInUp 0.5s ease' }}>
              {testimonials[active].quote}
            </p>
            <div style={{ width:48, height:48, borderRadius:'50%', margin:'0 auto 12px',
              background:`linear-gradient(135deg,${testimonials[active].color}44,${testimonials[active].color}22)`,
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, fontWeight:700,
              color:testimonials[active].color }}>{testimonials[active].name[0]}</div>
            <p style={{ fontSize:16, fontWeight:700, color:theme.colors.text }}>{testimonials[active].name}</p>
            <p style={{ fontSize:14, color:theme.colors.primary, fontWeight:500 }}>{testimonials[active].title}</p>
            <div style={{ display:'flex', gap:8, justifyContent:'center', marginTop:32 }}>
              {testimonials.map((_,i) => (
                <button key={i} onClick={()=>setActive(i)} style={{
                  width:active===i?32:10, height:10, borderRadius:5, border:'none', cursor:'pointer',
                  background:active===i?theme.colors.primary:'rgba(108,99,255,0.2)', transition:'all 0.4s ease',
                }} />
              ))}
            </div>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TestimonialsSection;
