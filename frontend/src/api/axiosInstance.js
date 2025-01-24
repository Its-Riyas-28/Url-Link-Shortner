import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1", // Backend URL
  withCredentials: true, // Allow cookies
});

export default instance;
