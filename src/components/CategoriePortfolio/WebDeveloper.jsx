import Categorie from "../Portfolio/Categorie";
import categoriePortfolio from "../CategoriePortfolio/FileCategorie";
import LavoroCard from "../Portfolio/LavoroCard";
import LavoroCardBasso from "../Portfolio/LavoroCardBasso";

const WebDeveloper = () => {
  // Filtra solo le categorie legate al Web Developer
  const categoriaSelezionata = "Web Developer";

  const lavoriUnici = [];

  categoriePortfolio.forEach((categoria) => {
    if (categoria.nome === categoriaSelezionata) {
      categoria.lavori.forEach((lavoro) => {
        const esiste = lavoriUnici.find((item) => item.id === lavoro.id);
        if (esiste) {
          esiste.categorie.push(categoria.nome);
        } else {
          lavoriUnici.push({
            ...lavoro,
            categorie: [categoria.nome],
          });
        }
      });
    }
  });

  const meta = Math.ceil(lavoriUnici.length / 2);
  const lavoriParteSuperiore = lavoriUnici.slice(0, meta);
  const lavoriParteInferiore = lavoriUnici.slice(meta);
  const colonnaSinistra = lavoriParteInferiore.slice(0, Math.ceil(lavoriParteInferiore.length / 2));
  const colonnaDestra = lavoriParteInferiore.slice(Math.ceil(lavoriParteInferiore.length / 2));

  return (
    <div className="relative mt-[0px] flex flex-col items-center">
       
    

   
      {/* Sezione categorie */}
      <Categorie categorie={[{ nome: "Web Developer" }]} />
       
      {/* Parte superiore */}
          <div className="relative z-10 w-[90vw] h-[40vh] md:w-[90vw] md:h-[60vh] lg:w-[90vw] lg:h-[90vh]  border border-white overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-[15px] m-0 transition-transform duration-500">
                {lavoriParteSuperiore.map((lavoro) => (
                  <LavoroCard key={lavoro.id} lavoro={lavoro} dimensione="grande" />
                ))}
              </div>
            </div>

      {/* Parte inferiore */}
      <div className="relative z-10 w-[90vw] h-[55vh] hidden md:block border border-white overflow-hidden -mt-px grid-cols-2">
        {/* Colonna sinistra */}
        <div className="flex flex-col gap-6 p-4">
          {colonnaSinistra.map((lavoro) => (
            <LavoroCardBasso key={lavoro.id} lavoro={lavoro} dimensione="medio" />
          ))}
        </div>

        {/* Linea verticale */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-white" />

        {/* Colonna destra */}
        <div className="flex flex-col gap-6 p-4">
          {colonnaDestra.map((lavoro) => (
            <LavoroCardBasso key={lavoro.id} lavoro={lavoro} dimensione="medio" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebDeveloper;
