import { Link } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import categoriePortfolio from "../CategoriePortfolio/FileCategorie";
import Categorie from "./Categorie";


const SezioneUiPortfolio = () => {
  return (
    
    <div className="pt-[150px]  text-white">
      {/* Componente Categoria */}
      <div className=" mt-[-180px] md:mt-[-100px]">
        <Categorie />
      </div>

      {/* Sezione contenente le categorie e i loro lavori */}
      <div className="flex flex-col gap-16 px-[40px] lg:mt-10 mt-10">
        {categoriePortfolio.map((categoria, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 border-b border-gray-700 pb-10"
          >
            {/* Nome categoria */}
            <h2 className="text-2xl font-semibold antonio2">{categoria.nome}</h2>

            {/* Lista lavori */}
            <div className="flex flex-col gap-6">
              {categoria.lavori.map((lavoro) => (
                <Link
                  key={lavoro.id}
                  to={`/lavoro/${lavoro.id}`}
                  className="group text-inherit hover:text-white hover:no-underline no-underline"
                >
                  <div className="flex items-center justify-between gap-6 p-4 bg-transparent">
                    {/* Dettagli lavoro */}
                    <div className="flex flex-col">
                      <h3 className="text-xl font-medium antonio2">{lavoro.titolo}</h3>
                      <p className="text-gray-400 text-sm antonio2">{lavoro.data}</p>
                    </div>

                    {/* Freccia a destra */}
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="transition-transform duration-500 group-hover:-rotate-45"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>  

   
      
    
    
   
  );
};

export default SezioneUiPortfolio;
