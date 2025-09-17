
import categoriePortfolio from "../components/CategoriePortfolio/FileCategorie";
import LavoroCard from "./Portfolio/LavoroCard";

const PortfolioGrid = () => {
  // Qui creo un array unico di lavori da tutte le categorie
  const allLavori = categoriePortfolio.flatMap(categoria =>
    categoria.lavori.map(lavoro => ({
      ...lavoro,
      categorie: [categoria.nome],  // aggiungo il nome della categoria come array
    }))
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {allLavori.map(lavoro => (
        <LavoroCard key={lavoro.id} lavoro={lavoro} dimensione="medio" />
      ))}
    </div>
  );
};

export default PortfolioGrid;
