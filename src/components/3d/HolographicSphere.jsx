import React from 'react';

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

export default HolographicSphere;
