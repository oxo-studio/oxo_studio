import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const SectionHome4 = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const crazyImgRef = useRef(null); // Nuova ref per immagine crazy2

  useEffect(() => {
    const letters = textRef.current.querySelectorAll('span');

    // Animazione lettere del titolo
    gsap.fromTo(
      letters,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Animazione immagine crazy2 dal basso
    gsap.fromTo(
      crazyImgRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: crazyImgRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const title = 'I nostri lavori';

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center top-[200px]"
    >
      {/* Titolo animato */}
      <h1
        ref={textRef}
        className="text-center antonio2 text-9xl relative z-[9999] mb-16 flex flex-wrap justify-center"
      >
        {title.split('').map((char, i) => (
          <span
            key={i}
            className="inline-block whitespace-pre"
            style={{ display: 'inline-block' }}
          >
            {char}
          </span>
        ))}
      </h1>

      {/* Box superiore con immagine animata */}
      <div className="relative z-10 w-[90vw] h-[92vh] border border-white overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-[15px] m-0 transition-transform duration-500 hover:scale-105">
          <img
            ref={crazyImgRef}
            src="/img/crazy2.png"
            alt="fotocrazytattoo"
            className="object-contain h-full w-auto"
          />
        </div>
      </div>

      {/* Box inferiore con logo a sinistra */}
      <div className="relative z-10 w-[90vw] h-[55vh] border border-white overflow-hidden -mt-px grid grid-cols-2">
        {/* Colonna sinistra: logo statico */}
        <div className="flex items-start justify-start pl-4 pb-96">
          <img
            src="/SvgCode/logooxo.svg"
            alt="logo"
            className="h-[600px] w-[600px]"
          />
        </div>

        {/* Linea verticale centrale */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-white" />

        {/* Colonna destra: vuota */}
        <div></div>
      </div>
    </div>
  );
};

export default SectionHome4;
