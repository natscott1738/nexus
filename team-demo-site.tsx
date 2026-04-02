// ============================================================
// FILE: utils/theme.js — Design tokens & theme constants
// ============================================================
const theme = {
  colors: {
    primary: '#6C63FF',
    primaryLight: '#8B85FF',
    primaryDark: '#4A42DB',
    accent: '#00D4AA',
    accentLight: '#33DDBB',
    bg: '#0A0A0F',
    bgCard: '#12121A',
    bgCardHover: '#1A1A26',
    surface: '#16161F',
    text: '#E8E8F0',
    textMuted: '#8888A0',
    textDim: '#555570',
    border: 'rgba(108,99,255,0.15)',
    gradient1: 'linear-gradient(135deg, #6C63FF 0%, #00D4AA 100%)',
    gradient2: 'linear-gradient(135deg, #6C63FF 0%, #B24BF3 50%, #00D4AA 100%)',
    gradient3: 'linear-gradient(180deg, #0A0A0F 0%, #12121A 100%)',
    glow: 'rgba(108,99,255,0.4)',
    glowAccent: 'rgba(0,212,170,0.3)',
  },
  fonts: {
    heading: "'Inter', -apple-system, sans-serif",
    body: "'Inter', -apple-system, sans-serif",
  },
  radius: { sm: 8, md: 12, lg: 16, xl: 24, pill: 9999 },
};

// ============================================================
// FILE: hooks/useScrollAnimation.js
// ============================================================
const useScrollAnimation = (options = {}) => {
  const [ref, setRef] = React.useState(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const { threshold = 0.15, once = true } = options;
  React.useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); if (once) obs.unobserve(ref); }
      else if (!once) setIsVisible(false);
    }, { threshold });
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref, threshold, once]);
  return [setRef, isVisible];
};

// ============================================================
// FILE: hooks/useMouseParallax.js
// ============================================================
const useMouseParallax = (intensity = 0.02) => {
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    const handle = (e) => {
      const x = (e.clientX - window.innerWidth / 2) * intensity;
      const y = (e.clientY - window.innerHeight / 2) * intensity;
      setOffset({ x, y });
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, [intensity]);
  return offset;
};

// ============================================================
// FILE: hooks/useTypingEffect.js
// ============================================================
const useTypingEffect = (words, typingSpeed = 100, deletingSpeed = 60, pauseTime = 2000) => {
  const [text, setText] = React.useState('');
  const [wordIndex, setWordIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  React.useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, text.length + 1));
        if (text === current) setTimeout(() => setIsDeleting(true), pauseTime);
      } else {
        setText(current.substring(0, text.length - 1));
        if (text === '') { setIsDeleting(false); setWordIndex((i) => (i + 1) % words.length); }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);
  return text;
};

// ============================================================
// FILE: hooks/useCountUp.js — Animated number counter
// ============================================================
const useCountUp = (target, duration = 2000, isVisible = false) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);
  return count;
};

