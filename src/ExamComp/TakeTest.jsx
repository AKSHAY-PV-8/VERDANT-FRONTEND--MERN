import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import { Timer } from "lucide-react";

const ExamConduct = () => {
    const { examId } = useParams();
    // const navigate = useNavigate();
    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [wrongAnswers, setWrongAnswers] = useState([]);
    const [showRanking, setShowRanking] = useState(false);
    const [rankings, setRankings] = useState([]);
    const ServerURL = import.meta.env.VITE_SERVER_URL;

        const fetchRankings = async () => {
            try {
                const response = await axios.get(`${ServerURL}/api/exam/ranking/${examId}`, {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
                });

                if (response.data.success) {
                    setRankings(response.data.rankings);
                    setShowRanking(true);
                } else {
                    alert("Failed to load rankings.");
                }
            } catch (error) {
                console.error("Error fetching rankings:", error);
                alert("Error fetching rankings.");
            }
        };

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const response = await axios.get(`${ServerURL}/api/exam/exams/${examId}`, {
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

    const handleClearSelection = () => {
        setAnswers({ ...answers, [currentQuestion]: undefined });
    };

    useEffect(() => {
        if (timeLeft === 0) {
            handleSubmit();
        }
        const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleAnswer = (index, value) => {
        setAnswers({ ...answers, [index]: value });
    };

    const handleSubmit = async () => {
        const isConfirmed = window.confirm("Are you sure you want to submit the exam?");
        if (!isConfirmed) return;

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId")

        console.log("userID", userId)

        if (!token) {
            alert("Session expired. Please log in again.");
            return;
        }

        if (!userId) {
            alert("User ID is missing. Please log in again.");
            return;
        }

        try {
            const response = await axios.post(
                `${ServerURL}/api/exam/exams/${examId}/submit`,
                { answers: Object.values(answers),
                    userId: userId
                 },
                { headers: { "Authorization": `Bearer ${token}` } }
            );

            if (response.data.success) {
                setScore(response.data.totalMarks);
                alert(`Exam Submitted Successfully! Your score: ${response.data.totalScore}`);

                const wrongIndices = [];
                response.data.correctAnswers.forEach((ans, index) => {
                    if (ans.correctAnswer !== ans.submittedAnswer) {
                        wrongIndices.push(index);
                    }
                });
                setWrongAnswers(wrongIndices);
                setCorrectAnswers(response.data.correctAnswers);
            } else {
                alert("Failed to submit exam. Try again.");
            }
        } catch (error) {
            console.log(error)
            alert("Error submitting exam. Please check your network or login again.");
        }
    };

    if (loading) return <p>Loading Exam...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center border-b pb-4">
                    <h2 className="text-xl font-bold text-blue-600">{exam.title}</h2>
                    <div className="text-red-600 font-semibold flex items-center space-x-2">
                        <Timer className="text-red-500" />
                        <span>Time Left: {`${Math.floor(timeLeft / 60)}:${timeLeft % 60}`}</span>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/4 bg-gray-50 p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800">Question Palette</h3>
                        <div className="grid grid-cols-5 gap-2 mt-3">
                            {exam.question.map((_, index) => (
                                <button
                                    key={index}
                                    className={`p-2 rounded-full ${wrongAnswers.includes(index) ? "bg-red-500 text-white" : answers[index] ? "bg-green-500 text-white" : "bg-gray-300"}`}
                                    onClick={() => setCurrentQuestion(index)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="w-3/4 p-6">
                        <p className="text-lg font-medium">{exam.question[currentQuestion].question}</p>
                        <div className="mt-4">
                            {exam.question[currentQuestion].option.map((opt, i) => (
                                <label key={i} className="block mt-2">
                                    <input
                                        type="radio"
                                        name={`q${currentQuestion}`}
                                        value={opt}
                                        checked={answers[currentQuestion] === opt}
                                        onChange={() => handleAnswer(currentQuestion, opt)}
                                        className="mr-2"
                                    />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </div>
                    
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
                                className="bg-yellow-500 text-white px-4 py-2 rounded"
                                onClick={handleClearSelection}
                            >
                                Clear
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                disabled={currentQuestion === exam.question.length - 1}
                                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                            >
                                Next
                            </button>
                        </div>
                <div className="mt-6 text-center">
                    <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold" onClick={handleSubmit}>Submit Exam</button>
                </div>
                {score !== null && (
                    <div className="mt-6 text-center bg-green-100 text-green-700 p-4 rounded-lg">
                        <h3 className="text-2xl font-bold">Your Score: {score}</h3>
                        <div className="mt-4 text-left">
                            <h4 className="text-lg font-semibold">Correct Answers:</h4>
                            {correctAnswers.map((ans, index) => (
                                <p key={index} className="text-green-700">Q{index + 1}: {ans.correctAnswer}</p>
                            ))}
                        </div>


                        <div className="mt-6 text-center">
                            <button
                                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold"
                                onClick={fetchRankings}
                            >
                                View Ranking List
                            </button>
                        </div>    
                    </div>
                )}

            {showRanking && (
                <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold">Ranking List</h3>
                    <ul className="mt-3">
                        {rankings.map((rank, index) => (
                            <li key={rank.user._id} className="py-2">
                                <span className="font-semibold">{index + 1}. {rank.user.name}</span> - {rank.score} points
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            </div>
        </div>
    );
};

export default ExamConduct;
