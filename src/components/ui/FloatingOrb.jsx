
const FloatingOrb = ({ color1='#6C63FF', color2='#00D4AA', size=300, top, left, right, bottom, delay=0 }) => (
  <div style={{
    position:'absolute', top, left, right, bottom, width:size, height:size,
    background:`radial-gradient(circle,${color1}33 0%,${color2}11 50%,transparent 70%)`,
    borderRadius:'50%', filter:'blur(40px)', animation:`blob 8s ease-in-out ${delay}s infinite, float 6s ease-in-out ${delay}s infinite`,
    pointerEvents:'none', zIndex:0, opacity:0.7,
  }} />
);

export default FloatingOrb;
