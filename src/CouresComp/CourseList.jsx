import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {GraduationCap, Menu,} from "lucide-react";
import NavBar from "../Components/Auth/NavBar";

const Images = [
    { image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80" },
    { image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80" },
    { image: "https://images.unsplash.com/photo-1576319155264-99536e0be1ee?auto=format&fit=crop&w=800&q=80" },
    { image: "https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?auto=format&fit=crop&w=800&q=80" },
    // { image: "https://images.unsplash.com/photo-1559935384-3b5b2e7a5204?auto=format&fit=crop&w=800&q=80" },
    { image: "https://images.unsplash.com/photo-1561553873-e8491a564fd0?auto=format&fit=crop&w=800&q=80" },
    { image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80" },
    { image: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=800&q=80" }
];

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const ServerURL = import.meta.env.VITE_SERVER_URL;

    useEffect(() => {
        // Fetch all courses
        // fetch(`${ServerURL}/api/course/courses`)
        fetch(`${ServerURL}/api/examCourse/courses`)
            .then(res => res.json())
            .then(data => setCourses(data.courses))
            .catch(err => console.error(err));

        // Fetch enrolled courses for the logged-in user
        if (userId) {
            fetch(`${ServerURL}/api/dashboard/user-courses/${userId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setEnrolledCourses(data.enrolledCourses.map(course => course._id)); // Store only course IDs
                    }
                })
                .catch(err => console.error("Error fetching enrolled courses:", err));
        }
    }, [userId]);

    return (
      
        <div>
          <NavBar/>
      <div className="min-h-screen bg-emerald-50 py-12 px-4 sm:px-6 lg:px-8">

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

            <div className="max-w-7xl mx-auto text-center mb-12">
                <h2 className="text-5xl font-bold text-gray-800 mb-4">Courses</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {courses.map((course, index) => {
                    const isEnrolled = enrolledCourses.includes(course._id); 

                    return (
                        <div
                            key={course._id}
                            className="relative bg-white rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            <div
                                className="w-full h-48 bg-cover bg-center"
                                style={{ backgroundImage: `url(${Images[index % Images.length].image})` }}
                            ></div>
                            <div className="p-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl shadow-lg">
                                        <GraduationCap className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-gray-800">{course.title}</h3>
                                </div>

                                <button
                                    className={`px-4 py-2 rounded-lg text-white font-semibold w-full transition 
                                        ${isEnrolled 
                                            ? "bg-blue-500 hover:bg-blue-600"  // Enrolled - Go to course details
                                            : "bg-emerald-500 hover:bg-emerald-600"}`} // Not enrolled - Go to course description
                                    onClick={() => 
                                        navigate(isEnrolled 
                                            ? `/course/${course._id}`  // If enrolled, go to course details
                                            : `/courseDescription/${course._id}` // If not, go to course description
                                        )
                                    }
                                >
                                    {isEnrolled ? "Go to Course" : "View Course"}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
        </div>
        </div>
        
    );
};

export default Courses;
 