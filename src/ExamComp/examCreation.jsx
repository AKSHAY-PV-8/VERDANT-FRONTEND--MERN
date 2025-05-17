import { useState } from "react";

const CreateExam = () => {
    const [title, setTitle] = useState("");
    const [negativeMarking, setNegativeMarking] = useState(0); // Store negative marking for the entire exam
    const [duration, setDuration] = useState(0)
    const [questions, setQuestions] = useState([
        { question: "", option: ["", "", "", ""], answer: "", marks: 1 }
    ]);
    const ServerURL = import.meta.env.VITE_SERVER_URL;

    const handleSubmit = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("User not authenticated. Please log in again.");
            return;
        }

        fetch(`${ServerURL}/api/exam/newexam`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title, questions, negativeMarking }) // Fixed request structure
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                alert("Exam Created Successfully!");
                setTitle("");
                setNegativeMarking(0);
                setQuestions([{ question: "", option: ["", "", "", ""], answer: "", marks: 1 }]);
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch((err) => console.error("Error creating exam:", err));
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: "", option: ["", "", "", ""], answer: "", marks: 1 }]);
    };

    const handleChange = (index, field, value) => {
        const newQuestions = [...questions];
        if (field === "question" || field === "answer" || field === "marks") {
            newQuestions[index][field] = value;
        } else {
            newQuestions[index].option[field] = value; // Handles option updates
        }
        setQuestions(newQuestions);
    };

    return (
        <div className="bg-white min-h-screen p-8">
            <div className="max-w-3xl mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Create New Exam</h2>
                
                <input
                    type="text"
                    placeholder="Enter Exam Title"
                    className="border border-green-300 p-3 rounded w-full mb-5 focus:ring focus:ring-green-200"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Negative Marking"
                    className="border border-red-300 p-3 rounded w-full mb-5 focus:ring focus:ring-red-200"
                    value={negativeMarking}
                    min="0"
                    onChange={(e) => setNegativeMarking(parseFloat(e.target.value))}
                />

                <input
                    type="number"
                    placeholder="Negative Marking"
                    className="border border-red-300 p-3 rounded w-full mb-5 focus:ring focus:ring-red-200"
                    value={duration}
                    min="0"
                    onChange={(e) => setDuration(parseFloat(e.target.value))}
                />

                {questions.map((q, index) => (
                    <div key={index} className="bg-white border border-green-200 p-4 rounded-lg mb-4 shadow-sm">
                        <h3 className="text-lg font-semibold text-green-600">Question {index + 1}</h3>
                        <textarea
                           
                            placeholder="Enter Question"
                            className="border border-gray-300 p-2 rounded w-full mt-2 focus:ring focus:ring-green-100"
                            value={q.question}
                            onChange={(e) => handleChange(index, "question", e.target.value)}
                        />
                        {q.option.map((opt, optIndex) => (
                            <textarea
                                key={optIndex}
                                
                                placeholder={`Option ${optIndex + 1}`}
                                className="border border-gray-300 p-2 rounded w-full mt-2 focus:ring focus:ring-green-100"
                                value={opt}
                                onChange={(e) => handleChange(index, optIndex, e.target.value)}
                            />
                        ))}
                        <textarea
                            
                            placeholder="Correct Answer"
                            className="border border-gray-300 p-2 rounded w-full mt-2 focus:ring focus:ring-green-100"
                            value={q.answer}
                            onChange={(e) => handleChange(index, "answer", e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Marks"
                            className="border border-gray-300 p-2 rounded w-full mt-2 focus:ring focus:ring-green-100"
                            value={q.marks}
                            min="0"
                            onChange={(e) => handleChange(index, "marks", e.target.value)}
                        />
                    </div>
                ))}

                <div className="flex justify-between mt-5">
                    <button
                        className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
                        onClick={handleAddQuestion}
                    >
                        ➕ Add Question
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
                        onClick={handleSubmit}
                    >
                        ✅ Create Exam
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateExam;
