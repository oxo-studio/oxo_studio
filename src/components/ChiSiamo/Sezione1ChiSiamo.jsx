import { useRef, useEffect, useState } from "react";
import MouseLight from "../shader/MauseLight";

const Sezione1ChiSiamo = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const poliRef = useRef(null);
  const matteoRef = useRef(null);
  const matteo2Ref = useRef(null);
  const imageRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calcola il progresso dello scroll nella sezione (0 → 1)
      const progress = 1 - Math.max(0, Math.min(1, rect.top / windowHeight));
      setScrollProgress(progress);

      // Attiva la visibilità solo dopo un certo scroll
      if (progress > 0.1 && !isVisible) {
        setIsVisible(true);
      }

      // Applica le trasformazioni immersive solo se visibile
      if (isVisible) {
        applyImmersiveTransformations(progress);
      }
    };

    const applyImmersiveTransformations = (progress) => {
      if (!poliRef.current || !matteoRef.current || !imageRef.current) return;

      // Calcola progresso normalizzato (0.1 → 1)
      const normalizedProgress = Math.max(0, (progress - 0.1) / 0.9);

      // POLI - Compare da sinistra
      const poliX = -100 + normalizedProgress * 100;
      poliRef.current.style.transform = `
        translateX(${poliX}px)
        translateZ(${normalizedProgress * 50}px)
      `;
      poliRef.current.style.opacity = normalizedProgress;

      // MATTEO - Compare da destra
      const matteoDelay = Math.max(0, normalizedProgress - 0.2);
      const matteoX = 100 - matteoDelay * 100;
      matteoRef.current.style.transform = `
        translateX(${matteoX}px)
        translateZ(${matteoDelay * 60}px)
      `;
      matteoRef.current.style.opacity = matteoDelay;

      // SVG - Zoom progressivo (DRITTA)
      const imageScale = 0.3 + normalizedProgress * 0.7;
      imageRef.current.style.transform = `
        scale(${imageScale})
        translateZ(${normalizedProgress * 30}px)
      `;
      imageRef.current.style.opacity = normalizedProgress;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="w-screen h-screen relative overflow-hidden "
    >
      {/* Mouse Light Effect */}
      <div className="hidden md:block absolute inset-0 z-10">
        <MouseLight />
      </div>

      {/* Contenuto principale */}
      <div className="relative   h-full z-[9999]">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-1 md:grid-cols-2 items-center gap-6 px-4 md:px-12 lg:px-0 lg:ml-[50px] ">
          
          {/* Testo a sinistra */}
          <div className="relative text-center md:text-left space-y-4  lg:mt-[0px] md:mt-[-300px] mt-[-100px]  ">
            <h1
               ref={matteoRef}
              className="text-white font-bold  ml-[-50px] text-[80px] md:text-[180px] lg:text-[400px] md:ml-[-60px]  lg:block  antonio leading-none transition-all duration-1000 ease-out"
              style={{
                transform: "translateX(-100px) translateZ(-50px)",
                opacity: 0,
              }}
            >
              MATTEO
            </h1>

  


            <h1
               ref={poliRef}
              className="text-white font-bold text-[80px] ml-[20px]  md:text-[180px] lg:text-[450px] lg:ml-[100px] md:ml-[-100px]   antonio leading-none transition-all duration-1000 ease-out z-50"
              style={{
                transform: "translateX(100px) translateZ(-50px)",
                opacity: 0,
              }}
            >
              POLI
            </h1>
          </div>

          {/* SVG a destra con overlay gradiente */}
   
            {/* Contenitore per SVG + gradiente */}
{/* SVG a destra con overlay gradiente */}
<div
  ref={imageRef}
  className="flex  justify-center md:justify-start md:items-start  md:mt-[-250px]  
             w-full lg:ml-[250px] lg:top-[-90px] relative transition-all duration-1200 ease-out "
  style={{
    opacity: 0,
    transform: "scale(0.3) translateZ(-30px)",
  }}
>
  {/* Contenitore SVG */}
  <div className="absolute ml-[-550px] mt-[-800px]">
    <img
      src="/SvgCode/mia.svg"
      alt="Illustrazione SVG"
      className="lg:w-[1700px] lg:h-[1700px] md:w-[1200px] md:h-[1200px] lg:ml-[0] w-[850px] h-[850px]  ml-[550px] mt-[270px]  md:mt-[290px] md:ml-[120px]    object-contain max-w-none"
    />

    {/* Gradiente opzionale sopra */}

  </div>
</div>



      
        </div>
      </div>
    </section>
  );
};

export default Sezione1ChiSiamo;
