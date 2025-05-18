import  { useState, useEffect, useRef  } from 'react';
import { Menu, X, Cpu, FolderKanban, Phone, Mail, MapPin, ChevronRight, Globe, Sprout, } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';


const heroImages = [
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1920"
];

function Webhome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_tvb1rfc',
      'YOUR_TEMPLATE_ID',
      formRef.current,
      'idyxPeFznX-j6BBU0'
    )
    .then(() => {
      alert('Message sent successfully!');
      formRef.current.reset();
    })
    .catch((error) => {
      console.error(error);
      alert('Failed to send message. Please try again later.');
    });
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-200 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-screen bg-gray-300/90 backdrop-blur-sm z-50 border-b border-gray-800 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
           <img
              src="/logo.png"
              alt="Verdant Logo"
              className="h-30 w-30 mr-2"
            />
            <span className="text-xl font-bold uppercase text-green-300"></span>
          </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a onClick={() => navigate("/advisors")} className="text-gray-900 font-bold hover:text-green-400 transition-colors">About</a>
                <a onClick={() => {navigate("/intro")}} className="text-gray-900 font-bold hover:text-green-400 transition-colors">Education</a>
                {/* <a href="#technology" className="text-gray-300 hover:text-green-400 transition-colors">Technology</a>
                <a href="#projects" className="text-gray-300 hover:text-green-400 transition-colors">Projects</a>
                <a href="#contact" className="text-gray-300 hover:text-green-400 transition-colors">Contact</a> */}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-900">
                {isMenuOpen ? <X className="h-6 w-6 text-gray-900" /> : <Menu className="h-6 w-6 text-gray-900" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a onClick={() => navigate("/advisors")} className="block px-3 py-2 text-gray-300 hover:text-green-400">About</a>
              <a onClick={() => navigate("/intro")} className="block px-3 py-2 text-gray-300 hover:text-green-400">Education</a>
              {/* <a href="#technology" className="block px-3 py-2 text-gray-300 hover:text-green-400">Technology</a>
              <a href="#projects" className="block px-3 py-2 text-gray-300 hover:text-green-400">Projects</a>
              <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-green-400">Contact</a> */}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen">
        <div className="absolute inset-0 overflow-hidden">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img}
                alt="Agriculture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
          ))}
        </div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-4xl px-4">
            <h1 className= "text-3xl text-gray-300 mb-8">
              Revolutionizing Agriculture for Tomorrow
            </h1>
            <h3 className= "text-xl md:text-6xl font-bold text-white mb-6">
              VERDANT ELEVATE
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                onClick={() => navigate("/intro")}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
              <a
                onClick={() => navigate("/advisors")}
                className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                About
                <Globe className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Agricultural Education Section */}
      <section id="education" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <div className="text-center mb-16">
            <BookOpen className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">ABOUT US</h2>
            <p className="text-lg text-gray-300 uppercase">Verdant</p>
          </div> */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
  <div className="space-y-6">
    <div
      className="bg-gray-700 p-6 sm:p-8 rounded-lg shadow-xl h-72 sm:h-80 w-full bg-cover bg-center flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(https://i.pinimg.com/736x/f8/40/87/f84087424ffc2eb2efd09f755adbaa9a.jpg)`
      }}
    >
      <h4 className="text-white text-base sm:text-lg font-semibold px-2 sm:px-4">
        Sowing innovation for a sustainable and tech driven agricultural future
      </h4>
    </div>

    <img
      src="https://plus.unsplash.com/premium_photo-1678344170545-c3edef92a16e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWdyaWN1bHR1cmV8ZW58MHx8MHx8fDA%3D"
      alt="Agricultural Education"
      className="w-full h-auto rounded-lg shadow-xl"
    />

    <div
      className="bg-gray-700 p-6 sm:p-8 rounded-lg shadow-xl h-72 sm:h-80 w-full bg-cover bg-center flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(https://i.pinimg.com/736x/b5/44/0a/b5440abc8184059bcfa50028195e5253.jpg)`
      }}
    >
      <p className="text-gray-300 text-base sm:text-lg">
        Harvesting hope from every field
      </p>
    </div>
  </div>

  <div className="space-y-6">
    <div
      className="bg-gray-700 p-6 sm:p-8 rounded-lg shadow-xl h-72 sm:h-80 w-full bg-cover bg-center flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(https://i.pinimg.com/736x/a0/9c/7a/a09c7ac658db8a3e64791e43c08c06e9.jpg)`
      }}
    >
      <p className="text-gray-300 text-base sm:text-lg">
        Rooted in agriculture, growing towards impact.
      </p>
    </div>

    <div className="bg-gray-700 p-6 sm:p-8 rounded-lg shadow-xl">
      <h3 className="text-2xl font-semibold text-green-300 mb-4">ABOUT US</h3>
      <div className="flex items-start space-x-4">
        <Sprout className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="text-xl font-bold text-white mb-2">Welcome to Verdant Elevate</h4>
          <p className="text-gray-300">
            Led by passionate agricultural graduates, we are your gateway to agricultural education and technology. One stop for all your agri-related needs.
          </p>
        </div>
      </div>
      <a
        onClick={() => navigate("/intro")}
        className="mt-6 inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Get Started Learning
        <ChevronRight className="ml-2 h-5 w-5" />
      </a>
    </div>
  </div>
