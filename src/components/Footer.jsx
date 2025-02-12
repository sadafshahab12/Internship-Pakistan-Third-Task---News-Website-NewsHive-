import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom"; // Ensure React Router is used

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
        
        {/* Website Info & Copyright */}
        <div>
          <h2 className="text-2xl font-bold text-red-500 mb-4">NewsHive</h2>
          <p className="text-gray-400 mb-3">
            Your go-to source for the latest news, updates, and insights.
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} NewsHive. All rights reserved.
          </p>
        </div>

        {/* Quick Navigation Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <nav className="flex flex-col gap-2">
            <Link to="/" className="text-gray-400 hover:text-white">
              Home
            </Link>
            <Link to="/politics" className="text-gray-400 hover:text-white">
              Politics
            </Link>
            <Link to="/sports" className="text-gray-400 hover:text-white">
              Sports
            </Link>
            <Link to="/tech" className="text-gray-400 hover:text-white">
              Tech
            </Link>
            <Link to="/business" className="text-gray-400 hover:text-white">
              Business
            </Link>
            <Link to="/signup" className="text-red-500 font-bold hover:text-white">
              Sign Up
            </Link>
          </nav>
        </div>

        {/* Trending Categories */}
        <div>
          <h2 className="text-xl font-bold mb-4">Trending Topics</h2>
          <ul className="flex flex-col gap-2">
            <li className="text-gray-400 hover:text-white">
              <Link to="/world-news">World News</Link>
            </li>
            <li className="text-gray-400 hover:text-white">
              <Link to="/health">Health</Link>
            </li>
            <li className="text-gray-400 hover:text-white">
              <Link to="/entertainment">Entertainment</Link>
            </li>
            <li className="text-gray-400 hover:text-white">
              <Link to="/science">Science</Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div>
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-400">Email: support@newshive.com</p>
          <p className="text-gray-400">Location: New York, USA</p>
          <h2 className="text-xl font-bold mt-4 mb-4">Follow Us</h2>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

  
    </footer>
  );
};

export default Footer;
