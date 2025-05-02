import axios from "axios";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state
  const ServerURL = import.meta.env.VITE_SERVER_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true); // ✅ start loading

    try {
      const response = await axios.post(`${ServerURL}/api/auth/login`, {
        email: username,
        password: password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("user", JSON.stringify(user));

      setSuccess("Successfully Logged In");

      // Delay just for user feedback
      setTimeout(() => {
        setLoading(false); // ✅ stop loading
        if (user.isAdmin) {
          navigate("/admin-dashboard");
        } else {
          navigate("/home");
        }
      }, 1000);
    } catch (err) {
      setLoading(false); // ✅ stop loading on error
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">Welcome Back!</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-gray-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-500" />
              <input
                id="email"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold rounded-lg transition duration-200 
              ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"} 
              text-white flex items-center justify-center`}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            ) : null}
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
        </form>

        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")} className="text-green-400 hover:text-green-300 underline">
            Sign up now
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
