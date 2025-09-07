import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionProvider } from '../Context/TransitionContext';
import TransitionComponent from '../components/Transition';
import Home from '../Views/Home';
import ChiSiamo from '../Views/ChiSiamo';
import Portfolio from '../Views/Portfolio';
import Contatti from '../Views/Contatti';
import AppDeveloper from '../components/CategoriePortfolio/AppDeveloper';
import LogoDesign from '../components/CategoriePortfolio/LodoDesign'
import WebDesign from '../components/CategoriePortfolio/WebDesign'
import WebDeveloper from '../components/CategoriePortfolio/WebDeveloper'
import SezioneUiPortfolio from '../components/Portfolio/SezioneUiPortfolio'
import SingoloLavoro from '../components/CategoriePortfolio/PaginaSingoloLavoro.jsx/SingoloLavoro';

const Router = () => {
  const location = useLocation();

  return (
    <TransitionProvider>
      <Routes location={location}>
        <Route
          index
          element={
            <TransitionComponent>
              <Home />
            </TransitionComponent>
          }
        />
        <Route
          path="/ChiSiamo"
          element={
            <TransitionComponent>
              <ChiSiamo />
            </TransitionComponent>
          }
        />
        <Route
          path="/Portfolio"
          element={
            <TransitionComponent>
              <Portfolio />
            </TransitionComponent>
          }
        />

      <Route
      path='/Contatti'
      element={
        <TransitionComponent>
          <Contatti/>
        </TransitionComponent>
      }
        />

        <Route
         path="/src/components/CategoriePortfolio/AppDeveloper.jsx"
         element={
          <TransitionComponent>
            <AppDeveloper />
          </TransitionComponent>
         }
         />

         <Route
         path="/src/components/CategoriePortfolio/LodoDesign.jsx"
         element={
          <TransitionComponent>
            <LogoDesign />
          </TransitionComponent>
         }
         />

         <Route
         path="/src/components/CategoriePortfolio/WebDesign.jsx"
         element={
          <TransitionComponent>
            <WebDesign />
          </TransitionComponent>
         }
         />

         <Route
         path="/src/components/CategoriePortfolio/WebDeveloper.jsx"
         element={
          <TransitionComponent>
            <WebDeveloper />
          </TransitionComponent>
         }
         />

         <Route
         path="/src/components/Portfolio/SezioneUiPortfolio.jsx"
         element={
          <TransitionComponent>
            <SezioneUiPortfolio />
          </TransitionComponent>
         }
         />


         <Route
  path="/CategoriePortfolio/PaginaSingoloLavoro.jsx/SingoloLavoro.jsx"
  element={
    <TransitionComponent>
      <SingoloLavoro />
    </TransitionComponent>
  }
/>

{/* Route dinamica per singolo lavoro */}
        <Route
          path="/lavoro/:id"
          element={
            <TransitionComponent>
              <SingoloLavoro />
            </TransitionComponent>
          }
        />
      </Routes>

   

      
    </TransitionProvider>

    
  );
};

export default Router;
