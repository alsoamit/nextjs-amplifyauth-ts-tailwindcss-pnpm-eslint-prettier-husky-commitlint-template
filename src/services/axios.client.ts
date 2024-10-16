import fetchAccessTokenFromSession from "@/utils/fetchAccessTokens";
import axios from "axios";

// axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = await fetchAccessTokenFromSession();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.error("Error setting auth token in request header:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
