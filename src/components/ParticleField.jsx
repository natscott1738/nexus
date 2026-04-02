import React from 'react';

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

export default ParticleField;
