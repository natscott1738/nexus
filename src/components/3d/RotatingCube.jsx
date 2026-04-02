import React from 'react';

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

export default RotatingCube;
