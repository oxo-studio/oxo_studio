import Footer from "../components/Footer";

const Contatti = () => {
  return (
    <div className="py-20 pl-[220px] absolute z-[9999] w-full h-[100vh] ">
      {/* Titolo */}
      <h1
        style={{ fontFamily: 'Human' }}
        className="text-white text-[200px] leading-[1.1] antonio2 mb-16"
      >
        # RIMANIAMO IN CONTATTO
      </h1>

      {/* Griglia form + colonne */}
      <div className="grid grid-cols-2 gap-16 mb-28">
        {/* Form */}
        <form className="max-w-2xl">
          {/* Nome */}
          <div className="mb-8">
            <label   className="block text-white text-5xl mb-2 antonio2" htmlFor="name">
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Il tuo nome"
              className="w-full bg-transparent border-b border-white text-white text-1xl py-2 focus:outline-none placeholder-white antonio2"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-8">
            <label  className="block text-white text-5xl mb-2 antonio2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="La tua email"
              className="w-full bg-transparent border-b border-white text-white text-1xl py-2 focus:outline-none placeholder-white antonio2"
              required
            />
          </div>

          {/* Messaggio */}
          <div className="mb-12">
            <label  className="block text-white text-5xl mb-2 antonio2" htmlFor="message">
              Messaggio
            </label>
            <textarea
              id="message"
              name="message"
              rows="2"
              placeholder="Scrivi il tuo messaggio..."
              className="w-full bg-transparent border-b border-white text-white text-1xl py-2 focus:outline-none placeholder-white resize-none antonio2"
              required
            ></textarea>
          </div>

          {/* Bottone Invia */}
          <button
            type="submit"
            className="text-white text-xl border border-white px-8 py-3 hover:bg-white hover:text-black transition-all duration-300"
          >
            Invia messaggio
          </button>
        </form>

        {/* Colonne a destra */}
        <div className="flex flex-col justify-start space-y-12 ml-[310px]">
          {/* Colonna 1 */}
          <div>
            <h3  className="text-gray-400 text-3xl mb-2 antonio2">Indirizzo</h3>
            <p className="text-white text-1xl antonio2">La Spezia</p>
          </div>

          {/* Colonna 2 */}
          <div>
            <h3   className="text-gray-400 text-3xl mb-2 antonio2">Telefono</h3>
            <p className="text-white text-1xl antonio2">+39 351 7590002</p>
          </div>

          {/* Colonna 3 */}
          <div>
            <h3 className="text-gray-400 text-3xl mb-2 antonio2">Social</h3>
            <p className="text-white text-1xl antonio2">Instagram<br />Facebook<br />TikTok</p>
          </div>
        </div>
      </div>
      
       <Footer/>
    </div>
  );
};

export default Contatti;
