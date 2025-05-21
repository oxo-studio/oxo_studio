import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../index.css';

export default function Header() {
  const xRef = useRef(null);

  useEffect(() => {
    gsap.to(xRef.current, { rotation: 180, duration: 1 });
  }, []);

  return (
    <header className="w-full z-50 top-0 left-0 header lg:fixed relative px-4 py-2 flex justify-between items-center">
<h1 className="lg:text-4xl md:text-4xl text-2xl lg:ml-6 md:ml-6 md:block hidden">
  {/* Visibile solo su lg: OXO-STUDIO */}
  <span className="glitch md:hidden hidden lg:inline orbitron" data-text="OXO-STUDIO">
    OXO-STUDIO
  </span>

  {/* Visibile solo su md (non lg, non sm): OXO */}
  <span className="glitch hidden md:inline lg:hidden orbitron" data-text="OXO">
    OXO
  </span>
</h1>


      <nav className="ml-auto">
        <ul className="flex gap-2 md:mr-6">
          <li>
            <Link to="/" className="glitch orbitron text-32xl lg:text-4xl md:text-3xl" data-glitch="Home">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/ChiSiamo" className="glitch orbitron text-1xl lg:text-4xl md:text-3xl" data-glitch="Chi Siamo">
              CHI SIAMO
            </Link>
          </li>
          <li>
            <Link to="/Portfolio" className="glitch orbitron text-1xl lg:text-4xl md:text-3xl" data-glitch="Portfolio">
              PORTFOLIO
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
