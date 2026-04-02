import React from 'react';
import theme from '../utils/theme';
import FloatingOrb from '../components/ui/FloatingOrb';
import HolographicSphere from '../components/3d/HolographicSphere';
import SectionTitle from '../components/ui/SectionTitle';
import AnimatedSection from '../components/ui/AnimatedSection';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ContactSection = () => {
  const [form, setForm] = React.useState({ name:'', email:'', message:'' });
  const [focused, setFocused] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const inputStyle = (field) => ({
    width:'100%', padding:'14px 18px', background:'rgba(255,255,255,0.03)',
    border:`1px solid ${focused===field?'rgba(108,99,255,0.5)':theme.colors.border}`,
    borderRadius:theme.radius.md, color:theme.colors.text, fontSize:15,
    fontFamily:theme.fonts.body, outline:'none', transition:'all 0.3s ease',
    boxShadow:focused===field?'0 0 20px rgba(108,99,255,0.1)':'none',
  });
  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setTimeout(()=>{ setSent(false); setForm({ name:'', email:'', message:'' }); }, 3000);
    }
  };
  return (
    <section id="contact" style={{ padding:'120px 24px', position:'relative', background:theme.colors.surface }}>
      <FloatingOrb color1="#6C63FF" color2="#00D4AA" size={400} bottom="-10%" left="-10%" delay={1} />
      <div style={{ position:'absolute', right:'3%', bottom:'20%', opacity:0.3 }}>
        <HolographicSphere size={120} />
      </div>
      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:2 }}>
        <SectionTitle badge="Contact" title="Let's Build Together" subtitle="Have a project in mind? We'd love to hear about it. Reach out and let's create something amazing." />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:40 }}>
          <AnimatedSection direction="right">
            <div style={{ display:'flex', flexDirection:'column', gap:32 }}>
              {[
                { icon:'📍', title:'Location', info:'Nairobi, Kenya' },
                { icon:'📧', title:'Email', info:'hello@nexus.co.ke' },
                { icon:'📞', title:'Phone', info:'+254 700 123 456' },
              ].map((c,i) => {
                const [ch, setCh] = React.useState(false);
                return <div key={i} style={{ display:'flex', gap:16, alignItems:'flex-start', cursor:'pointer',
                  transform:ch?'translateX(6px)':'translateX(0)', transition:'transform 0.3s ease' }}
                  onMouseEnter={()=>setCh(true)} onMouseLeave={()=>setCh(false)}>
                  <div style={{ width:48, height:48, borderRadius:12,
                    background:ch?'rgba(108,99,255,0.15)':'rgba(108,99,255,0.1)',
                    border:`1px solid ${ch?'rgba(108,99,255,0.4)':theme.colors.border}`,
                    display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0,
                    transition:'all 0.3s ease',
                    boxShadow:ch?'0 0 15px rgba(108,99,255,0.2)':'none' }}>{c.icon}</div>
                  <div>
                    <p style={{ fontSize:13, color:theme.colors.textDim, fontWeight:600, marginBottom:4,
                      textTransform:'uppercase', letterSpacing:'0.05em' }}>{c.title}</p>
                    <p style={{ fontSize:16, color:ch?theme.colors.primary:theme.colors.text, fontWeight:500, transition:'color 0.3s' }}>{c.info}</p>
                  </div>
                </div>;
              })}
              <div style={{ marginTop:8 }}>
                <p style={{ fontSize:13, color:theme.colors.textDim, fontWeight:600, marginBottom:12,
                  textTransform:'uppercase', letterSpacing:'0.05em' }}>Follow Us</p>
                <div style={{ display:'flex', gap:10 }}>
                  {['𝕏','in','◻','▶'].map((s,i) => {
                    const [sh, setSh] = React.useState(false);
                    return <div key={i}
                      onMouseEnter={()=>setSh(true)} onMouseLeave={()=>setSh(false)}
                      style={{ width:40, height:40, borderRadius:10,
                        background:sh?'rgba(108,99,255,0.15)':'rgba(255,255,255,0.04)',
                        border:`1px solid ${sh?'rgba(108,99,255,0.4)':theme.colors.border}`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:14, color:sh?theme.colors.primary:theme.colors.textDim, cursor:'pointer',
                        transition:'all 0.3s ease', transform:sh?'translateY(-3px)':'translateY(0)',
                        boxShadow:sh?'0 8px 20px rgba(108,99,255,0.15)':'none' }}>{s}</div>;
                  })}
                </div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="left">
            <Card hoverable={false} style={{ padding:32 }}>
              {sent ? (
                <div style={{ textAlign:'center', padding:'40px 0' }}>
                  <div style={{ fontSize:48, marginBottom:16 }}>✅</div>
                  <h3 style={{ fontSize:20, fontWeight:700, color:theme.colors.text, marginBottom:8 }}>Message Sent!</h3>
                  <p style={{ color:theme.colors.textMuted }}>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
                  <div>
                    <label style={{ display:'block', fontSize:13, fontWeight:600, color:theme.colors.textMuted, marginBottom:8, letterSpacing:'0.03em' }}>Name</label>
                    <input placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
                      onFocus={()=>setFocused('name')} onBlur={()=>setFocused('')} style={inputStyle('name')} />
                  </div>
                  <div>
                    <label style={{ display:'block', fontSize:13, fontWeight:600, color:theme.colors.textMuted, marginBottom:8, letterSpacing:'0.03em' }}>Email</label>
                    <input placeholder="your@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
                      onFocus={()=>setFocused('email')} onBlur={()=>setFocused('')} style={inputStyle('email')} />
                  </div>
                  <div>
                    <label style={{ display:'block', fontSize:13, fontWeight:600, color:theme.colors.textMuted, marginBottom:8, letterSpacing:'0.03em' }}>Message</label>
                    <textarea placeholder="Tell us about your project..." value={form.message}
                      onChange={e=>setForm({...form,message:e.target.value})}
                      onFocus={()=>setFocused('message')} onBlur={()=>setFocused('')}
                      rows={5} style={{...inputStyle('message'), resize:'vertical'}} />
                  </div>
                  <Button onClick={handleSubmit} style={{ width:'100%', justifyContent:'center' }}>
                    Send Message <span style={{fontSize:16}}>→</span>
                  </Button>
                </div>
              )}
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
