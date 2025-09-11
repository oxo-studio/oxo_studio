import { useParams, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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

    cardsRef.current.forEach((card) => {
      gsap.fromTo(
        card,
        { scale: 0.95 },
        {
          scale: 1.1,
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
    <>
      <div className="w-full h-screen text-white flex flex-col lg:flex-row">
       {/* Colonna sinistra */}
<div className="w-full lg:w-[30%] p-6 lg:p-10 flex flex-col items-center justify-center relative">
  {/* Titolo e freccia */}
  <Link
    to="https://www.crazyntinatattoo.it/"
    className="text-white hover:decoration-transparent relative group"
  >
    <FontAwesomeIcon
      icon={faArrowLeft}
      className="text-gray-500 md:hidden hidden md:mt-[160px] md:ml-[-50px] absolute  left-0 lg:static lg:mt-[-120px] lg:mb-2 transition-transform duration-500 group-hover:-translate-x-2"
    />
    <h2 className="text-4xl mt-[170px] md:text-6xl md:mt-[100px] font-bold  lg:mb-10 antonio2 text-center lg:text-left lg:text-6xl">
      {lavoro.titolo}
    </h2>
  </Link>

  {/* MOSTRA SOLO SU lg */}
  <div className="hidden lg:block w-full text-center">
    <h5 className="text-white antonio2 text-3xl mb-1">Categoria</h5>
    <p className="text-gray-400 mb-4 antonio2 text-2xl">{categorieDelLavoro.join(", ")}</p>

    <h5 className="text-white antonio2 text-3xl mb-1">Data</h5>
    <p className="text-gray-400 mb-4 antonio2 text-2xl">{lavoro.data}</p>

    <h5 className="text-white antonio2 text-3xl mb-1">Tecnologie</h5>
    <p className="text-gray-400 antonio2 text-2xl">{tecnologieDelLavoro.join(", ")}</p>
  </div>

  <div className="hidden lg:block">
    <h1 className="text-gray-600 text-[150px] lg:text-[200px] antonio2">Lavoro</h1>
  </div>
</div>

     {/* Colonna centrale */}
<div className="w-full lg:w-[70%] min-h-screen lg:h-screen overflow-y-scroll no-scrollbar">
  {/* MOBILE (<md) */}
  <div className="block md:hidden space-y-[-450px] px-4 mt-[-200px]">
    {lavoro.immagini.map((img, index) => (
      <div
        key={index}
        className="w-full min-h-[90vh] flex items-center justify-center"
        ref={(el) => (cardsRef.current[index] = el)}
      >
        <img
          src={img}
          alt={`img-mobile-${index}`}
          className="w-full h-auto max-h-[90vh] object-contain rounded-xl pointer-events-none"
          draggable={false}
        />
      </div>
    ))}
  </div>

  {/* TABLET (md) */}
  <div className="hidden md:block lg:hidden  px-6 -space-y-96 mt-[-150px]">
    {lavoro.immagini.map((img, index) => (
      <div
        key={index}
        className="w-full h-[80vh] flex items-center justify-center"
        ref={(el) => (cardsRef.current[index] = el)}
      >
        <img
          src={img}
          alt={`img-md-${index}`}
          className="w-full h-auto max-h-[80vh] object-contain rounded-xl pointer-events-none"
          draggable={false}
        />
      </div>
    ))}
  </div>

  {/* DESKTOP (lg e oltre) */}
  <div
    className="hidden lg:flex flex-col items-center justify-center space-y-1 mt-14 px-4"
    ref={containerRef}
  >
    {lavoro.immagini.map((img, index) => (
      <div
        key={index}
        className="card w-full lg:w-[150vh] h-[60vh]"
        ref={(el) => (cardsRef.current[index] = el)}
      >
        <img
          src={img}
          alt={`img-lg-${index}`}
          className="w-full h-full object-contain rounded-xl pointer-events-none"
          draggable={false}
        />
      </div>
    ))}
  </div>
</div>


        {/* Info sotto immagini (solo md e sm) */}
<div className="md:flex lg:hidden justify-around items-start  hidden px-4 flex-wrap gap-4 text-center">
 
  <div>
    <h5 className="text-white antonio2 text-xl md:text-3xl">Data</h5>
    <p className="text-gray-400 antonio2 text-lg md:text-2xl">{lavoro.data}</p>
  </div>
   <div>
    <h5 className="text-white antonio2 text-xl md:text-3xl">Categoria</h5>
    <p className="text-gray-400 antonio2 text-lg md:text-2xl">{categorieDelLavoro.join(", ")}</p>
  </div>
  <div>
    <h5 className="text-white antonio2 text-xl md:text-3xl">Tecnologie</h5>
    <p className="text-gray-400 antonio2 text-lg md:text-2xl">{tecnologieDelLavoro.join(", ")}</p>
  </div>
</div>



{/* Info sotto img - SOLO su mobile, in colonna e centrato */}
<div className="flex flex-col md:hidden  items-center text-center gap-6 mt-[-100px] px-6 lg:hidden">
  <div>
    <h5 className="text-white antonio2 text-2xl">Data</h5>
    <p className="text-gray-400 antonio2 text-xl">{lavoro.data}</p>
  </div>
  
  <div>
    <h5 className="text-white antonio2 text-2xl">Categoria</h5>
    <p className="text-gray-400 antonio2 text-xl">{categorieDelLavoro.join(", ")}</p>
  </div>
  
  <div>
    <h5 className="text-white antonio2 text-2xl">Tecnologie</h5>
    <p className="text-gray-400 antonio2 text-xl">{tecnologieDelLavoro.join(", ")}</p>
  </div>
</div>




        {/* Colonna destra */}
        <div className="w-full lg:w-[30%] mt-10 p-6 lg:p-10 flex justify-center items-start lg:mt-[100px] md:mt-[50px] md:ml-[-27px]">
          <div>
            <h5 className="text-white antonio2 text-2xl md:text-3xl text-center lg:mb-5">Descrizione</h5>
            <p className="text-gray-300 leading-relaxed text-center antonio2 text-xl md:text-2xl">
              {lavoro.descrizione}
            </p>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default SingoloLavoro;
