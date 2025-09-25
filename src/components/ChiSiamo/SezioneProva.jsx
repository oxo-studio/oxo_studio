import { useEffect, useRef } from "react";
import gsap from "gsap";

const MaskRevealText = () => {
  const containerRef = useRef(null);
  const whiteTextRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const whiteText = whiteTextRef.current;
    const radius = 100; // raggio del cerchio

    const moveMask = (e) => {
      const rect = whiteText.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(whiteText, {
        duration: 0.3,
        ease: "power3.out",
        clipPath: `circle(${radius}px at ${x}px ${y}px)`,
        webkitClipPath: `circle(${radius}px at ${x}px ${y}px)`,
      });
    };

    container.addEventListener("mousemove", moveMask);

    gsap.set(whiteText, {
      clipPath: `circle(0px at 0 0)`,
      webkitClipPath: `circle(0px at 0 0)`,
    });

    return () => {
      container.removeEventListener("mousemove", moveMask);
    };
  }, []);

  return (
    <>
      <style>{`
      
        .container {
          position: relative;
          height: 100vh;
          overflow: auto;
        }
        .filled-text, .outlined-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-46%, -50%);
          width: 100vw;
          text-align: center;
          font-size: 5rem;
          font-weight: bold;
          line-height: 4rem;
          letter-spacing: -5px;
          padding: 5rem;
          pointer-events: none;
          user-select: none;
        }
        @media screen and (max-width: 768px) {
          .filled-text, .outlined-text {
            font-size: 3rem;
            line-height: 2.5rem;
            padding: 5px;
          }
        }
        .filled-text {
          color: #374151; /* gray-700 */
          z-index: 0;
        }
        .outlined-text {
          color: white;
          z-index: 2;
          pointer-events: none;
          clip-path: circle(0 at 0 0);
          -webkit-clip-path: circle(0 at 0 0);
          transition: clip-path 0.3s ease-out;
        }
      `}</style>

      <div ref={containerRef} className="container overflow-hidden lg:mt-[-100px]   ">
        <span className="filled-text max-w-[1700px]" aria-hidden="true">
          Sono appassionato di tecnologia.<br className="mb-6" />
          Amo trasformare idee in realtà digitali.<br  className="mb-6"  />
          Lo sviluppo informatico è la mia passione.<br  className="mb-6"  />
          Creo esperienze innovative e funzionali.<br  className="mb-6"  />
        </span>

        <span ref={whiteTextRef} className="outlined-text max-w-[1700px]" aria-hidden="true">
          Sono appassionato di tecnologia.<br  className="mb-6"  />
          Amo trasformare idee in realtà digitali.<br  className="mb-6"  />
          Lo sviluppo informatico è la mia passione.<br  className="mb-6"  />
          Creo esperienze innovative e funzionali.<br  className="mb-6"  />
        </span>
      </div>
    </>
  );
};

export default MaskRevealText;
