import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Intro from "./Pages/Intro";
import Signup from "./Components/Auth/Signup";
import HomePage from "./Pages/Home";
import CreateExam from "./ExamComp/examCreation";
import ExamList from "./ExamComp/examList";
// import TakeExam from "./ExamComp/TakeTest"

import Courses from "./CouresComp/CourseList";
import CourseDetail from "./CouresComp/CourseDetails";
import CreateCourse from "./CouresComp/CourseCreation";
import CourseDescription from "./CouresComp/Course";
import ExamConduct from "./ExamComp/TakeTest";
import Webhome from "./Pages/Wenpage";
import AdminDashboard from "./Pages/DashBoard";
import Dashboard from "./Pages/userDashBoard";
import AddAdvisor from "./Pages/AddAdvisors";
import Advisors from "./Pages/AboutAdvisors";



function App() {
  return (
    <Router >
      <Routes>

        <Route path="/" element={<Webhome/>}  />
        <Route path="/intro" element={<Intro/>}  />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/examCreation" element={<CreateExam/>} />
        <Route path="/examList" element={<ExamList/>} />
        <Route path="/exam/:examId" element={<ExamConduct/>} />
        
        <Route path="/courseCreation" element={<CreateCourse/>} />
        <Route path="/course" element={<Courses/>} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/courseDescription/:id" element={<CourseDescription />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/addAdvisors" element={<AddAdvisor/>} />
        <Route path="/advisors" element={<Advisors/>} />



      </Routes>
    </Router>
  );
}

export default App;
