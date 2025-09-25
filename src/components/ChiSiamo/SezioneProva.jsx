import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const SezioneMaskReveal = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const maskRef = useRef(null);
  const maskTextRef = useRef(null);
  const splitRef = useRef({ gray: null, white: null });

  // Split the gray and white versions of the text
  useLayoutEffect(() => {
    if (!textRef.current || !maskTextRef.current) return;

    splitRef.current.gray = new SplitText(textRef.current, {
      type: "words",
      wordsClass: "word",
    });

    splitRef.current.white = new SplitText(maskTextRef.current, {
      type: "words",
      wordsClass: "word",
    });

    gsap.set(splitRef.current.gray.words, { color: "#888888" });
    gsap.set(splitRef.current.white.words, { color: "#ffffff" });

    return () => {
      splitRef.current.gray?.revert();
      splitRef.current.white?.revert();
    };
  }, []);

  // Mouse mask logic - CORRETTO per avere la maschera attaccata al mouse
  useEffect(() => {
    const container = containerRef.current;

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      
      // Calcola la posizione CENTRATA sul mouse
      const x = e.clientX - rect.left - 100; // 100 = metà della larghezza (200px/2)
      const y = e.clientY - rect.top - 100;  // 100 = metà dell'altezza (200px/2)

      // Muovi la maschera istantaneamente (senza animazione)
      gsap.set(maskRef.current, { x, y });
    };

    container.addEventListener("mousemove", onMove);
    
    // Posiziona la maschera al centro all'inizio
    const initialX = window.innerWidth / 2 - 100;
    const initialY = window.innerHeight / 2 - 100;
    gsap.set(maskRef.current, { x: initialX, y: initialY });

    return () => container.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden px-6 cursor-none"
    >
      {/* TEXT - BASE GRAY */}
      <h1
        ref={textRef}
        className="text-4xl md:text-6xl lg:text-7xl font-bold antonio2 text-center max-w-4xl leading-snug z-10 text-gray-600"
      >
        Fin da giovane sono sempre stato affascinato dalla tecnologia e dal suo potere di trasformare le idee in realtà.
      </h1>

      {/* MASK OVERLAY - reveals white version of the same text */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
        <div
          ref={maskRef}
          className="w-[200px] h-[200px] rounded-full overflow-hidden absolute"
        >
          <div className="w-full h-full absolute flex items-center justify-center">
            <h1
              ref={maskTextRef}
              className="text-4xl md:text-6xl lg:text-7xl font-bold antonio2 text-white text-center max-w-4xl leading-snug"
            >
              Fin da giovane sono sempre stato affascinato dalla tecnologia e dal suo potere di trasformare le idee in realtà.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SezioneMaskReveal;