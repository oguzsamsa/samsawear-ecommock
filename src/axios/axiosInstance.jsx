import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
});

axiosInstance.interceptors.request.use(
  (config) => {
    // localStorage veya sessionStorage'dan token'ı al
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      // Authorization header'ına token'ı ekle
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* const token = localStorage.getItem("token");
if (token) {
  axiosInstance.defaults.headers["Authorization"] = token;
} */

export default axiosInstance;
