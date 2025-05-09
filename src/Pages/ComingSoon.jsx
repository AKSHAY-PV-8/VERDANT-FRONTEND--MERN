
import { Sprout, Leaf, Sun, Cloud, Droplets } from 'lucide-react';

const ComingSoon = () => {
  const features = [
    {
      image: "https://images.unsplash.com/photo-1586094339013-3df6e525f34c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      icon: <Sun className="w-8 h-8 text-yellow-400" />,
      title: "Smart Farming",
      description: "AI-powered solutions for optimal crop management",
    },
    {
      image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      icon: <Cloud className="w-8 h-8 text-blue-400" />,
      title: "Weather Integration",
      description: "Real-time weather monitoring and predictions",
    },
    {
      image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      icon: <Droplets className="w-8 h-8 text-green-400" />,
      title: "Resource Optimization",
      description: "Efficient water and resource management systems",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Sprout className="w-12 h-12 text-green-400 animate-bounce" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
            VERDANT ELEVATORS
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Elevating Agriculture to New Heights
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-semibold bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 bg-clip-text text-transparent animate-pulse">
              Coming Soon
            </span>
            <Leaf className="w-6 h-6 text-green-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-gray-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Future of Agriculture
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-xl aspect-[4/3] transform transition-transform duration-300 hover:-translate-y-2"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url(${feature.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      {feature.icon}
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
