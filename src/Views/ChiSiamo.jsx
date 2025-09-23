

import Sezione1ChiSiamo from "../components/ChiSiamo/Sezione1ChiSiamo";
import Sezione2ChiSiamo from "../components/ChiSiamo/Sezione2ChiSiamo";
import SezioneFinale from "../components/ChiSiamo/SezioneFinaleChiSiamo";
import SezioneProva from "../components/ChiSiamo/SezioneProva"
import  Footer from '../components/Footer'

import SeoMetaTags from "../components/SeoMetaTags";



export default function Scroll() {


  return (
  <>

      <SeoMetaTags
        title="Chi Siamo - Agenzia Web La Spezia | OXO Studio"
        description="Scopri OXO Studio, agenzia di sviluppo web e design a La Spezia. Team specializzato in creazione siti internet, SEO e soluzioni digitali."
        canonicalUrl="/ChiSiamo"
      />
 
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
