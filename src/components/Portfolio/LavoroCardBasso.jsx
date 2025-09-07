import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const LavoroCardBasso = ({ lavoro, dimensione = "medio" }) => {
  const dimensioni = {
    grande: "w-full sm:w-[60vw] md:w-[80vw] lg:w-[80vw] h-[50vh] md:h-[75vh] lg:h-[75vh]",
    medio: "w-full sm:w-[90vw] md:w-[80vw] lg:w-[45vw] h-[30vh] md:h-[60vh] lg:h-[50vh]",
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className={`relative group ${dimensioni[dimensione]} rounded overflow-visible`}>
        {/* Immagine */}
        <Link
        to={`/lavoro/${lavoro.id}`}
        >
        <img
          src={lavoro.immagine}
          alt={lavoro.titolo}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
         </Link>
        {/* Icona in alto a destra */}
        <FontAwesomeIcon
          icon={faArrowRight}
          className="text-gray-500 absolute top-[-40px] right-[-40px] md:top-[-50px] md:right-[-40px] md:text-2xl text-3xl transition-transform duration-500 group-hover:-rotate-45"
        />
      </div>

      {/* Titolo in alto */}
    <div className="absolute md:top-[-30px] top-[-20px] md:left-[35px] left-4">
  <h3 className="text-white text-2xl md:text-4xl font-bold antonio2">{lavoro.titolo}</h3>
</div>


      {/* Categorie in basso a sinistra */}
      <div className="absolute bottom-1 left-4 md:left-[35px]">
        <p className="text-gray-500 text-xs md:text-2xl antonio2">{lavoro.categorie.join(", ")}</p>
      </div>

      {/* Data in basso a destra */}
      <div className="absolute bottom-1 right-4 md:right-[35px]">
        <p className="text-gray-500 text-xs md:text-2xl antonio2">{lavoro.data}</p>
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
