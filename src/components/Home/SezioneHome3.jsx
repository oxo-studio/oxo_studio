

import  { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectioHome3 = () => {
  const wrapperRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    const scrollLength = textElement.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top top',
        end: `+=${scrollLength}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        markers: false, // true per debug
      },
    });

    tl.to(textElement, {
      x: -scrollLength,
      ease: 'none',
    });

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  return (
    <>
      <div
        ref={wrapperRef}
        className="w-full h-screen overflow-hidden flex items-center z-[999] relative top-[240px] "
      >
        <div
          ref={textRef}
          className="whitespace-nowrap text-[9.7vw] text-gray-600 px-4 antonio2 "
        >
         La nostra visione è creare un’esperienza unica, autentica, fatta su misura per te.&nbsp;
        </div>
        
      </div>
      

      <div></div>


    </>
  );
};

export default SectioHome3;
