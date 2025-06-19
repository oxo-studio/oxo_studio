import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import PropTypes from 'prop-types';

export default function SplashScreen({ onFinish }) {
  const logoRef = useRef(null);
  const barRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animazione logo all'ingresso
    gsap.fromTo(logoRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" }
    );

    // Simula caricamento progressivo da 0 a 100
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setProgress(count);

      // Anima larghezza barra
      gsap.to(barRef.current, {
        width: `${count}%`,
        duration: 0.2,
        ease: "linear",
        
      });

      gsap.to(barRef.current, {
  width: `${count}%`,
  backgroundColor: `rgb(${255 - (count * 1.17)}, ${255 - (count * 2.12)}, ${255})`, // dal bianco al viola
  duration: 0.2,
  ease: "linear",
});


      if (count >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onFinish(); // Dopo 100%
        }, 300);
      }
    }, 20); // => 100 * 20ms = 2s

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-50 space-y-6">
      <div ref={logoRef} className="text-6xl font-bold text-viola">
        <img src="/SvgCode/logooxo.svg" alt="Logo" className="w-[400px]" />
      </div>

      {/* Contatore numerico */}
      <div className="text-xl font-mono">{progress}%</div>

      {/* Barra di caricamento */}
      <div className="w-[300px] h-2 bg-gray-700 rounded overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-viola"
          style={{ width: '0%' }}
        ></div>
      </div>
    </div>
  );

}

 SplashScreen.propTypes = {
    onFinish: PropTypes.func.isRequired,
  };
