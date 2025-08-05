import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import MouseBabble from '../shader/MouseBabble';

gsap.registerPlugin(ScrollTrigger);

export default function Sezione1() {
  const [showShader, setShowShader] = useState(true);
  const sectionRef = useRef(null);

  const OxoStudioRef = useRef([])

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        if (self.progress > 0) {
          setShowShader(false);
        } else {
          setShowShader(true);
        }
      },
      const animateLetters3 = (letters, delay = 0)=>{
        gsap.fromTo(
          letters,
          {opacity:0, y:50},
          {
            opacity:1,
            y:0,
            stagger:0.04,
            delay,
            ease:"power3.out",
            scrollTrigger:sectionRef.current,
            start:"top 100%",
            toggleActions: "play none none reverse"
          }
        )
      }
    });

    return () => {
      trigger.kill(); // Cleanup on unmount
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden overlay-bg"
    >
      {/* Shader as background (conditionally rendered) */}
      {showShader && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <MouseBabble />
        </div>
      )}

      {/* Foreground text */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-9xl text-white">OXO STUDIO</h1>
        <h2 className="text-3xl md:text-5xl lg:text-6xl mt-4 text-white">Creative Studio</h2>
      </div>
    </section>
  );
}
