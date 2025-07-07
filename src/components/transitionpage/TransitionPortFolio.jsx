import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const TransitionPortFolio = ({ onComplete }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.set("#sopra1",{y:-900, opacity:0})
    gsap.set("#sopra2",{opacity:0,scale:0,rotateZ:-360})
    gsap.set("#sopra3",{y:900,opacity:0})
    gsap.set("#p",{opacity:0,scale:0,rotateZ:-360 })
    gsap.set("#o",{opacity:0,scale:0,rotateZ: 360 })
    gsap.set("#r",{opacity:0,z:100, scale:0})

    gsap.set("#t",{})
    gsap.set("#f",{})
    gsap.set("#o2",{})
    gsap.set("#l",{})

    gsap.set("#x",{})
    gsap.set("#x2",{})
    gsap.set("#x3",{})

    gsap.set("#i",{})
    gsap.set("#o3",{})

    gsap.set("#soprasinistra",{})
    


    window.scrollTo(0, 0); // forza subito top
   
    const tl = gsap.timeline();
    
    tl.to("#sopra1",{
      duration:1,
      y:0,
      opacity:1,
      ease:"power2.in"
    },"<")

    tl.to("#sopra2",{
     duration:1,
     scale:1,
     rotadeZ:0,
     opacity:1,
     ease:"power2.out",
     transformOrigin:"center center"
    },"<")

    tl.to("#sopra3",{
      duration:1,
      opacity:1,
      y:0,
      ease:"power2.in"
    },"<")

    tl.to("#p",{
       duration:1,
     scale:1,
     rotateZ:0,
     opacity:1,
     ease:"power2.out",
     transformOrigin:"center center"
    },"<")

    tl.to("#o",{
       duration:1,
     scale:1,
     rotateZ:0,
     opacity:1,
     ease:"power2.out",
     transformOrigin:"center center"
    },"<")

tl.to("#r",{
  duration:1,
  z:0,
  opacity:1,
  transformOrigin:"center center",
  ease:"power2.in"
  
},"<")

tl.to("#t",{
 
})

tl.to("#f",{
 
})

tl.to("#o2",{
 
})

tl.to("#l",{
 
})

tl.to("#x",{
 
})

tl.to("#x2",{
 
})

tl.to("#x3",{
 
})

tl.to("#i",{
 
})

tl.to("#soprasinistra",{
 
})

    tl.to(window, {
      duration: 0.7,
      scrollTo: { y: 0 },
      ease: "power2.inOut"
    }, "<");

    tl.to(containerRef.current, {
      duration: 0.7,
      y: "-100%",
      ease: "power2.in"
    }, "+=0.3");

    tl.eventCallback("onComplete", () => {
      setTimeout(() => {
        onComplete();
      }, 100);
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

      <img src="/public/SvgCode/PortfolioSvg/portfoliocarosellolatosinistro.svg" id="carosellodestro" alt="carosellodestro" className="w-[1800px] absolute top-0 hidden lg:block" />

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
