import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectioHome3 = () => {
  const sectionRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    const letters = lettersRef.current;

    gsap.fromTo(
      letters,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 100%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const text = 'LA NOSTRA VISIONE';

  return (
    <div
      ref={sectionRef}
      className="h-screen w-full flex items-center justify-center"
    >
      <h1 className="text-9xl antonio2 text-center">
        {text.split('').map((char, i) => (
          <span
            key={i}
            ref={(el) => (lettersRef.current[i] = el)}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default SectioHome3;
