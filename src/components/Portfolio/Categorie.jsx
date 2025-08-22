import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // importa Link

const Categorie = () => {
  return (
    <div className="flex justify-between items-start pt-[150px] px-[80px] w-full">

      {/* Icone a sinistra (ora sono link interni) */}
      <div className="flex gap-6 pt-2">
        <Link to="/Portfolio" className="hover:text-white transition">
          <FontAwesomeIcon icon={faThLarge} className="text-gray-600 text-2xl" />
        </Link>
        <Link to="/src/components/Portfolio/SezioneUiPortfolio.jsx" className="hover:text-white transition">
          <FontAwesomeIcon icon={faListUl} className="text-gray-600 text-2xl" />
        </Link>
      </div>

      {/* Categorie a destra */}
      <div className="flex gap-8 py-2">
        <Link to="/src/components/CategoriePortfolio/WebDesign.jsx" className="text-gray-600 hover:no-underline px-1 hover:text-white transition">
          Web Design
        </Link>
        <Link to="/src/components/CategoriePortfolio/WebDeveloper.jsx" className="text-gray-600 hover:no-underline px-1 hover:text-white transition">
          Web Developer
        </Link>
        <Link to="/src/components/CategoriePortfolio/LodoDesign.jsx" className="text-gray-600 hover:no-underline px-1 hover:text-white transition">
          Logo Design
        </Link>
        <Link to="/src/components/CategoriePortfolio/AppDeveloper.jsx" className="text-gray-600 hover:no-underline px-1 hover:text-white transition">
          App Developer
        </Link>
      </div>
    </div>
  );
};

export default Categorie;
