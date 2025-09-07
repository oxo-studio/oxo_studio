import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SezioneFinale = () => {
  const sectionRef2 = useRef(null);
  const text1 = useRef([]);
  const text2 = useRef([]);

  useEffect(() => {
    const animateLetters = (letters, delay = 0) => {
      if (!letters || letters.length === 0) return;

      gsap.fromTo(
        letters,
        { opacity: 0, y: 30 },
        {
          duration: 0.4,
          opacity: 1,
          y: 0,
          stagger: 0.01,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef2.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    };

    animateLetters(text1.current, 0);
    animateLetters(text2.current, 0.3);
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
<div
  ref={sectionRef2}
  className="relative w-full flex items-center justify-center
    mt-[10px] sm:mt-[100px] md:mt-[-70px] lg:mt-[-10px] lg:min-h-[40vh]
    pb-[300px] sm:pb-[150px] md:pb-[120px]
    min-h-[20vh]
    -translate-y-10"   
>
  {/* Titolo grande grigio */}
  <h1
    style={{ fontFamily: "Human" }}
    className="absolute text-gray-400 text-[25vw] md:text-[23vw] lg:text-[250px] leading-none text-center pointer-events-none opacity-20 z-8"
  >
    {splitText("LAVORIAMO ASSIEME", text1)}
  </h1>

  {/* Paragrafo bianco */}
  <p className="relative text-white text-[3vw] md:text-[3vw] lg:text-3xl text-center z-10 max-w-[90vw] md:max-w-[800px] px-4">
    {splitText(
      "Hai qualcosa in mente? Realizziamolo insieme, con stile e originalità.",
      text2
    )}
  </p>
</div>


  );
};

export default SezioneFinale;
