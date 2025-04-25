
import {LogIn,UserPlus} from 'lucide-react'
// import Login from './Login'
// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


 

  

const IntroNav = () => {

    const navigate = useNavigate();

    // const [showLogin, setShowLogin] = useState(false)

  return (
    <div>
      <nav className="bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 h-15 items-center">
            <div className="flex items-center">
              <span className="ml-2 text-xl font-bold text-blue-100">VERDANT</span>
            </div>
            <div className="flex items-center justify-end space-x-4">
            <button
                onClick={() => navigate("/")}
                className="flex items-center px-4 py-2 text-white hover:text-green-600 transition duration-200"
              >
 
                Home
              </button>
              
              <button
                onClick={() => navigate("/login")}
                className="flex items-center px-4 py-2 text-white hover:text-green-600 transition duration-200"
              >
                <LogIn className=" text-white h-5 w-5 mr-1" />
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
              >
                <UserPlus className="h-5 w-5 mr-1" />
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <Login />
            <button onClick={() => setShowLogin(false)} className="mt-2 text-red-500">
              Close
            </button>
          </div>
        </div>
      )} */}
   
    </div>
  )
}

export default IntroNav
