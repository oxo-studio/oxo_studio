import { Link } from 'react-router-dom';
import '../index.css';


export default function Header() {
  return (

    
    
    <header className="w-full z-50 top-0 left-0 header  lg:fixed relative px-4 py-2 flex justify-between items-center">

    <h1 className="lg:text-5xl md:text-5xl text-2xl lg:ml-2 md:ml-6">
  <span className="hidden sm:inline">O</span>
  <span className="text-viola hidden sm:inline">X</span>
  <span className="hidden sm:inline">O</span>
</h1>

      <nav>
        <ul>
          <li >
            <Link className='permanent-marker-regular lg:text-4xl md:text-4xl text-2xl -mr-2 -ml-2 lg:mr-2 md:mr-4' to="/">Home</Link>
          </li>
          <li>
          <Link className='permanent-marker-regular whitespace-nowrap lg:text-4xl md:text-4xl text-2xl -mr-2 lg:mr-2 md:mr-4'
             to="/ChiSiamo">
                Chi Siamo
          </Link>

          </li>
          <li>
            <Link className='permanent-marker-regular lg:text-4xl md:text-4xl text-2xl mr-5 lg:mr-2 md:mr-4' to="/Portfolio">Portfolio</Link>
          </li>
        </ul>
      </nav>
    </header>
    

  );
}
