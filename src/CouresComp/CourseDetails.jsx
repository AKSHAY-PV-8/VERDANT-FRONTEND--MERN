import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronRight, ChevronDown } from 'lucide-react'; // Make sure lucide-react is installed
import NavBar from '../Components/Auth/NavBar';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [expandedExamIndex, setExpandedExamIndex] = useState(null);
  const navigate = useNavigate();
  const ServerURL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    axios
      .get(`${ServerURL}/api/examCourse/courses/${id}`)
      .then((res) => setCourse(res.data.course))
      .catch((err) => console.error(err));
  }, [id]);

  const toggleExamDetails = (index) => {
    setExpandedExamIndex(expandedExamIndex === index ? null : index);
  };

  const handleExamClick = (examIndex) => {
    if (window.confirm("You are about to start this exam. Proceed?")) {
      navigate(`/attend-exam/${id}/${examIndex}`);
    }
  };

  return (
    <div>
      <NavBar/>
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
     
      {course ? (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-green-600 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-md">{course.description}</p>
          </div>

          {/* Exams List */}
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Exams in this Course</h2>

            {course.exams.map((exam, index) => {
              const isExpanded = expandedExamIndex === index;
              const totalMarks = exam.questions.reduce((sum, q) => sum + q.marks, 0);

              return (
                <div
                  key={index}
                  className="border border-green-300 rounded-lg mb-4 transition-shadow shadow-sm hover:shadow-md bg-white"
                >
                  <div
                    onClick={() => toggleExamDetails(index)}
                    className="flex justify-between items-center p-4 cursor-pointer bg-green-100 hover:bg-green-200 rounded-t-lg"
                  >
                    <h3 className="text-lg font-semibold text-green-900">
                      {exam.sectionTitle}
                    </h3>
                    {isExpanded ? (
                      <ChevronDown className="text-green-700 w-5 h-5" />
                    ) : (
                      <ChevronRight className="text-green-700 w-5 h-5" />
                    )}
                  </div>

                  {isExpanded && (
                    <div className="p-4 bg-white text-gray-700">
                      <p className="mb-1">
                        <strong>Negative Marking:</strong> {exam.negativeMarking}
                      </p>
                      <p className="mb-1">
                        <strong>Total Questions:</strong> {exam.questions.length}
                      </p>
                      <p className="mb-4">
                        <strong>Total Marks:</strong> {totalMarks}
                      </p>
                      <p className="mb-4">
                        <strong>Duration:</strong> {exam.duration} minutes
                      </p>
                      <button
                        onClick={() => handleExamClick(index)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition duration-300"
                      >
                        Attend Exam
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 text-xl mt-20">Loading course details...</div>
      )}
    </div>
    </div>
  );
};

export default CourseDetail;














// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { BookOpen, ChevronRight, GraduationCap,} from "lucide-react";

// const CourseDetails = () => {
//     const { id } = useParams();
//     const [course, setCourse] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [activeSection, setActiveSection] = useState(null);
//     // const [selectedAnswers, setSelectedAnswers] = useState({});
//     const ServerURL = import.meta.env.VITE_SERVER_URL;

//     useEffect(() => {
//         fetch(`${ServerURL}/api/examCourse/courses/${id}`)
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data.success) {
//                     setCourse(data.course);
//                 }
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.error("Error fetching course details:", err);
//                 setLoading(false);
//             });
//     }, [id]);

//     // const handleAnswerSelection = (sectionIndex, questionIndex, option, correctAnswer) => {
//     //     setSelectedAnswers((prev) => ({
//     //         ...prev,
//     //         [`${sectionIndex}-${questionIndex}`]: {
//     //             selected: option,
//     //             isCorrect: option === correctAnswer,
//     //         },
//     //     }));
//     // };

//     if (loading) return <p className="text-center text-gray-600">Loading...</p>;
//     if (!course) return <p className="text-center text-gray-600">Course not found.</p>;

//     return (
//         <div className="min-h-screen bg-emerald-50">
//             <div className="bg-white shadow-lg p-6">
//                 <div className="max-w-7xl mx-auto flex items-center space-x-4">
//                     <div className="p-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl shadow-lg">
//                         <GraduationCap className="w-8 h-8 text-white" />
//                     </div>
//                     <div className="flex-1">
//                         <h1 className="text-3xl font-bold text-gray-800 mb-2">{course.title}</h1>
//                         <p className="text-gray-600">{course.description}</p>
//                         {/* <div className="mt-2 flex items-center space-x-2">
//                             <Star className="w-5 h-5 text-yellow-400" />
//                             <span className="text-gray-700 font-semibold">{course.rating} / 5</span>
//                             <span className="text-gray-500">({course.duration} hours)</span>
//                         </div> */}
//                     </div>
//                 </div>
//             </div>

//             <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 <div className="lg:col-span-1 bg-white rounded-xl shadow-lg overflow-hidden">
//                     <h2 className="text-lg font-semibold p-4 border-b bg-gradient-to-r from-emerald-50 to-white">Course Sections</h2>
//                     <div className="divide-y divide-gray-100">
//                         {course.exams.map((sec, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => setActiveSection(activeSection === index ? null : index)}
//                                 className="w-full text-left p-4 hover:bg-emerald-50 flex items-center justify-between group"
//                             >
//                                 <div className="flex items-center space-x-3">
//                                     <div className="p-2 rounded-lg bg-gray-100 text-gray-500">
//                                         <BookOpen className="w-5 h-5" />
//                                     </div>
//                                     <p className="font-medium text-gray-800 group-hover:text-emerald-600">{sec.sectionTitle}</p>
//                                 </div>
//                                 <button 
//                                 onClick={() => navigator(`/courseexam/${}`)} >
//                                     Exam
//                                 </button>
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
//                     {activeSection !== null ? (
//                         <>
//                             <h2 className="text-2xl font-bold text-gray-800 mb-6">{course.section[activeSection].sectionTitle}</h2>
//                             {course.section[activeSection].video && (
//                                 <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
//                                     <video width="100%" controls className="rounded-lg">
//                                         <source src={`${ServerURL}/${course.section[activeSection].video}`} type="video/mp4" />
//                                         Your browser does not support the video tag.
//                                     </video>
//                                 </div>
//                             )}

//                             {course.section[activeSection].notes && (
//                                 <div className="mb-8">
//                                     <h3 className="font-semibold flex items-center text-lg mb-2">
//                                         <FileText className="w-5 h-5 mr-2 text-green-400" /> Course Notes
//                                     </h3>
//                                     <a href={`${ServerURL}/${course.section[activeSection].notes}`} target="_blank" rel="noopener noreferrer" className="block text-purple-400 hover:underline text-lg">
//                                         View PDF
//                                     </a>
//                                 </div>
//                             )} */}

//                             {/* {course.section[activeSection].mockTest && course.section[activeSection].mockTest.length > 0 && (
//                                 <div className="mt-6">
//                                     <h3 className="font-semibold text-lg">Mock Test</h3>
//                                     {course.section[activeSection].mockTest.map((test, testIdx) => {
//                                         const answerState = selectedAnswers[`${activeSection}-${testIdx}`] || {};
//                                         return (
//                                             <div key={testIdx} className="border border-gray-300 p-4 mt-3 rounded-lg">
//                                                 <p className="font-medium">{test.question}</p>
//                                                 <ul className="mt-2">
//                                                     {test.options.map((opt, optIdx) => (
//                                                         <li
//                                                             key={optIdx}
//                                                             className={`p-2 rounded-md cursor-pointer mt-1 transition ${
//                                                                 answerState.selected === opt
//                                                                     ? answerState.isCorrect
//                                                                         ? "bg-green-500 text-white"
//                                                                         : "bg-red-500 text-white"
//                                                                     : "bg-gray-100 hover:bg-gray-200"
//                                                             }`}
//                                                             onClick={() => handleAnswerSelection(activeSection, testIdx, opt, test.answer)}
//                                                         >
//                                                             {opt}
//                                                             {answerState.selected === opt && (
//                                                                 answerState.isCorrect ? (
//                                                                     <CheckCircle className="inline ml-2" />
//                                                                 ) : (
//                                                                     <XCircle className="inline ml-2" />
//                                                                 )
//                                                             )}
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                                 {answerState.selected && !answerState.isCorrect && (
//                                                     <p className="text-red-500 font-bold mt-2">Correct Answer: {test.answer}</p>
//                                                 )}
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                 //             )} */}
//                          {/* </>
//                      ) : (
//                          <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
//                              <BookOpen className="w-16 h-16 text-emerald-300 mb-4" />
//                              <p className="text-lg">Select a section to view its content</p>
//                         </div>
//                     )}
//                  </div>
//             </div> */}
//         </div>
//         </div>
//     );
// };

// export default CourseDetails;
