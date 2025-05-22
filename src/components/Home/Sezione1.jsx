import { useEffect, useRef } from "react";
import gsap from "gsap";

// Split text in lettere animate
const splitText = (text) => {
  return text.split("").map((char, i) => (
    <span
      key={i}
      className="inline-block overflow-hidden"
      style={{ height: "300px", display: "inline-block" }}
    >
      <span
        className="block"
        style={{ transform: "translateY(100%)", lineHeight: "300px" }}
      >
        {char}
      </span>
    </span>
  ));
};

const Sezione1 = () => {
  const designRef = useRef(null);
  const developerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(
      designRef.current.querySelectorAll("span > span"),
      {
        duration: 0.8,
        y: "0%",
        stagger: 0.05,
        ease: "power3.out",
      },
      0
    );

    tl.to(
      developerRef.current.querySelectorAll("span > span"),
      {
        duration: 0.8,
        y: "0%",
        stagger: 0.05,
        ease: "power3.out",
      },
      0.3
    );
  }, []);

  return (
    <header>
      <div className="relative h-screen bg-[#121212] overflow-hidden">
       

        {/* Scritte animate in basso a sinistra */}
        <div className="absolute bottom-8 left-8 flex flex-col space-y-2 z-10">
          <h1
            ref={designRef}
            className="text-white antonio text-[300px] leading-none"
          >
            {splitText("DESIGN &")}
          </h1>
          <h1
            ref={developerRef}
            className="antonio text-white text-[300px] leading-none"
          >
            {splitText("DEVELOPER")}
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Sezione1;
