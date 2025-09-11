import  { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';


import Router from './Router/Router';
import Header from './components/Header';
import SplashScreen from './components/SpashScreen';
import ScrollToTop from '../src/components/ScrollToTop';

// Import PortfolioGrid
import PortfolioGrid from "./components/PortfolioGrid";

// Registra solo i plugin GSAP validi
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <>
          <Header />
          <ScrollToTop />

          {/* Qui inserisci PortfolioGrid */}
          <PortfolioGrid />

          {/* Router se vuoi ancora mantenere la navigazione */}
          <Router />
        </>
      )}
    </>
  );
}

export default App;
