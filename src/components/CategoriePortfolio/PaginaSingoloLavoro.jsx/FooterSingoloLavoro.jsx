import { FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" text-white py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        
        {/* Left Side: Text Info */}
        <div className="text-left">
          <p className="antonio2">Oxo Studi tutti i diritti riservati</p>
          <p className="antonio2">P.Iva 00000000000</p>
          <p className="antonio2">Privacy & Cooky Policy</p>
        </div>

        {/* Right Side: Social Icons */}
        <div className="flex space-x-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="text-[32px] hover:text-blue-600" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-[32px] hover:text-pink-500" />
          </a>
          <a href="https://github.com/tuo-username" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-[32px] hover:text-gray-400" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
