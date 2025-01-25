import axios from "axios";

const instance = axios.create({
  baseURL: "https://url-link-shortner-backend.onrender.com/api/v1", // Backend URL
  withCredentials: true, // Allow cookies
});

// https://url-link-shortner-backend.onrender.com
export default instance;
