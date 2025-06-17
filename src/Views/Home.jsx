import {  useRef, useState } from "react";
import Sezione1 from "../components/Home/Sezione1";
import TransitionHome from "../components/transitionpage/TransitionHome"

export default function Boxes() {
  const [showTransition, setShowTransition] = useState(true);
  const mainRef = useRef(null);

  const handleTransitionEnd = () => {
    setShowTransition(false);

    // Scrolla automaticamente verso Sezione1
    setTimeout(() => {
      if (mainRef.current) {
        mainRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      {showTransition && <TransitionHome onComplete={handleTransitionEnd} />}

      <main ref={mainRef}>
        <Sezione1 />
      </main>
    </>
  );
}
