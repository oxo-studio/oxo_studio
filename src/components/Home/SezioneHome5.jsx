import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionHome5 = () => {
  const headingsRef = useRef([]);

  useEffect(() => {
    headingsRef.current.forEach((el, i) => {
      // Timeline per ogni heading: fade-in + slide-up, poi fade-out + slide-up
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 90%",  // quando la scritta entra quasi in vista
          end: "top 30%",    // quando esce verso l’alto
          scrub: true,
        }
      });

      tl.fromTo(
        el,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power1.out" }
      ).to(
        el,
        { y: -100, opacity: 0, duration: 0.7, ease: "power1.in" },
        ">0.3"
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      className="relative z-[9999] flex flex-col items-center gap-16 h-[120vh] justify-center "
    >
      {["EMPATIA", "CREATIVITA'", "PASSIONE"].map((text, i) => (
        <h1
          key={i}
          ref={(el) => (headingsRef.current[i] = el)}
          className="text-center text-6xl font-bold"
          style={{ opacity: 0, transform: "translateY(50px)" }} // partono nascosti e sotto
        >
          {text}
        </h1>
      ))}
    </section>
  );
};

export default SectionHome5;
