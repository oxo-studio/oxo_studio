import { useEffect,useRef } from 'react'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import PropTypes from "prop-types";

import gsap from 'gsap'

gsap.registerPlugin(ScrollToPlugin)

const TransitionChiSiamo = ({onComplete})=>{
  const containerRef = useRef(null)
  
  useEffect(()=>{
    const tl = gsap.timeline()    
    tl.to(window,{
      duration: 0.7,
      scrollBehavior:{y: 0},
      ease: "power2.inOut"
    })
    tl.to(
      containerRef.current,
      {
        duration: 0.7,
        y:"-100%",
        ease: "power2.in"
      },
      "+=0.3"
    )

    tl.eventCallback("onComplete",()=>{
      onComplete();
    })

    },[onComplete])

     return (
    <div ref={containerRef} className='fixed top-0 left-0 w-full h-full z-[9999] bg-black flex items-center justify-center'>
      <img src="" alt="" />
    </div>
  )

}


TransitionChiSiamo.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default TransitionChiSiamo
