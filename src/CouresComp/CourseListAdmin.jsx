import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CourseListPage = () => {
    const [courses, setCourses] = useState([]);
    const ServerURL = import.meta.env.VITE_SERVER_URL;

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = () => {
        axios.get(`${ServerURL}/api/examCourse/courses`)
            .then((res) => setCourses(res.data.courses))
            .catch((err) => console.error("Error fetching courses:", err));
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this course?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${ServerURL}/api/examCourse/courses/${id}`);
            setCourses(courses.filter(course => course._id !== id));
        } catch (err) {
            console.error("Error deleting course:", err);
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-12">
            <h2 className="text-4xl font-bold mb-8 text-center">Course List</h2>
            <ul className="space-y-4">
                {courses.map((course) => (
                    <li key={course._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                        <div>
                            <h3 className="text-2xl font-semibold">{course.title}</h3>
                            <p className="text-gray-600">{course.description}</p>
                        </div>
                        <div className="flex space-x-2">
                            <Link to={`/edit-course/${course._id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Edit</Link>
                            <button
                                onClick={() => handleDelete(course._id)}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseListPage;
