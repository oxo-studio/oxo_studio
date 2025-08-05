import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectioHome2 = () => {
  const sectionRef = useRef(null);

  // Titoli
  const titleRef = useRef([]);
  const refText2 = useRef([]);
  const refText3 = useRef([]);
  const refText4 = useRef([]);
  const refText5 = useRef([]);

  // Paragrafi
  const refText6 = useRef([]);
  const refText7 = useRef([]);
  const refText8 = useRef([]);
  const refText9 = useRef([]);

  useEffect(() => {
    const animateLetters = (letters, delay = 0) => {
      gsap.fromTo(
        letters,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 100%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    };

    const animateLetters2 = (letters, delay = 0) => {
      gsap.fromTo(
        letters,
        { opacity: 0, y: 30 },
        {
          duration: 0.4,
          opacity: 1,
          y: 0,
          stagger: 0.01,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 100%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    };

    // Titoli
    animateLetters(titleRef.current);
    animateLetters(refText2.current, 0.1);
    animateLetters(refText3.current, 0.2);
    animateLetters(refText4.current, 0.3);
    animateLetters(refText5.current, 0.4);

    // Paragrafi
    animateLetters2(refText6.current, 0.5);
    animateLetters2(refText7.current, 0.6);
    animateLetters2(refText8.current, 0.7);
    animateLetters2(refText9.current, 0.8);
  }, []);

  const splitText = (text, ref) =>
    text.split('').map((char, i) => (
      <span
        key={i}
        ref={(el) => (ref.current[i] = el)}
        className="inline-block"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  return (
    <div
      ref={sectionRef}
      className="h-screen w-full relative flex items-center justify-center"
    >
      {/* Titolo centrale */}
      <h1 className="text-9xl antonio2 text-center z-10">
        {splitText('I NOSTRI SERVIZI', titleRef)}
      </h1>

      {/* Web design */}
      <h1 className="absolute top-10 text-5xl antonio2">
        {splitText('Web design', refText2)}
      </h1>
      <p className="absolute top-28 w-1/2 text-1xl text-white text-center">
        {splitText(
          'Creiamo interfacce intuitive, moderne e responsive che riflettono l’identità del tuo brand e migliorano l’esperienza utente su ogni dispositivo.',
          refText6
        )}
      </p>

      {/* Web developer */}
      <h1 className="absolute bottom-20 text-5xl antonio2">
        {splitText('Web developer', refText3)}
      </h1>
      <p className="absolute bottom-2 w-1/2 text-1xl text-white text-center">
        {splitText(
          'Sviluppiamo siti performanti, scalabili e ottimizzati, utilizzando tecnologie moderne per garantire velocità, sicurezza e funzionalità avanzate.',
          refText7
        )}
      </p>

      {/* Logo design */}
      <h1 className="absolute left-[130px] top-1/2 -translate-y-1/2 text-5xl antonio2">
        {splitText('Logo design', refText4)}
      </h1>
      <p className="absolute left-[120px] top-[60%] w-64 text-1xl text-white">
        {splitText(
          "Creiamo loghi distintivi e memorabili che rappresentano l'identità del tuo brand, combinando estetica e strategia visiva.",
          refText8
        )}
      </p>

      {/* App developer */}
      <h1 className="absolute right-20 top-1/2 -translate-y-1/2 text-5xl antonio2">
        {splitText('App developer', refText5)}
      </h1>
      <p className="absolute right-20 top-[60%] w-64 text-1xl text-white text-right">
        {splitText(
          'Sviluppiamo applicazioni mobile su misura, performanti e intuitive, pensate per offrire esperienze utente fluide su ogni dispositivo.',
          refText9
        )}
      </p>
    </div>
  );
};

export default SectioHome2;
