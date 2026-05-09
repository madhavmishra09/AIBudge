import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, setAuthToken } from "./authService";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { token } = await loginUser(formData);
      setAuthToken(token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="font-mont flex flex-col items-center justify-center min-h-screen px-4 bg-purple-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h2 className="font-mont text-2xl text-center p-2 font-bold">Login to your account</h2>
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
        <label htmlFor="emailID" className="font-mont font-bold mb-4 block">Email Address</label>
        <input type="email" name="email" id="emailID" placeholder="Enter Email" value={formData.email} onChange={handleChange} required className="font-mont border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300 w-full" />
        <label htmlFor="password" className="font-mont font-bold mb-4 block">Password</label>
        <input type="password" name="password" id="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required className="font-mont border border-gray-300 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300 w-full" />
        <div className="flex items-center justify-between text-sm mb-4">
          <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-700">Forgot Password?</Link>
        </div>
        <button type="submit" className="font-mont bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-110 mx-auto block">
          Login
        </button>
      </form>
    </div>
  );
}
