import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SezioneFinale = () => {
  const sectionRef2 = useRef(null);
  const text1 = useRef([]);
  const text2 = useRef([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        // Desktop (lg e oltre)
        isDesktop: "(min-width: 1024px)",
        // Tablet e mobile
        isMobile: "(max-width: 1023px)",
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions;

        const animateLetters = (letters, delay = 0) => {
          if (!letters || letters.length === 0) return;

          if (isDesktop) {
            // Animazione più marcata su desktop
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
                  start: "top 70%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          } else if (isMobile) {
            // Animazione più soft su tablet/mobile
            gsap.fromTo(
              letters,
              { opacity: 0.6, y: 10 }, // partenza meno drastica
              {
                duration: 0.3,
                opacity: 1,
                y: 0,
                stagger: 0.005,
                delay,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: sectionRef2.current,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        };

        animateLetters(text1.current, 0);
        animateLetters(text2.current, 0.3);
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.matchMedia().revert();
    };
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
      className="relative min-h-[70vh] w-full flex flex-col items-center justify-center px-4 text-center z-[9999] lg:mt-10 md:mt-[200px] mt-[450px]"
    >
      <h1
        style={{ fontFamily: "Human" }}
        className="absolute text-gray-700 text-[25vw] md:text-[200px] lg:text-[250px] leading-none pointer-events-none opacity-20 z-[5]"
      >
        {splitText("LAVORIAMO ASSIEME", text1)}
      </h1>
      <p className="relative text-white text-[3vw] md:text-1xl lg:text-3xl max-w-[800px] z-10">
        {splitText(
          "Hai qualcosa in mente? Realizziamolo insieme, con stile e originalità.",
          text2
        )}
      </p>
    </div>
  );
};

export default SezioneFinale;
