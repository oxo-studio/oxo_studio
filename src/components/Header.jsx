import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Power2 } from 'gsap';
import CSSRulePlugin from 'gsap/CSSRulePlugin';
import '../index.css';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // Funzione per gestire la navigazione con React Router
  const handleNavigation = (path) => {
    // Chiudi il menu prima della navigazione
    closeMenu();
    
    // Naviga usando React Router (senza ricaricamento della pagina)
    if (location.pathname === path) {
      // Se siamo già sulla stessa pagina, scrolla in alto
      window.scrollTo(0, 0);
    } else {
      navigate(path);
    }
  };

  // Funzione per chiudere il menu
  const closeMenu = () => {
    const hamburger = document.getElementById("hamburger");
    const menu = document.querySelector(".menu");
    const overlay = document.querySelector(".overlay");
    
    if (hamburger && hamburger.classList.contains("active")) {
      hamburger.classList.remove("active");
      menu.classList.remove("open");
      overlay.classList.remove("active");
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
      
      // Aggiungi qui la logica per invertire l'animazione GSAP
      if (window.tl && !window.tl.reversed()) {
        window.tl.reverse();
      }
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    const path = document.querySelector("path");
    const spanBefore = CSSRulePlugin.getRule("#hamburger span::before");

    gsap.set(spanBefore, { background: "#fffbfb" });

    const hamburger = document.getElementById("hamburger");
    const toggleBtn = document.getElementById("toggle-btn");
    const menu = document.querySelector(".menu");
    const overlay = document.querySelector(".overlay");
    const menuLinks = document.querySelectorAll(".menu span"); // Cambiato da "a" a "span"
    const chars = document.querySelectorAll("#oxo-studio .split-char");

    // Salva la timeline in una variabile globale per poterla usare in closeMenu
    window.tl = tl;

    tl.eventCallback("onReverseComplete", () => {
      if (window.innerWidth < 768) {
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power3.out"
        });
      }
    });

    if (toggleBtn) {
      toggleBtn.onclick = function () {
        hamburger.classList.toggle("active");
        const isOpen = hamburger.classList.contains("active");

        menu.classList.toggle("open", isOpen);
        overlay.classList.toggle("active", isOpen);

        document.body.style.overflow = isOpen ? 'hidden' : '';
        document.body.classList.toggle('menu-open', isOpen);

        hamburger.style.zIndex = isOpen ? 1100 : 1001;

        if (tl.reversed()) {
          tl.play();
          if (window.innerWidth < 768) {
            gsap.to(chars, { opacity: 0, y: 50, duration: 0.3, ease: "power1.in" });
          }
        } else {
          tl.reverse();
        }
      };
    }

    // Modifica qui per usare handleNavigation
    menuLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        const path = e.target.getAttribute('data-path');
        if (path) {
          handleNavigation(path);
        }
      });
    });

    const start = "M0 -100 S175 -330 500 -330 s500 230 500 230 V0 H0 Z";
    const end = "M0 1300 S175 1070 500 1070 s500 230 500 230 V0 H0 Z";

    tl.to("#hamburger", 1.25, { marginTop: "5px", x: -110, y: 40, ease: "power4.inOut" });
    tl.to("#hamburger span", 1, { background: "#fffbfb", ease: "power2.inOut" }, "<");
    tl.to(spanBefore, 1, { background: "#fffbfb", ease: "power2.inOut" }, "<");
    tl.to(".btn .btn-outline", 1, {
      x: -110,
      y: 40,
      width: "140px",
      height: "140px",
      border: "1px solid",
      ease: "power4.inOut"
    }, "<");
    tl.to(path, 0.8, { attr: { d: start }, ease: Power2.easeIn }, "<");
    tl.to(path, 0.8, { attr: { d: end }, ease: Power2.easeIn }, "-=0.5");

    tl.reverse();

    // Cleanup
    return () => {
      if (window.tl) {
        window.tl.kill();
        delete window.tl;
      }
    };
  }, [location, navigate]);

  return (
    <>
      <header className="w-full z-50 top-0 left-0 header lg:fixed relative px-4 py-2 flex justify-between items-center bg-black">
        <h1 className="lg:text-4xl md:text-4xl text-5xl mt-20 md:mt-2 lg:ml-6 md:ml-6 md:block">
          {/* Usa Link per il logo */}
          <Link to="/" className="antonio lg:inline text-white no-underline" id="oxo-studio">
            {"OXO-STUDIO".split("").map((char, i) => (
              <span key={i} className="split-char inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </Link>
        </h1>

        <nav className="ml-auto">
          <ul className="gap-2 md:gap-8 lg:gap-8 md:mr-6 hidden md:flex">
            <li>
              <Link 
                to="/" 
                className="antonio roll-link cursor-pointer no-underline" 
                data-text="HOME"
              >
                <span>HOME</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/ChiSiamo" 
                className="antonio roll-link cursor-pointer no-underline" 
                data-text="CHI SIAMO"
              >
                <span>CHI SIAMO</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/Portfolio" 
                className="antonio roll-link cursor-pointer no-underline" 
                data-text="PORTFOLIO"
              >
                <span>PORTFOLIO</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/Contatti" 
                className="antonio roll-link cursor-pointer no-underline" 
                data-text="CONTATTI"
              >
                <span>CONTATTI</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="btn fixed top-4 right-4 z-[1100]" id="toggle-btn">
        <div className="btn-outline btn-outline-1"></div>
        <div className="btn-outline btn-outline-2"></div>
        <div id="hamburger">
          <span></span>
        </div>
      </div>

      <div className="overlay">
        <svg viewBox="0 0 1000 1000">
          <path d="M0 -100 S175 -330 500 -330 s500 230 500 230 V0 H0 Z"></path>
        </svg>
      </div>

      <div className="menu">
        <div className="menu-items flex flex-col justify-center items-center gap-8 h-screen text-white text-3xl antonio">
          {/* Aggiungi data-path per identificare il percorso */}
          <span 
            data-path="/" 
            className="cursor-pointer"
          >
            HOME
          </span>
          <span 
            data-path="/ChiSiamo" 
            className="cursor-pointer"
          >
            CHI SIAMO
          </span>
          <span 
            data-path="/Portfolio" 
            className="cursor-pointer"
          >
            PORTFOLIO
          </span>
          <span 
            data-path="/Contatti" 
            className="cursor-pointer"
          >
            CONTATTI
          </span>
        </div>
      </div>
    </>
  );
}