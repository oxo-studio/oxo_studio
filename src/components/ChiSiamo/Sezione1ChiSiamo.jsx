

import BlurPhoto from "../shader/BlurPhoto";

const Sezione1ChiSiamo = () => {

  return (
    <section className="w-screen h-screen ">
      <div className="max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-2 items-center gap-6 ml-[50px]">
        {/* Testo a sinistra */}
        <div className="text-center lg:text-left space-y-6">
          <h1 className="text-white font-bold text-9xl lg:text-[350px] antonio2">Poli</h1>
          <h1 className="text-white font-bold text-9xl lg:text-[350px] antonio2">Matteo</h1>
        </div>

        <div className="ml-[300px]">
           <BlurPhoto 
        imageSrc="/img/Screenshot 2025-08-12 at 19.17.54.png" 
        width={612} 
        height={612} 
        
      />
        </div>
     
      </div>
    </section>
  );
};

export default Sezione1ChiSiamo;
