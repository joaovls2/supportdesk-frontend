import axios from "axios";

export const api = axios.create({
  baseURL: "https://supportdesk-api-14g8.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("supportdesk:token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});