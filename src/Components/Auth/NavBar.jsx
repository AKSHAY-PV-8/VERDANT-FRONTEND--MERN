import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setIsSidebarOpen(false); // close sidebar on navigation
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo or Brand */}
        <div
          onClick={() => handleNavigate("/home")}
          className="text-xl font-bold text-green-600 cursor-pointer"
        >
          VERDANT
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button onClick={() => handleNavigate("/home")} className="text-green-600 font-medium hover:text-green-700 transition-colors">Home</button>
          <button onClick={() => handleNavigate("/course")} className="text-gray-600 hover:text-green-600 transition-colors">Course</button>
          <button onClick={() => handleNavigate("/examList")} className="text-gray-600 hover:text-green-600 transition-colors">Exams</button>
          <button onClick={() => handleNavigate("/dashboard")} className="text-gray-600 hover:text-green-600 transition-colors">Dashboard</button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)}>
          <div
            className="fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50 p-6 flex flex-col space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-green-600">Menu</span>
              <button onClick={() => setIsSidebarOpen(false)}>
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <button onClick={() => handleNavigate("/home")} className="text-left text-gray-700 hover:text-green-600">Home</button>
            <button onClick={() => handleNavigate("/course")} className="text-left text-gray-700 hover:text-green-600">Course</button>
            <button onClick={() => handleNavigate("/examList")} className="text-left text-gray-700 hover:text-green-600">Exams</button>
            <button onClick={() => handleNavigate("/dashboard")} className="text-left text-gray-700 hover:text-green-600">Dashboard</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
