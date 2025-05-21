// src/components/SplashScreen.jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SplashScreen({ onFinish }) {
  const logoRef = useRef(null);

  useEffect(() => {
    // Anima il logo all'ingresso
    gsap.fromTo(logoRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" }
    );

    // Dopo 2.5 secondi nascondi lo splash
    const timeout = setTimeout(() => {
      onFinish(); // dice al genitore "ho finito"
    }, 2500);

    return () => clearTimeout(timeout);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black text-white z-50">
      <div ref={logoRef} className="text-6xl font-bold text-viola">
        OXO
      </div>
    </div>
  );
}
