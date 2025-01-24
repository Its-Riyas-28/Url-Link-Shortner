import { useState } from "react";
import axios from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom"; // For navigation and linking
import "react-toastify/dist/ReactToastify.css";
import "./Login.css"; // Importing CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Both fields are required!");
      return;
    }

    try {
      const response = await axios.post("/login", { email, password });

      // Handle success
      toast.success("Login successful!");
      localStorage.setItem("token", response.data.token); // Save token in local storage
      navigate("/dashboard"); // Redirect to dashboard or any other page
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={loginHandler} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>
  Don&apos;t have an account? <Link to="/register">Register</Link>
</p>

      </form>
    </div>
  );
};

export default Login;
