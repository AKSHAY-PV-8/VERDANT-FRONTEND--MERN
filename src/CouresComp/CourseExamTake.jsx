import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Components/Auth/NavBar';

const AttendExam = () => {
  const { id, examIndex } = useParams();
  const [examData, setExamData] = useState(null);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState({ score: 0, answers: [] });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);


  useEffect(() => {
    axios.get(`http://localhost:3000/api/examCourse/courses/${id}`)
      .then(res => {
        const exam = res.data.course.exams[examIndex];
        setExamData(exam);
        setTimeLeft(exam.duration * 60);
      })
      .catch(err => console.error(err));
  }, [id, examIndex]);

  const handleOptionChange = (qIndex, value) => {
    setResponses({ ...responses, [qIndex]: value });
  };

  useEffect(() => {
    if (!submitted && timeLeft !== null) {
      if (timeLeft === 0) {
        handleSubmit(); // Auto-submit when time is up
      }
  
      const timer = setInterval(() => {
        setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
      }, 1000);
  
      return () => clearInterval(timer); // cleanup
    }
  }, [timeLeft, submitted]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleClear = () => {
    setResponses(prev => {
      const updated = { ...prev };
      delete updated[currentQuestion];
      return updated;
    });
  };

  const handleSubmit = () => {
    let score = 0;
    let answerList = [];

    examData.questions.forEach((q, i) => {
      const userAns = responses[i];
      const isCorrect = userAns === q.answer;
      if (isCorrect) score += q.marks;
      else if (userAns && userAns !== q.answer) score -= examData.negativeMarking;

      answerList.push({
        question: q.question,
        correct: q.answer,
        user: userAns,
        isCorrect,
      });
    });

    setSubmitted(true);
    setResult({ score, answers: answerList });

    window.alert("Exam is over! Your results are now visible.");
  };

  const isAnswered = (index) => responses.hasOwnProperty(index);

  return (
    <div>
      <NavBar/>
    <div className="flex flex-col md:flex-row p-4">
        <div className="text-lg font-bold text-red-600 mb-4">
          Time Left: {formatTime(timeLeft)}
       </div>
      {examData ? (
        <>
          {/* Sidebar with question status */}
          <div className="md:w-1/4 mb-4 md:mb-0 md:mr-4">
            <h3 className="text-lg font-semibold mb-2">Question Status</h3>
            <div className="grid grid-cols-5 gap-2">
              {examData.questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestion(idx)}
                  className={`w-10 h-10 rounded-full text-white font-bold ${
                    isAnswered(idx) ? 'bg-green-500' : 'bg-gray-400'
                  } ${currentQuestion === idx ? 'ring-4 ring-blue-500' : ''}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Question and navigation */}
          <div className="md:w-3/4">
            <h2 className="text-xl font-bold mb-4">{examData.sectionTitle}</h2>

            {!submitted ? (
              <div>
                {/* Single question display */}
                <div className="mb-4 border p-4 rounded">
                  <p className="font-semibold">
                    {currentQuestion + 1}. {examData.questions[currentQuestion].question}
                  </p>
                  {examData.questions[currentQuestion].option.map((opt, i) => (
                    <div key={i}>
                      <label>
                        <input
                          type="radio"
                          name={`q-${currentQuestion}`}
                          value={opt}
                          checked={responses[currentQuestion] === opt}
                          onChange={() => handleOptionChange(currentQuestion, opt)}
                          className="mr-2"
                        />
                        {opt}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center space-x-4 mb-4">
                  <button
                    disabled={currentQuestion === 0}
                    onClick={() => setCurrentQuestion(prev => prev - 1)}
                    className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <button
                    onClick={handleClear}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Clear
                  </button>

                  <button
                    disabled={currentQuestion === examData.questions.length - 1}
                    onClick={() => setCurrentQuestion(prev => prev + 1)}
                    className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-6 py-2 rounded"
                >
                  Submit Exam
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl text-green-600 font-bold">Your Score: {result.score}</h3>
                <h4 className="mt-4 text-lg font-semibold">Answer Review</h4>
                {result.answers.map((a, i) => (
                  <div key={i} className="p-2 border mt-2 rounded">
                    <p><strong>Q:</strong> {a.question}</p>
                    <p><strong>Your Answer:</strong> {a.user || "Not Answered"}</p>
                    <p><strong>Correct Answer:</strong> {a.correct}</p>
                    <p className={a.isCorrect ? "text-green-600" : "text-red-600"}>
                      {a.isCorrect ? "Correct" : "Incorrect"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <p>Loading Exam...</p>
      )}
    </div>
    </div>
  );
};

export default AttendExam;
