import Categorie from "../Portfolio/Categorie";
import categoriePortfolio from "../CategoriePortfolio/FileCategorie";
import LavoroCard from "../Portfolio/LavoroCard";
import LavoroCardBasso from "../Portfolio/LavoroCardBasso";

const WebDesign = () => {
  const categoriaSelezionata = "Web Design";
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
    <div className="relative mt-0 flex flex-col items-center px-4 sm:px-6 md:px-10">
      
      {/* Titolo pagina */}
      <h1
        style={{ fontFamily: "Human" }}
        className="text-center text-[60px] sm:text-[100px] md:text-[150px] lg:text-[200px] xl:text-[300px] font-bold text-white mt-[80px] mb-[-80px] sm:mb-[-120px] lg:mb-[-150px]"
      >
        Web Design
      </h1>

      {/* Sezione categorie */}
      <Categorie categorie={[{ nome: "Web Design" }]} />

      {/* Parte superiore */}
      <div className="relative z-10 w-full max-w-[1200px] border border-white overflow-hidden mt-[30px] p-4">
        <div className="flex flex-col items-center justify-center gap-6 transition-transform duration-500">
          {lavoriParteSuperiore.map((lavoro) => (
            <LavoroCard key={lavoro.id} lavoro={lavoro} dimensione="grande" />
          ))}
        </div>
      </div>

      {/* Parte inferiore */}
      <div className="relative z-10 w-full max-w-[1200px] border border-white overflow-hidden mt-4 grid grid-cols-1 md:grid-cols-2">
        {/* Colonna sinistra */}
        <div className="flex flex-col gap-6 p-4">
          {colonnaSinistra.map((lavoro) => (
            <LavoroCardBasso key={lavoro.id} lavoro={lavoro} dimensione="medio" />
          ))}
        </div>

        {/* Linea verticale: visibile solo su md+ */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-white" />

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

export default WebDesign;
