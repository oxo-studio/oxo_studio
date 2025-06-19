
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const TransitionHome = ({ onComplete }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Step 1: Posizione iniziale invisibile
    gsap.set("#hdihome", { x: -900, opacity: 0 });
    gsap.set("#odihome", { y: 900, opacity: 0 });
    gsap.set("#mdihome", { y: -900, opacity: 0 });
    
    gsap.set("#edihome", { x: 900, opacity: 0 });
    gsap.set("#sotto1", { y: 900, opacity: 0 });
    gsap.set("#sotto2", { y: 900, opacity: 0 });
    gsap.set("#sotto3", { y: 900, opacity: 0 });
    gsap.set("#sotto4", { y: 900, opacity: 0 });

    gsap.set("#o1", { y: 900, opacity: 0 });
    gsap.set("#o2",{y:900, opacity:0})
    gsap.set("#o3",{y:900, opacity:0})
    gsap.set("#o4",{y:900, opacity:0})
    gsap.set("#o5",{y:900, opacity:0})
    gsap.set("#o6",{y:900, opacity:0})
    gsap.set("#o7",{y:900, opacity:0})
    gsap.set("#o8",{y:900, opacity:0})

    gsap.set("#hsoprasinistra", {scale: 0.5,opacity: 0,}); 
    gsap.set("#Osoprasinistra",{scale:0.5,opacity:0})
    gsap.set("#Msoprasinistra",{scale:0.5, opacity:0})
    gsap.set("#Esoprasinistra",{scale:0.5,opacity:0})

    gsap.set("#sopradadestra2",{y:-900, opacity:0})
    gsap.set("#sopradadestra",{y:-900, opacity:0})

    gsap.set("#sopradestra3",{y:-900, opacity:0})
    gsap.set("#sopradestra4",{y:-900, opacity:0})
    gsap.set("#sopradestra5",{y:-900,opacity:0})
    gsap.set("#sopradestra6",{y:-900,opacity:0})

    gsap.set("#sopradestra9",{y:-900,opacity:0})
    gsap.set("#sopradestra8",{y:-900,opacity:0})
    gsap.set("#sopradestra7",{y:-900, opacity:0})



    
    
    // Step 2: Entrata degli elementi
    tl.to("#hdihome", {
      delay: 1,
      duration: 1.5,
      x: 0,
      opacity: 1,
      ease: "power2.out",
    });

    tl.to("#odihome", {
      duration: 1.5,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    }, "<");

    tl.to("#mdihome", {
      duration: 1.5,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    }, "<");

    tl.to("#edihome", {
      duration: 1.5,
      x: 0,
      opacity: 1,
      ease: "power2.out",
    }, "<");

    tl.to("#sotto1", {
      delay:0.3,
      duration: 1.5,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    }, "<");

    tl.to("#sotto2", {
      delay:0.3,
      duration: 1.5,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    }, "<");

    tl.to("#sotto3", {
      delay:0.3,
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    }, "<");

    tl.to("#sotto4", {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    }, "<");

    tl.to("#o1", {

      delay: 0.5,
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    }, "<");

    tl.to("#o2",{
      delay: 0.2,
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    },"<")

     tl.to("#o3",{
      delay: 0.2,
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    },"<")

    
     tl.to("#o4",{
      delay: 0.2,
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    },"<")


     tl.to("#o5",{
      delay: 0.2,
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    },"<")


     tl.to("#o6",{
      delay: 0.2,
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    },"<")


     tl.to("#o7",{
      delay: 0.2,
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    },"<")

     tl.to("#o8",{
      delay: 0.2,
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    },"<")

    tl.to("#hsoprasinistra", {
  scale: 1,
  opacity: 1,
  duration: 1.5,
  ease: "power3.out",
}, "<0.2"); 

tl.to("#Osoprasinistra",{
  scale:1,
  opacity:1,
  duration:1.5,
  ease:"power3.out",

},"<0.4")

tl.to("#Msoprasinistra",{
  scale:1,
  opacity:1,
  duration:1.5,
  ease:"power3.out"
},"<0.4")

tl.to("#Esoprasinistra",{
    scale:1,
  opacity:1,
  duration:1.5,
  ease:"power3.out",
},"<0.4")

tl.to("#sopradadestra2",{
  duration:1,
  y:0,
  opacity:1,
  ease:"power2.out"
},"<")

tl.to("#sopradadestra",{
  delay:0.2,
  duration:1,
  y:0,
  opacity:1,
  ease:"power2.out"
},"<")

tl.to("#sopradestra3",{
  delay:0.3,
  
  duration:1,
  y:0,
  opacity:1,
  ease:"power2.out"
},"<")

tl.to("#sopradestra4",{
  duration:1,
  y:0,
  opacity:1,
  ease:"power2.out"
},"<")

tl.to("#sopradestra5",{
  duration:1,
  y:0,
  opacity:1,
  ease:"power2.out"

},"<")

tl.to("#sopradestra6",{
  delay:0.3,
  duration:1,
  opacity:1,
  y:0,
  ease: "power2.out"
},"<")

tl.to("#sopradestra9",{

  duration:1,
  y:0,
  opacity:1,
  esase:"powe2.out"
},"<")

gsap.to("#sopradestra8",{
  duration:1,
  y:0,
  opacity:1,
  ease:"power2.out"
},"<")
gsap.to("#sopradestra7",{
  duration:1,
  y:0,
  opacity:1,
  ease:"power2.out"
},"<")

    // Step 3: Scroll automatico verso l'alto
    tl.to(window, {
      duration: 0.7,
      scrollTo: { y: 0 },
      ease: "power2.inOut",
    }, "+=0.2");

    // Step 4: Uscita del container verso l'alto
    tl.to(containerRef.current, {
      duration: 0.7,
      y: "-100%",
      ease: "power2.in",
    }, "+=0.3");

    // Step 5: Chiamata alla funzione di completamento
    tl.eventCallback("onComplete", () => {
      onComplete();
    });

  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-screen z-[9999] bg-black flex items-center relative justify-start"
    >
<img src="/public/SvgCode/HomePageSvg/home2.0.svg" alt="hdiHome" id="hdihome"  className="lg:w-[1600px] absolute  top-[-20px] hidden lg:block  right-[30px]"/>
<img src="/SvgCode/HomePageSvg/HomepageGrange2.svg" alt="odiHome" id="odihome" className="lg:w-[1600px]  absolute      top-[-20px] hidden lg:block right-[30px]" />
<img src="/public/SvgCode/HomePageSvg/Mdihome.svg" alt="mdihome" id="mdihome" className="lg:w-[1600px] absolute       top-[-20px] hidden lg:block right-[30px]" />
<img src="/public/SvgCode/HomePageSvg/home2.1.svg" alt="edihome" id="edihome" className="lg:w-[1600px]  absolute top-[-5px] hidden  lg:block right-[30px] " />


<img src="/public/SvgCode/HomePageSvg/HomepageGrange4svg.svg" alt="prima sctriscia sotto sinistra" id="sotto1" className="lg:w-[1800px]  absolute hidden lg:block left-[70px]" />
<img src="/SvgCode/HomePageSvg/HomepageGrange6svg.svg" alt="seconda da sinistra" id="sotto3" className="lg:w-[1800px] absolute   buttom-[20px] left-0 z-30 hidden lg:block" />
<img src="/public/SvgCode/HomePageSvg/HomepageGrange7.svg" alt="3 sinistra" id="sotto4" className="lg:w-[1800px] absolute hidden buttom-[30px] lg:block"/>

<img src="/public/SvgCode/HomePageSvg/Homepage1o.svg" id="o1" alt="prima o da sinistra" className="lg:w-[1800px] absolute hidden  lg:block bottom-[2px]"/>
<img src="/public/SvgCode/HomePageSvg/Homepage2o.svg" id="o2" alt="seconda o da sinistra" className="lg:w-[1800px] absolute hidden lg:block bottom-[2px]"/>
<img src="/public/SvgCode/HomePageSvg/Homepage3o.svg" id="o3" alt="terza o da sinistra" className="lg:w-[1800px] absolute hidden   lg:block bottom-[2px]"/>
<img src="/public/SvgCode/HomePageSvg/Homepage4o.svg" id="o4" alt="quarta o da sinistra" className="lg:w-[1800px] absolute hidden  lg:block bottom-[2px]"/>
<img src="/public/SvgCode/HomePageSvg/Homepage5o.svg" id="o5" alt="quinta o da sinistra" className="lg:w-[8800px] absolute hidden  lg:block bottom-[2px]"/>
<img src="/public/SvgCode/HomePageSvg/Homepage6o.svg" id="o6" alt="sesta o da sinistra" className="lg:w-[1800px] absolute hidden   lg:block bottom-[2px]" />
<img src="/public/SvgCode/HomePageSvg/Homepage7o.svg" id="o7" alt="settima o da sinistra" className="lg:w-[1800px] absolute hidden lg:block bottom-[2px]" />
<img src="/public/SvgCode/HomePageSvg/Homepage8o.svg" id="o8" alt="ottava o da sinistra" className="w-[1800px] absolute hidden  lg:block bottom-[2px]" />

<img src="/public/SvgCode/HomePageSvg/Hsopradihome.svg" id="hsoprasinistra" alt="hhomesoprasinistra" className="w-[1800px] absolute hidden lg:block top-[-60px]" />
<img src="/public/SvgCode/HomePageSvg/Osopradihome.svg" id="Osoprasinistra" alt="Osoprasinistra" className="w-[1800px] absolute hidden lg:block top-[-60px]" />
<img src="/public/SvgCode/HomePageSvg/Msopradihome.svg" id="Msoprasinistra"  alt="Msoprasinistra" className="w-[1800px] absolute hidden lg:block top-[-60px]" />
<img src="/public/SvgCode/HomePageSvg/Esopradihome.svg" id="Esoprasinistra" alt="Esoprasinistra" className="w-[1800px] absolute hidden lg:block top-[-60px]" />

<img src="/public/SvgCode/HomePageSvg/sopradadestra.svg" id="sopradadestra" alt="sopradadestra" className="w-[1600px] absolute hidden lg:block top-[-20px]" />
 <img src="/public/SvgCode/HomePageSvg/sopradadestra2.svg" id="sopradadestra2" alt="sopradadestra" className="w-[1600px] absolute hidden lg:block top-[-20px]" />

 <img src="/public/SvgCode/HomePageSvg/sopradadestra3.svg" id="sopradestra3" alt="sopradestra3" className="w-[1600px] absolute hidden lg:block top-[-20px]" />
 <img src="/public/SvgCode/HomePageSvg/Sopradestra4.svg" id="sopradestra4" alt="sopradestra4" className="w-[1600px] absolute hidden lg:block top-[-20px]" />
 <img src="/public/SvgCode/HomePageSvg/Sopradestra5.svg" id="sopradestra5" alt="sopradestra5" className="w-[1600px] absolute hidden lg:block top-[-30px]" />
 <img src="/public/SvgCode/HomePageSvg/Sopradestra6.svg" id="sopradestra6" alt="sopradestra6" className="w-[1600px] absolute hidden lg:block top-[-30px]" />
 <img src="/public/SvgCode/HomePageSvg/Sopradestra7.svg" id="sopradestra7" alt="sopradestra7" className="w-[1600px] absolute hidden lg:block top-[-65px]" />
 <img src="/public/SvgCode/HomePageSvg/Sopradestra8svg.svg" id="sopradestra8" alt="sopradestra8" className="w-[1600px] absolute hidden lg:block top-[-65px]" />
 <img src="/public/SvgCode/HomePageSvg/Sopradestra9.svg" id="sopradestra9" alt="sopradestra9" className="w-[1600px] absolute hidden lg:block top-[-65px]"/>
</div>


  
  );
};

TransitionHome.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default TransitionHome;

