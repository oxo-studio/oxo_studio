import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import './gsap-brand.css';
import './style.css';

// Funzione per forzare il reload al primo caricamento
const forceReloadOnFirstVisit = () => {
  if (!sessionStorage.getItem('hasReloaded')) {
    sessionStorage.setItem('hasReloaded', 'true');
    window.location.reload();
  }
};

// Esegui la funzione quando la pagina è completamente caricata
if (document.readyState === 'complete') {
  forceReloadOnFirstVisit();
} else {
  window.addEventListener('load', forceReloadOnFirstVisit);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  //</React.StrictMode>
);