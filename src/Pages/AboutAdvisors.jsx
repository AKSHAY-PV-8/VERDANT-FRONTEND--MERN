import { useEffect, useState } from "react";
import axios from "axios";

const Advisors = () => {
  const [advisors, setAdvisors] = useState([]);
  const ServerURL = import.meta.env.VITE_SERVER_URL;

  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1920",
      title: "Meet Our Expert Advisors",
      subtitle: "Dedicated professionals committed to your success through innovative solutions and strategic guidance"
    },
    {
      url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1920",
      title: "Meet Our Expert Advisors",
      subtitle: "Dedicated professionals committed to your success through innovative solutions and strategic guidance"
    },
    {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1920",
      title: "Meet Our Expert Advisors",
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

  useEffect(() => {
    axios.get(`${ServerURL}/api/about/getAdvisor`)
      .then((response) => setAdvisors(response.data))
      .catch((error) => console.error("Error fetching advisors:", error));
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[90vh] sm:h-screen overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
          <div className={`transition-all duration-500 transform ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">{heroImages[currentIndex].title}</h1>
            <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto">{heroImages[currentIndex].subtitle}</p>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
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
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white w-8' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Advisors Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Our Advisory Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {advisors.map((advisor) => (
              <div
                key={advisor._id}
                className="relative h-[500px] w-full overflow-hidden group rounded-2xl"
              >
                <img
                  src={`${ServerURL}${advisor.imageUrl}`}
                  alt={advisor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition duration-300"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{advisor.name}</h3>
                  <p className="text-green-300 font-medium mb-2">{advisor.role}</p>
                  <p className="text-sm text-gray-200">{advisor.description}</p>
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
