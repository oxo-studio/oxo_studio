import { useState, useRef } from "react";
import TransitionChiSiamo from "../components/transitionpage/TransitionChiSiamo";


export default function Scroll() {
  const [showTransition, setShowTransition]= useState(true)
  const mainRef = useRef(null)

  const handleTransitionEnd = ()=>{
    setShowTransition(false)

    setTimeout(()=>{
      if (mainRef.current){
        mainRef.current.scrollIntoView({behavior: "smooth"})
      }
    },100)
  }
  return (
  <>
  {showTransition && <TransitionChiSiamo onComplete={handleTransitionEnd}/>}
  <main ref={mainRef}>

  </main>
  </>
  );
}
