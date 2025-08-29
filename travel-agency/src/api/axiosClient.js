// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api", // اینو با آدرس سرور خودت عوض کن
  headers: {
    "Content-Type": "application/json",
  },
});

// // اینترسپتور برای اضافه کردن توکن (در صورت نیاز)
// axiosClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // اینترسپتور برای هندل ارورها
// axiosClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error(error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

export default axiosClient;
