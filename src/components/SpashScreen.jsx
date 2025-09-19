import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import PropTypes from 'prop-types';

export default function SplashScreen({ onFinish }) {
  const logoRef = useRef(null);
  const barRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animazione del logo
    gsap.fromTo(".logo",
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );

    // Rimbalzo avanti e indietro solo sullo z
    gsap.fromTo(".logo",
      { z: -300 },
      {
        z: 300,
        duration: 1,
        ease: "bounce.out",
        repeat: 3,
        yoyo: true
      }
    );
    
    gsap.fromTo(
      logoRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" }
    );

    // Finta barra di caricamento (0 → 100)
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setProgress(count);

      const red = Math.max(0, 255 - count * 1.17);
      const green = Math.max(0, 255 - count * 2.12);
      const blue = 255;

      gsap.to(barRef.current, {
        width: `${count}%`,
        backgroundColor: `rgb(${red}, ${green}, ${blue})`,
        duration: 0.2,
        ease: "linear",
      });

      if (count >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onFinish();
        }, 300);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-50 space-y-6">
      <div ref={logoRef} className="text-6xl font-bold">
        <img
          src="/SvgCode/logooxospalsh.svg"
          alt="Logo"
          className="w-[400px] select-none pointer-events-none logo"
          draggable={false}
        />
      </div>

      <div className="text-xl font-mono">{progress}%</div>

      <div className="w-[300px] h-2 bg-gray-700 rounded overflow-hidden">
        <div
          ref={barRef}
          className="h-full"
          style={{ width: '0%', backgroundColor: 'rgb(255,255,255)' }}
        ></div>
      </div>
    </div>
  );
}

SplashScreen.propTypes = {
  onFinish: PropTypes.func.isRequired,
};