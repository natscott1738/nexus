import React from 'react';
import theme from './utils/theme';
import GlobalStyles from './components/GlobalStyles';
import Navbar from './components/Navbar';
import SectionDivider from './components/ui/SectionDivider';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import TeamSection from './sections/TeamSection';
import ProjectsSection from './sections/ProjectsSection';
import TestimonialsSection from './sections/TestimonialsSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';

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
