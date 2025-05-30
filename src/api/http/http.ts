import axios from "axios";

// Creates a reusable Axios instance with base configuration.
// Used as the main HTTP client throughout the application.
const axiosInstance = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosInstance as request };
