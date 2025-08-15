import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faThLarge } from '@fortawesome/free-solid-svg-icons';

const Categorie = () => {
  return (
    <div className="flex justify-between items-start pt-[150px] px-[80px] w-full">
      
     
   {/* Icone a sinistra (ora sono link) */}
<div className="flex  gap-6 pt-2">
  <a href="#grid" className="hover:text-white transition">
    <FontAwesomeIcon icon={faThLarge} className="text-gray-600 text-2xl" />
  </a>
  <a href="#list" className="hover:text-white transition">
    <FontAwesomeIcon icon={faListUl} className="text-gray-600 text-2xl" />
  </a>
</div>

      {/* Categorie a destra */}
      <div className="flex gap-8 py-2">
        <a href="#categoria1" className="text-gray-600 text-xl px-4 hover:text-white transition">
          Web Design
        </a>
        <a href="#categoria2" className="text-gray-600 text-xl px-4 hover:text-white transition">
          Web Developer
        </a>
        <a href="#categoria3" className="text-gray-600 text-xl px-4 hover:text-white transition">
          Logo Design
        </a>
        <a href="#categoria4" className="text-gray-600 text-xl px-4 hover:text-white transition">
          App Developer
        </a>
      </div>
    </div>
  );
};

export default Categorie;
