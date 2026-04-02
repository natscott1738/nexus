import React from 'react';

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

export default FloatingDiamond;
