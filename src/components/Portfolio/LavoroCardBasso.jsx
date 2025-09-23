import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const LavoroCardBasso = ({ lavoro, dimensione = "medio" }) => {
  const dimensioni = {
    grande: "w-full sm:w-[60vw] md:w-[60vw] lg:w-[80vw] h-[50vh] md:h-[65vh] lg:h-[75vh]",
    medio: "w-full sm:w-[90vw] md:w-[55vw] lg:w-[45vw] h-[30vh] md:h-[60vh] lg:h-[50vh]",
  };
  
  const imgAnimationRef = useRef(null)

useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    imgAnimationRef.current, 
    { opacity: 0, y: 350 },
    {
      opacity: 1,
      duration: 1,
      y: 0,
      ease: "slow(1.5,1.5,false)",
      scrollTrigger: {
        trigger: imgAnimationRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    }
  );
    return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);


  return (
    <div className="hidden md:block relative md:w-[40vh] md:h-[60vh] md:overflow-hidden lg:w-[80vh] lg:h-[60vh] overflow-hidden  items-center justify-center " ref={imgAnimationRef}>
      <div className={`relative group ${dimensioni[dimensione]} rounded `} >
        {/* Immagine */}
        <Link to={`/lavoro/${lavoro.id}`}>
          <img
            src={lavoro.immagine}
            alt={lavoro.titolo}
            className=" relative object-contain w-full h-full  lg:w-full lg:h-full lg:top-[20px] lg:right-[0px] md:right-[50px] md:top-[-40px] transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Icona in alto a destra */}
        <FontAwesomeIcon
          icon={faArrowRight}
          className="text-gray-500 absolute top-[-40px] right-[-40px] md:top-[35px] md:right-[140px] md:text-2xl lg:right-[70px] lg:top-[15px] text-3xl transition-transform duration-500 group-hover:-rotate-45"
        />
      </div>

      {/* Titolo in alto */}
      <div className="absolute md:top-[10px] top-[-20px] md:left-[35px]  lg:top-[-5px] left-4">
        <h3 className="text-white text-2xl md:text-4xl font-bold antonio2">{lavoro.titolo}</h3>
      </div>

      {/* Categorie in basso a sinistra */}
      <div className="absolute bottom-1 left-4 md:left-[35px]">
        <p className="text-gray-500 text-xs md:text-2xl antonio2">{lavoro.categorie.join(", ")}</p>
      </div>

      {/* Data in basso a destra */}
      <div className="absolute bottom-1 right-4 md:right-[125px] lg:right-[10px]">
        <p className="text-gray-500 text-xs md:text-2xl  antonio2">{lavoro.data}</p>
      </div>
    </div>
  );
};

LavoroCardBasso.propTypes = {
  lavoro: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    titolo: PropTypes.string.isRequired,
    immagine: PropTypes.string.isRequired,
    data: PropTypes.string,
    categorie: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  dimensione: PropTypes.oneOf(['grande', 'medio']),
};

export default LavoroCardBasso;
