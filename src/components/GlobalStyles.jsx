import React from 'react';

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

export default GlobalStyles;
