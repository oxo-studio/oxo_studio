import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Categorie = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:items-center pt-[130px] md:pt-[100px] lg:pt-[150px] px-4 md:px-10 lg:px-[80px] w-full gap-6 z-[9999]">

      {/* Icone a sinistra */}
      <div className="flex gap-6">
        <Link to="/Portfolio" className="hover:text-white  transition">
          <FontAwesomeIcon icon={faThLarge} className="text-gray-600 text-2xl" />
        </Link>
        <Link to="/SezioneUiPortfolio" className="hover:text-white transition">
          <FontAwesomeIcon icon={faListUl} className="text-gray-600 text-2xl" />
        </Link>
      </div>

      {/* Categorie a destra */}
      <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-8 py-2">
        <Link to="/WebDesign" className="text-white hover:text-gray-600 hover:decoration-transparent transition text-[13px] md:text-2xl">
          Web Design
        </Link>
        <Link to="/WebDeveloper" className="text-white hover:text-gray-600 hover:decoration-transparent transition text-[13px]  md:text-2xl">
          Web Developer
        </Link>
        <Link to="/LodoDesign" className="text-white hover:text-gray-600 hover:decoration-transparent transition text-[13px]  md:text-2xl">
          Logo Design
        </Link>
        
      </div>
    </div>
  );
};

export default Categorie;