</div>



        </div>
      </section>

      {/* Agricultural Technology Section */}
      <section id="technology" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Cpu className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-lg text-gray-300"></p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <img
                src="https://i.pinimg.com/736x/3e/4f/a3/3e4fa3b71209c94a58005ce2869ff5ec.jpg"
                alt="Precision Farming"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-green-300">Verdant Agri edtech</h3>
                <p className="text-gray-300"></p>
                <div className='pt-6'>
                <button

                onClick={() => navigate("/intro")}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Learn More
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <img
                src="https://i.pinimg.com/736x/86/f6/fe/86f6fe20168fb3d1d93db6e6f147add8.jpg"
                alt="Smart Irrigation"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-green-300">Verdant GIS Service</h3>
                <p className="text-gray-300"></p>
                <div className='pt-6'>
                <a
                onClick={() => navigate("/comingSoon1")}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Learn More
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
              </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <img
                src="https://i.pinimg.com/736x/8f/d9/43/8fd943f1424ef3c994a6c43e6451a939.jpg"
                alt="Drone Technology"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-green-300">Detailed Project Reports</h3>
                <p className="text-gray-300"></p>
                <div className='pt-6'>
                <a
                onClick={() => navigate("/comingSoon2")}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Learn More 
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
              </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <img
                src="https://i.pinimg.com/736x/8a/c0/7d/8ac07d3458444a1cc6d850791cd3f902.jpg"
                alt="Drone Technology"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-green-300">Verdant Publication</h3>
                <p className="text-gray-300"></p>
                <div className='pt-6'>
                <a
                onClick={() => navigate("/comingSoon")}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Learn More
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FolderKanban className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Our Projects</h2>
            <p className="text-lg text-gray-300">Innovative solutions for modern agriculture</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-700 rounded-lg shadow-xl p-8 hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-green-300">Digital Learning System (DLS)</h3>
              <p className="text-gray-300 mb-6">
                Our state-of-the-art digital learning platform revolutionizes agricultural education:
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <img
                  src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800"
                  alt="Digital Learning"
                  className="rounded-lg shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
                  alt="Online Training"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-gray-300">Interactive online courses with expert instructors</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-gray-300">Real-time consultation and problem-solving</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-gray-300">Advanced crop monitoring and analytics</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-700 rounded-lg shadow-xl p-8 hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-green-300">Sustainable Farming Initiative</h3>
              <p className="text-gray-300 mb-6">
                Implementing eco-friendly farming practices across communities:
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <img
                  src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800"
                  alt="Sustainable Farming"
                  className="rounded-lg shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800"
                  alt="Organic Farming"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-gray-300">Organic farming certification and training</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-gray-300">Water conservation and management systems</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-gray-300">Soil health monitoring and improvement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Phone className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-lg text-gray-300">Get in touch with our team</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-green-400 mr-4" />
                <span className="text-gray-300">+919074215842</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-green-400 mr-4" />
                <span className="text-gray-300">verdantelevate@gmail.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-green-400 mr-4 mt-1" />
                <span className="text-gray-300">
                  Building No - 44/1424-A,<br />
                  Cheruvannur, P.O Kolathara,<br />
                  Kozhikode, Kerala, PIN - 673655
                </span>
              </div>
            </div>
            <div className="mt-8">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
                alt="Office Location"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="bg-gray-800 p-8 rounded-lg shadow-xl space-y-6"
          >
            <input
              type="text"
              name="from_name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent text-white placeholder-gray-400"
            />
            <input
              type="email"
              name="reply_to"
              placeholder="Your Email"
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent text-white placeholder-gray-400"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Your Message"
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent text-white placeholder-gray-400"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>  
      </div>
    </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="ml-2 text-xl font-bold uppercase text-green-300">Verdant</span>
            </div>
            <div className="text-center md:text-right text-gray-400">
              <p>&copy; 2024 Verdant Agriculture. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Webhome;