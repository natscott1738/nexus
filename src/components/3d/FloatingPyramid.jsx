import React from 'react';

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

export default FloatingPyramid;
