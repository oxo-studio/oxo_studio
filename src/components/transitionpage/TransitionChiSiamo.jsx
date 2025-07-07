import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const TransitionChiSiamo = ({ onComplete }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Set iniziali
    gsap.set("#a1", { y: -900, opacity: 0 });
    gsap.set("#a2", { y: 900, opacity: 0 });
    gsap.set("#i", { y: 900, opacity: 0 });
    gsap.set("#macchieI", { y: -900, opacity: 0 });
    gsap.set("#s", { opacity: 0, scale: 0, rotateZ: -360 });
    gsap.set("#barradestra", { x: 1000, opacity: 0, skewX: 20 });

    gsap.set("#sottodestra2",{y:900, opacity:0})

    gsap.set("#olatodestro", { x: 900, opacity: 1 });
    gsap.set("#olatosinistro", { x: 900, opacity: 1 });
    gsap.set("#olatosotto", { y: 900, opacity: 1 });
    gsap.set("#o2", { x: 900, opacity: 1 });
    gsap.set("#ochi2", { x: -900, opacity: 1 });
    gsap.set("#olatodestro1",{y:-900, opacity:0})
    gsap.set("#olatodestro2",{y:-900, opacity:0})

    gsap.set("#mmezzo", { y: 900, opacity: 0 });
    gsap.set("#mmezzo2", { y: 900, opacity: 0 });

    gsap.set("#sottom1", { y: 900, opacity: 0 });
    gsap.set("#sottom2", { y: 900, opacity: 0 });
    gsap.set("#sottom3", { y: 900, opacity: 0 });
    gsap.set("#sottom4", { y: 900, opacity: 0 });
    gsap.set("#sottom5", { y: 900, opacity: 0 });
    gsap.set("#sottom6", { y: 900, opacity: 0 });

    gsap.set("#msopra", { y: -900, opacity: 0 });

    gsap.set("#linelatom1", { x: 900, opacity: 0 });
    gsap.set("#linelatom2", { x: 900, opacity: 0 });
    gsap.set("#linelatom3", { x: 900, opacity: 0 });
    gsap.set("#linelatom4", { x: 900, opacity: 0 });
    gsap.set("#linelatom5", { x: 900, opacity: 0 });

    gsap.set("#sottodestra3",{y:900, opacity:0})

    const tl = gsap.timeline();

    // Sequenza animazioni
    tl.to("#a1", { duration: 1, y: 0, opacity: 1 }, "<")
      .to("#a2", { duration: 1, y: 0, opacity: 1 }, "<")
      .to("#i", { delay: 0.2, duration: 1, y: 0, opacity: 1 }, "<")
      .fromTo("#macchieI", { scale: 0, opacity: 0, y: 900 }, {
        delay: 0.2, duration: 1, scale: 1, opacity: 1, y: 0, ease: "power3.out"
      }, "<")
      .to("#s", {
        duration: 1, scale: 1, rotateZ: 0, opacity: 1,
        ease: "power2.out", transformOrigin: "center center"
      }, "<")
      .to("#barradestra", {
        duration: 1.2, x: 0, opacity: 1, skewX: 0, ease: "elastic.out(1, 0.6)"
      }, "<")
      .fromTo("#chi", { y: -900, opacity: 0 }, {
        duration: 1, y: 0, opacity: 1, ease: "power3.out"
      }, "<")
      .to("#mmezzo", { duration: 1, y: 0, opacity: 1, ease: "power2.out" }, "<")
      .to("#mmezzo2", { delay: 0.2, duration: 1, y: 0, opacity: 1, ease: "power2.out" }, "<");

    // Sottom
    ["#sottom1", "#sottom2", "#sottom3", "#sottom4", "#sottom5", "#sottom6"].forEach((id, index) => {
      tl.to(id, {
        delay: index === 0 ? 0 : 0.1,
        duration: 0.3,
        opacity: 1,
        y: 0,
        ease: "power2.out"
      }, "<");
    });

    // msopra
    tl.to("#msopra", {
      delay: -0.3,
      duration: 1,
      opacity: 1,
      y: 0,
      ease: "power2.out"
    }, "<");

    // Linee
    ["#linelatom1", "#linelatom2", "#linelatom3", "#linelatom4", "#linelatom5"].forEach(id => {
      tl.to(id, {
        duration: 1,
        opacity: 1,
        x: 0,
        ease: "power2.out"
      }, "<");
    });

    // O componenti
    ["#olatodestro", "#olatosinistro", "#olatosotto", "#o2", "#ochi2"].forEach(id => {
      tl.to(id, {
        duration: 1,
        opacity: 1,
        x: 0,
        y: 0,
        ease: "power2.out"
      }, "<");
    });

    tl.to("#olatodestro1",{
      duration:1,
      opacity:1,
      y:0,
      ease: "power2.out"
    },"<")

       tl.to("#olatodestro2",{
      duration:1,
      opacity:1,
      y:0,
      ease: "power2.out"
    },"<")

    tl.to("#sottodestra2",{
     delay:0.2,
      duration:1,
      y:0,
      opacity:1,
      ease:"power2.out"
    },"<")
    
    tl.to("#sottodestra3",{
      duration:1,
      opacity:1,
      y:0,
      ease:"power2.out"
    },"<")
    
    // Scroll e uscita container
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
      onComplete();
    });

  }, [onComplete]);

  return (
    <div ref={containerRef} className="h-full w-full min-h-screen z-[9999] bg-white flex items-center relative justify-start">
      <img src="/SvgCode/ChiSiamoSvg/barradestra2.svg" id="barradestra" alt="barradestra" className="w-[2000px] absolute hidden lg:block top-[0px]" />
      <img src="/SvgCode/ChiSiamoSvg/chisiamos2.svg" id="s" alt="s" className="w-[1800px] absolute hidden lg:block top-[0px]" />
      <img src="/SvgCode/ChiSiamoSvg/chisiamoai2.svg" id="i" alt="i" className="w-[1650px] absolute hidden lg:block" />
      <img src="/SvgCode/ChiSiamoSvg/MACCHIEI2.svg" id="macchieI" alt="macchieI" className="w-[1600px] hidden lg:block absolute" />
      <img src="/SvgCode/ChiSiamoSvg/chisiamoa.svg" id="a1" alt="a" className="w-[1600px] absolute hidden lg:block" />
      <img src="/SvgCode/ChiSiamoSvg/m2.svg" id="msopra" alt="msopra" className="w-[1600px] absolute hidden lg:block" />
      <img src="/SvgCode/ChiSiamoSvg/olatodesto.svg" id="olatodestro" alt="olatodestro" className="w-[1600px] absolute hidden lg:block" />
      <img src="/SvgCode/ChiSiamoSvg/olatosinistro.svg" id="olatosinistro" alt="olatosinistro" className="w-[1600px] absolute hidden lg:block" />
      <img src="/SvgCode/ChiSiamoSvg/olatosotto.svg" id="olatosotto" alt="olatosotto" className="w-[1600px] absolute hidden lg:block" />
      <img src="/SvgCode/ChiSiamoSvg/chisiamoO2.svg" id="o2" alt="o2" className="w-[1600px] absolute hidden lg:block" />
      <img src="/SvgCode/ChiSiamoSvg/ochi2.svg" id="ochi2" alt="ochi2" className="w-[1600px] absolute hidden lg:block" />

      <img src="/public/SvgCode/ChiSiamoSvg/olatosinistro2.svg" id='olatodestro1' alt="olatodestro1" className="w-[1600px] absolute hidden lg:block"/>
      <img src="/public/SvgCode/ChiSiamoSvg/olatosinistro3.svg" id='olatodestro2' alt="olatodestro2" className="w-[1600px] absolute hidden lg:block"/>

      <img src="/public/SvgCode/ChiSiamoSvg/sottodestra2.svg" id='sottodestra2' alt="sottodestra2" className="w-[1600px] absolute hidden lg:block"/>



      <img src="/SvgCode/ChiSiamoSvg/chisiamoa12.svg" id="a2" alt="a2" className="w-[1600px] absolute hidden lg:block" />
      <img src="/SvgCode/ChiSiamoSvg/chisiamochi.svg" id="chi" alt="chi" className="w-[1600px] absolute hidden lg:block" />
      <img src="/SvgCode/ChiSiamoSvg/chisiamomsottomezzo.svg" id="mmezzo" alt="mmezzo" className="w-[1600px] absolute hidden lg:block" />
      <img src="/SvgCode/ChiSiamoSvg/chisiamomsottomezzo2.svg" id="mmezzo2" alt="mmezzo2" className="w-[1600px] absolute hidden lg:block" />
      <img src="/SvgCode/ChiSiamoSvg/scrittasottom1.svg" id="sottom1" alt="sottom1" className="w-[1600px] absolute hidden lg:block top-[-8px]" />
      <img src="/SvgCode/ChiSiamoSvg/scrittasottom2.svg" id="sottom2" alt="sottom2" className="w-[1600px] absolute hidden lg:block top-[-8px]" />
      <img src="/SvgCode/ChiSiamoSvg/scrittasottom3.svg" id="sottom3" alt="sottom3" className="w-[1600px] absolute hidden lg:block top-[-8px]" />
      <img src="/SvgCode/ChiSiamoSvg/scrittasottom4.svg" id="sottom4" alt="sottom4" className="w-[1600px] absolute hidden lg:block top-[-8px]" />
      <img src="/SvgCode/ChiSiamoSvg/scrittasottom5.svg" id="sottom5" alt="sottom5" className="w-[1600px] absolute hidden lg:block top-[-8px]" />
      <img src="/SvgCode/ChiSiamoSvg/scrittasottom6.svg" id="sottom6" alt="sottom6" className="w-[1600px] absolute hidden lg:block top-[-8px]" />
      <img src="/SvgCode/ChiSiamoSvg/mlinelato.svg" id="linelatom1" alt="linelatom1" className="w-[1600px] absolute hidden lg:block" />
      <img src="/SvgCode/ChiSiamoSvg/mlinelato2.svg" id="linelatom2" alt="linelatom2" className="w-[1600px] absolute hidden lg:block" />
      <img src="/SvgCode/ChiSiamoSvg/mlinelato3.svg" id="linelatom3" alt="linelatom3" className="w-[1600px] absolute hidden lg:block" />
      <img src="/SvgCode/ChiSiamoSvg/mlinelato4.svg" id="linelatom4" alt="linelatom4" className="w-[1600px] absolute hidden lg:block" />
      <img src="/SvgCode/ChiSiamoSvg/mlinelato5.svg" id="linelatom5" alt="linelatom5" className="w-[1600px] absolute hidden lg:block" />

      <img src="/public/SvgCode/ChiSiamoSvg/sottodestra3.svg" id='sottodestra3' alt="sottodestra3" className="w-[1600px] absolute hidden lg:block" />
    </div>
  );
};

TransitionChiSiamo.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default TransitionChiSiamo;
