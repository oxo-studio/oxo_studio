import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionProvider } from '../Context/TransitionContext';
import TransitionComponent from '../components/Transition';
import Home from '../views/Home';
import ChiSiamo from '../views/ChiSiamo';
import Portfolio from '../views/Portfolio';

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
      </Routes>
    </TransitionProvider>
  );
};

export default Router;
