const Sezione1Portfolio = () => {
  return (
    <>
    <div className="relative mt-[400px]">
   <div className="relative  z-10 w-[90vw] h-[90vh] border border-white overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-[15px] m-0 transition-transform duration-500 hover:scale-105">
          
        </div>
      </div>

      {/* Box inferiore con logo a sinistra */}
      <div className="relative z-10 w-[90vw] h-[55vh] border border-white overflow-hidden -mt-px grid grid-cols-2">
        {/* Colonna sinistra: logo statico */}
        <div className="flex items-start justify-start pl-4 pb-96">
         
        </div>

        {/* Linea verticale centrale */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-white" />

        {/* Colonna destra: vuota */}
        <div></div>
      </div>
      </div>
    </>
  );
};

export default Sezione1Portfolio;
