import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../Components/Auth/NavBar";

const CourseDescription = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const ServerURL = import.meta.env.VITE_SERVER_URL;
  const RazorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const userId = localStorage.getItem("userId");

  const FREE_ACCESS_EMAILS = ['67df244160e5e454b2a8b875', '6814e208b2d8957624cc7438'];
  const ENROLL_ALLOWED_COURSE_IDS = [
    '682d4f6954bb2a564a232de0',
    '681f917f1c9fc1ea279ac8b1',
    '682d647120274ad4cbd4843b',
    '6849a5ae09df946673271375',
    '6849b72fc1e6ed2eb1994188'
  ];

  useEffect(() => {
    if (!userId) {
      alert("Please login to view this course.");
      navigate("/login");
      return;
    }

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
  setShowAlert(true);

  setTimeout(async () => {
    setShowAlert(false);

    if (FREE_ACCESS_EMAILS.includes(userId)) {
      navigate(`/course/${course._id}`);
      return;
    }

    try {
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded.");
        return;
      }

      const res = await fetch(`${ServerURL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: course.price,
          currency: "INR",
        }),
      });

      const data = await res.json();
      if (!data.success) {
        alert("Failed to create Razorpay order.");
        return;
      }

      const { order } = data;

      const options = {
        key: RazorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: course.title,
        description: "Course Enrollment Payment",
        order_id: order.id,
        handler: async function (response) {
          const verifyRes = await fetch(`${ServerURL}/api/payment/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: userId,
              courseId: course._id,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert("Payment successful! Course enrolled.");
            navigate(`/dashboard`);
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: "Your Name",
          email: "your-email@example.com",
          contact: "9999999999",
        },
        theme: { color: "#34d399" },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: false,
        },
        upi: { flow: "intent" },
        modal: {
          ondismiss: async function () {
            // Fallback: Poll the server to check payment status
            try {
              const statusRes = await fetch(`${ServerURL}/api/payment/check-status/${order.id}`);
              const statusData = await statusRes.json();

              if (statusData.success && statusData.status === "paid") {
                const enrollRes = await fetch(`${ServerURL}/api/payment/enroll-course`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    userId,
                    courseId: course._id,
                    orderId: order.id,
                  }),
                });

                const enrollData = await enrollRes.json();
                if (enrollData.success) {
                  alert("Payment successful via QR. Course enrolled!");
                  navigate("/dashboard");
                } else {
                  alert("Enrollment failed after QR payment.");
                }
              } else {
                alert("Payment cancelled or failed.");
              }
            } catch (err) {
              console.error("Error checking fallback payment:", err);
              alert("Error verifying payment. Try again.");
            }
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again.");
    }
  }, 3000);
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
        <p className="text-red-600 text-lg">Error loading course details......</p>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      {showAlert && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-green-300 text-green-100 px-6 py-3 rounded-xl shadow-lg z-50 transition-opacity duration-300">
          Please wait... After successful payment, you’ll be redirected to your dashboard.
        </div>
      )}

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">What you will learn</h3>
                  {course.exams?.length > 0 ? (
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
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-green-50 p-6 rounded-xl space-y-4 sm:space-y-0">
                <div>
                  <p className="text-sm text-green-600 font-medium">Limited Time Offer</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-green-800">₹{course.price}</span>
                  </div>
                </div>

                {ENROLL_ALLOWED_COURSE_IDS.includes(course._id) ? (
                  <button
                    onClick={handlePayment}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300"
                  >
                    Enroll Now
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-gray-400 text-white font-semibold py-3 px-6 rounded-xl cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDescription;
