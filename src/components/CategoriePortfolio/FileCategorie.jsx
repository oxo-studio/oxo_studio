// src/data/categoriePortfolio.js

const categoriePortfolio = [
     /*Categoria Web Design*/
  {
    id: 1,
    nome: "Web Design",
    slug: "web-design",
    lavori: [
      {
        id: "wd-01",
        titolo: "Crazy and Tina Tattoo",
        immagine: "/public/img/crazy2.png",
        immagini: [
          "/public/img/crazy2.png",
          "/public/img/sezione1crazy.png",
          "/public/img/sezionefinalecrazy.png"
        
        ],
        descrizione: "Un progetto moderno con focus sull'usabilità.",
        data: "Maggio 2024",
        tecnologie:"Figma"
      },
     
    ],
  },

  /*Categoria Web Developer*/

   {
    id: 1,
    nome: "Web Developer",
    slug: "web-developer",
    lavori: [
     {
        id: "wd-01",
        titolo: "Crazy and Tina Tattoo",
        immagine: "/public/img/crazy2.png",
        immagini: [
          "/public/img/crazy2.png",
          "/public/img/sezione1crazy.png",
          "/public/img/sezionefinalecrazy.png"
        
        ],
        descrizione: "Un progetto moderno con focus sull'usabilità.",
        data: "Maggio 2024",
        tecnologie:"React Gsap"
      },
    ],
  },

  /*Categoria Logo Design*/
  
  {
    id: 1,
    nome: "Logo Design",
    slug: "logo-design",
    lavori: [
      {
        id: "we-01",
        titolo: "Oxo Studio",
        immagine: "/public/SvgCode/logooxo.svg",
        descrizione: "Un progetto moderno con focus sull'usabilità.",
        data: "Giugno 2025",
        tecnologie:"Inlustratore"
      },
     
    ],
  },

  /*Categoria App Developer*/

  {
    id: 1,
    nome: "App Developer",
    slug: "app-developer",
    lavori: [
    
    ],
  },

];

export default categoriePortfolio;
