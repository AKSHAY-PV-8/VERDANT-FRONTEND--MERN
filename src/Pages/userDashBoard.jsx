import { ChevronRight, Home, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/Auth/NavBar";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  const [activeTab, setActiveTab] = useState("dashboard");
  const ServerURL = import.meta.env.VITE_SERVER_URL;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      console.error("User ID not found.");
      return;
    }

    fetch(`${ServerURL}/api/dashboard/user-courses/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCourses(data.enrolledCourses);
      })
      .catch((err) => console.error("Error fetching enrolled courses:", err));
  }, [userId]);

  return (
    <div>
      <NavBar />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        {/* Mobile menu toggle */}
        <div className="md:hidden p-4 bg-white shadow-sm flex justify-between items-center">
          <span className="text-xl font-bold text-gray-800">VERDANT</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "block" : "hidden"
          } md:block w-full md:w-64 bg-white shadow-lg z-10 md:z-auto`}
        >
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-xl font-bold text-gray-800 hidden md:block">VERDANT</span>
            </div>
            <nav className="space-y-2">
              {[{ icon: Home, label: "Dashboard", id: "dashboard" }].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
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
        <div className="flex-1 p-4 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">My Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                      {course.title}
                    </h3>
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <button
                      onClick={() => navigate(`/course/${course._id}`)}
                      className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-all"
                    >
                      Continue Learning
                      <ChevronRight className="h-4 w-4" />
                    </button>
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

export default Dashboard;
