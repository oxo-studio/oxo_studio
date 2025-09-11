

import Sezione1ChiSiamo from "../components/ChiSiamo/Sezione1ChiSiamo";
import Sezione2ChiSiamo from "../components/ChiSiamo/Sezione2ChiSiamo";
import SezioneFinale from "../components/ChiSiamo/SezioneFinaleChiSiamo";
import SezioneProva from "../components/ChiSiamo/SezioneProva"
import  Footer from '../components/Footer'



export default function Scroll() {


  return (
  <>
 
  <main>
   
    <Sezione1ChiSiamo/>
    <Sezione2ChiSiamo/>
    <SezioneProva/>
    <SezioneFinale/>
     <Footer/>
   
  </main>
  </>
  );
}
