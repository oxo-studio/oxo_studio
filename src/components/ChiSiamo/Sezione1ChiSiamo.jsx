import BlurPhoto from "../shader/BlurPhoto";
import MouseLight from "../shader/MauseLight";

const Sezione1ChiSiamo = () => {
  return (
    <section className="w-screen h-screen">
       <MouseLight />
      <div className="max-w-7xl mx-auto h-full grid grid-cols-1 md:grid-cols-2 items-center gap-6 px-4 md:px-12 lg:px-0 lg:ml-[50px]">
        {/* Testo a sinistra */}
        <div className="relative text-center md:text-left space-y-4 top-[650px] md:top-0 lg:top-0 z-50">
          <h1 className="text-white font-bold text-[15vw] md:text-[180px] lg:text-[350px] antonio2 leading-none">Poli</h1>
          <h1 className="text-white font-bold text-[15vw] md:text-[180px] lg:text-[350px] antonio2 leading-none">Matteo</h1>
        </div>

        {/* Immagine a destra */}
        <div className="flex justify-center md:justify-start md:items-start md:mt-[-250px]
                        w-full md:w-[150px] md:h-[150px] lg:ml-[300px] 
                        lg:w-[950px] lg:h-[950px] lg:top-[200px] relative">
          <BlurPhoto 
            imageSrc="/img/Screenshot 2025-08-12 at 19.17.54.png"
          />
        </div>
      </div>
    </section>
  );
};

export default Sezione1ChiSiamo;
