

import categoriePortfolio from "../CategoriePortfolio/FileCategorie";
import Categorie from "./Categorie";

const SezioneUiPortfolio = () => {
  return (
    <div className="pt-[150px] px-[80px] text-white">
        <div className="relative mt-[-100px]">
      <Categorie/>
      </div>
      <div className="flex flex-col gap-16">
        {categoriePortfolio.map((categoria, index) => (
          <div key={index} className="flex flex-col gap-4 border-b border-gray-700 pb-10">
            {/* Nome categoria */}
            <h2 className="text-2xl font-semibold">{categoria.nome}</h2>

            {/* Lista lavori */}
            <div className="flex flex-col gap-6">
              {categoria.lavori.map((lavoro) => (
                <div
                  key={lavoro.id}
                  className="flex items-center gap-6 p-4 bg-gray-800 rounded hover:bg-gray-700 transition"
                >
                  {/* Immagine */}
                  <img
                    src={lavoro.immagine}
                    alt={lavoro.titolo}
                    className="w-[150px] h-[100px] object-cover rounded"
                  />

                  {/* Dettagli */}
                  <div className="flex flex-col">
                    <h3 className="text-xl font-medium">{lavoro.titolo}</h3>
                    <p className="text-gray-400 text-sm">{lavoro.data}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SezioneUiPortfolio;
