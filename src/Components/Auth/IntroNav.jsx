import { LogIn, UserPlus, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const IntroNav = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-blue-100 text-xl font-bold">VERDANT</div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="text-white hover:text-green-600 transition px-3 py-2"
            >
              Main Home Page
            </button>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center text-white hover:text-green-600 transition px-3 py-2"
            >
              <LogIn className="h-5 w-5 mr-1" />
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md transition"
            >
              <UserPlus className="h-5 w-5 mr-1" />
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4">
            <button
              onClick={() => {
                navigate('/');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-white hover:text-green-600 transition px-4 py-2"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate('/login');
                setMobileMenuOpen(false);
              }}
              className="flex items-center w-full text-left text-white hover:text-green-600 transition px-4 py-2"
            >
              <LogIn className="h-5 w-5 mr-1" />
              Login
            </button>
            <button
              onClick={() => {
                navigate('/signup');
                setMobileMenuOpen(false);
              }}
              className="flex items-center w-full text-left bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
            >
              <UserPlus className="h-5 w-5 mr-1" />
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default IntroNav;
