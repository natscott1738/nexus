import React from 'react';

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

export default DNAHelix;
