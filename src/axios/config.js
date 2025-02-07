import axios from "axios";

const BaseUrl = "https://realauto.limsa.uz/api/";

const api = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); 
    }
    return Promise.reject(error);
  }
);

export default api;
