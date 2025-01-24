import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance"; // Adjusted import
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css"; // Import the CSS file for styling

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const registerHandler = async (data) => {
    const { name, email, mobile, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axios.post("/register", { name, email, mobile, password });
      toast.success("Registered successfully!");
      navigate("/login"); // Redirect to login after successful registration
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(registerHandler)}
      className="register-form"
      noValidate
    >
      <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
          className={errors.name ? "error-input" : ""}
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
      </div>

      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className={errors.email ? "error-input" : ""}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}
      </div>

      <div className="form-group">
        <input
          type="tel"
          placeholder="Mobile Number"
          {...register("mobile", {
            required: "Mobile number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Mobile number must be 10 digits",
            },
          })}
          className={errors.mobile ? "error-input" : ""}
          aria-invalid={errors.mobile ? "true" : "false"}
        />
        {errors.mobile && (
          <p className="error-message">{errors.mobile.message}</p>
        )}
      </div>

      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className={errors.password ? "error-input" : ""}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}
      </div>

      <div className="form-group">
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
          })}
          className={errors.confirmPassword ? "error-input" : ""}
          aria-invalid={errors.confirmPassword ? "true" : "false"}
        />
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>

      <p className="redirect-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default Register;
