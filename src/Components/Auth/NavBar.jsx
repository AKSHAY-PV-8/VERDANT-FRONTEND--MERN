import { Menu } from "lucide-react"
import { useState } from "react";


const NavBar = () => {

      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div>
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between px-4 py-4">
              <button
                id="menu-button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              <nav className="hidden md:flex items-center space-x-8">
                <a href="/home" className="text-green-600 font-medium hover:text-green-700 transition-colors">Home</a>
                <a href="/course" className="text-gray-600 hover:text-green-600 transition-colors">Course</a>
                <a href="/examList" className="text-gray-600 hover:text-green-600 transition-colors">Exams</a>
                <a href="/dashboard" className="text-gray-600 hover:text-green-600 transition-colors">Dashboard</a>
              </nav>
              {/* <div className="flex items-center space-x-6">
                <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <Bell className="h-6 w-6 text-gray-600" />
                  <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                  alt="User"
                  className="h-10 w-10 rounded-full ring-2 ring-gray-200 hover:ring-green-400 transition-all cursor-pointer"
                />
              </div> */}
            </div>
          </div>
        </header>
      
    </div>
  )
}

export default NavBar
