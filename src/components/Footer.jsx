

import { FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="flex justify-around items-start py-6 ml-[-500px] ">
      <div>
        <p className="antonio2">Oxo Studi tutti i diritti riservati</p>
        <p className="antonio2">P.Iva 00000000000</p>
        <p className="antonio2">Privacy & Cooky Policy</p>
      </div>

      <div className="flex  pt-[37px] mr-[-500px] space-x-4 justify-end">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="text-[40px] text-white hover:text-blue-600" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-[40px] text-white hover:text-blue-600" />
        </a>
        <a href="https://github.com/tuo-username" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-[40px] text-white hover:text-blue-600" />
        </a>

      </div>
    </div>
  );
};

export default Footer;
