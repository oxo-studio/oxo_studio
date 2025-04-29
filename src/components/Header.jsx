import { Link } from 'react-router-dom';
import '../index.css';

export default function Header() {
  return (
    <header className="header">
      <h1 className='text-5xl'>
        O<span className="text-viola">X</span>O
      </h1>
      <nav>
        <ul>
          <li>
            <Link className='permanent-marker-regular text-4xl ' to="/">Home</Link>
          </li>
          <li>
            <Link className='permanent-marker-regular text-4xl' to="/scroll">Chi Siamo</Link>
          </li>
          <li>
            <Link className='permanent-marker-regular text-4xl' to="/layers">Portfolio</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
