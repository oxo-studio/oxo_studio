import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const SezioneProva = () => {
  const textRef = useRef(null);
  const splitRef = useRef(null);

  useEffect(() => {
    // Prendi SOLO il testo visibile (quello con display != none)
    const visibleTextElement = Array.from(textRef.current.children).find(
      (el) => window.getComputedStyle(el).display !== "none"
    );

    if (!visibleTextElement) return;

    splitRef.current = new SplitText(visibleTextElement, {
      type: "words",
      wordsClass: "word",
    });

    gsap.set(splitRef.current.words, { color: "#888888" }); // testo grigio iniziale

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#textSection",
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: true,
        invalidateOnRefresh: true, // importante se cambia layout
      },
    });

    tl.to(splitRef.current.words, {
      color: "#ffffff",
      stagger: 0.1,
      ease: "none",
    });

    // Refresh ScrollTrigger per sicurezza
    ScrollTrigger.refresh();

    return () => {
      // Distruggi SplitText all'unmount
      splitRef.current?.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      id="textSection"
      className="relative z-50 mt-36 flex justify-center items-center text-center min-h-screen antonio2 px-4"
    >
      <h1 ref={textRef} className="text-lg md:text-2xl lg:text-6xl">
        {/* testo diverso per mobile e desktop */}
        <span className="block md:hidden">
          Fin da giovane sono sempre stato affascinato dalla tecnologia e dal suo
          potere di trasformare le idee in realtà. La mia passione per lo sviluppo
          web, il design e l’innovazione cresce ogni giorno, spingendomi a creare
          soluzioni funzionali ed eleganti.
        </span>

        <span className="hidden md:block ">
          Fin da piccolo sono stato affascinato dal mondo della tecnologia e dal
          modo in cui può trasformare le idee in realtà. Negli anni, questa
          curiosità si è trasformata in una vera e propria passione per lo sviluppo
          web, il design digitale e l’innovazione. Amo sperimentare, imparare
          continuamente e creare soluzioni che uniscano estetica e funzionalità.
          Ogni progetto è per me un’occasione per crescere, mettermi alla prova e
          dare forma a qualcosa di significativo.
        </span>
      </h1>
    </div>
  );
};

export default SezioneProva;
