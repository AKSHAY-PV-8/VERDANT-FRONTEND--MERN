
import { Sprout, Leaf} from 'lucide-react';

const ComingSoon1 = () => {
  const features = [
    {
      image: "https://i.pinimg.com/736x/ba/0b/8f/ba0b8fe07c766a1984d28a339dede5d7.jpg",
      
      title: "Mapping",
      description: "Enabling farmers to analyze and visualize spatial data to make informed decisions about crop management, irrigation, and land use",
    },
    {
      image: "https://i.pinimg.com/736x/95/40/7a/95407a2c8e9990bf3929cd8c565621df.jpg",
      title: "Data Interpolation",
      description: "Estimating values at unsampled locations based on known data points, creating a continuous surface or map of agricultural properties",
    },
    {
      image: "https://i.pinimg.com/736x/f9/50/a4/f950a4401c91e23f824f31d0abff747e.jpg",
      title: "Other GIS Works",
      description: "Monitoring crop health, optimizing irrigation, managing livestock, predicting crop yields, and supporting precision farming techniques",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://www.esri.com/is/image/esri/how-gis-is-used-2-1:43w?wid=1440&hei=1080")',
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

export default ComingSoon1;
