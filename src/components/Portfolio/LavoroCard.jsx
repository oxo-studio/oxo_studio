import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import "../CategoriePortfolio/FileCategorie.jsx"



const LavoroCard = ({ lavoro, dimensione = "grande" }) => {

    console.log(lavoro.immagine);

  const dimensioni = {
  grande: "w-[90vh] sm:w-[60vw] md:w-[80vw] lg:w-[80vw] h-[70vh] md:h-[75vh] lg:h-[75vh]",
  medio: "w-[90vh] sm:w-[90vw] md:w-[80vw] lg:w-[45vw] h-[40vh] md:h-[60vh] lg:h-[50vh]",
};


  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className={`relative group ${dimensioni[dimensione]} rounded overflow-visible`}>
        {/* Immagine */}
     <Link to={`/lavoro/${lavoro.id}`}>

  <div className="w-full h-full flex items-center justify-center overflow-hidden rounded">
    <img
      src={lavoro.immagine}
      alt={lavoro.titolo}
      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
    />
  </div>
</Link>

 


        {/* Icona in alto a destra */}
        <FontAwesomeIcon
          icon={faArrowRight}
          className="text-gray-500 absolute top-[-50px] right-[-5px] md:top-[-50px] md:right-[-25px] lg:mt-[10px] md:text-2xl  text-3xl transition-transform duration-500 group-hover:-rotate-45"
        />
      </div>

      {/* Titolo in alto */}
      <div className="absolute top-[5px] left-[3px]  md:left-[25px] md:mt-[-8px] lg:mt-[-20px] lg:ml-[50px]">
        <h3 className="text-white text-3xl md:text-4xl font-bold antonio2">{lavoro.titolo}</h3>
      </div>

      {/* Categorie in basso a sinistra */}
      <div className="absolute bottom-1 left-[3px] md:left-[35px]">
        <p className="text-gray-500 text-1xl md:text-2xl lg:ml-[38px] antonio2">{lavoro.categorie.join(", ")}</p>
      </div>

      {/* Data in basso a destra */}
      <div className="absolute bottom-1 right-[3px] md:right-[35px]">
        <p className="text-gray-500 text-1xl md:text-2xl lg:mr-[55px] antonio2">{lavoro.data}</p>
      </div>
    </div>
    
  );
  
};


LavoroCard.propTypes = {
  lavoro: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    titolo: PropTypes.string.isRequired,
    immagine: PropTypes.string.isRequired,
    data: PropTypes.string,
    categorie: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  dimensione: PropTypes.oneOf(['grande', 'medio']),
};


export default LavoroCard;
