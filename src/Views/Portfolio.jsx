import { useContext, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import TransitionContext from '../Context/TransitionContext';
import Footer from '../components/Footer';
import Sezione1Portfolio from '../components/Portfolio/Sezione1Portfolio';
import Categorie from '../components/Portfolio/Categorie';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Layers() {
  const mainRef = useRef(null);
  const scrollTweenRef = useRef(null);
  const snapTriggersRef = useRef([]);
  const observerRef = useRef(null);
  const { completed } = useContext(TransitionContext);

  // Forza scroll top e refresh ScrollTrigger ad ogni montaggio del componente o cambio completed
  useEffect(() => {
    if (!completed) return;

    // Piccolo delay per essere sicuri che il DOM sia montato e pronto
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    }, 50);

    return () => clearTimeout(timeout);
  }, [completed]);

  const { contextSafe } = useGSAP(() => {
    if (!completed) return;

    // Prima di tutto kill di tutti i trigger e cleanup observer esistente
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    if (observerRef.current) {
      observerRef.current.kill();
      observerRef.current = null;
    }

    const panels = gsap.utils.toArray('.panel');
    let scrollPoints = [0];
    let snapScroll = value => value;

    snapTriggersRef.current = panels.map(panel =>
      ScrollTrigger.create({
        trigger: panel,
        start: 'top top',
      })
    );

    const updateSnap = () => {
      scrollPoints = snapTriggersRef.current.map(trigger => trigger.start);
      snapScroll = ScrollTrigger.snapDirectional(scrollPoints);
    };

    ScrollTrigger.addEventListener('refresh', updateSnap);
    ScrollTrigger.refresh();

    // Scroll snapping via wheel/touch
    observerRef.current = ScrollTrigger.observe({
      type: 'wheel,touch',
      onChangeY(self) {
        if (!scrollTweenRef.current) {
          const snapTo = snapScroll(
            self.scrollY() + self.deltaY,
            self.deltaY > 0 ? 1 : -1
          );
          const targetIndex = scrollPoints.indexOf(snapTo);
          if (targetIndex !== -1) {
            goToSection(targetIndex);
          }
        }
      },
    });

    return () => {
      ScrollTrigger.removeEventListener('refresh', updateSnap);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (observerRef.current) {
        observerRef.current.kill();
        observerRef.current = null;
      }
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
    <main ref={mainRef}>
      <Categorie/>
      <section className="description panel h-screen flex flex-col items-center justify-center text-center z-10">
        <Sezione1Portfolio/>
      </section>
      <section className="h-screen panel">uno</section>
      {/* Add more <section className="panel">...</section> here as needed */}
      <Footer/>
    </main>
  );
}
