import { useContext, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import TransitionContext from '../Context/TransitionContext';
import Footer from '../components/Footer';
import Sezione1Portfolio from '../components/Portfolio/Sezione1Portfolio';
import SezioneFinale from '../components/Portfolio/SezioneFinalePortfolio';
import Categorie from '../components/Portfolio/Categorie';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Layers() {
  const mainRef = useRef(null);
  const scrollTweenRef = useRef(null);
  const snapTriggersRef = useRef([]);
  const observerRef = useRef(null);
  const { completed } = useContext(TransitionContext);

  // Forza scroll top e refresh ScrollTrigger ad ogni montaggio o cambio completed
  useEffect(() => {
    if (!completed) return;

    // Scroll subito a top (senza delay)
    window.scrollTo(0, 0);

    // Refresh ScrollTrigger nel prossimo frame
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [completed]);

  const { contextSafe } = useGSAP(() => {
    if (!completed) return;

    // Non iniziare se scroll non è ancora top
    if (window.scrollY !== 0) {
      // Scroll a top e refresh, poi skip setup ora
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
      return;
    }

    // Pulisci trigger e observer esistenti
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

    // Debounce per scroll snapping
    let isScrolling = false;

    observerRef.current = ScrollTrigger.observe({
      type: 'wheel,touch',
      onChangeY(self) {
        if (!scrollTweenRef.current && !isScrolling) {
          isScrolling = true;
          const snapTo = snapScroll(
            self.scrollY() + self.deltaY,
            self.deltaY > 0 ? 1 : -1
          );
          const targetIndex = scrollPoints.indexOf(snapTo);
          if (targetIndex !== -1) {
            goToSection(targetIndex);
          }
          setTimeout(() => {
            isScrolling = false;
          }, 1100);
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
      immediateRender: false,
      onComplete: () => (scrollTweenRef.current = null),
    });
  });

  return (
    <main ref={mainRef}>
      <Categorie/>
      <section className="description panel h-screen flex flex-col items-center justify-center text-center z-10">
        <Sezione1Portfolio/>
      </section>
      <section className="h-screen panel">
        <SezioneFinale/>
      </section>
       
      <Footer/>
    </main>
  );
}
