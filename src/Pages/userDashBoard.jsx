import {  BookOpen, ChevronRight, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [courses, setCourses] = useState([]);
    const userId = localStorage.getItem("userId"); 
    const [activeTab, setActiveTab] = useState('dashboard');
    const ServerURL = import.meta.env.VITE_SERVER_URL;

    const navigate = useNavigate()

  

    useEffect(() => {
        if (!userId) {
            console.error("User ID not found.");
            return;
        }

        fetch(`${ServerURL}/api/dashboard/user-courses/${userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setCourses(data.enrolledCourses);
            })
            .catch(err => console.error("Error fetching enrolled courses:", err));
    }, [userId]);

    return (
        <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-xl font-bold text-gray-800">VERDANT</span>
          </div>
          
          <nav className="space-y-2">
            {[
              { icon: Home, label: "Dashboard", id: "dashboard" },
              { icon: BookOpen, label: "My Courses", id: "courses" },
        
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full p-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? "bg-emerald-50 text-emerald-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
          </div>
          
        </div>

        <div className="grid grid-cols-1 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6"
            >
              <div className="flex gap-6">
                {/* <img
                //   src={course.image}
                //   alt={course.title}
                  className="w-48 h-32 object-cover rounded-lg"
                /> */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {course.title}
                    </h3>
                    {/* <span className="text-emerald-600 font-medium">
                      {course.progress}% Complete
                    </span> */}
                  </div>
                  {/* <p className="text-gray-600 mb-4">
                    Instructor: {course.instructor}
                  </p> */}
                  <div className="mb-4">
                    
                  </div>
                  <div className="flex justify-between items-center">
                    <button onClick={() => (navigate(`/course/${course._id}`))} className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-all">
                      Continue Learning
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
        // <div className="flex h-screen bg-gray-100">
        //     {/* Sidebar */}
        //     <aside className="w-1/4 bg-white shadow-lg border-r p-6">
        //         <h2 className="text-xl font-bold text-gray-700 mb-4">📌 Enrolled Courses</h2>
        //         <ul className="space-y-3">
        //             {courses.length === 0 ? (
        //                 <p className="text-gray-500">No courses enrolled yet.</p>
        //             ) : (
        //                 courses.map(course => (
        //                     <li 
        //                         key={course._id} 
        //                         className="p-3 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 transition-all"
        //                     >
        //                         {course.title}
        //                     </li>
        //                 ))
        //             )}
        //         </ul>
        //     </aside>

        //     {/* Main Content */}
        //     <div className="flex-1 p-8">
        //         <h1 className="text-3xl font-extrabold text-gray-800 mb-6">📚 My Enrolled Courses</h1>

        //         {courses.length === 0 ? (
        //             <p className="text-lg text-gray-600">You havent enrolled in any courses yet.</p>
        //         ) : (
        //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        //                 {courses.map(course => (
        //                     <div 
        //                         key={course._id} 
        //                         className="p-6 bg-white rounded-xl shadow-md border hover:shadow-lg transition-all"
        //                     >
        //                         <h2 className="text-xl font-semibold text-gray-800">{course.title}</h2>
        //                         <p className="text-gray-600 mt-2">{course.description}</p>
        //                     </div>
        //                 ))}
        //             </div>
        //         )}
        //     </div>
        // </div>
    );
};

export default Dashboard;
