import theme from '../utils/theme';
import GradientText from '../components/ui/GradientText';

const FooterSection = () => (
  <footer style={{ padding:'60px 24px 32px', borderTop:`1px solid ${theme.colors.border}`, position:'relative' }}>
    <div style={{ maxWidth:1100, margin:'0 auto' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:40, marginBottom:40 }}>
        <div style={{ maxWidth:280 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:theme.colors.gradient1,
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, fontWeight:900, color:'#fff',
              boxShadow:'0 0 15px rgba(108,99,255,0.3)' }}>N</div>
            <span style={{ fontSize:20, fontWeight:700 }}><span style={{color:theme.colors.text}}>Nex</span><GradientText>us</GradientText></span>
          </div>
          <p style={{ fontSize:14, color:theme.colors.textMuted, lineHeight:1.7 }}>
            Building exceptional digital experiences from Nairobi to the world. We craft solutions that drive business growth and delight users.
          </p>
        </div>
        {[
          { title:'Company', links:['About','Services','Projects','Team'] },
          { title:'Resources', links:['Blog','Case Studies','Documentation','Support'] },
          { title:'Connect', links:['Twitter / X','LinkedIn','GitHub','Dribbble'] },
        ].map((col,i) => (
          <div key={i}>
            <h4 style={{ fontSize:14, fontWeight:700, color:theme.colors.text, marginBottom:16, letterSpacing:'0.03em' }}>{col.title}</h4>
            {col.links.map((l,j) => (
              <p key={j} style={{ fontSize:14, color:theme.colors.textMuted, marginBottom:10, cursor:'pointer', transition:'color 0.2s ease' }}
                onMouseEnter={e=>e.target.style.color=theme.colors.primary}
                onMouseLeave={e=>e.target.style.color=theme.colors.textMuted}>{l}</p>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop:`1px solid ${theme.colors.border}`, paddingTop:24, display:'flex',
        justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
        <p style={{ fontSize:13, color:theme.colors.textDim }}>© 2026 Nexus. All rights reserved. Nairobi, Kenya</p>
        <div style={{ display:'flex', gap:16 }}>
          {['Privacy','Terms','Cookies'].map((l,i) => (
            <span key={i} style={{ fontSize:13, color:theme.colors.textDim, cursor:'pointer' }}
              onMouseEnter={e=>e.target.style.color=theme.colors.primary}
              onMouseLeave={e=>e.target.style.color=theme.colors.textDim}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default FooterSection;