// ============================================================
// FILE: components/GlobalStyles.jsx
// ============================================================
const GlobalStyles = () => {
  React.useEffect(() => {
    const id = 'nexus-global-styles';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html{scroll-behavior:smooth}
      body{font-family:'Inter',-apple-system,sans-serif;background:#0A0A0F;color:#E8E8F0;overflow-x:hidden}
      ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#0A0A0F}::-webkit-scrollbar-thumb{background:#6C63FF44;border-radius:3px}
      ::selection{background:#6C63FF44;color:#fff}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
      @keyframes pulse-glow{0%,100%{box-shadow:0 0 20px rgba(108,99,255,0.2)}50%{box-shadow:0 0 40px rgba(108,99,255,0.4)}}
      @keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      @keyframes gradient-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
      @keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
      @keyframes blob{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}}
      @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
      @keyframes orbit{from{transform:rotate(0deg) translateX(var(--orbit-r)) rotate(0deg)}to{transform:rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg)}}
      @keyframes morph{0%,100%{border-radius:42% 56% 72% 28%/42% 42% 56% 48%}33%{border-radius:72% 28% 48% 48%/28% 56% 42% 72%}66%{border-radius:28% 56% 42% 72%/72% 28% 56% 48%}}
      @keyframes ring-pulse{0%{transform:scale(1);opacity:0.3}100%{transform:scale(1.5);opacity:0}}
      @keyframes glow-line{0%{left:-100%}100%{left:200%}}
      @media(max-width:768px){.nav-desktop{display:none!important}.nav-mobile-btn{display:block!important}}
      @media(min-width:769px){.nav-mobile-btn{display:none!important}}
    `;
    document.head.appendChild(style);
    return () => { const el = document.getElementById(id); if (el) el.remove(); };
  }, []);
  return null;
};

// ============================================================
// FILE: components/ParticleField.jsx — Canvas particle background
// ============================================================
const ParticleField = React.memo(() => {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d');
    let raf, w, h, mouse = { x: -1000, y: -1000 };
    const particles = [];
    const resize = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const onMouse = (e) => { const r = c.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    c.addEventListener('mousemove', onMouse);
    for (let i = 0; i < 90; i++) {
      particles.push({ x:Math.random()*w, y:Math.random()*h, vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3, r:Math.random()*2+0.5, o:Math.random()*0.5+0.1, baseR:Math.random()*2+0.5 });
    }
    const draw = () => {
      ctx.clearRect(0,0,w,h);
      particles.forEach((p,i) => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=h;if(p.y>h)p.y=0;
        const dm = Math.hypot(p.x-mouse.x, p.y-mouse.y);
        p.r = dm < 150 ? p.baseR + (1 - dm/150)*3 : p.baseR;
        const glow = dm < 150 ? 0.8 : p.o;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = i%3===0?`rgba(108,99,255,${glow})`:i%3===1?`rgba(0,212,170,${glow*0.7})`:`rgba(178,75,243,${glow*0.5})`;
        ctx.fill();
        for(let j=i+1;j<particles.length;j++){
          const d=Math.hypot(p.x-particles[j].x,p.y-particles[j].y);
          if(d<130){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(particles[j].x,particles[j].y);
            const lo = dm<200 ? 0.15 : 0.06;
            ctx.strokeStyle=`rgba(108,99,255,${lo*(1-d/130)})`;ctx.lineWidth=0.6;ctx.stroke();}
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); c.removeEventListener('mousemove', onMouse); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'auto', opacity:0.6 }} />;
});

// ============================================================
// FILE: components/3d/RotatingCube.jsx — CSS 3D cube
// ============================================================
const RotatingCube = ({ size = 200, style = {} }) => {
  const [rot, setRot] = React.useState({ x: 0, y: 0 });
  const [hovered, setHovered] = React.useState(false);
  React.useEffect(() => {
    let frame;
    const animate = (t) => {
      const speed = hovered ? 80 : 30;
      setRot({ x: Math.sin(t/3000)*15 + (hovered?10:0), y: t/speed % 360 });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [hovered]);
  const half = size/2;
  const face = (bg, tx, icon) => (
    <div style={{ position:'absolute', width:size, height:size, backfaceVisibility:'hidden',
      background:bg, border:`1px solid rgba(108,99,255,${hovered?0.6:0.3})`, borderRadius:12,
      display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, fontWeight:700,
      color:'rgba(255,255,255,0.9)', transform:tx, boxShadow:`inset 0 0 30px rgba(108,99,255,${hovered?0.2:0.1})`,
      transition:'border-color 0.3s, box-shadow 0.3s' }}>{icon}</div>
  );
  return (
    <div style={{ perspective:800, width:size, height:size, cursor:'pointer', ...style }}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
      <div style={{ width:size, height:size, position:'relative', transformStyle:'preserve-3d',
        transform:`rotateX(${rot.x}deg) rotateY(${rot.y}deg)`, transition:'transform 0.1s linear' }}>
        {face('linear-gradient(135deg,rgba(108,99,255,0.18),rgba(0,212,170,0.1))', `translateZ(${half}px)`, '⚡')}
        {face('linear-gradient(135deg,rgba(178,75,243,0.18),rgba(108,99,255,0.1))', `rotateY(90deg) translateZ(${half}px)`, '🚀')}
        {face('linear-gradient(135deg,rgba(0,212,170,0.18),rgba(108,99,255,0.1))', `rotateY(180deg) translateZ(${half}px)`, '✨')}
        {face('linear-gradient(135deg,rgba(108,99,255,0.18),rgba(178,75,243,0.1))', `rotateY(-90deg) translateZ(${half}px)`, '💎')}
        {face('linear-gradient(135deg,rgba(0,212,170,0.1),rgba(108,99,255,0.18))', `rotateX(90deg) translateZ(${half}px)`, '🔮')}
        {face('linear-gradient(135deg,rgba(108,99,255,0.1),rgba(0,212,170,0.18))', `rotateX(-90deg) translateZ(${half}px)`, '🎯')}
      </div>
    </div>
  );
};

// ============================================================
// FILE: components/3d/OrbitingRing.jsx — 3D orbiting ring with dots
// ============================================================
const OrbitingRing = ({ size = 300, style = {} }) => {
  const [angle, setAngle] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  React.useEffect(() => {
    let frame;
    const animate = (t) => { setAngle(t / (hovered ? 15 : 25)); frame = requestAnimationFrame(animate); };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [hovered]);
  const dots = 12;
  return (
    <div style={{ width: size, height: size, position: 'relative', ...style }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ position:'absolute', inset: '15%', borderRadius:'50%', border:`1px solid rgba(108,99,255,${hovered?0.35:0.15})`,
        transform:'rotateX(65deg) rotateZ('+angle*0.3+'deg)', transition:'border-color 0.3s' }} />
      <div style={{ position:'absolute', inset:'25%', borderRadius:'50%', border:`1px dashed rgba(0,212,170,${hovered?0.3:0.12})`,
        transform:'rotateX(65deg) rotateZ('+-angle*0.2+'deg)', transition:'border-color 0.3s' }} />
      <div style={{ position:'absolute', inset:'5%', borderRadius:'50%', border:`1px solid rgba(178,75,243,${hovered?0.25:0.1})`,
        transform:'rotateX(65deg) rotateZ('+angle*0.15+'deg)', transition:'border-color 0.3s' }} />
      {Array.from({length:dots}).map((_,i)=>{
        const a = (angle + i*(360/dots)) * Math.PI/180;
        const r = size*0.42;
        const x = Math.cos(a)*r + size/2;
        const y = Math.sin(a)*r*0.35 + size/2;
        const z = Math.sin(a);
        const s = 4 + z*3;
        return <div key={i} style={{
          position:'absolute', left:x-s/2, top:y-s/2, width:s, height:s, borderRadius:'50%',
          background: i%3===0?'#6C63FF':i%3===1?'#00D4AA':'#B24BF3',
          opacity: 0.3 + z*0.5, boxShadow:`0 0 ${hovered?12:6}px currentColor`,
          transition:'box-shadow 0.3s', color: i%3===0?'#6C63FF':i%3===1?'#00D4AA':'#B24BF3',
        }} />;
      })}
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        width:size*0.18, height:size*0.18, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(108,99,255,0.3),rgba(0,212,170,0.1),transparent)',
        boxShadow:`0 0 ${hovered?40:20}px rgba(108,99,255,${hovered?0.4:0.2})`, transition:'box-shadow 0.4s' }} />
    </div>
  );
};

// ============================================================
// FILE: components/3d/FloatingPyramid.jsx — CSS 3D pyramid
// ============================================================
const FloatingPyramid = ({ size = 120, style = {} }) => {
  const [rot, setRot] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  React.useEffect(() => {
    let frame;
    const animate = (t) => { setRot(t/(hovered?18:28)); frame = requestAnimationFrame(animate); };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [hovered]);
  const h = size * 0.9;
  const faceCommon = { position:'absolute', width:0, height:0, transformOrigin:'bottom center' };
  return (
    <div style={{ perspective:600, width:size, height:h, animation:'float 4s ease-in-out infinite', cursor:'pointer', ...style }}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
      <div style={{ width:size, height:h, position:'relative', transformStyle:'preserve-3d',
        transform:`rotateX(-20deg) rotateY(${rot}deg)` }}>
        {[0,90,180,270].map((r,i)=>(
          <div key={i} style={{
            ...faceCommon, left:'50%', bottom:0,
            borderLeft:`${size/2}px solid transparent`, borderRight:`${size/2}px solid transparent`,
            borderBottom:`${h}px solid rgba(${i%2===0?'108,99,255':'0,212,170'},${hovered?0.2:0.12})`,
            transform:`translateX(-50%) rotateY(${r}deg) translateZ(${size*0.35}px) rotateX(25deg)`,
            filter: hovered ? `drop-shadow(0 0 8px rgba(108,99,255,0.3))` : 'none', transition:'filter 0.3s',
          }} />
        ))}
      </div>
    </div>
  );
};

// ============================================================
// FILE: components/3d/HolographicSphere.jsx — Wireframe sphere
// ============================================================
const HolographicSphere = ({ size = 160, style = {} }) => {
  const [rot, setRot] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  React.useEffect(() => {
    let frame;
    const animate = (t) => { setRot(t/(hovered?20:35)); frame = requestAnimationFrame(animate); };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [hovered]);
  const rings = 5;
  return (
    <div style={{ width:size, height:size, position:'relative', perspective:500, cursor:'pointer', ...style }}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
      {Array.from({length:rings}).map((_,i)=>(
        <div key={i} style={{
          position:'absolute', inset: `${i*6}%`, borderRadius:'50%',
          border:`1px solid rgba(${i%2===0?'108,99,255':'0,212,170'},${hovered?0.5:0.25})`,
          transform:`rotateX(${60+i*15}deg) rotateY(${rot+i*30}deg)`,
          transition:'border-color 0.3s',
        }} />
      ))}
      {Array.from({length:rings}).map((_,i)=>(
        <div key={'v'+i} style={{
          position:'absolute', inset:`${i*6}%`, borderRadius:'50%',
          border:`1px solid rgba(178,75,243,${hovered?0.4:0.15})`,
          transform:`rotateY(${60+i*15}deg) rotateX(${rot*0.7+i*25}deg)`,
          transition:'border-color 0.3s',
        }} />
      ))}
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        width:size*0.15, height:size*0.15, borderRadius:'50%',
        background:`radial-gradient(circle,rgba(108,99,255,${hovered?0.7:0.4}),transparent)`,
        boxShadow:`0 0 ${hovered?30:15}px rgba(108,99,255,${hovered?0.5:0.3})`, transition:'all 0.3s' }} />
    </div>
  );
};

// ============================================================
// FILE: components/3d/DNA_Helix.jsx — Double helix animation
// ============================================================
const DNAHelix = ({ width = 80, height = 300, style = {} }) => {
  const [time, setTime] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  React.useEffect(() => {
    let frame;
    const animate = (t) => { setTime(t/(hovered?600:1000)); frame = requestAnimationFrame(animate); };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [hovered]);
  const nodes = 14;
  return (
    <div style={{ width, height, position:'relative', cursor:'pointer', ...style }}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
      {Array.from({length:nodes}).map((_,i)=>{
        const y = (i/nodes)*height;
        const phase = time + i*0.5;
        const x1 = Math.sin(phase)*width*0.4 + width/2;
        const x2 = Math.sin(phase+Math.PI)*width*0.4 + width/2;
        const z = Math.cos(phase);
        const s = 5 + z*2;
        return <React.Fragment key={i}>
          <div style={{ position:'absolute', left:x1-s/2, top:y, width:s, height:s, borderRadius:'50%',
            background:'#6C63FF', opacity:0.4+z*0.4, boxShadow:hovered?'0 0 8px #6C63FF':'none', transition:'box-shadow 0.3s' }} />
          <div style={{ position:'absolute', left:x2-s/2, top:y, width:s, height:s, borderRadius:'50%',
            background:'#00D4AA', opacity:0.4-z*0.4, boxShadow:hovered?'0 0 8px #00D4AA':'none', transition:'box-shadow 0.3s' }} />
          {i%2===0 && <div style={{ position:'absolute', left:Math.min(x1,x2), top:y+s/2-0.5,
            width:Math.abs(x1-x2), height:1, background:`rgba(178,75,243,${hovered?0.35:0.15})`, transition:'background 0.3s' }} />}
        </React.Fragment>;
      })}
    </div>
  );
};

// ============================================================
// FILE: components/3d/FloatingDiamond.jsx — Rotating diamond
// ============================================================
const FloatingDiamond = ({ size = 100, style = {} }) => {
  const [rot, setRot] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  React.useEffect(() => {
    let frame;
    const animate = (t) => { setRot(t/(hovered?15:25)); frame = requestAnimationFrame(animate); };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [hovered]);
  return (
    <div style={{ perspective:400, width:size, height:size, animation:'float 5s ease-in-out infinite', cursor:'pointer', ...style }}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
      <div style={{ width:size, height:size, position:'relative', transformStyle:'preserve-3d',
        transform:`rotateX(${rot*0.5}deg) rotateY(${rot}deg) rotateZ(45deg)` }}>
        <div style={{ position:'absolute', inset:'15%', background:`linear-gradient(135deg,rgba(108,99,255,${hovered?0.3:0.15}),rgba(0,212,170,${hovered?0.2:0.1}))`,
          border:`1px solid rgba(108,99,255,${hovered?0.5:0.25})`, borderRadius:size*0.12,
          boxShadow:`0 0 ${hovered?25:10}px rgba(108,99,255,${hovered?0.4:0.2}), inset 0 0 20px rgba(108,99,255,0.1)`,
          backdropFilter:'blur(4px)', transition:'all 0.3s' }} />
        <div style={{ position:'absolute', inset:'25%', background:`linear-gradient(225deg,rgba(178,75,243,${hovered?0.25:0.1}),transparent)`,
          border:`1px solid rgba(178,75,243,${hovered?0.3:0.15})`, borderRadius:size*0.08,
          transform:'translateZ(15px)', transition:'all 0.3s' }} />
      </div>
    </div>
  );
};

// ============================================================
// FILE: components/ui/FloatingOrb.jsx
// ============================================================
const FloatingOrb = ({ color1='#6C63FF', color2='#00D4AA', size=300, top, left, right, bottom, delay=0 }) => (
  <div style={{
    position:'absolute', top, left, right, bottom, width:size, height:size,
    background:`radial-gradient(circle,${color1}33 0%,${color2}11 50%,transparent 70%)`,
    borderRadius:'50%', filter:'blur(40px)', animation:`blob 8s ease-in-out ${delay}s infinite, float 6s ease-in-out ${delay}s infinite`,
    pointerEvents:'none', zIndex:0, opacity:0.7,
  }} />
);

// ============================================================
// FILE: components/ui/AnimatedSection.jsx
// ============================================================
const AnimatedSection = ({ children, delay = 0, direction = 'up', style = {} }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const dirs = { up:'translateY(40px)', down:'translateY(-40px)', left:'translateX(40px)', right:'translateX(-40px)' };
  return (
    <div ref={ref} style={{
      opacity:isVisible?1:0, transform:isVisible?'translate(0)':dirs[direction],
      transition:`opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
};

// ============================================================
// FILE: components/ui/GradientText.jsx
// ============================================================
const GradientText = ({ children, style = {} }) => (
  <span style={{
    background:theme.colors.gradient2, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
    backgroundSize:'200% 200%', animation:'gradient-shift 4s ease infinite', ...style,
  }}>{children}</span>
);

// ============================================================
// FILE: components/ui/Button.jsx
// ============================================================
const Button = ({ children, variant='primary', onClick, style={} }) => {
  const [hovered, setHovered] = React.useState(false);
  const base = { display:'inline-flex', alignItems:'center', gap:8, padding:'14px 32px', fontSize:15,
    fontWeight:600, fontFamily:theme.fonts.body, borderRadius:theme.radius.pill, cursor:'pointer',
    border:'none', transition:'all 0.3s cubic-bezier(0.16,1,0.3,1)', position:'relative', overflow:'hidden',
    textDecoration:'none', letterSpacing:'0.02em' };
  const variants = {
    primary: { background:hovered?theme.colors.primaryLight:theme.colors.primary, color:'#fff',
      boxShadow:hovered?`0 8px 30px ${theme.colors.glow}`:`0 4px 15px rgba(108,99,255,0.25)`,
      transform:hovered?'translateY(-2px) scale(1.02)':'translateY(0) scale(1)' },
    outline: { background:hovered?'rgba(108,99,255,0.1)':'transparent', color:theme.colors.primary,
      border:`2px solid ${hovered?theme.colors.primary:theme.colors.border}`,
      transform:hovered?'translateY(-2px)':'translateY(0)' },
  };
  return <button style={{...base,...variants[variant],...style}}
    onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onClick={onClick}>{children}</button>;
};

// ============================================================
// FILE: components/ui/Card.jsx — Glass card with shimmer
// ============================================================
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

// ============================================================
// FILE: components/ui/SectionTitle.jsx
// ============================================================
const SectionTitle = ({ badge, title, subtitle, align='center' }) => (
  <AnimatedSection style={{ textAlign:align, marginBottom:56, maxWidth:700, margin:align==='center'?'0 auto 56px':'0 0 56px' }}>
    {badge && <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px',
      background:'rgba(108,99,255,0.1)', border:`1px solid ${theme.colors.border}`,
      borderRadius:theme.radius.pill, fontSize:13, fontWeight:600, color:theme.colors.primary,
      marginBottom:16, letterSpacing:'0.05em', textTransform:'uppercase' }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:theme.colors.primary, boxShadow:`0 0 8px ${theme.colors.primary}` }} />{badge}
    </div>}
    <h2 style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:800, lineHeight:1.15,
      color:theme.colors.text, marginBottom:16, letterSpacing:'-0.02em' }}>{title}</h2>
    {subtitle&&<p style={{ fontSize:'clamp(15px,1.5vw,18px)', color:theme.colors.textMuted,
      lineHeight:1.7, maxWidth:560, margin:align==='center'?'0 auto':'0' }}>{subtitle}</p>}
  </AnimatedSection>
);

