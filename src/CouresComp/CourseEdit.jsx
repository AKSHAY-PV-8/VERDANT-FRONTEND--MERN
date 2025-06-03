import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const ServerURL = import.meta.env.VITE_SERVER_URL;

    const [course, setCourse] = useState({
        title: '',
        description: '',
        price: '',
        prerequisites: [],
        exams: []
    });

    useEffect(() => {
        axios.get(`${ServerURL}/api/examCourse/courses/${id}`)
            .then((res) => {
                const data = res.data.course;
                setCourse({
                    ...data,
                    prerequisites: Array.isArray(data.prerequisites) ? data.prerequisites : []
                });
            })
            .catch((err) => console.error("Error fetching course:", err));
    }, [id]);

    const handleChange = (field, value) => {
        setCourse({ ...course, [field]: value });
    };

    const handleExamChange = (examIdx, field, value) => {
        const updatedExams = [...course.exams];
        updatedExams[examIdx][field] = value;
        setCourse({ ...course, exams: updatedExams });
    };

    const handleQuestionChange = (examIdx, qIdx, field, value) => {
        const updatedExams = [...course.exams];
        updatedExams[examIdx].questions[qIdx][field] = value;
        setCourse({ ...course, exams: updatedExams });
    };

    const handleOptionChange = (examIdx, qIdx, optIdx, value) => {
        const updatedExams = [...course.exams];
        updatedExams[examIdx].questions[qIdx].option[optIdx] = value;
        setCourse({ ...course, exams: updatedExams });
    };

    const handleImageUpload = async (examIdx, qIdx, file) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await axios.post(
                `${ServerURL}/api/examCourse/upload-image`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            const imageUrl = res.data.imageUrl;
            const updatedExams = [...course.exams];
            updatedExams[examIdx].questions[qIdx].image = imageUrl;
            setCourse({ ...course, exams: updatedExams });
        } catch (err) {
            console.error("Image upload failed", err);
            alert("Image upload failed");
        }
    };

    const addExam = () => {
        const newExam = { sectionTitle: '', duration: 90, negativeMarking: 0, questions: [] };
        setCourse({ ...course, exams: [...course.exams, newExam] });
    };

    const addQuestion = (examIdx) => {
        const newQuestion = { question: '', image: '', option: ['', '', '', ''], answer: '', marks: 1 };
        const updatedExams = [...course.exams];
        updatedExams[examIdx].questions.push(newQuestion);
        setCourse({ ...course, exams: updatedExams });
    };

    const deleteExam = (examIdx) => {
        if (confirm("Are you sure you want to delete this exam section?")) {
            const updatedExams = [...course.exams];
            updatedExams.splice(examIdx, 1);
            setCourse({ ...course, exams: updatedExams });
        }
    };

    const deleteQuestion = (examIdx, qIdx) => {
        if (confirm("Are you sure you want to delete this question?")) {
            const updatedExams = [...course.exams];
            updatedExams[examIdx].questions.splice(qIdx, 1);
            setCourse({ ...course, exams: updatedExams });
        }
    };

    const handleSave = async () => {
        try {
            await axios.put(`${ServerURL}/api/examCourse/courses/${id}`, course);
            alert('Course updated successfully!');
            navigate('/courses');
        } catch (err) {
            console.error("Error updating course:", err);
            alert('Failed to update course');
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-12">
            <h2 className="text-4xl font-bold mb-8 text-center">Edit Course</h2>

            <input type="text" value={course.title} onChange={(e) => handleChange('title', e.target.value)} className="w-full p-2 border rounded mb-4" placeholder="Course Title" />
            <textarea value={course.description} onChange={(e) => handleChange('description', e.target.value)} className="w-full p-2 border rounded mb-4" placeholder="Course Description" />
            <input type="number" value={course.price} onChange={(e) => handleChange('price', e.target.value)} className="w-full p-2 border rounded mb-4" placeholder="Course Price" />
            <textarea value={course.prerequisites.join(', ')} onChange={(e) => handleChange('prerequisites', e.target.value.split(',').map(p => p.trim()))} className="w-full p-2 border rounded mb-8" placeholder="Prerequisites (comma separated)" />

            <button onClick={addExam} className="bg-blue-600 text-white px-4 py-2 rounded mb-6">➕ Add Exam Section</button>

            {course.exams.map((exam, examIdx) => (
                <div key={examIdx} className="border p-4 mb-6 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold mb-2">Exam Section {examIdx + 1}</h3>
                        <button
                            onClick={() => deleteExam(examIdx)}
                            className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                            🗑️ Delete Section
                        </button>
                    </div>

                    <input value={exam.sectionTitle} onChange={(e) => handleExamChange(examIdx, 'sectionTitle', e.target.value)} className="w-full mb-2 p-2 border" placeholder="Section Title" />
                    <input type="number" value={exam.duration} onChange={(e) => handleExamChange(examIdx, 'duration', e.target.value)} className="w-full mb-2 p-2 border" placeholder="Duration (minutes)" />
                    <input type="number" value={exam.negativeMarking} onChange={(e) => handleExamChange(examIdx, 'negativeMarking', e.target.value)} className="w-full mb-4 p-2 border" placeholder="Negative Marking" />

                    <button onClick={() => addQuestion(examIdx)} className="bg-purple-600 text-white px-3 py-1 rounded mb-4">➕ Add Question</button>

                    {exam.questions.map((q, qIdx) => (
                        <div key={qIdx} className="border p-3 mb-3 bg-white rounded shadow-sm">
                            <div className="flex justify-between items-center">
                                <h4 className="font-semibold">Question {qIdx + 1}</h4>
                                <button
                                    onClick={() => deleteQuestion(examIdx, qIdx)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    🗑️ Delete Question
                                </button>
                            </div>

                            <textarea value={q.question} onChange={(e) => handleQuestionChange(examIdx, qIdx, 'question', e.target.value)} className="w-full mb-2 p-2 border" placeholder="Question" />
                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(examIdx, qIdx, e.target.files[0])} className="mb-2" />
                            {q.image && <img src={q.image} alt="Uploaded" className="w-32 h-32 object-cover mb-2 rounded border" />}
                            {q.option.map((opt, optIdx) => (
                                <textarea key={optIdx} value={opt} onChange={(e) => handleOptionChange(examIdx, qIdx, optIdx, e.target.value)} className="w-full mb-1 p-2 border" placeholder={`Option ${optIdx + 1}`} />
                            ))}
                            <textarea value={q.answer} onChange={(e) => handleQuestionChange(examIdx, qIdx, 'answer', e.target.value)} className="w-full mb-2 p-2 border" placeholder="Answer" />
                            <input type="number" value={q.marks} onChange={(e) => handleQuestionChange(examIdx, qIdx, 'marks', parseInt(e.target.value))} className="w-full p-2 border" placeholder="Marks" />
                        </div>
                    ))}
                </div>
            ))}

            <button onClick={handleSave} className="bg-green-600 text-white px-6 py-2 rounded">💾 Save Course</button>
        </div>
    );
};

export default CourseEditPage;
