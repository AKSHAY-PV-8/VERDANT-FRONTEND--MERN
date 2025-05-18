import  { useState, useEffect } from 'react';
import {

  BookOpen,
  FileText,


  Star,
  Users,
 
  BookCheck,
  Menu,
  X,
  GraduationCap,
  Globe,
  Award,
  Target,
 
  CheckCircle,
  BookDashed,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1920",
    title: "Modern Agriculture Education"
  },
  {
    url: "https://images.unsplash.com/photo-1561553873-e8491a564fd0?auto=format&fit=crop&w=800&q=80",
    title: "Sustainable Farming Practices"
  },
  {
    url: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=1920",
    title: "Advanced Agricultural Technology"
  }
];

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set())
  const ServerURL = import.meta.env.VITE_SERVER_URL;
  const [topCourses, setTopCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  {console.log(topCourses)}
  {console.log(loading)}
  {console.log(error)}

  useEffect(() => {
    fetch(`${ServerURL}/api/course/courses`)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // Sort courses by rating in descending order and get the top 3
                const sortedCourses = data.courses.sort((a, b) => b.rating - a.rating).slice(0, 3);
                setTopCourses(sortedCourses);
            } else {
                setError("Failed to load courses.");
            }
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching courses:", err);
            setError("Error fetching courses. Please try again.");
            setLoading(false);
        });
}, []);






  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {  // Removed ": MouseEvent"
      const sidebar = document.getElementById('sidebar');
      const menuButton = document.getElementById('menu-button');
  
      if (sidebar && menuButton && !sidebar.contains(event.target) && !menuButton.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };
  
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${ServerURL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        alert("Logged out successfully!");
        navigate("/intro");
        localStorage.removeItem("token");
      } else {
        alert(data.message || "Failed to logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to logout. Please try again.");
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

       <div
        id="sidebar"
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-30 w-72 bg-white shadow-2xl`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <span className="text-2xl font-bold text-gray-800">VERDANT</span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        {/* Mobile Nav Links */}
        <nav className="flex flex-col space-y-4 p-6 text-gray-700 font-medium">
          <a href="/home" className="hover:text-green-600">Home</a>
          <a href="/course" className="hover:text-green-600">Courses</a>
          <a href="/examList" className="hover:text-green-600">Exams</a>
          <button
            onClick={handleLogout}
            className="text-left hover:text-green-600"
          >
            Logout
          </button>
        </nav>
      </div>

      <div className="relative">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between px-4 py-4">
              <button
                id="menu-button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-6 w-6 text-gray-900" />
              </button>
              <nav className="hidden md:flex items-center space-x-8">
  <a href="/home" className="text-green-600 font-medium hover:text-green-700 transition-colors">Home</a>
  <a href="/course" className="text-gray-600 hover:text-green-600 transition-colors">Course</a>
  <a href="/examList" className="text-gray-600 hover:text-green-600 transition-colors">Exams</a>
  <button
    onClick={async () => {
      try {
        const response = await fetch(`${ServerURL}/api/auth/logout`, {
          method: 'POST',
          credentials: 'include',
        });
        const data = await response.json();
        if (data.success) {
          alert("Logged out successfully!");
          navigate("/intro");
          localStorage.removeItem("token");

        } else {
          alert(data.message || "Failed to logout");
        }
      } catch (error) {
        console.error("Logout error:", error);
        alert("Failed to logout. Please try again.");
      }
    }}
    className="text-gray-600 hover:text-green-600 transition-colors"
  >
    Logout
  </button>
</nav>
        
            </div>
          </div>
        </header>

        <div className="relative h-[600px] overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 z-10" />
              <img
                src={slide.url}
                alt={slide.title}
                className="w-full h-full object-cover transform scale-105 transition-transform duration-10000 ease-out"
                style={{
                  transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center max-w-4xl px-4">
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 mb-10">
                    Empowering the next generation of agricultural experts
                  </p>
                  <button onClick={() => navigate('/course')} className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section id="stats" className="py-16 bg-green-600">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: "1000+", label: "Students", icon: GraduationCap },
                { number: "10+",label: "Courses", icon: BookOpen },
                { number: "14", label: "Districts", icon: Globe },
                { number: "95%", label: "Success Rate", icon: Award },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`text-center text-white transform transition-all duration-700 ${
                    visibleSections.has('stats')
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <stat.icon className="h-12 w-12 mx-auto mb-4" />
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div
                className={`transform transition-all duration-700 ${
                  visibleSections.has('about')
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-10 opacity-0'
                }`}
              >
                <h2 className="text-4xl font-bold mb-6">Transform Your Agricultural Career</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  VERDANT is revolutionizing agricultural education by combining traditional wisdom with modern technology. Our platform offers comprehensive courses designed by industry experts and academics, ensuring you receive the most relevant and up-to-date knowledge in agriculture.
                </p>
                <div className="space-y-4">
                  {[
                    "Expert-led video courses",
                    "Hands-on practical assignments",
                    "Industry-recognized certificates",
                    "Flexible learning schedule",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={`relative h-[500px] rounded-2xl overflow-hidden transform transition-all duration-700 ${
                  visibleSections.has('about')
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-10 opacity-0'
                }`}
              >
                <img
                  src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=1000"
                  alt="Agricultural Education"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Why Choose VERDANT?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: BookCheck,
                  title: "Expert-Led Courses",
                  description: "Learn from industry professionals and experienced agriculturists"
                },
                {
                  icon: Users,
                  title: "Community Learning",
                  description: "Connect with fellow students and share knowledge"
                },
                {
                  icon: Star,
                  title: "Practical Experience",
                  description: "Hands-on projects and real-world applications"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`p-8 bg-green-50 rounded-2xl hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group transform ${
                    visibleSections.has('features')
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <feature.icon className="h-14 w-14 text-green-600 mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="learning-path" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Your Learning Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  icon: Target,
                  title: "Set Your Goals",
                  description: "Choose your specialization and set learning objectives"
                },
                {
                  icon: BookOpen,
                  title: "Start Learning",
                  description: "Access comprehensive course materials and video lectures"
                },
                {
                  icon: Users,
                  title: "Practice & Collaborate",
                  description: "Work on real projects with peer feedback"
                },
                {
                  icon: Award,
                  title: "Get Certified",
                  description: "Earn industry-recognized certificates"
                }
              ].map((step, index) => (
                <div
                  key={index}
                  className={`text-center transform transition-all duration-700 ${
                    visibleSections.has('learning-path')
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative">
                    <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <step.icon className="h-10 w-10 text-green-600" />
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-green-200" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        <section id="cta" className="py-20 bg-green-600">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Agricultural Journey?</h2>
            <p className="text-xl text-white/90 mb-10">Join thousands of students learning and growing with VERDANT</p>
            <button onClick={() => navigate('/course')} className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-green-50 hover:scale-105 transition-all duration-300 shadow-lg">
              Start Learning Today
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;