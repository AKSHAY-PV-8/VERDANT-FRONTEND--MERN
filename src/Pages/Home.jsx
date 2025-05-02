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


const Images = [
  { image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80" },
  { image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80" },
  { image: "https://images.unsplash.com/photo-1576319155264-99536e0be1ee?auto=format&fit=crop&w=800&q=80" },
  { image: "https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?auto=format&fit=crop&w=800&q=80" },
  { image: "https://images.unsplash.com/photo-1559935384-3b5b2e7a5204?auto=format&fit=crop&w=800&q=80" },
  { image: "https://images.unsplash.com/photo-1561553873-e8491a564fd0?auto=format&fit=crop&w=800&q=80" },
  { image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80" },
  { image: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=800&q=80" }
];



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
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-gray-800">VERDANT</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <nav className="mt-6 px-3">
          {[
            { icon: BookOpen, text: 'Courses', link: '/course'},
            { icon: FileText, text: 'Exams', link: '/examList' },
            // { icon: PlusCircle, text: 'Create Course' , link: '/courseCreation'},
            // { icon: PlusCircle, text: 'Create Exam', link: '/examCreation' },
            { icon: BookDashed, text: 'Dashboard', link: '/dashboard' },
            // { icon: LogOut, text: 'Logout' },
          ].map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center px-4 py-3 my-1 rounded-xl text-gray-600 hover:bg-green-50 hover:text-green-700 transition-all duration-200 group"
            >
              <item.icon className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
              <span onClick={() => navigate(item.link)} className="font-medium">{item.text}</span>
              {item.badge && (
                <span onClick={() => navigate(item.link)} className="ml-auto bg-green-100 text-green-600 px-2.5 py-1 rounded-full text-xs font-medium">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
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
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              <nav className="hidden md:flex items-center space-x-8">
                <a href="/home" className="text-green-600 font-medium hover:text-green-700 transition-colors">Home</a>
                <a href="/course" className="text-gray-600 hover:text-green-600 transition-colors">Course</a>
                <a href="/examList" className="text-gray-600 hover:text-green-600 transition-colors">Exams</a>
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
                { number: "10,000+", label: "Students", icon: GraduationCap },
                { number: "500+", label: "Courses", icon: BookOpen },
                { number: "50+", label: "Countries", icon: Globe },
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

        <section id="courses" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16">Top Rated Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topCourses.map((course, index) => (
                  <div key={course.id} onClick={() => {
                    if (course.isEnrolled) {
                      navigate(`/courseDetails/${course._id}`);
                    } else {
                      navigate(`/courseDescription/${course._id}`);
                    }
                  }} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <img  style={{ backgroundImage: `url(${Images[index % Images.length].image})` }} className="w-full h-48 " />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                      <p className="text-gray-600 mb-4">{course.instructor}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {/* <Star className="w-5 h-5 text-yellow-400" /> */}
                          <span className="ml-1 font-medium">{course.rating}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          {/* <Users className="w-4 h-4 mr-1" /> */}
                          <span>{course.students}</span>
                        </div>
                      </div>
                    </div>
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