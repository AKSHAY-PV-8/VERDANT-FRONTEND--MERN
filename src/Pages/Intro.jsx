import { ChevronRight } from 'lucide-react';
import IntroNav from '../Components/Auth/IntroNav';
import Feature from '../Components/Utils/Fearures';
import { useNavigate } from 'react-router-dom';


const Intro = () => {
  const navigate = useNavigate()
  return (
    <div className='overflow-hidden'>
      <IntroNav />
      <section className="relative h-[600px]">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt="Agriculture field"
          />
          <div className="absolute inset-0 bg-gray-900/20"></div>
        </div>
        <div className="relative h-full grid place-items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Cultivate Your Knowledge in Agriculture
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Join our community of farmers, students, and experts to learn modern agricultural practices and sustainable farming techniques.
            </p>
            <button onClick={() =>navigate("/login")} className="bg-green-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-green-700 transition duration-200 flex items-center mx-auto">
              Go to Courses
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Feature section */}
      <Feature />

      {/* Footer section */}
      <footer className="bg-gray-700 text-gray-100 text-center py-4 text-sm">
        © {new Date().getFullYear()} Verdant. All rights reserved.
      </footer>
    </div>
  );
};

export default Intro;
