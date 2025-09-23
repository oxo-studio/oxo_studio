import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

import Router from './Router/Router';
import Header from './components/Header';
import SplashScreen from './components/SpashScreen'; // Corretto typo
import ScrollToTop from './components/ScrollToTop';
import ScrollTriggerHandler from './components/ScrollTriggerHandler'; // importa il nuovo componente

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  // Anima il fade-in al cambio pagina (dopo lo splash)
useEffect(() => {
  if (!showSplash) {
    window.scrollTo(0, 0);
    
    requestAnimationFrame(() => {
      gsap.fromTo(
        '.page-content',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      ScrollTrigger.refresh();
    });
  }
}, [location, showSplash]);


  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <>
          <Header />
          <ScrollToTop />
          {/* Qui inseriamo il gestore globale di ScrollTrigger */}
          <ScrollTriggerHandler location={location} active={!showSplash} />
          <Router />
        </>
      )}
    </>
  );
}

export default App;
