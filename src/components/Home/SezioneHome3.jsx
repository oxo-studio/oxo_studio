import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const splitText = (text) =>
  text.split(' ').map((word, i) => (
    <span key={i} className="inline-block overflow-hidden mr-[0.4em]">
      <span className="inline-block">{word}</span>
    </span>
  ));

const SectioHome3 = () => {
  const containerRef = useRef(null);
  const textGroupRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(textGroupRef.current, {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      });

      const headingSpans = headingRef.current.querySelectorAll('span span');
      const subheadingSpans = subheadingRef.current.querySelectorAll('span span');

      gsap.from(headingSpans, {
        y: 50,
        opacity: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(subheadingSpans, {
        y: 50,
        opacity: 0,
        stagger: 0.03,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: subheadingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
   <div className="relative z-[9999]">
  <div
    ref={containerRef}
    className="wrapper relative w-full py-[15vh] sm:py-[15vh] md:py-[15vh] lg:py-[30vh] overflow-hidden z-0"
  >
    {/* Overlay bianco */}
    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-4 md:pr-[100px]">
      <div className="relative w-full h-[100vh]">

        {/* Titolo */}
       {/* Titolo */}
<p
  ref={headingRef}
  className="text-white antonio2 text-3xl leading-tight text-center absolute left-1/2 top-[44%] sm:top-[28%] transform -translate-x-1/2
             whitespace-nowrap 
             md:text-6xl md:text-right md:left-auto md:right-[60px] md:top-[470px] md:transform-none
             lg:text-8xl lg:right-[380px] lg:top-[340px] ombra"
>
  {splitText('MAKE IT POWERFUL')}
</p>


{/* Sottotitolo */}
<p
  ref={subheadingRef}
  className="text-white antonio text-[17px] leading-snug text-center absolute left-1/2 top-[50%] sm:top-[35%] transform -translate-x-1/2
             px-4 max-w-[400px] w-[400px]
             md:text-3xl md:w-[800px] md:max-w-[700px]  md:left-auto md:right-[-50px] md:top-[565px]  md:transform-none
             lg:text-4xl lg:right-[270px] lg:top-[470px] lg:w-[2000px] lg:max-w-[1000px] ombra"
>
  {splitText(
    "Dal primo click all'ultima interazione, costruiamo esperienze su misura che parlano agli utenti."
  )}
</p>


      </div>
    </div>

    {/* Testi grigi in movimento */}
    <div ref={textGroupRef} className="z-10 relative">
      <p className="textItem text-[20vw] md:text-[15vw] lg:text-[10vw] text-gray-600 whitespace-nowrap antonio2 px-4">
        MAKE IT POWERFUL  MAKE IT POWERFUL  MAKE IT POWERFUL
      </p>
      <p className="textItem text-[20vw] md:text-[15vw] lg:text-[10vw] text-gray-600 whitespace-nowrap antonio2 px-4">
        Dal primo click all'ultima interazione, costruiamo esperienze su misura che parlano agli utenti.
      </p>
    </div>
  </div>
</div>

  );
};

export default SectioHome3;
