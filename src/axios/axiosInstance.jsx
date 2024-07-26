import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
});

const token = localStorage.getItem("token");
if (token) {
  axiosInstance.defaults.headers["Authorization"] = token;
}

export default axiosInstance;
