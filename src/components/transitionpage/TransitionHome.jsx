import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const TransitionHome = ({ onComplete }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Inizializzazione: set di tutti gli elementi con trasformazioni base
    gsap.set("#hdihome", { opacity: 0, y: -900 });
    gsap.set("#hdihome2", { opacity: 0, x: -900 });
    gsap.set("#homeo", { opacity: 0, scale: 0, rotateX: -360 });

    gsap.set("#homeme", { opacity: 0, y: 100 });
    gsap.set("#homelatodestro", { opacity: 0, x: 200 });
    gsap.set("#homelatodestrosopra", { opacity: 0, y: -100 });
    gsap.set("#homelatodestrosotto", { opacity: 0, y: 100 });
    gsap.set("#homelatodestrosotto2", { opacity: 0, y: 100 });
    gsap.set("#homelatodestrosottoh", { opacity: 0, y: 100 });
    gsap.set("#homelatodestrosottoh2", { opacity: 0, y: 100 });
    gsap.set("#homelatraheo", { opacity: 0, x: -100 });

    gsap.set("#homesopraheo", { opacity: 0, y: -100 });
    gsap.set("#homecentroheo", { opacity: 0, scale: 0.8 });
    gsap.set("#homelatoe", { opacity: 0, x: 100 });
    gsap.set("#homelatoe2", { opacity: 0, x: 100 });

    // Timeline animazioni principali
    tl.to("#hdihome", {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power2.in",
    }, "<");

    tl.to("#hdihome2", {
      duration: 1,
      opacity: 1,
      x: 0,
      ease: "power2.in",
    }, "<");

    tl.to("#homeo", {
      duration: 1,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      ease: "power2.out",
    }, "<");

    // Sequenza fluida con delay progressivo
    tl.to("#homeme", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "+=0.2");
    tl.to("#homelatodestro", { opacity: 1, x: 0, duration: 0.8 }, "-=0.6");
    tl.to("#homelatodestrosopra", { opacity: 1, y: 0, duration: 0.8 }, "-=0.7");
    tl.to("#homelatodestrosotto", { opacity: 1, y: 0, duration: 0.8 }, "-=0.7");
    tl.to("#homelatodestrosotto2", { opacity: 1, y: 0, duration: 0.8 }, "-=0.7");
    tl.to("#homelatodestrosottoh", { opacity: 1, y: 0, duration: 0.8 }, "-=0.7");
    tl.to("#homelatodestrosottoh2", { opacity: 1, y: 0, duration: 0.8 }, "-=0.7");
    tl.to("#homelatraheo", { opacity: 1, x: 0, duration: 0.8 }, "-=0.7");

    tl.to("#homesopraheo", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");
    tl.to("#homecentroheo", { opacity: 1, scale: 1, duration: 0.8 }, "-=0.6");
    tl.to("#homelatoe", { opacity: 1, x: 0, duration: 0.8 }, "-=0.6");
    tl.to("#homelatoe2", { opacity: 1, x: 0, duration: 0.8 }, "-=0.6");

    // Scroll to top e uscita finale
    tl.to(window, {
      duration: 0.7,
      scrollTo: { y: 0 },
      ease: "power2.inOut",
    }, "+=0.2");

    tl.to(containerRef.current, {
      duration: 0.7,
      y: "-100%",
      ease: "power2.in",
    }, "+=0.3");

    tl.eventCallback("onComplete", () => {
      onComplete();
    });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-screen z-[9999] bg-white flex items-center relative justify-start overflow-hidden"
    >
       <img src="/SvgCode/HomePageSvg/hdihome.svg" id="hdihome" alt="hdihome" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/SvgCode/HomePageSvg/hdihome2.svg" id="hdihome2" alt="hdihome2" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/SvgCode/HomePageSvg/homeo.svg" id="homeo" alt="homeo" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/SvgCode/HomePageSvg/homeme.svg" id="homeme" alt="homeme" className="w-[1800px] absolute top-0 hidden lg:block" />

      <img src="/SvgCode/HomePageSvg/homelatodestro.svg" id="homelatodestro" alt="homelatodestro" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/SvgCode/HomePageSvg/homelatodestrosopra.svg" id="homelatodestrosopra" alt="homelatodestrosopra" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/SvgCode/HomePageSvg/homelatodestrosotto.svg" id="homelatodestrosotto" alt="homelatodestrosotto" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/SvgCode/HomePageSvg/homelatodestrosotto2.svg" id="homelatodestrosotto2" alt="homelatodestrosotto2" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/SvgCode/HomePageSvg/homelatodestrosottoh.svg" id="homelatodestrosottoh" alt="homelatodestrosottoh" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/SvgCode/HomePageSvg/homelatodestrosottoh.svg" id="homelatodestrosottoh2" alt="homelatodestrosottoh2" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/SvgCode/HomePageSvg/homelatraheo.svg" id="homelatraheo" alt="homelatraheo" className="w-[1800px] absolute top-0 hidden lg:block" />

      <img src="/SvgCode/HomePageSvg/homesopraheo.svg" id="homesopraheo" alt="homesopraheo" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/SvgCode/HomePageSvg/homecentroheo.svg" id="homecentroheo" alt="homecentroheo" className="w-[2000px] absolute top-0 hidden lg:block" />
      <img src="/SvgCode/HomePageSvg/homelatoe.svg" id="homelatoe" alt="homelatoe" className="w-[2000px] absolute top-0 hidden lg:block right-[78px]"  />
      <img src="/public/SvgCode/HomePageSvg/homelatoe2.svg" id="homelatoe2" alt="homelatoe2" className="w-[2000px] absolute top-0 hidden lg:block right-[78px]"  />

    </div>
  );
};

TransitionHome.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default TransitionHome;
