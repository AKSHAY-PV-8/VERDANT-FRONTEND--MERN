import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Timer } from "lucide-react";

const ExamConduct = () => {
    const { examId } = useParams();
    const navigate = useNavigate();
    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/exam/exams/${examId}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.data.success) {
                    setExam(response.data.exam);
                } else {
                    throw new Error("Failed to fetch exam");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchExam();
    }, [examId]);

    useEffect(() => {
        if (timeLeft === 0) {
            handleSubmit();
        }
        const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleAnswer = (index, value) => {
        setAnswers({ ...answers, [index]: value });
    };

    const handleSubmit = async () => {
        try {
            await axios.post(`http://localhost:3000/api/exam/exams/${examId}/submit`, {
                answers: Object.values(answers),
                userId: localStorage.getItem("userId"), // Ensure user ID is available
            });
            alert("Exam Submitted Successfully");
            navigate(`/exam/result/${examId}`);
        } catch (error) {
            console.error("Error submitting exam", error);
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading Exam...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
                {/* Header Section */}
                <div className="flex justify-between items-center border-b pb-4">
                    <h2 className="text-xl font-bold text-blue-600">{exam.title}</h2>
                    <div className="text-red-600 font-semibold flex items-center space-x-2">
                        <Timer className="text-red-500" />
                        <span>Time Left: {formatTime(timeLeft)}</span>
                    </div>
                </div>

                <div className="flex">
                    {/* Left Sidebar (Question Palette) */}
                    <div className="w-1/4 bg-gray-50 p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800">Question Palette</h3>
                        <div className="grid grid-cols-5 gap-2 mt-3">
                            {exam.question.map((_, index) => (
                                <button
                                    key={index}
                                    className={`p-2 rounded-full ${answers[index] ? "bg-green-500 text-white" : "bg-gray-300"}`}
                                    onClick={() => setCurrentQuestion(index)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Content (Question & Options) */}
                    <div className="w-3/4 p-6">
                        <p className="text-lg font-medium">{exam.question[currentQuestion].question}</p>
                        <div className="mt-4">
                            {exam.question[currentQuestion].option.map((opt, i) => (
                                <label key={i} className="block mt-2">
                                    <input
                                        type="radio"
                                        name={`q${currentQuestion}`}
                                        value={opt}
                                        onChange={() => handleAnswer(currentQuestion, opt)}
                                        className="mr-2"
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-6">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded"
                                disabled={currentQuestion === 0}
                                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                            >
                                Previous
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                disabled={currentQuestion === exam.question.length - 1}
                                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6 text-center">
                    <button
                        className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold"
                        onClick={handleSubmit}
                    >
                        Submit Exam
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExamConduct;