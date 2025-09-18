import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import LavoroCard from '../Portfolio/LavoroCard';
import LavoroCardBasso from '../Portfolio/LavoroCardBasso';
import categoriePortfolio from '../CategoriePortfolio/FileCategorie';

gsap.registerPlugin(ScrollTrigger);

const SectionHome4 = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);



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
  }, []);

  const title = 'I nostri lavori';

  // Preparazione dati dinamici
  const lavoriUnici = [];

  categoriePortfolio.forEach((categoria) => {
    categoria.lavori.forEach((lavoro) => {
      const esiste = lavoriUnici.find((item) => item.id === lavoro.id);
      if (esiste) {
        esiste.categorie.push(categoria.nome);
      } else {
        lavoriUnici.push({
          ...lavoro,
          categorie: [categoria.nome],
        });
      }
    });
  });

  const meta = Math.ceil(lavoriUnici.length / 2);
  const lavoriParteSuperiore = lavoriUnici.slice(0, meta);
  const lavoriParteInferiore = lavoriUnici.slice(meta);
  const colonnaSinistra = lavoriParteInferiore.slice(0, Math.ceil(lavoriParteInferiore.length / 2));
  const colonnaDestra = lavoriParteInferiore.slice(Math.ceil(lavoriParteInferiore.length / 2));

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center lg:mt-[200px] md:mt-[30px] mt-[60px] "
    >
      {/* Titolo animato */}
      <h1
        ref={textRef}
        className="text-center antonio2 text-6xl lg:text-9xl md:text-8xl trelative z-[9999] mb-16 flex flex-wrap justify-center"
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

      {/* Parte superiore dinamica con lavori grandi */}
      <div className="relative z-10 w-[90vw] h-[40vh] md:w-[90vw] md:h-[60vh] lg:w-[90vw] lg:h-[90vh]  border border-white overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-[15px] m-0 transition-transform duration-500">
          {lavoriParteSuperiore.map((lavoro) => (
            <LavoroCard key={lavoro.id} lavoro={lavoro} dimensione="grande" />
          ))}
        </div>
      </div>

      {/* Parte inferiore con due colonne dinamiche */}
      <div className="relative hidden md:blok md:grid  z-10 w-[90vw] h-[55vh] border border-white overflow-hidden -mt-px  grid-cols-2">
        {/* Colonna sinistra */}
        <div className="flex flex-col gap-6 p-4 overflow-y-auto">
          {colonnaSinistra.map((lavoro) => (
            <LavoroCardBasso key={lavoro.id} lavoro={lavoro} dimensione="medio" />
          ))}
        </div>

        {/* Linea verticale centrale */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-white" />

        {/* Colonna destra */}
        <div className="flex flex-col gap-6 p-4 overflow-y-auto">
          {colonnaDestra.map((lavoro) => (
            <LavoroCardBasso key={lavoro.id} lavoro={lavoro} dimensione="medio" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionHome4;
