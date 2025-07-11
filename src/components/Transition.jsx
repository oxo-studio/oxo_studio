import { useContext, useRef } from 'react';
import { SwitchTransition, Transition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import PropTypes from "prop-types";
import gsap from 'gsap';

import TransitionContext from '../Context/TransitionContext';

const TransitionComponent = ({ children }) => {
  const location = useLocation();
  const { toggleCompleted } = useContext(TransitionContext);

  // Crea un ref per il nodo DOM animato
  const nodeRef = useRef(null);

  return (
    <SwitchTransition>
      <Transition
        key={location.pathname}
        nodeRef={nodeRef}         // PASSA IL REF QUI
        timeout={500}
        onEnter={() => {
          toggleCompleted(false);
          const node = nodeRef.current;   // usa nodeRef.current
          gsap.set(node, { autoAlpha: 0, scale: 0.8, xPercent: -100 });
          gsap
            .timeline({
              paused: true,
              onComplete: () => toggleCompleted(true),
            })
            .to(node, { autoAlpha: 1, xPercent: 0, duration: 0.25 })
            .to(node, { scale: 1, duration: 0.25 })
            .play();
        }}
        onExit={() => {
          const node = nodeRef.current;
          gsap
            .timeline({ paused: true })
            .to(node, { scale: 0.8, duration: 0.2 })
            .to(node, { xPercent: 100, autoAlpha: 0, duration: 0.2 })
            .play();
        }}
      >
        {/* assegna il ref all'elemento che verrà animato */}
        <div ref={nodeRef}>
          {children}
        </div>
      </Transition>
    </SwitchTransition>
  );
};
Transition.propTypes = {
  onComplete: PropTypes.func.isRequired,

}

export default TransitionComponent;
