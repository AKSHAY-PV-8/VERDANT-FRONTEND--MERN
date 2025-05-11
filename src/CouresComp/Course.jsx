import { useEffect, useState } from "react";
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../Components/Auth/NavBar";

const CourseDescription = () => {
    const [isHovered, setIsHovered] = useState(false);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();
    const ServerURL = import.meta.env.VITE_SERVER_URL;

    const userId = localStorage.getItem("userId");
    
    useEffect(() => {
        fetch(`${ServerURL}/api/examCourse/courses/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setCourse(data.course);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching course details:", err);
                setLoading(false);
            });
    }, [id]);

    const handlePayment = async () => {
        try {
            const response = await fetch(`${ServerURL}/api/payment/create-order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: course.price,
                    currency: "INR",
                }),
            });

            const data = await response.json();
            if (!data.success) {
                alert("Error creating order");
                return;
            }

            if (!window.Razorpay) {
                alert("Razorpay SDK failed to load. Check your internet connection.");
                return;
            }

            const options = {
                key: "rzp_test_tYHYoN9x7s83km",
                amount: data.order.amount,
                currency: data.order.currency,
                name: course.title,
                description: "Course Enrollment Payment",
                order_id: data.order.id,
                handler: async function (response) {
                    const verifyResponse = await fetch(`${ServerURL}/api/payment/verify-payment`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            userId: userId,
                            courseId: course._id
                        }),
                    });

                    const verifyData = await verifyResponse.json();
                    if (verifyData.success) {
                        alert("Payment Successful! Course Enrolled.");
                        navigate(`/dashboard`);
                    } else {
                        alert("Payment Verification Failed");
                    }
                },
                prefill: {
                    name: "User Name",
                    email: "user@example.com",
                    contact: "9876543210",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Error processing payment:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-700 text-lg">Loading course details...</p>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600 text-lg">Error loading course details.</p>
            </div>
        );
    }

    return (
        <div>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                        <div className="relative h-[250px] sm:h-[400px] overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80"
                                alt={course.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="p-6 sm:p-8">
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {course.category || "Web Development"}
                                </span>
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {course.level || "Advanced"}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-green-50 p-6 rounded-xl">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">What you will learn</h3>
                                    {course.exams && course.exams.length > 0 ? (
                                        course.exams.map((sec, index) => (
                                            <div key={index} className="flex items-center mb-3">
                                                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                                                <span className="text-gray-700">{sec.sectionTitle}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-700">Course content will be updated soon.</p>
                                    )}
                                </div>
                                <div className="bg-green-50 p-6 rounded-xl">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Prerequisites</h3>
                                    <ul className="space-y-3 text-gray-700">
                                        {course.prerequisites?.length > 0 ? (
                                            course.prerequisites.map((item, index) => <li key={index}>• {item}</li>)
                                        ) : (
                                            <p className="text-gray-700">No prerequisites specified.</p>
                                        )}
                                    </ul>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-green-50 p-6 rounded-xl space-y-4 sm:space-y-0">
                                <div>
                                    <p className="text-sm text-green-600 font-medium">Limited Time Offer</p>
                                    <div className="flex items-baseline">
                                        <span className="text-3xl sm:text-4xl font-bold text-gray-900">{course.price}₹</span>
                                        <span className="ml-2 text-gray-500 line-through">{course.originalPrice}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handlePayment}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    className="relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-green-600 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Enroll Now
                                    <ArrowRight className={`ml-2 w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDescription;
