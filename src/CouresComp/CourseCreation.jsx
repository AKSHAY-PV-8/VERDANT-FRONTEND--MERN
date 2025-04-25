import { useState } from "react";

const CreateCourse = () => {
    const ServerURL = import.meta.env.VITE_SERVER_URL;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [prerequisites, setPrerequisites] = useState("");
    const [section, setSections] = useState([
        { sectionTitle: "", notes: "", video: "", mockTest: [{ question: "", options: ["", "", "", ""], answer: "" }] }
    ]);

    // Add a new section
    const handleAddSection = () => {
        setSections([...section, { sectionTitle: "",sectionDescription: "", notes: "", typeNotes: "", video: "", mockTest: [{ question: "", options: ["", "", "", ""], answer: "" }] }]);
    };

    // Add a new mock test to a section
    const handleAddMockTest = (sectionIndex) => {
        const newSections = [...section];
        newSections[sectionIndex].mockTest.push({ question: "", options: ["", "", "", ""], answer: "" });
        setSections(newSections);
    };

    // Handle change in input fields
    const handleChange = (sectionIndex, field, value) => {
        const newSections = [...section];
        newSections[sectionIndex][field] = value;
        setSections(newSections);
    };

    // Handle changes in mock test fields
    const handleMockTestChange = (sectionIndex, mockTestIndex, field, value) => {
        const newSections = [...section];
        if (field === "question" || field === "answer") {
            newSections[sectionIndex].mockTest[mockTestIndex][field] = value;
        } else {
            newSections[sectionIndex].mockTest[mockTestIndex].options[field] = value;
        }
        setSections(newSections);
    };

    // Handle option change inside mock test
    const handleOptionChange = (sectionIndex, mockTestIndex, optionIndex, value) => {
        const newSections = [...section];
        newSections[sectionIndex].mockTest[mockTestIndex].options[optionIndex] = value;
        setSections(newSections);
    };

    const handleFileChange = (sectionIndex, field, file) => {
        const newSections = [...section];
        newSections[sectionIndex][field] = file;
        setSections(newSections);
    };

    // Handle form submission
    

    const handleSubmit = () => {
        console.log("Submitting form...");
    
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("prerequisites", prerequisites);
        formData.append("section", JSON.stringify(section));
    
        section.forEach((sec, index) => {
            console.log(`Processing Section ${index}:`, sec);
    
            if (sec.notes) {
                console.log(`Adding Notes File:`, sec.notes);
                formData.append(`notes`, sec.notes); // Use "notes" instead of "notes_0"
            }
            if (sec.video) {
                console.log(`Adding Video File:`, sec.video);
                formData.append(`video`, sec.video); // Use "video" instead of "video_0"
            }
        });
    
        fetch(`${ServerURL}/api/course/create`, {
            method: "POST",
            body: formData
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("Server Response:", data);
            if (data.success) {
                alert("Course Created Successfully!");
                setTitle("");
                setDescription("");
                setPrice("");
                setPrerequisites("");
                setSections([{ sectionTitle: "",sectionDescription: "", notes: "", typeNotes: "", video: "", mockTest: [{ question: "", options: ["", "", "", ""], answer: "" }] }]);
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch((err) => console.error("Error creating course:", err));
    };

    return (
        <div className="p-5">
            <h2 className="text-xl font-bold mb-4">Create New Course</h2>
            <input type="text" placeholder="Course Title" className="border p-2 mb-3 w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Course Description" className="border p-2 mb-3 w-full" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="text" placeholder="price ... should in number" className="border p-2 mb-3 w-full" value={price} onChange={(e) => setPrice(e.target.value)} />
            <textarea placeholder="prerequisites" className="border p-2 mb-3 w-full" value={prerequisites} onChange={(e) => setPrerequisites(e.target.value)} />


            {section.map((section, sectionIndex) => (
                <div key={sectionIndex} className="border p-3 mb-2">
                    <input type="text" placeholder="Section Title" className="border p-2 w-full mb-2" value={section.sectionTitle} onChange={(e) => handleChange(sectionIndex, "sectionTitle", e.target.value)} />
                    <input type="text" placeholder="section Description" className="border p-2 w-full mb-2" value={section.sectionDescription} onChange={(e) => handleChange(sectionIndex, "sectionDescription", e.target.value)} />
                    <textarea name="typeNotes" placeholder="if you have any extra notes" className="border p-2 w-full mb-2" value={section.typeNotes} onChange={(e) => handleChange(sectionIndex, "typeNotes", e.target.value)} />
                    <input type="file" placeholder="pdf" accept="application/pdf" className="border p-2 w-full mb-2" onChange={(e) => handleFileChange(sectionIndex, "notes", e.target.files[0])} />
                    <input type="file" placeholder="video" className="border p-2 w-full mb-2" accept="video/*" onChange={(e) => handleFileChange(sectionIndex, "video", e.target.files[0])} />

                    {section.mockTest.map((mock, mockIndex) => (
                        <div key={mockIndex} className="border p-2 mb-2">
                            <input type="text" placeholder="Mock Question" className="border p-2 w-full" value={mock.question} onChange={(e) => handleMockTestChange(sectionIndex, mockIndex, "question", e.target.value)} />

                            {mock.options.map((opt, optIndex) => (
                                <input
                                    key={optIndex}
                                    type="text"
                                    placeholder={`Option ${optIndex + 1}`}
                                    className="border p-2 w-full mt-1"
                                    value={opt}
                                    onChange={(e) => handleOptionChange(sectionIndex, mockIndex, optIndex, e.target.value)}
                                />
                            ))}

                            <input type="text" placeholder="Correct Answer" className="border p-2 w-full mt-2" value={mock.answer} onChange={(e) => handleMockTestChange(sectionIndex, mockIndex, "answer", e.target.value)} />
                        </div>
                    ))}
                    <button onClick={() => handleAddMockTest(sectionIndex)} className="px-3 py-2 bg-green-500 text-white rounded mt-2">Add Mock Test</button>
                </div>
            ))}
            <button onClick={handleAddSection} className="px-3 py-2 bg-yellow-500 text-white rounded mt-2">Add Section</button>
            <button onClick={handleSubmit} className="px-3 py-2 bg-blue-500 text-white cursor-pointer rounded ml-2">Create Course</button>
        </div>
    );
};

export default CreateCourse;
