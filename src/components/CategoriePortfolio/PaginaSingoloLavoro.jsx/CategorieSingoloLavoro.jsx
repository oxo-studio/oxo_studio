import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Categorie = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-[180px] md:pt-[100px] lg:pt-[150px] px-4 md:px-10 lg:px-[80px] lg:mb-20 w-full gap-6">

      {/* Icone a sinistra */}
      <div className="flex gap-6">
        <Link to="/Portfolio" className="hover:text-white  transition">
          <FontAwesomeIcon icon={faThLarge} className="text-gray-600 text-2xl" />
        </Link>
        <Link to="/src/components/Portfolio/SezioneUiPortfolio.jsx" className="hover:text-white transition">
          <FontAwesomeIcon icon={faListUl} className="text-gray-600 text-2xl" />
        </Link>
      </div>

      {/* Categorie a destra */}
      <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-8 py-2">
        <Link to="/src/components/CategoriePortfolio/WebDesign.jsx" className="text-white hover:text-gray-600 hover:decoration-transparent transition">
          Web Design
        </Link>
        <Link to="/src/components/CategoriePortfolio/WebDeveloper.jsx" className="text-white hover:text-gray-600 hover:decoration-transparent transition">
          Web Developer
        </Link>
        <Link to="/src/components/CategoriePortfolio/LodoDesign.jsx" className="text-white hover:text-gray-600 hover:decoration-transparent transition">
          Logo Design
        </Link>
        <Link to="/src/components/CategoriePortfolio/AppDeveloper.jsx" className="text-white hover:text-gray-600 hover:decoration-transparent transition">
          App Developer
        </Link>
      </div>
    </div>
  );
};

export default Categorie;
