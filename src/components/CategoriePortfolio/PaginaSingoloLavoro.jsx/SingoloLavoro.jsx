import { useParams, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import SezioneFinale from "./SezioneFinaleSingoloLavoro.jsx"
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
  const sectionRef = useRef(null)
  const sectionRefSm = useRef(null)
  const categoria = useRef([])
  const data = useRef([])
  const tecnologie = useRef([])
  const categoriaP = useRef([])
  const dataP = useRef([])
  const tecnologieP = useRef([])

  const splitText = (text, ref)=>
      text.split("").map((chart,i)=>(
        <span
          key={i}
          ref={(el)=> (ref.current[i]=el)}
          className="inline-block"
        >

        {chart === " " ? "\u00A0" :chart}

        </span>
      ))

  useEffect(() => {
  if (!lavoro?.immagini) return;

  // DESKTOP ANIMATIONS
  const animateLetters = (letters, delay = 0) => {
    gsap.fromTo(
      letters,
      { opacity: 0, y: 30 },
      {
        duration: 0.4,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  };

  // MOBILE/TABLET ANIMATIONS
  const animateLettersSm = (letters, delay = 0) => {
    gsap.fromTo(
      letters,
      { opacity: 0, y: 50 },
      {
        duration: 0.4,
        opacity: 1,
        y: 0,
        stagger: 0.05,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRefSm.current,
          start: "top 100%",
          toggleActions: "play none none reverse",
        },
      }
    );
  };

  // IMAGE SCROLL ANIMATIONS
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

  // Match media
  ScrollTrigger.matchMedia({
    // Desktop
    "(min-width: 1024px)": () => {
      animateLetters(categoria.current);
      animateLetters(data.current, 0.1);
      animateLetters(tecnologie.current, 0.2);
      animateLetters(categoriaP.current,0.3)
      animateLetters(dataP.current,0.4)
      animateLetters(tecnologieP.current,0.5)
    },

    // Tablet e mobile
    "(max-width: 1023px)": () => {
      animateLettersSm(categoria.current);
      animateLettersSm(data.current, 0.1);
      animateLettersSm(tecnologie.current, 0.2);
      animateLettersSm(categoriaP.current,0.3)
      animateLettersSm(dataP.current,0.4)
      animateLettersSm(tecnologieP.current,0.5)
    },
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
  <div className="hidden lg:block w-full text-center" ref={sectionRef}>
    <h5 className="text-white antonio2 text-3xl mb-1">{splitText("Categorie", categoria)}</h5>
    <p className="text-gray-400 mb-4 antonio2 text-2xl">{splitText (categorieDelLavoro.join(", "), categoriaP)}</p>

    <h5 className="text-white antonio2 text-3xl mb-1">{splitText("Data", data)}</h5>
    <p className="text-gray-400 mb-4 antonio2 text-2xl">{splitText (lavoro.data, dataP)}</p>

    <h5 className="text-white antonio2 text-3xl mb-1">{splitText("Tecnologie", tecnologie)}</h5>
    <p className="text-gray-400 antonio2 text-2xl">{splitText (tecnologieDelLavoro.join(", "), tecnologieP)}</p>
  </div>

  <div className="hidden lg:block">
    <h1 className="text-gray-600 text-[150px] lg:text-[200px] antonio2">Lavoro</h1>
  </div>
</div>

     {/* Colonna centrale */}
<div className="w-full lg:w-[70%] min-h-screen lg:h-screen overflow-y-scroll no-scrollbar">
  {/* MOBILE (<md) */}
  <div className="block md:hidden space-y-[-450px] px-4 mt-[-200px]  ">
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
<div className="md:flex lg:hidden justify-around items-start md:mt-[-90px]  hidden px-4 flex-wrap gap-4 text-center">
 
  <div>
    <h5 className="text-white antonio2 text-xl md:text-3xl">{splitText("Data", data)}</h5>
    <p className="text-gray-400 antonio2 text-lg md:text-2xl">{splitText (lavoro.data, dataP)}</p>
  </div>
   <div>
    <h5 className="text-white antonio2 text-xl md:text-3xl">{splitText("Categorie", categoria)}</h5>
    <p className="text-gray-400 antonio2 text-lg md:text-2xl">{splitText (categorieDelLavoro.join(", "), categoriaP)}</p>
  </div>
  <div>
    <h5 className="text-white antonio2 text-xl md:text-3xl">{splitText("Tecnologie", tecnologie)}</h5>
    <p className="text-gray-400 antonio2 text-lg md:text-2xl">{splitText (tecnologieDelLavoro.join(", "), tecnologieP)}</p>
  </div>
</div>



{/* Info sotto img - SOLO su mobile, in colonna e centrato */}
<div className="flex flex-col md:hidden  items-center text-center gap-6 mt-[-100px] px-6 lg:hidden">
  <div>
    <h5 className="text-white antonio2 text-2xl">{splitText("Data", data)}</h5>
    <p className="text-gray-400 antonio2 text-xl">{splitText (lavoro.data, dataP)}</p>
  </div>
  
  <div>
    <h5 className="text-white antonio2 text-2xl">{splitText("Categorie", categoria)}</h5>
    <p className="text-gray-400 antonio2 text-xl">{splitText (categorieDelLavoro.join(", "), categoriaP)}</p>
  </div>
  
  <div>
    <h5 className="text-white antonio2 text-2xl">{splitText("Tecnologie", tecnologie)}</h5>
    <p className="text-gray-400 antonio2 text-xl">{splitText (tecnologieDelLavoro.join(", "), tecnologieP)}</p>
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

      <SezioneFinale/>
    </>
  );
};

export default SingoloLavoro;