// ============================================================
// FILE: components/ui/SectionDivider.jsx — Animated divider between sections
// ============================================================
const SectionDivider = () => {
  const [ref, vis] = useScrollAnimation();
  return (
    <div ref={ref} style={{ display:'flex', justifyContent:'center', alignItems:'center', padding:'8px 0', position:'relative', zIndex:2 }}>
      <div style={{ display:'flex', gap:6, alignItems:'center' }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{
            width: i===2 ? 40 : i===1||i===3 ? 20 : 8,
            height: 2, borderRadius: 1,
            background: i===2 ? theme.colors.gradient1 : `rgba(108,99,255,${0.15+i*0.05})`,
            transform: vis ? 'scaleX(1)' : 'scaleX(0)',
            transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i*0.1}s`,
          }} />
        ))}
      </div>
    </div>
  );
};

// ============================================================
// FILE: components/Navbar.jsx
// ============================================================
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

// ============================================================
// FILE: sections/HeroSection.jsx
// ============================================================
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

// ============================================================
// FILE: sections/AboutSection.jsx
// ============================================================
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
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:20, marginTop:56 }}>
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

// ============================================================
// FILE: sections/ServicesSection.jsx
// ============================================================
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
    <section id="services" style={{ padding:'120px 24px', position:'relative', background:theme.colors.surface }}>
      <FloatingOrb color1="#B24BF3" color2="#6C63FF" size={400} bottom="-10%" right="-10%" delay={2} />
      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:2 }}>
        <SectionTitle badge="Services" title="What We Do Best" subtitle="End-to-end digital services designed to help your business thrive in the modern landscape." />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:24 }}>
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

// ============================================================
// FILE: sections/TeamSection.jsx
// ============================================================
const TeamSection = () => {
  const team = [
    { name:'Matthew Waweru', role:'CEO & Founder', bio:'Visionary leader driving Nexus\'s mission to deliver world-class digital solutions across Africa and beyond.', color:'#6C63FF', initials:'MW' },
    { name:'Nathan Baraka', role:'Tech Lead', bio:'Full-stack architect with deep expertise in scalable systems, modern frameworks, and technical leadership.', color:'#00D4AA', initials:'NB' },
    { name:'Charles Fortunatius', role:'DevOps Engineer', bio:'Cloud infrastructure specialist ensuring seamless deployments, 99.9% uptime, and peak system performance.', color:'#B24BF3', initials:'CF' },
  ];
  const memberModels = [
    <HolographicSphere size={44} />,
    <RotatingCube size={36} />,
    <FloatingDiamond size={40} />,
  ];

  return (
    <section id="team" style={{ padding:'120px 24px', position:'relative', overflow:'hidden' }}>
      <FloatingOrb color1="#00D4AA" color2="#6C63FF" size={350} top="20%" right="-5%" delay={3} />
      <div style={{ position:'absolute', left:'3%', top:'50%', opacity:0.4, transform:'translateY(-50%)' }}>
        <DNAHelix width={50} height={300} />
      </div>
      <div style={{ maxWidth:1000, margin:'0 auto', position:'relative', zIndex:2 }}>
        <SectionTitle badge="Our Team" title="Meet the Creators" subtitle="A talented trio united by a shared passion for building exceptional digital products." />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:28 }}>
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

// ============================================================
// FILE: sections/ProjectsSection.jsx
// ============================================================
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
    <section id="projects" style={{ padding:'120px 24px', position:'relative', background:theme.colors.surface }}>
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
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:24 }}>
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

// ============================================================
// FILE: sections/TestimonialsSection.jsx
// ============================================================
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

// ============================================================
// FILE: sections/ContactSection.jsx
// ============================================================
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

// ============================================================
// FILE: sections/FooterSection.jsx
// ============================================================
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

// ============================================================
// FILE: App.jsx — Main application
// ============================================================
const App = () => {
  const [activeSection, setActiveSection] = React.useState('home');
  React.useEffect(() => {
    const sections = ['home','about','services','team','projects','contact'];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold:0.3, rootMargin:'-80px 0px 0px 0px' });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return (
    <div style={{ background:theme.colors.bg, minHeight:'100vh', color:theme.colors.text }}>
      <GlobalStyles />
      <Navbar activeSection={activeSection} />
      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <ServicesSection />
      <SectionDivider />
      <TeamSection />
      <SectionDivider />
      <ProjectsSection />
      <SectionDivider />
      <TestimonialsSection />
      <SectionDivider />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default App;
