import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionProvider } from '../Context/TransitionContext';
import TransitionComponent from '../components/Transition';
import Home from '../Views/Home';
import ChiSiamo from '../Views/ChiSiamo';
import Portfolio from '../Views/Portfolio';
import Contatti from '../Views/Contatti';
import AppDeveloper from '../components/CategoriePortfolio/AppDeveloper';
import LogoDesign from '../components/CategoriePortfolio/LodoDesign';
import WebDesign from '../components/CategoriePortfolio/WebDesign';
import WebDeveloper from '../components/CategoriePortfolio/WebDeveloper';
import SezioneUiPortfolio from '../components/Portfolio/SezioneUiPortfolio';
import SingoloLavoro from '../components/CategoriePortfolio/PaginaSingoloLavoro.jsx/SingoloLavoro';

const Router = () => {
  const location = useLocation();

    return (
    <TransitionProvider>
      <TransitionComponent key={location.pathname}>
        <Routes location={location}>
          <Route index element={<Home />} />
          <Route path="/ChiSiamo" element={<ChiSiamo />} />
          <Route path="/Portfolio" element={<Portfolio />} />
          <Route path="/Contatti" element={<Contatti />} />
          <Route path="/AppDeveloper" element={<AppDeveloper />} />
          <Route path="/LodoDesign" element={<LogoDesign />} />
          <Route path="/WebDesign" element={<WebDesign />} />
          <Route path="/WebDeveloper" element={<WebDeveloper />} />
          <Route path="/SezioneUiPortfolio" element={<SezioneUiPortfolio />} />
          <Route path="/lavoro/:id" element={<SingoloLavoro />} />
        </Routes>
      </TransitionComponent>
    </TransitionProvider>
  );
};



export default Router;