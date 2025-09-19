import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

import Router from './Router/Router';
import Header from './components/Header';
import SplashScreen from './components/SpashScreen';
import ScrollToTop from '../src/components/ScrollToTop';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  // Controlla i cambiamenti del percorso e forza il reload quando necessario
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.location.pathname !== currentPath) {
        // Il percorso è cambiato, forza il reload
        sessionStorage.setItem('needsReload', 'true');
        window.location.reload();
      }
    };

    // Controlla se è necessario un reload dopo il caricamento
    if (sessionStorage.getItem('needsReload') === 'true') {
      sessionStorage.removeItem('needsReload');
      window.location.reload();
    }

    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [currentPath]);

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