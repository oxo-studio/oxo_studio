import { useContext, useRef, } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TransitionContext from '../Context/TransitionContext';

gsap.registerPlugin(ScrollTrigger);

export default function Layers() {
  const main = useRef();
  const { completed } = useContext(TransitionContext);
  const scrollTween = useRef();
  const snapTriggers = useRef([]);

  const { contextSafe } = useGSAP(() => {
    if (!completed) return;

    let panels = gsap.utils.toArray('.panel');
    let scrollStarts = [0];
    let snapScroll = value => value;

    // Crea ScrollTriggers
    snapTriggers.current = panels.map((panel) =>
      ScrollTrigger.create({
        trigger: panel,
        start: "top top",
      })
    );

    // Setup snapping dopo che tutti gli ScrollTrigger sono pronti
    const updateSnap = () => {
      scrollStarts = snapTriggers.current.map(trigger => trigger.start);
      snapScroll = ScrollTrigger.snapDirectional(scrollStarts);
    };

    ScrollTrigger.addEventListener("refresh", updateSnap);
    ScrollTrigger.refresh(); // Forza calcolo posizioni iniziali

    // Observer per scroll snapping
    ScrollTrigger.observe({
      type: "wheel,touch",
      onChangeY(self) {
        if (!scrollTween.current) {
          const scroll = snapScroll(
            self.scrollY() + self.deltaY,
            self.deltaY > 0 ? 1 : -1
          );
          goToSection(scrollStarts.indexOf(scroll));
        }
      }
    });

    return () => {
      ScrollTrigger.removeEventListener("refresh", updateSnap);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, {
    dependencies: [completed],
    scope: main,
    revertOnUpdate: true,
  });

  const goToSection = contextSafe((i) => {
    scrollTween.current = gsap.to(window, {
      scrollTo: { y: snapTriggers.current[i].start, autoKill: false },
      duration: 1,
      overwrite: true,
      onComplete: () => scrollTween.current = null
    });
  });

  return (
    <main ref={main}>
      <section className="description panel light h-screen flex flex-col items-center justify-center text-center z-10">
        <h1 className="text-5xl md:text-7xl lg:text-9xl">PORTFOLIO</h1>
        <div className="mt-6 scroll-down">
          Scroll down
          <div className="arrow"></div>
        </div>
      </section>
      <div className="h-screen panel">uno</div>
     
    </main>
  );
}
