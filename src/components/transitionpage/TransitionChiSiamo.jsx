import { useEffect,useRef } from 'react'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import PropTypes from "prop-types";

import gsap from 'gsap'

gsap.registerPlugin(ScrollToPlugin)

const TransitionChiSiamo = ({onComplete})=>{
  const containerRef = useRef(null)

  useEffect(() => {

  gsap.set("#a1", { y: -900, opacity: 0 });
  gsap.set("#a2", { y: 900, opacity: 0 });
  gsap.set("#i",{y:900,opacity:0})
  gsap.set("#macchieI",{y:-900,opacity:0})
  gsap.set("#s", {
  opacity: 0,
  scale: 0,
  rotateZ: -360
  });
  gsap.set("#barradestra", {
  x: 1000,      // fuori dallo schermo a destra
  opacity: 0,
  skewX: 20     // effetto prospettiva
});

gsap.set("#olatodestro",{x:-900,opacity:1})
gsap.set("#olatosinistro",{x:-900,opacity:1})
gsap.set("#olatosotto",{x:-900,opacity:1})
gsap.set("#o2",{x:-900,opacity:1})
gsap.set("#ochi2",{x:-900,opacity:1})




gsap.set("#mmezzo",{y:900,opacity:0})
gsap.set("#mmezzo2",{y:900,opacity:0})

gsap.set("#sottom1",{y:900,opacity:0})
gsap.set("#sottom2",{y:900,opacity:0})
gsap.set("#sottom3",{y:900,opacity:0})
gsap.set("#sottom4",{y:900,opacity:0})
gsap.set("#sottom5",{y:900,opacity:0})
gsap.set("#sottom6",{y:900,opacity:0})

gsap.set("#msopra",{y:-900,opacity:0})
gsap.set("#msottosinistra",{y:-900,opacity:0})

gsap.set("#linelatom1",{x:900,opacity:0})
gsap.set("#linelatom2",{x:900,opacity:0})
gsap.set("#linelatom3",{x:900,opacity:0})
gsap.set("#linelatom4",{x:900,opacity:0})
gsap.set("#linelatom5",{x:-900,opacity:0})




  const tl = gsap.timeline();

  tl.to("#a1", {
    duration: 1,
    y: 0,
    opacity: 1
  }, "<");
  
  tl.to("#a2", {
    duration: 1,
    y: 0,
    opacity: 1,
    

  }, "<");

  tl.to("#i",{
    delay:0.2,
    duration:1,
    y:0,
    opacity:1,
   
  },"<")

tl.fromTo(
  "#macchieI",
  { scale: 0, opacity: 0, y: 900 },
  {
    delay:0.2,
    duration: 1,
    scale: 1,
    opacity: 1,
    y: 0,
    ease: "power3.out"
  },
  "<"
);

tl.to("#s", {
  duration: 1,
  scale: 1,
  rotateZ: 0,
  opacity: 1,
  ease: "power2.out",
  transformOrigin: "center center"
}, "<");

tl.to("#barradestra", {
  duration: 1.2,
  x: 0,
  opacity: 1,
  skewX: 0,
  ease: "elastic.out(1, 0.6)"
}, "<"); // "<" per sincronizzarlo con le altre animazioni

tl.fromTo("#chi", {
  y: -900,
  opacity: 0
}, {
  duration: 1,
  y: 0,
  opacity: 1,
  ease: "power3.out"
}, "<"); // "<" lo sincronizza con le altre

tl.to("#mmezzo",{
  duration:1,
  y:0,
  opacity:1,
  ease:"power2.out"
},"<")

tl.to("#msottosinistra",{
  duration:1,
  y:0,
  opacity:1,
  ease:"power2.out"
},"<")

tl.to("#mmezzo2",{
  delay:0.2,
  duration:1,
  y:0,
  opacity:1,
  ease:"power2.out"
},"<")

tl.to("#sottom1",{
  duration:1,
  opacity:1,
  y:0,
  ease:"power3.in"
},"<")
tl.to("#sottom2",{
  delay:0.1,
  duration:1,
  opacity:1,
  y:0,
  ease:"power3.in"
},"<")
tl.to("#sottom3",{
  delay:0.1,
  duration:1,
  opacity:1,
  y:0,
  ease:"power3.in"
},"<")
tl.to("#sottom4",{
  delay:0.1,
  duration:1,
  opacity:1,
  y:0,
  ease:"power3.in"
},"<")
tl.to("#sottom5",{
  delay:0.1,
  duration:1,
  opacity:1,
  y:0,
  ease:"power3.in"
},"<")
tl.to("#sottom6",{
  delay:0.1,
  duration:1,
  opacity:1,
  y:0,
  ease:"power3.in"
},"<")

tl.to("#msopra",{
  delay:-0.7,
  duration:1,
  opacity:1,
  y:0,
  ease:"power3.in"
},"<")

tl.to("#linelatom1",{
duration:1,
opacity:1,
x:0,
ease:"power2.out"
},"<")
tl.to("#linelatom2",{
duration:1,
opacity:1,
x:0,
ease:"power2.out"
},"<")
tl.to("#linelatom3",{
duration:1,
opacity:1,
x:0,
ease:"power2.out"
},"<")
tl.to("#linelatom4",{
duration:1,
opacity:1,
x:0,
ease:"power2.out"
},"<")
tl.to("#linelatom5",{
duration:1,
opacity:1,
x:0,
ease:"power2.out"
},"<")

tl.to("#olatodestro",{
  duration:1,
  opacity:1,
  x:0,
  ease:"power2.in"
},"<")

tl.to("#olatosinistro",{
  duration:1,
  opacity:1,
  x:0,
  ease:"power2.in"
},"<")

tl.to("#olatosotto",{
  duration:1,
  opacity:1,
  x:0,
  ease:"power2.in"
},"<")

tl.to("#o2",{
  duration:1,
  opacity:1,
  x:0,
  ease:"power2.in"
},"<")

tl.to("#ochi2",{
  duration:1,
  opacity:1,
  x:0,
  ease:"power2.in"
},"<")






  tl.to(window, {
    duration: 0.7,
    scrollTo: { y: 0 },
    ease: "power2.inOut"
  },"<");

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
    <div ref={containerRef} className='h-full w-full min-h-screen z-[9999] bg-white flex items-center relative justify-start'>
      <img src="/public/SvgCode/ChiSiamoSvg/barradestra2.svg" id='barradestra' alt="barradestra" className='w-[1600px] absolute    hidden lg:block' />
      <img src="/public/SvgCode/ChiSiamoSvg/chisiamos2.svg" id='s' alt="s" className='w-[1650px] absolute    hidden lg:block'/>
      <img src="/public/SvgCode/ChiSiamoSvg/chisiamoai2.svg" id='i' alt="i" className='w-[1650px] absolute    hidden lg:block '  />
      <img src="/public/SvgCode/ChiSiamoSvg/MACCHIEI2.svg" id='macchieI' alt="macchieI" className='w-[1600px] hidden lg:block absolute' />
      <img src="/public/SvgCode/ChiSiamoSvg/chisiamoa.svg" id='a1' alt="a" className='w-[1600px] absolute   hidden lg:block ' />
      <img src="/public/SvgCode/ChiSiamoSvg/m2.svg" id='msopra' alt="msopra" className='w-[1600px] absolute   hidden lg:block ' />
      <img src="/public/SvgCode/ChiSiamoSvg/msottosinistra.svg" id='msottosinistra' alt="msottosinistra" className='w-[1600px] absolute   hidden lg:block ' />
      
      <img src="/public/SvgCode/ChiSiamoSvg/olatodesto.svg" id='olatodestro' alt="olatodestro" className='w-[1600px] absolute   hidden lg:block '/>
      <img src="/public/SvgCode/ChiSiamoSvg/olatosinistro.svg" id='olatosinistro' alt="olatosinistro" className='w-[1600px] absolute   hidden lg:block '/> 
      
      <img src="/public/SvgCode/ChiSiamoSvg/olatosotto.svg" id='olatosotto' alt="olatosotto" className='w-[1600px] absolute   hidden lg:block '/> 
      <img src="/public/SvgCode/ChiSiamoSvg/chisiamoO2.svg" id='o2' alt="o2" className='w-[1600px] absolute   hidden lg:block '/> 
      <img src="/public/SvgCode/ChiSiamoSvg/chisiamoai2.svg" id='ochi2' alt="ochi2" className='w-[1600px] absolute   hidden lg:block '/> 
      <img src="/public/SvgCode/ChiSiamoSvg/olatosinistro2.svg" id='osinistro2' alt="osinistro2" className='w-[1600px] absolute   hidden lg:block '/> 
      <img src="/public/SvgCode/ChiSiamoSvg/olatosinistro3.svg" id='osinistro3' alt="osinistro3" className='w-[1600px] absolute   hidden lg:block '/> 
      
      <img src="/public/SvgCode/ChiSiamoSvg/macchiesottoo.svg" id='macchiesotto' alt="macchiesotto" className='w-[1600px] absolute   hidden lg:block '/> 

      <img src="/public/SvgCode/ChiSiamoSvg/chisiamoa12.svg" id='a2' alt="a" className='w-[1600px] absolute   hidden lg:block ' />
      <img src="/public/SvgCode/ChiSiamoSvg/chisiamochi.svg" id='chi' alt="chi" className='w-[1600px] absolute   hidden lg:block ' />
      <img src="/public/SvgCode/ChiSiamoSvg/chisiamomsottomezzo.svg" id='mmezzo' alt="mmezzo"  className='w-[1600px] absolute   hidden lg:block '/>
      <img src="/public/SvgCode/ChiSiamoSvg/olatosinistro.svg" id='mmezzo' alt="mmezzo"  className='w-[1600px] absolute   hidden lg:block '/>
      <img src="/public/SvgCode/ChiSiamoSvg/osopramacchie.svg" id='osopramacchie' alt="osopramacchie"  className='w-[1600px] absolute   hidden lg:block '/>
     
      <img src="/public/SvgCode/ChiSiamoSvg/scrittasottom1.svg" id='sottom1' alt="sottomscritta"  className='w-[1600px] absolute   hidden lg:block top-[-8px]'/>
      <img src="/public/SvgCode/ChiSiamoSvg/scrittasottom2.svg" id='sottom2' alt="sottomscritta"  className='w-[1600px] absolute   hidden lg:block top-[-8px]'/>
      <img src="/public/SvgCode/ChiSiamoSvg/scrittasottom3.svg" id='sottom3' alt="sottomscritta"  className='w-[1600px] absolute   hidden lg:block top-[-8px]'/>
      <img src="/public/SvgCode/ChiSiamoSvg/scrittasottom4.svg" id='sottom4' alt="sottomscritta"  className='w-[1600px] absolute   hidden lg:block top-[-8px]'/>
      <img src="/public/SvgCode/ChiSiamoSvg/scrittasottom5.svg" id='sottom5' alt="sottomscritta"  className='w-[1600px] absolute   hidden lg:block top-[-8px]'/>
      <img src="/public/SvgCode/ChiSiamoSvg/scrittasottom6.svg" id='sottom6' alt="sottomscritta"  className='w-[1600px] absolute   hidden lg:block top-[-8px]'/>

      <img src="/public/SvgCode/ChiSiamoSvg/mlinelato.svg"  id='linelatom1' alt="linelatom1"  className='w-[1600px] absolute   hidden lg:block '/>
      <img src="/public/SvgCode/ChiSiamoSvg/mlinelato2.svg" id='linelatom2' alt="linelatom2"  className='w-[1600px] absolute   hidden lg:block '/>
      <img src="/public/SvgCode/ChiSiamoSvg/mlinelato3.svg" id='linelatom3' alt="linelatom3"  className='w-[1600px] absolute   hidden lg:block '/>
      <img src="/public/SvgCode/ChiSiamoSvg/mlinelato4.svg" id='linelatom4' alt="linelatom4"  className='w-[1600px] absolute   hidden lg:block '/>
      <img src="/public/SvgCode/ChiSiamoSvg/mlinelato5.svg" id='linelatom5' alt="linelatom5"  className='w-[1600px] absolute   hidden lg:block '/>

    </div>
  )

}


TransitionChiSiamo.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default TransitionChiSiamo
