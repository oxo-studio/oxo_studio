
import { Routes, Route } from 'react-router-dom';

import { TransitionProvider } from '../context/TransitionContext';
import TransitionComponent from '../components/Transition';
import Boxes from '../views/Boxes';
import Scroll from '../Views/Scroll';
import Layers from '../Views/Layers';

const Router = () => {
  return (
    <TransitionProvider>
      <Routes>
        <Route
          index
          element={
            <TransitionComponent>
              <Boxes/>
            </TransitionComponent>
          }
        />
        <Route
          path="/scroll"
          element={
            <TransitionComponent>
              <Scroll />
            </TransitionComponent>
          }
        />
        <Route
          path="/layers"
          element={
            <TransitionComponent>
              <Layers />
            </TransitionComponent>
          }
        />
      </Routes>
    </TransitionProvider>
  );
};

export default Router;