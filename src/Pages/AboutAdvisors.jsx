import { useEffect, useState } from "react";
import axios from "axios";

// const heroImages = [
//   ,
//   ,
//   
const Advisors = () => {
  const [advisors, setAdvisors] = useState([]);
  const ServerURL = import.meta.env.VITE_SERVER_URL;
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1920",
      title: " Meet Our Expert Advisors",
      subtitle: "Dedicated professionals committed to your success through innovative solutions and strategic guidance"
    },
    {
      url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1920",
      title: " Meet Our Expert Advisors",
      subtitle: "Dedicated professionals committed to your success through innovative solutions and strategic guidance"
    },
    {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1920",
      title: " Meet Our Expert Advisors",
      subtitle: "Dedicated professionals committed to your success through innovative solutions and strategic guidance"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((current) => (current + 1) % heroImages.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  

  // Fetch advisors list
  useEffect(() => {
    axios.get(`${ServerURL}/api/about/getAdvisor`)
      .then((response) => setAdvisors(response.data))
      .catch((error) => console.error("Error fetching advisors:", error));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="relative min-h-screen overflow-hidden">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-500 transform ${
            isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}>
            <div className="max-w-3xl">
              
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                {heroImages[currentIndex].title}
              </h1>
              
              <p className="text-xl text-gray-200 mb-8">
                {heroImages[currentIndex].subtitle}
              </p>

             
            </div>
          </div>

          {/* Image Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsTransitioning(false);
                  }, 500);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
      
      
      {/* Advisors List */}
      <div className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Our Advisory Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {advisors.map((advisor) => (
              <div
                key={advisor._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="relative h-64">
                  <img
                    src={`${ServerURL}${advisor.imageUrl}`}
                    alt={advisor.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {advisor.name}
                  </h3>
                  <p className="text-green-600 font-medium mb-4">
                    {advisor.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {advisor.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Advisors;
