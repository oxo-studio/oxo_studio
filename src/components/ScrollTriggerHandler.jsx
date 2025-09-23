import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollTriggerHandler() {
  const location = useLocation();

  useEffect(() => {
    // Kill tutti i trigger e timeline GSAP esistenti
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.globalTimeline.clear();

    // Scrolla in cima
    window.scrollTo(0, 0);

    // Refresh con piccolo delay per assicurarsi che il DOM sia montato
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);

    return () => clearTimeout(timeout);
  }, [location]);

  return null;
}
