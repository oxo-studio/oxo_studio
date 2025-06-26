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
  gsap.set("#macchieI",{x:900,opacity:0})

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

  tl.from("#macchieI",{
    duration:1,
    opacity:0,
    x:0,
  },"<")



  tl.to(window, {
    duration: 0.7,
    scrollTo: { y: 0 },
    ease: "power2.inOut"
  });

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
      <img src="/public/SvgCode/ChiSiamoSvg/chisiamoi3.svg" id='i' alt="i" className='w-[1700px] absolute '  />
      <img src="/public/SvgCode/ChiSiamoSvg/macchieI.svg" id='macchieI' alt="macchieI" className='w-[1700px] absolute' />
      <img src="/public/SvgCode/ChiSiamoSvg/chisiamoa1.svg" id='a1' alt="a" className='w-[1700px] absolute ' />
      <img src="/public/SvgCode/ChiSiamoSvg/chisiamoa2.svg" id='a2' alt="a" className='w-[1700px] absolute ' />
    </div>
  )

}


TransitionChiSiamo.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default TransitionChiSiamo
