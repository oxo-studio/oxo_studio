import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SingoloLavoro = () => {
  const containerRef = useRef(null);

  const immagini = [
    "/img/crazy2.png",
    "/img/solitudine-sulla-costa-una-persona-piedi-generata-dall-ia.jpg",
  ];

  useEffect(() => {
    const cards = gsap.utils.toArray(".card");

    gsap.to(cards, {
      xPercent: -100 * (cards.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 0.6,
        snap: 1 / (cards.length - 1),
        end: () => "+=" + containerRef.current.offsetWidth,
        invalidateOnRefresh: true,
      },
    });

    // Cleanup ScrollTrigger on unmount
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div style={{ height: "100vh", overflow: "hidden", backgroundColor: "#000" }}>
      <h1 style={{ color: "#fff", textAlign: "center", padding: "20px" }}>
        Lavoro Singolo
      </h1>
      <div
        ref={containerRef}
        style={{
          display: "flex",
          width: `${immagini.length * 100}vw`,
          height: "80vh",
          overflow: "hidden",
        }}
      >
        {immagini.map((src, i) => (
          <div
            key={i}
            className="card"
            style={{
              width: "100vw",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={src}
              alt={`Progetto ${i}`}
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingoloLavoro;
