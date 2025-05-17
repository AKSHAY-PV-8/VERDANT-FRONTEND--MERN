import { useState } from "react";
import axios from "axios";

const CourseCreationPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [prerequisites, setPrerequisites] = useState("");
  const [exams, setExams] = useState([]);
  const ServerURL = import.meta.env.VITE_SERVER_URL;

  const handleAddExam = () => {
    setExams([
      ...exams,
      {
        sectionTitle: "",
        negativeMarking: 0,
        duration: 0,
        questions: [
          {
            question: "",
            image: "",
            option: ["", "", "", ""],
            answer: "",
            marks: 1,
          },
        ],
      },
    ]);
  };

  const handleAddQuestion = (examIndex) => {
    const updatedExams = [...exams];
    updatedExams[examIndex].questions.push({
      question: "",
      image: "",
      option: ["", "", "", ""],
      answer: "",
      marks: 1,
    });
    setExams(updatedExams);
  };

  const handleChange = (examIndex, qIndex, field, value) => {
    const updatedExams = [...exams];
    updatedExams[examIndex].questions[qIndex][field] = value;
    setExams(updatedExams);
  };

  const handleOptionChange = (examIndex, qIndex, optIndex, value) => {
    const updatedExams = [...exams];
    updatedExams[examIndex].questions[qIndex].option[optIndex] = value;
    setExams(updatedExams);
  };

  // ✅ Upload image to backend (Cloudinary)
  const handleImageUpload = async (examIndex, qIndex, file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `${ServerURL}/api/examCourse/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          
        }
      );

      const imageUrl = res.data.imageUrl;
      const updatedExams = [...exams];
      updatedExams[examIndex].questions[qIndex].image = imageUrl;
      setExams(updatedExams);
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Image upload failed");
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${ServerURL}/api/examCourse/creation`, {
        title,
        description,
        price,
        prerequisites,
        exams,
      });

      alert("Course created successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setPrerequisites("");
      setExams([]);
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course");
    }
  };


  const handlePDFUpload = async (file) => {
  const formData = new FormData();
  formData.append("pdf", file);

  try {
    const response = await axios.post(`${ServerURL}/api/examCourse/generate-from-pdf`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const { courseData } = response.data;
    setTitle(courseData.title || "");
    setDescription(courseData.description || "");
    setPrerequisites(courseData.prerequisites?.join(", ") || "");
    setPrice(courseData.price || "");
    setExams(courseData.exams || []);

    alert("Course data generated from PDF successfully!");
  } catch (error) {
    console.error("Failed to process PDF", error);
    alert("PDF processing failed.");
  }
};


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
      <input
  type="file"
  accept="application/pdf"
  onChange={(e) => handlePDFUpload(e.target.files[0])}
  className="mb-4"
/>


      <input
        type="text"
        placeholder="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <textarea
        placeholder="Course Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <textarea
        placeholder="Prerequisites"
        value={prerequisites}
        onChange={(e) => setPrerequisites(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={handleAddExam}
        className="bg-blue-600 text-white px-4 py-2 mb-6 rounded"
      >
        + Add Exam
      </button>

      {exams.map((exam, examIndex) => (
        <div key={examIndex} className="border p-4 mb-6 rounded shadow">
          <input
            type="text"
            placeholder="Exam Title"
            value={exam.sectionTitle}
            onChange={(e) => {
              const newExams = [...exams];
              newExams[examIndex].sectionTitle = e.target.value;
              setExams(newExams);
            }}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="number"
            placeholder="Negative Marking"
            value={exam.negativeMarking}
            onChange={(e) => {
              const newExams = [...exams];
              newExams[examIndex].negativeMarking = parseFloat(e.target.value);
              setExams(newExams);
            }}
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="number"
            placeholder="Duration (minutes)"
            value={exam.duration}
            onChange={(e) => {
              const newExams = [...exams];
              newExams[examIndex].duration = parseFloat(e.target.value);
              setExams(newExams);
            }}
            className="w-full p-2 border rounded mb-4"
          />

          <button
            onClick={() => handleAddQuestion(examIndex)}
            className="bg-green-600 text-white px-3 py-1 mb-4 rounded"
          >
            + Add Question
          </button>

          {exam.questions.map((q, qIndex) => (
            <div key={qIndex} className="mb-4 border p-3 rounded bg-gray-50">
              <textarea
                placeholder="Question"
                value={q.question}
                onChange={(e) =>
                  handleChange(examIndex, qIndex, "question", e.target.value)
                }
                className="w-full p-2 border rounded mb-2"
              />

              {/* ✅ Image Upload */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageUpload(examIndex, qIndex, e.target.files[0])
                }
                className="mb-2"
              />

              {/* ✅ Show uploaded image preview */}
              {q.image && (
                <img
                  src={q.image}
                  alt="Uploaded"
                  className="w-32 h-32 object-cover mb-2 rounded border"
                />
              )}

              {q.option.map((opt, i) => (
                <textarea
                  key={i}
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) =>
                    handleOptionChange(examIndex, qIndex, i, e.target.value)
                  }
                  className="w-full p-2 border rounded mb-2"
                />
              ))}

              <input
                type="text"
                placeholder="Correct Answer"
                value={q.answer}
                onChange={(e) =>
                  handleChange(examIndex, qIndex, "answer", e.target.value)
                }
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="number"
                placeholder="Marks"
                value={q.marks}
                onChange={(e) =>
                  handleChange(examIndex, qIndex, "marks", parseInt(e.target.value))
                }
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-purple-700 text-white px-6 py-2 rounded"
      >
        Submit Course
      </button>
    </div>
  );
};

export default CourseCreationPage;
