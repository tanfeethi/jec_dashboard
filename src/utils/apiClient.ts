import axios from "axios";
import { useAuthStore } from "../store/authStore";

const apiClient = axios.create({
  baseURL: "https://jecwebsite.backend.tanfeethi.com.sa",
});

// Attach token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(token);
      
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with a status
      if (error.response.status === 401) {
        // const logout = useAuthStore.getState().logout;
        // logout();
      }
    } else if (error.request) {
      // Request was made but no response — likely CORS issue
      console.warn(
        "No response received. Possible CORS error or blocked request."
      );

      // Optional: treat it like a forced logout
      const logout = useAuthStore.getState().logout;
      logout();
    } else {
      // Something went wrong in setting up the request
      console.error("Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
