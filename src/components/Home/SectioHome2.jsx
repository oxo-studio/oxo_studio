import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionHome2 = () => {
  const sectionRefLg = useRef(null);
  const sectionRefSm = useRef(null);

  // Desktop refs
  const titleRefLg = useRef([]);
  const refText2Lg = useRef([]);
  const refText3Lg = useRef([]);
  const refText4Lg = useRef([]);
  const refText5Lg = useRef([]);

  const refText6Lg = useRef([]);
  const refText7Lg = useRef([]);
  const refText8Lg = useRef([]);
  const refText9Lg = useRef([]);

  // Mobile refs
  const titleRefSm = useRef([]);
  const refText2Sm = useRef([]);
  const refText3Sm = useRef([]);
  const refText4Sm = useRef([]);
  const refText5Sm = useRef([]);

  const refText6Sm = useRef([]);
  const refText7Sm = useRef([]);
  const refText8Sm = useRef([]);
  const refText9Sm = useRef([]);

  useEffect(() => {
    ScrollTrigger.matchMedia({
      "(min-width: 1024px)": () => {
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
                trigger: sectionRefLg.current,
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
              duration: 2,
              opacity: 1,
              y: 0,
              stagger: 0.01,
              delay,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRefLg.current,
                start: 'top 100%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        };

        animateLetters(titleRefLg.current);
        animateLetters(refText2Lg.current, 0.1);
        animateLetters(refText3Lg.current, 0.2);
        animateLetters(refText4Lg.current, 0.3);
        animateLetters(refText5Lg.current, 0.4);

        animateLetters2(refText6Lg.current, 0.5);
        animateLetters2(refText7Lg.current, 0.6);
        animateLetters2(refText8Lg.current, 0.7);
        animateLetters2(refText9Lg.current, 0.8);

        return () => {
          ScrollTrigger.getAll().forEach(t => t.kill());
        };
      },
      "(max-width: 1023px)": () => {
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
                trigger: sectionRefSm.current,
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
                trigger: sectionRefSm.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        };

        animateLetters(titleRefSm.current);
        animateLetters(refText2Sm.current, 0.1);
        animateLetters(refText3Sm.current, 0.2);
        animateLetters(refText4Sm.current, 0.3);
        animateLetters(refText5Sm.current, 0.4);

        animateLetters2(refText6Sm.current, 0.5);
        animateLetters2(refText7Sm.current, 0.6);
        animateLetters2(refText8Sm.current, 0.7);
        animateLetters2(refText9Sm.current, 0.8);

        return () => {
          ScrollTrigger.getAll().forEach(t => t.kill());
        };
      }
    });
  }, []);

  // Funzione splitWords ora pulisce l'array di ref
  const splitWords = (text, ref) => {
    ref.current = [];
    return text.split(' ').map((word, i) => (
      <span
        key={i}
        ref={el => (ref.current[i] = el)}
        className="inline-block"
        style={{ whiteSpace: 'nowrap', marginRight: '0.25em' }}
      >
        {word}
      </span>
    ));
  };

  return (
    <>
      {/* VERSIONE DESKTOP */}
      <section
        ref={sectionRefLg}
        className="h-screen w-full relative hidden lg:flex items-center justify-center overflow-hidden flex-col"
      >
        <div className="absolute inset-0 z-0 pointer-events-none" />
        <div className="relative z-10 w-full h-full flex items-center justify-center flex-col">
          <h1 className="text-9xl antonio2 text-center">
            {splitWords('I NOSTRI SERVIZI', titleRefLg)}
          </h1>

          <h1 className="absolute top-10 text-5xl antonio2">
            {splitWords('Web design', refText2Lg)}
          </h1>
          <p className="absolute top-28 w-1/2 text-lg text-white text-center">
            {splitWords(
              'Creiamo interfacce intuitive, moderne e responsive che riflettono l’identità del tuo brand e migliorano l’esperienza utente su ogni dispositivo.',
              refText6Lg
            )}
          </p>

          <h1 className="absolute bottom-20 text-5xl antonio2">
            {splitWords('Web developer', refText3Lg)}
          </h1>
          <p className="absolute bottom-2 w-1/2 text-lg text-white text-center">
            {splitWords(
              'Sviluppiamo siti performanti, scalabili e ottimizzati, utilizzando tecnologie moderne per garantire velocità, sicurezza e funzionalità avanzate.',
              refText7Lg
            )}
          </p>

          <h1 className="absolute left-[130px] top-[400px] -translate-y-1/2 text-5xl antonio2">
            {splitWords('Logo design', refText4Lg)}
          </h1>
          <p className="absolute left-[120px] top-[450px] w-64 text-lg text-white">
            {splitWords(
              "Creiamo loghi distintivi e memorabili che rappresentano l'identità del tuo brand, combinando estetica e strategia visiva.",
              refText8Lg
            )}
          </p>

          <h1 className="absolute right-20 top-[400px] -translate-y-1/2 text-5xl antonio2">
            {splitWords('App developer', refText5Lg)}
          </h1>
          <p className="absolute right-20 top-[450px] w-64 text-lg text-white text-right">
            {splitWords(
              'Sviluppiamo applicazioni mobile su misura, performanti e intuitive, pensate per offrire esperienze utente fluide su ogni dispositivo.',
              refText9Lg
            )}
          </p>
        </div>
      </section>

      {/* VERSIONE MOBILE */}
      <section
        ref={sectionRefSm}
        className="block lg:hidden w-full py-24 px-6"
      >
        <h1 className="text-5xl md:text-8xl antonio2 text-center mb-16">
          {splitWords('I NOSTRI SERVIZI', titleRefSm)}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-24 md:gap-y-16 max-w-6xl mx-auto">
          <div>
            <h2 className="md:text-5xl text-center text-4xl antonio2 mb-3">{splitWords('Web design', refText2Sm)}</h2>
            <p className="text-lg text-white text-center">
              {splitWords(
                'Creiamo interfacce intuitive, moderne e responsive che riflettono l’identità del tuo brand e migliorano l’esperienza utente su ogni dispositivo.',
                refText6Sm
              )}
            </p>
          </div>

          <div>
            <h2 className="md:text-5xl text-center text-4xl antonio2 mb-3">{splitWords('Web developer', refText3Sm)}</h2>
            <p className="text-lg text-white text-center">
              {splitWords(
                'Sviluppiamo siti performanti, scalabili e ottimizzati, utilizzando tecnologie moderne per garantire velocità, sicurezza e funzionalità avanzate.',
                refText7Sm
              )}
            </p>
          </div>

          <div>
            <h2 className="md:text-5xl text-center text-4xl antonio2 mb-3">{splitWords('Logo design', refText4Sm)}</h2>
            <p className="text-lg text-white text-center">
              {splitWords(
                "Creiamo loghi distintivi e memorabili che rappresentano l'identità del tuo brand, combinando estetica e strategia visiva.",
                refText8Sm
              )}
            </p>
          </div>

          <div>
            <h2 className="md:text-5xl text-center text-4xl antonio2 mb-3">{splitWords('App developer', refText5Sm)}</h2>
            <p className="text-lg text-white text-center">
              {splitWords(
                'Sviluppiamo applicazioni mobile su misura, performanti e intuitive, pensate per offrire esperienze utente fluide su ogni dispositivo.',
                refText9Sm
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionHome2;
