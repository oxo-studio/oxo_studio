import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Sudime = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const chiSiamo = useRef([]);

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
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 100%",
            toggleActions: "play none none reverse",
          },
        }
      );
    };

    animateLetters(chiSiamo.current);

    // Scroll effect immagine
    gsap.set(imageRef.current, {
      y: "20%",
    });

    gsap.to(imageRef.current, {
      y: "-20%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  const splitText = (text, ref) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        ref={(el) => (ref.current[i] = el)}
        className="inline-block whitespace-nowrap"
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-screen overflow-hidden"
    >
      <div className="absolute inset-0 flex justify-center items-center">

        {/* Contenitore immagine responsivo */}
        <div className="relative h-[70vh] w-[90vw] sm:w-[110vw] md:w-[90vw] lg:w-[150vh] overflow-hidden">
          <img
            ref={imageRef}
            src="/img/solitudine-sulla-costa-una-persona-piedi-generata-dall-ia.jpg"
            alt="Persona sulla costa"
            className="absolute top-0 left-0 lg:h-[120%] md:h-[120%] md:w-[100%] lg:w-full object-cover"
          />
        </div>

        {/* Testo sopra immagine */}
        <h1
          className="absolute text-white antonio2 top-[200px]
            text-[9vw] sm:text-[8vw] md:text-[10vw] lg:text-9xl
            text-center z-10 pointer-events-none select-none whitespace-nowrap"
        >
          {splitText("Sfumature personali", chiSiamo)}
        </h1>
      </div>
    </div>
  );
};

export default Sudime;
