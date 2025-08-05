import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);


const TransitionPortFolio = ({ onComplete }) => {
  const containerRef = useRef(null);

  useEffect(() => {
  window.scrollTo(0, 0);

   const initialElements = [
    // Testo principale
    "#p", "#o", "#r", "#t", "#f", "#o2", "#l", "#x", "#x2", "#x3", "#i", "#o3",

    // Sopra
    "#sopra", "#sopra1", "#sopra2", "#sopra3", "#soprasinistra",
    "#soprap", "#soprao", "#sopran", "#soprai",

    // Centro decorativi
    "#sopracentro", "#sopracentro2", "#sopracentro3", "#sopracentro4", "#sopracentro5", "#sopracentro6",

    // Caroselli
    "#carosellolatodestro", "#carosellosinistro",

    // Sotto
    "#sottodestra", "#sotto2",

    // Testi in basso
    "#scrittasotto"
  ];


  // Impostazioni iniziali: fuori vista e opache
  initialElements.forEach((id, i ) => {
    gsap.set(id, {
      opacity: 0,
      scale: 0.95,
      y: 60,
    },i * 0.09 );
  });

  const tl = gsap.timeline();

  // Fase 1: Fade-in armonico con delay tipo cascata
  initialElements.forEach((id, i) => {
    tl.to(id, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    }, i * 0.07); // cascata leggera
  });

  // Fase 2: Scroll to top (già a 0, ma per sicurezza)
  tl.to(window, {
    scrollTo: { y: 0 },
    duration: 0.5,
    ease: "power1.inOut"
  }, "+=0.2");

  // Fase 3: Uscita container fluida verso l’alto
  tl.to(containerRef.current, {
    y: "-100%",
    duration: 1.2,
    ease: "power4.inOut"
  }, "+=0.3");

  // Callback finale
  tl.eventCallback("onComplete", () => {
    setTimeout(onComplete, 100);
  });
}, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 h-full w-full z-[9999] bg-white flex items-center justify-center overflow-hidden"
    >
      <img src="/SvgCode/PortfolioSvg/portfolioosopra.svg" id="sopra1" alt="Layer top graphic" className="absolute top-0 hidden lg:block"  />
      <img src="/SvgCode/PortfolioSvg/portfoliosopra3.svg" id="sopra2" alt="Layer graphic 3" className="absolute top-0 hidden lg:block"/>
      <img src="/public/SvgCode/PortfolioSvg/portfoliosopra2.svg" id="sopra3" alt="Layer graphic 3" className="absolute top-0 hidden lg:block" />

      <img src="/public/SvgCode/PortfolioSvg/portfoliop.svg" id="p" alt="p" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/public/SvgCode/PortfolioSvg/portfolioo.svg" id="o" alt="o" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/public/SvgCode/PortfolioSvg/portfolior.svg" id="r" alt="r" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/public/SvgCode/PortfolioSvg/portfoliot.svg" id="t" alt="t" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/public/SvgCode/PortfolioSvg/portfoliof.svg" id="f" alt="f" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/public/SvgCode/PortfolioSvg/portfolioo2.svg" id="o2" alt="o2" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/public/SvgCode/PortfolioSvg/portfoliol.svg" id="l" alt="l" className="w-[1800px] absolute top-0 hidden lg:block" />
      
      <img src="/public/SvgCode/PortfolioSvg/portfolioxfaccia.svg" id="x" alt="x" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/public/SvgCode/PortfolioSvg/portfolioxfaccia2.svg" id="x2" alt="x2" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/public/SvgCode/PortfolioSvg/portfolioxfaccia3.svg" id="x3" alt="x3" className="w-[1800px] absolute top-0 hidden lg:block" />
     
      <img src="/public/SvgCode/PortfolioSvg/portfolioi.svg" id="i" alt="i" className="w-[1800px] absolute top-0 hidden lg:block " />
      <img src="/public/SvgCode/PortfolioSvg/portfolioo3.svg" id="o3" alt="o3" className="w-[1800px] absolute top-0 hidden lg:block " />

      <img src="/public/SvgCode/PortfolioSvg/portfoliosoprasinistra.svg" id="soprasinistra" alt="soprasinistra" className="w-[1800px] absolute top-0 hidden lg:block " />

      <img src="/public/SvgCode/PortfolioSvg/portfoliosoprap.svg" id="soprap" alt="soprap" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/public/SvgCode/PortfolioSvg/portfoliosoprao.svg" id="soprao" alt="soprao" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/public/SvgCode/PortfolioSvg/portfoliosopran.svg" id="sopran" alt="sopran" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/public/SvgCode/PortfolioSvg/portfoliosoprai.svg" id="soprai" alt="soprai" className="w-[1800px] absolute top-0 hidden lg:block" />

      <img src="/public/SvgCode/PortfolioSvg/portfoliosopracentro.svg" id="sopracentro" alt="sopracentro" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/public/SvgCode/PortfolioSvg/portfoliosopracentro2.svg" id="sopracentro2" alt="sopracentro2" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/public/SvgCode/PortfolioSvg/portfoliosopracentro3.svg" id="sopracentro3" alt="sopracentro3" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/public/SvgCode/PortfolioSvg/portfoliosopracentro4.svg" id="sopracentro4" alt="sopracentro4" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/public/SvgCode/PortfolioSvg/portfoliosopracentro5.svg" id="sopracentro5" alt="sopracentro5" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/public/SvgCode/PortfolioSvg/portfoliosopracentro6.svg" id="sopracentro6" alt="sopracentro6" className="w-[1800px] absolute top-0 hidden lg:block" />

      <img src="/public/SvgCode/PortfolioSvg/portfoliocarosellolatodestro.svg" id="carosellolatodestro" alt="carosellolatodestro" className="w-[1800px] absolute top-0 hidden lg:block" />

  
      <img src="/public/SvgCode/PortfolioSvg/portfoliosottodestra.svg" id="sottodestra" alt="sottodestra" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/public/SvgCode/PortfolioSvg/portfoliosotto2.svg" id="sotto2" alt="sotto2" className="w-[1800px] absolute top-0 hidden lg:block" />

      <img src="/public/SvgCode/PortfolioSvg/portfoliocarosellolatosinistro.svg" id="carosellosinistro" alt="carosellodestro" className="w-[1800px] absolute top-0 hidden lg:block" />

      <img src="/public/SvgCode/PortfolioSvg/portfolioscrittasotto1.svg" id="scrittasotto" alt="scrittasotto" className="w-[1800px] absolute top-0 hidden lg:block" />
      <img src="/public/SvgCode/PortfolioSvg/portfolioscrittasotto2.svg" id="scrittasotto" alt="scrittasotto" className="w-[1800px] absolute top-0 hidden lg:block" />

      <img src="/public/SvgCode/PortfolioSvg/portfolioscrittasotto3.svg" id="scrittasotto" alt="scrittasotto" className="w-[1800px] absolute top-0 hidden lg:block" />



    </div>
  );
};

TransitionPortFolio.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default TransitionPortFolio;
