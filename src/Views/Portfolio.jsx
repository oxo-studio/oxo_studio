import { useContext, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import TransitionContext from '../Context/TransitionContext';
import TransitionPortfolio from '../components/transitionpage/TransitionPortFolio';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Layers() {
  const mainRef = useRef(null);
  const scrollTweenRef = useRef(null);
  const snapTriggersRef = useRef([]);
  const { completed } = useContext(TransitionContext);
  const [showTransition, setShowTransition] = useState(true);

  // Scroll to main section once transition is complete
  useEffect(() => {
    if (!showTransition && mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showTransition]);

  const handleTransitionEnd = () => {
    setShowTransition(false);
  };

  const { contextSafe } = useGSAP(() => {
    if (!completed) return;

    const panels = gsap.utils.toArray('.panel');
    let scrollPoints = [0];
    let snapScroll = value => value;

    // Create ScrollTriggers for each panel
    snapTriggersRef.current = panels.map(panel =>
      ScrollTrigger.create({
        trigger: panel,
        start: 'top top',
      })
    );

    // Setup snapping logic
    const updateSnap = () => {
      scrollPoints = snapTriggersRef.current.map(trigger => trigger.start);
      snapScroll = ScrollTrigger.snapDirectional(scrollPoints);
    };

    ScrollTrigger.addEventListener('refresh', updateSnap);
    ScrollTrigger.refresh();

    // Scroll snapping via wheel/touch
    ScrollTrigger.observe({
      type: 'wheel,touch',
      onChangeY(self) {
        if (!scrollTweenRef.current) {
          const snapTo = snapScroll(
            self.scrollY() + self.deltaY,
            self.deltaY > 0 ? 1 : -1
          );
          const targetIndex = scrollPoints.indexOf(snapTo);
          goToSection(targetIndex);
        }
      },
    });

    return () => {
      ScrollTrigger.removeEventListener('refresh', updateSnap);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, {
    dependencies: [completed],
    scope: mainRef,
    revertOnUpdate: true,
  });

  const goToSection = contextSafe((index) => {
    scrollTweenRef.current = gsap.to(window, {
      scrollTo: { y: snapTriggersRef.current[index]?.start || 0, autoKill: false },
      duration: 1,
      overwrite: true,
      onComplete: () => (scrollTweenRef.current = null),
    });
  });

  return (
    <>
      {showTransition && <TransitionPortfolio onComplete={handleTransitionEnd} />}
      <main ref={mainRef}>
        <section className="description panel light h-screen flex flex-col items-center justify-center text-center z-10">
          <h1 className="text-5xl md:text-7xl lg:text-9xl">PORTFOLIO</h1>
          <div className="mt-6 scroll-down">
            Scroll down
            <div className="arrow" />
          </div>
        </section>
        <section className="h-screen panel">uno</section>
        {/* Add more <section className="panel">...</section> here as needed */}
      </main>
    </>
  );
}
