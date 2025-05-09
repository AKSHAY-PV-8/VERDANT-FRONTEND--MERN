// CourseListPage.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CourseListPage = () => {
    const [courses, setCourses] = useState([]);
    const ServerURL = import.meta.env.VITE_SERVER_URL;

    useEffect(() => {
        axios.get(`${ServerURL}/api/examCourse/courses`)
    .then((res) => setCourses(res.data.courses))  // Access the 'courses' array inside the response
    .catch((err) => console.error("Error fetching courses:", err));
    }, []);

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
                        <Link to={`/edit-course/${course._id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseListPage;
