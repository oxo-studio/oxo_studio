import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

import Router from './Router/Router';
import Header from './components/Header';
import SplashScreen from './components/SpashScreen'; // Corretto il typo: SpashScreen → SplashScreen
import ScrollToTop from '../src/components/ScrollToTop';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation(); // Usa useLocation di React Router

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  // Gestisci il reset dello scroll e le animazioni quando cambia la route
  useEffect(() => {
    if (!showSplash) {
      // Scrolla in alto quando cambia la route
      window.scrollTo(0, 0);
      
      // Rianima gli elementi della nuova pagina
      gsap.fromTo('.page-content', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Ricalcola ScrollTrigger per la nuova pagina
      ScrollTrigger.refresh();
    }
  }, [location, showSplash]);

  // Cleanup delle animazioni quando il componente viene smontato
  useEffect(() => {
    return () => {
      // Kill tutte le animazioni GSAP e ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <>
          <Header />
          <ScrollToTop />
          <Router />
        </>
      )}
    </>
  );
}

export default App;