import axios from "axios";

const instance = axios.create({
  baseURL: "https://url-link-shortner-backend.onrender.com/api/v1", // Replace with your actual backend Render URL
  withCredentials: true, // Ensure cookies are sent
});

export default instance;


// https://url-link-shortner-backend.onrender.com

