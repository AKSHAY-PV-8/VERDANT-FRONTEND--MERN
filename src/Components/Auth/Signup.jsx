import { useState } from "react";
import axios from "axios";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");
  const ServerURL = import.meta.env.VITE_SERVER_URL;

  const handleRegister = async (e) => {
    e.preventDefault();
    seterror("");
    setsuccess("");
    try {
      await axios.post(`${ServerURL}/api/auth/register`, {
        name,
        email,
        password,
      });
      setsuccess("Successfully Signed Up");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        seterror("There is already an account with this email. Try another one.");
      } else if (err.response?.data?.message) {
        seterror(err.response.data.message);
      } else {
        seterror("Something went wrong during signup.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">Create Your Account</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-gray-400">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-500" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
                placeholder="Full Name"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="text-gray-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-500" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="text-gray-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
          >
            Sign Up
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
        </form>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-green-400 hover:text-green-300 cursor-pointer">
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
