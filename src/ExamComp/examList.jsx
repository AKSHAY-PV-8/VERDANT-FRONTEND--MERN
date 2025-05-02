import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import { Star, Clock, ArrowRight, Brain } from "lucide-react";
import NavBar from "../Components/Auth/NavBar";

const images = [
    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1576319155264-99536e0be1ee?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1559935384-3b5b2e7a5204?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1561553873-e8491a564fd0?auto=format&fit=crop&w=800&q=80"
];

const ExamList = () => {
    const ServerURL = import.meta.env.VITE_SERVER_URL;
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await fetch(`${ServerURL}/api/exam/exams`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure the user is authenticated
                    },
                });

                const data = await response.json();
                if (data.success && Array.isArray(data.exams)) {
                    setExams(data.exams);
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (err) {
                console.error("Error fetching exams:", err);
                setError("Failed to load exams. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchExams();
    }, []);

    return (
        <div>
            <NavBar/>
        <div className="min-h-screen bg-gray-50 py-8">
            <header className="text-center">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    Available Exams
                </h1>
                <p className="text-gray-600 text-lg mt-2">Choose an exam to test your skills</p>
            </header>

            <div className="max-w-5xl mx-auto py-8">
                <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards, Autoplay]} className="w-full max-w-md mx-auto" autoplay={{ delay: 3000 }}>
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative h-64 rounded-2xl overflow-hidden">
                                <img src={img} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 flex items-end p-4">
                                    <h3 className="text-white font-semibold">Featured Exam</h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <p className="text-gray-600 text-center col-span-full">Loading exams...</p>
                ) : error ? (
                    <p className="text-red-500 text-center col-span-full">{error}</p>
                ) : exams.length === 0 ? (
                    <p className="text-gray-600 text-center col-span-full">No exams available.</p>
                ) : (
                    exams.map((exam, index) => (
                        <div key={exam._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="relative h-48">
                                <img src={images[index % images.length]} alt={exam.title} className="w-full h-full object-cover" />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                    <span className="text-sm font-medium">4.5</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800">{exam.title}</h3>
                                <p className="text-gray-600 text-sm mt-1">
                                    {exam.description || "No description available"}
                                </p>
                                <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        <span>{exam.duration || "1 hr"}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Brain className="w-4 h-4 mr-1" />
                                        <span>{exam.question?.length || "N/A"} Questions</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate(`/exam/${exam._id}`)}
                                    className="w-full mt-4 bg-emerald-500 text-white py-2 rounded-lg flex items-center justify-center font-medium hover:bg-emerald-600 transition-colors"
                                >
                                    Attempt Exam
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
        </div>
    );
};

export default ExamList;







