import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Components/Auth/NavBar';

const AttendExam = () => {
  const { id, examIndex } = useParams();
  const [examData, setExamData] = useState(null);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState({ score: 0, answers: [], correctCount: 0, wrongCount: 0, unansweredCount: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [visitedQuestions, setVisitedQuestions] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(null);
  const ServerURL = import.meta.env.VITE_SERVER_URL;

  const hasSubmittedRef = useRef(false);

  useEffect(() => {
    axios
      .get(`${ServerURL}/api/examCourse/courses/${id}`)
      .then((res) => {
        const exam = res.data.course.exams[examIndex];
        setExamData(exam);
        setTimeLeft(exam.duration * 60);
      })
      .catch((err) => console.error(err));
  }, [id, examIndex]);

  useEffect(() => {
    if (submitted || timeLeft === null || hasSubmittedRef.current) return;

    if (timeLeft === 0) {
      handleSubmit(true);
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleOptionChange = (qIndex, value) => {
    setResponses({ ...responses, [qIndex]: value });
  };

  const handleClear = () => {
    setResponses((prev) => {
      const updated = { ...prev };
      delete updated[currentQuestion];
      return updated;
    });
  };

  const handleSubmit = async (autoSubmit = false) => {
    if (hasSubmittedRef.current || !examData) return;

    if (!autoSubmit) {
      const confirmSubmit = window.confirm("📝 Are you sure you want to submit the exam?");
      if (!confirmSubmit) return;
    }

    hasSubmittedRef.current = true;

    const submittedAnswers = examData.questions.map((_, index) => responses[index] || "");

    try {
      const res = await axios.post(`${ServerURL}/api/examCourse/marks/${examData._id}`, {
        answers: submittedAnswers,
        userId: localStorage.getItem("userId")
      });

      const { totalMarks, correctAnswers } = res.data;

      const answerList = correctAnswers.map((ans, idx) => ({
        question: ans.question,
        correct: ans.correctAnswer,
        user: ans.submittedAnswer,
        isCorrect: ans.isCorrect,
        options: examData.questions[idx].option,
        image: examData.questions[idx].image || null
      }));

      const correctCount = answerList.filter(a => a.isCorrect).length;
const unansweredCount = answerList.filter(a => a.user === "Not Answered").length;
const wrongCount = answerList.filter(a => a.user !== "Not Answered" && !a.isCorrect).length;


      setSubmitted(true);
      setCurrentQuestion(0);
      setResult({ score: totalMarks, answers: answerList, correctCount, wrongCount, unansweredCount });

      if (!autoSubmit) {
        window.alert('✅ Exam submitted successfully! You can now view your answers.');
      }
    } catch (error) {
      console.error("Error submitting exam:", error);
      alert("❌ Failed to submit exam. Please try again.");
    }
  };

  const isAnswered = (index) => responses.hasOwnProperty(index);

  const handleQuestionClick = (idx) => {
    setCurrentQuestion(idx);
    setVisitedQuestions((prev) => new Set(prev).add(idx));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <NavBar />

      {!submitted && (
        <div className="fixed top-4 right-6 mt-12 bg-white shadow-md border text-red-600 font-bold px-4 py-2 rounded z-50">
          ⏱ Time Left: {formatTime(timeLeft)}
        </div>
      )}

      <div className="flex flex-col md:flex-row flex-1 p-4">
        {examData ? (
          <>
            <div className="md:w-1/4 mb-4 md:mb-0 md:mr-4">
              <div className="bg-white shadow-md rounded-lg p-4 h-full">
                <h3 className="text-lg font-semibold mb-4">📝 Exam Summary</h3>

                {!submitted ? (
                  <div className="text-sm mb-4">
                    <p>
                      ✅{' '}
                      <span className="text-green-600 font-medium">
                        Attended: {Object.keys(responses).length}
                      </span>
                      <br />
                      ❌{' '}
                      <span className="text-red-600 font-medium">
                        Not Attended: {examData.questions.length - Object.keys(responses).length}
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className="text-sm mb-4">
                    <p className="text-green-600 font-semibold">
                      ✅ Correct: {result.correctCount}
                    </p>
                    <p className="text-red-600 font-semibold">
                      ❌ Wrong: {result.wrongCount}
                    </p>
                    <p className="text-yellow-600 font-semibold">
                      ⚠️ Unanswered: {result.unansweredCount}
                    </p>
                    <p className="text-blue-600 font-semibold">
                      🏆 Total Score: {result.score}
                    </p>
                  </div>
                )}

                <div className="h-72 overflow-y-auto border rounded-md p-2 bg-gray-50">
                  <div className="grid grid-cols-5 gap-2">
                    {examData.questions.map((_, idx) => {
                      let bgColor = 'bg-gray-300';

                      if (submitted) {
                        const answer = result.answers[idx];
                        if (!answer.user || answer.user === "Not Answered") {
                          bgColor = 'bg-yellow-300';
                        } else if (answer.isCorrect) {
                          bgColor = 'bg-green-300';
                        } else {
                          bgColor = 'bg-red-300';
                        }
                      } else {
                        if (isAnswered(idx)) {
                          bgColor = 'bg-green-200';
                        } else if (visitedQuestions.has(idx)) {
                          bgColor = 'bg-red-200';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleQuestionClick(idx)}
                          className={`w-10 h-10 rounded-full font-bold text-sm ${bgColor} ${
                            currentQuestion === idx ? 'ring-4 ring-purple-500' : ''
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-3/4 h-[calc(100vh-100px)] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">{examData.sectionTitle}</h2>

              {!submitted ? (
                <div className="bg-white shadow-md rounded-lg p-6 whitespace-pre-line">
                  <p className="font-semibold text-lg mb-4">
                    {currentQuestion + 1}. {examData.questions[currentQuestion].question}
                  </p>

                  {examData.questions[currentQuestion].image && (
                    <img
                      src={examData.questions[currentQuestion].image}
                      alt="Question"
                      className="w-full h-64 object-contain mb-4 rounded border"
                    />
                  )}

                  {examData.questions[currentQuestion].option.map((opt, i) => (
                    <div key={i} className="mb-2">
                      <label className="inline-flex items-center">
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

                  <div className="flex flex-wrap items-center gap-4 mt-6">
                    <button
                      disabled={currentQuestion === 0}
                      onClick={() => {
                        const prev = currentQuestion - 1;
                        setCurrentQuestion(prev);
                        setVisitedQuestions((prevSet) => new Set(prevSet).add(prev));
                      }}
                      className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                      Previous
                    </button>

                    <button
                      onClick={handleClear}
                      className="bg-red-400 text-white px-4 py-2 rounded"
                    >
                      Clear Answer
                    </button>

                    <button
                      disabled={currentQuestion === examData.questions.length - 1}
                      onClick={() => {
                        const next = currentQuestion + 1;
                        setCurrentQuestion(next);
                        setVisitedQuestions((prevSet) => new Set(prevSet).add(next));
                      }}
                      className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={handleSubmit}
                      className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-700"
                    >
                      Submit Exam
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white shadow-md rounded-lg p-6">
                  <p className="text-lg font-semibold mb-2">
                    {currentQuestion + 1}. {result.answers[currentQuestion].question}
                  </p>

                  {result.answers[currentQuestion].image && (
                    <img
                      src={result.answers[currentQuestion].image}
                      alt="Question"
                      className="w-full h-64 object-contain mb-4 rounded border"
                    />
                  )}

                  <div className="mb-2">
                    <strong>Options:</strong>
                    <ul className="list-disc ml-6">
                      {result.answers[currentQuestion].options.map((opt, idx) => (
                        <li key={idx}>{opt}</li>
                      ))}
                    </ul>
                  </div>

                  <p>
                    <strong>Your Answer:</strong>{' '}
                    <span
                      className={
                        result.answers[currentQuestion].isCorrect
                          ? 'text-green-600'
                          : 'text-red-600'
                      }
                    >
                      {result.answers[currentQuestion].user || 'Not Answered'}
                    </span>
                  </p>

                  <p>
                    <strong>Correct Answer:</strong>{' '}
                    <span className="text-green-700">
                      {result.answers[currentQuestion].correct}
                    </span>
                  </p>

                  {!result.answers[currentQuestion].isCorrect && (
                    <p className="text-red-600 font-semibold">Incorrect Answer</p>
                  )}

                  <div className="flex items-center space-x-4 mt-6">
                    <button
                      disabled={currentQuestion === 0}
                      onClick={() => setCurrentQuestion(currentQuestion - 1)}
                      className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      disabled={currentQuestion === result.answers.length - 1}
                      onClick={() => setCurrentQuestion(currentQuestion + 1)}
                      className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-lg text-gray-600">Loading exam...</p>
        )}
      </div>
    </div>
  );
};

export default AttendExam;
