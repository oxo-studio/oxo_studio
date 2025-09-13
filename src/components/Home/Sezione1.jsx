import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MouseLight from "../shader/MauseLight"; // Assumendo questo il nome corretto
import MauseBabble from '../shader/MouseBabble'



gsap.registerPlugin(ScrollTrigger);

export default function Sezione1() {
  const sectionRef = useRef(null);
  const OxoStudioRef = useRef([]); 
  const CreativeStudio = useRef([]);

  useEffect(() => {
    const animateLetters3 = (letters, delay = 0) => {
      gsap.fromTo(
        letters,
            { opacity: 0, y: 30 },
            {
              duration: 0.4,
              opacity: 1,
              y: 0, 
              stagger: 0.06,
              delay,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
          },
        }
      );
    };

    animateLetters3(OxoStudioRef.current);
    animateLetters3(CreativeStudio.current,0.2);
  }, []);

  const splitText = (text, ref) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        ref={(el) => (ref.current[i] = el)}
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
<section ref={sectionRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
  {/* MauseBabble sopra MouseLight */}
  <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
    <MauseBabble />
  </div>

  <div className="hidden lg:block" style={{ position: "fixed", inset: 0, zIndex: 3, pointerEvents: "none" }}>
    <MouseLight />
  </div>


  <div className="relative z-10 text-center" style={{ userSelect: "none" }}>
    <h1 className="text-7xl md:text-9xl lg:text-[150px] antonio2 ombra2">
  {splitText("OXO STUDIO", OxoStudioRef)}
</h1>
    <h2 className="text-3xl md:text-5xl lg:text-6xl mt-4 antonio ombra2">
      {splitText("Creative Studio", CreativeStudio)}
    </h2>
  </div>
</section>


  );
}
