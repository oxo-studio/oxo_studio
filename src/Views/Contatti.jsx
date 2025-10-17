import Footer from "../components/Footer";
import emailjs from "@emailjs/browser";

import SeoMetaTags from "../components/SeoMetaTags";

const Contatti = () => {

  const sendMail = (e) => {
    e.preventDefault();

   emailjs.sendForm(
  import.meta.env.VITE_SERVICE_MAILJS,
  import.meta.env.VITE_TEMPLATE_MAILJS,
  e.target,
  "UruDroFqgckgp1flO"  // inserisci qui la chiave pubblica per test
)

      .then((result) => {
        console.log("Email inviata con successo", result.text);
        alert("Email inviata con successo");
        e.target.reset();
      })
      .catch((error) => {
        console.error("Errore nell'invio della mail", error);
        alert(`Errore nell'invio della mail: ${error.text || error.message || error}`);
      });
  };

  return (
    <>
      <SeoMetaTags
        title="Contatti - Agenzia Web La Spezia | OXO Studio"
        description="Contatta OXO Studio per sviluppo siti web, SEO e design grafico a La Spezia. Preventivi gratuiti per progetti web e digitali in Liguria."
        canonicalUrl="/Contatti"
      />

      <div className="relative z-0 md:z-[9999] w-full min-h-screen px-4 sm:px-8 md:px-12 lg:pl-[220px] lg:mt-[0px] md:mt-0 mt-[90px] py-20">
        {/* Titolo */}
        <h1
          style={{ fontFamily: 'Human' }}
          className="text-gray-700 text-[17vw]  lg:text-[200px] md:text-[130px] md:mt-10 leading-[1.1] antonio2 mb-16"
        >
          # RIMANIAMO IN CONTATTO
        </h1>

        {/* Griglia form + colonne */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-28">
          {/* Form */}
          <form 
            onSubmit={sendMail}
            className="w-full max-w-2xl"
          >
            {/* Nome */}
            <div className="mb-8">
              <label className="block text-white text-3xl sm:text-4xl mb-2 antonio2" htmlFor="name">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Il tuo nome"
                className="w-full bg-transparent border-b border-white text-white text-lg py-2 focus:outline-none placeholder-white antonio2"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-8">
              <label className="block text-white text-3xl sm:text-4xl mb-2 antonio2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="La tua email"
                className="w-full bg-transparent border-b border-white text-white text-lg py-2 focus:outline-none placeholder-white antonio2"
                required
              />
            </div>

            {/* Messaggio */}
            <div className="mb-12">
              <label className="block text-white text-3xl sm:text-4xl mb-2 antonio2" htmlFor="message">
                Messaggio
              </label>
              <textarea
                id="message"
                name="message"
                rows="3"
                placeholder="Scrivi il tuo messaggio..."
                className="w-full bg-transparent border-b border-white text-white text-lg py-2 focus:outline-none placeholder-white resize-none antonio2"
                required
              ></textarea>
            </div>

            {/* Bottone Invia */}
            <button
              type="submit"
              className="text-white text-lg border border-white px-6 py-3 hover:bg-white hover:text-black transition-all duration-300"
            >
              Invia messaggio
            </button>
          </form>

          {/* Colonne a destra */}
          <div className="flex flex-col justify-start space-y-12 lg:ml-[100px]">
            {/* Colonna 1 */}
            <div>
              <h3 className="text-gray-400 text-2xl sm:text-3xl mb-2 antonio2">Indirizzo</h3>
              <p className="text-white text-lg antonio2">La Spezia</p>
            </div>

            {/* Colonna 2 */}
            <div>
              <h3 className="text-gray-400 text-2xl sm:text-3xl mb-2 antonio2">Telefono</h3>
              <p className="text-white text-lg antonio2">+39 351 7590002</p>
            </div>

            {/* Colonna 3 */}
            <div>
              <h3 className="text-gray-400 text-2xl sm:text-3xl mb-2 antonio2">Social</h3>
              <p className="text-white text-lg antonio2">
                Instagram<br />Facebook<br />TikTok
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Contatti;
