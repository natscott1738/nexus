import React from 'react';

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

export default OrbitingRing;
