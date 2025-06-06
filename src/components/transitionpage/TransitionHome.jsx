import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const TransitionHome = ({ onComplete }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Scroll automatico verso l'alto
    tl.to(window, {
      duration: 0.7,
      scrollTo: { y: 0 },
      ease: "power2.inOut",
   
    });

    // Animazione di uscita verso l'alto del container
    tl.to(
      containerRef.current,
      {
        duration: 0.7,
        y: "-100%",   // sposta verso l'alto fuori schermo
      
        ease: "power2.in",
      },
      "+=0.3" // piccola pausa dopo lo scroll
    );

    // Al termine timeline chiama onComplete
    tl.eventCallback("onComplete", () => {
      onComplete();
    });

  }, [onComplete]);

  return (
    <>
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full z-[9999] bg-black flex items-center justify-center"
    >

<img src="/SvgCode/hdihome.svg" alt="H" />
<img src="/SvgCode/Odihome.svg" alt="O" />
<img src="/SvgCode/Mdihome.svg" alt="M" />
<img src="/SvgCode/Edihome.svg" alt="E" />

   
    </div>
    
    <div className="w-full h-20 bg-white"></div>
    </>
  );
};

TransitionHome.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default TransitionHome;
