
import { Sprout, Leaf, Sun, Cloud, Droplets } from 'lucide-react';

const ComingSoon2 = () => {
  const features = [
    {
      image: "https://i.pinimg.com/736x/82/c3/5d/82c35d83be1686344586fe221045e5f4.jpg",
      title: "Agri-Business DPRs",
      description: "A document for agri-business ventures, providing a comprehensive blueprint for planning, implementation, and securing funding for agricultural projects",
    },
    {
      image: "https://i.pinimg.com/736x/53/8d/31/538d31dd2fd07bd0cf0fa5ab3030fd60.jpg",
      title: "Startup Project Report",
      description: "A successful startup project report in agriculture should detail the venture's mission, product or service, target market, operational plan, and financial projections.",
    },
    {
      image: "https://i.pinimg.com/736x/76/ba/9d/76ba9d7f368379e839faa110653a0c2c.jpg",
      title: "Farm Development Plans",
      description: "Comprehensive strategies for managing agricultural resources and operations to maximize output and profitability while considering environmental and economic factors.",
    },
    {
      image: "https://i.pinimg.com/736x/8a/b4/b8/8ab4b84b6886ac290cf36965a32c95ec.jpg",
      title: "FPO Growth Strategies",
      description: "Empowering farmers by enabling them to enhance their income and social conditions through collective action and improved market access.",
    },
    {
      image: "https://i.pinimg.com/736x/86/88/c5/8688c5a2db996ca26452b35a087ad6ed.jpg",
      title: "Financial & Market Insights",
      description: "Services involved in moving an agricultural product from the farm to the consumer.Planning, organizing, directing and handling of agricultural produce in such a way as to satisfy farmers, intermediaries and consumers.",
    },
    {
      image: "https://i.pinimg.com/736x/31/57/11/315711da494451bfd4a9588d7e6ac48d.jpg",
      title: "Field Assistance",
      description: "A professional who supports agricultural research, extension, and operations in the field.",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://i.pinimg.com/736x/0c/5b/21/0c5b21181c1f9f7bb684995d6e672f69.jpg")',
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
            Our team Agriculture graduates, MBAs and Economists collaborates to deliver expertly crafted Detailed Project Reports, tailored to empower agri-business success
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

export default ComingSoon2;
