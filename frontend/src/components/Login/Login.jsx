import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const loginHandler = async (data) => {
    const { email, password } = data;

    try {
      const response = await axios.post("/login", { email, password });
      const { name } = response.data.user; // Extract the name from the response
      localStorage.setItem("userName", name); // Store the name in localStorage
      toast.success("Logged in successfully!");
      navigate("/dashboard"); // Redirect to the dashboard
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-image">
        <img
          src={
            "https://res.cloudinary.com/dikzsipnp/image/upload/v1737923237/llc9q5natreqjv8psrq4.png"
          }
          alt="Login"
        />
      </div>
      <div className="login-form-container">
        <form
          onSubmit={handleSubmit(loginHandler)}
          className="login-form"
          noValidate
        >
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className={errors.email ? "error-input" : ""}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className={errors.password ? "error-input" : ""}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          <p className="redirect-link">
            Don&apos;t have an account? <Link to="/register">SignUp</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
