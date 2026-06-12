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
import AttendExam from "./CouresComp/CourseExamTake";
import CourseListPage from "./CouresComp/CourseListAdmin";
import CourseEditPage from "./CouresComp/CourseEdit";
import ComingSoon from "./Pages/ComingSoon";
import ComingSoon1 from "./Pages/ComingSoon1";
import ComingSoon2 from "./Pages/ComingSoon2";
import ScrollToTop from "./Components/Utils/ScrollToTop";



function App() {
  return (
    <Router >
      <ScrollToTop />
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
        <Route path="/attend-exam/:id/:examIndex" element={<AttendExam />} />
        <Route path="/courseDescription/:id" element={<CourseDescription />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<CourseListPage />} />
        <Route path="/edit-course/:id" element={<CourseEditPage />} />

        <Route path="/addAdvisors" element={<AddAdvisor/>} />
        <Route path="/advisors" element={<Advisors/>} />

        <Route path="/comingSoon" element={<ComingSoon/>} />
        <Route path="/comingSoon1" element={<ComingSoon1/>} />
        <Route path="/comingSoon2" element={<ComingSoon2/>} />



      </Routes>
    </Router>
  );
}

export default App;
