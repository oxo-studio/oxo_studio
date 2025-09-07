import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import categoriePortfolio from "../FileCategorie.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SingoloLavoro = () => {
  const { id } = useParams();
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const lavoriTrovati = categoriePortfolio
    .flatMap((cat) => cat.lavori)
    .filter((l) => l.id === id);

  const lavoro = lavoriTrovati[0];

  const categorieDelLavoro = categoriePortfolio
    .filter((cat) => cat.lavori.some((l) => l.id === id))
    .map((cat) => cat.nome);

  const tecnologieDelLavoro = [
    ...new Set(
      lavoriTrovati
        .flatMap((l) => l.tecnologie?.split(",") || [])
        .map((t) => t.trim())
    ),
  ];

  useEffect(() => {
    if (!lavoro?.immagini) return;

    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { scale: 0.8, opacity: 0.6 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: card,
            start: "center center",
            end: "center center",
            scrub: true,
          },
        }
      );

      gsap.to(card, {
        scale: 0.8,
        opacity: 0.6,
        scrollTrigger: {
          trigger: card,
          start: "top center",
          end: "bottom center",
          scrub: true,
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [lavoro]);

  if (!lavoro) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <p>Lavoro non trovato.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen text-white flex">
      {/* Colonna sinistra */}
      <div className="w-[30%] p-10 flex flex-col lg:mt-[100px]">
        <h2 className="text-5xl font-bold mb-4 antonio2">{lavoro.titolo}</h2>
        <h5 className="text-white">Categoria</h5>
        <p className="text-gray-400 mb-2">{categorieDelLavoro.join(", ")}</p>
        <h5 className="text-white">Data</h5>
        <p className="text-gray-400 mb-2">{lavoro.data}</p>
        <h5 className="text-white">Tecnologie</h5>
        <p className="text-gray-400 mb-2">{tecnologieDelLavoro.join(", ")}</p>
      </div>

      {/* Colonna centrale con galleria verticale */}
      <div className="w-[70%] h-screen overflow-y-scroll no-scrollbar">
        <div
          className="flex flex-col items-center justify-center space-y-1  "
          ref={containerRef}
        >
          {lavoro.immagini.map((img, index) => (
           <div
            key={index}
            className="card w-[100vh] h-[60vh] transition-transform duration-300 ease-in-out hover:scale-105"
            ref={(el) => (cardsRef.current[index] = el)}
             >

              <img
                src={img}
                alt={`img-${index}`}
                className="w-full h-full object-contain rounded-xl pointer-events-none"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Colonna destra */}
      <div className="w-[30%] p-10 flex lg:mt-[100px]">
        <div>
          <h5 className="text-white">Descrizione</h5>
          <p className="text-gray-300 text-base leading-relaxed text-center">
            {lavoro.descrizione}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingoloLavoro;
