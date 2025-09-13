import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const SezioneProva = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const split = new SplitText(textRef.current, {
      type: "words",
      wordsClass: "word"
    });

    gsap.set(split.words, { color: "#888888" }); // testo grigio iniziale

    gsap.timeline({
      scrollTrigger: {
        trigger: "#textSection",
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: true,
        
      }
    })
    .to(split.words, {
      color: "#ffffff", // diventa bianco durante lo scroll
      stagger: 0.1,
      ease: "none"
    });
  }, []);

  return (
    <div
      id="textSection"
      className="relative z-50 mt-36 flex justify-center items-center text-center min-h-screen antonio2"
    >
      <h1 ref={textRef}>
        Fin da piccolo sono stato affascinato dal mondo della tecnologia e dal modo in cui può trasformare le idee in realtà. 
        Negli anni, questa curiosità si è trasformata in una vera e propria passione per lo sviluppo web, il design digitale e l’innovazione. 
        Amo sperimentare, imparare continuamente e creare soluzioni che uniscano estetica e funzionalità. 
        Ogni progetto è per me un’occasione per crescere, mettermi alla prova e dare forma a qualcosa di significativo.
      </h1>
    </div>
  );
};

export default SezioneProva;
