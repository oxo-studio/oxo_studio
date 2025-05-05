import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionProvider } from '../Context/TransitionContext';
import TransitionComponent from '../components/Transition';
import Home from '../Views/Home';
import ChiSiamo from '../Views/ChiSiamo';
import Portfolio from '../Views/Portfolio';

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
