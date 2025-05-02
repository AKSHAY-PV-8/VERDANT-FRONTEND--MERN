import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {  Book, FilePlus, ClipboardList } from "lucide-react"; // Icons for sidebar

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const ServerURL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${ServerURL}/api/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setMessage(response.data.message);
      } catch (error) {
        navigate("/login");
        console.log(error) // Redirect if unauthorized
      }
    };

    fetchAdminData();
  }, [navigate]);

  return (
    <div>
     
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-5 flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <Link
            to="/examCreation"
            className="flex items-center space-x-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
          >
            <ClipboardList className="w-5 h-5" />
            <span>Add Exam</span>
          </Link>
          <Link
            to="/courseCreation"
            className="flex items-center space-x-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
          >
            <Book className="w-5 h-5" />
            <span>Add Course</span>
          </Link>
          <Link
            to="/addAdvisors"
            className="flex items-center space-x-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
          >
            <FilePlus className="w-5 h-5" />
            <span>Add Details</span>
          </Link>

          <Link
            to="/advisors"
            className="flex items-center space-x-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
          >
            <FilePlus className="w-5 h-5" />
            <span> Details</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">Admin Dashboard</h2>
          <p className="text-gray-400 text-center">{message}</p>
        </div>
      </main>
    </div>
    </div>
  );
};

export default AdminDashboard;
