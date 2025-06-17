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
    <div ref={containerRef} className='h-full w-full min-h-screen z-[9999] bg-white flex items-center relative justify-start'>
      <img src="" alt="" />
    </div>
  )

}


TransitionChiSiamo.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default TransitionChiSiamo
