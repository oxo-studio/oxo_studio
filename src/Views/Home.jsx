
import Sezione1 from "../components/Home/Sezione1";
import SectionHome2 from "../components/Home/SectioHome2";
import SezioneHome3 from "../components/Home/SezioneHome3";
import MauseBable from "../components/shader/MouseBabble"; // <- shader corretto
import SectionHome4  from "../components/Home/SectionHome4";

import SezioneFinaleHome from "../components/Home/SezioneFinaleHome"
import Footer from '../components/Footer'
import Sudime from "../components/Home/Sudime";


export default function Boxes() {

  return (
    
     <>
  {/* SHADER BACKGROUND */}
  <MauseBable />

  {/* CONTENUTO */}
  <main>
    <div className="relative w-full overflow-hidden">
      <Sezione1 />
      <SectionHome2 />
    </div>
    <SectionHome4/>
    <SezioneHome3 />

    <Sudime/>
    
    
    
    <SezioneFinaleHome/>
    <Footer/>
  </main>
</>

  );
}
