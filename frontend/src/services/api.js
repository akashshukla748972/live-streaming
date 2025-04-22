import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Configure axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error);
    throw error;
  }
);

export const getStreamUrl = async () => {
  try {
    return await api.get("/stream/url");
  } catch (error) {
    console.error("Error getting stream URL:", error);
    throw error;
  }
};

export const getMatchData = async () => {
  try {
    return await api.get("/match");
  } catch (error) {
    console.error("Error fetching match data:", error);
    throw error;
  }
};
