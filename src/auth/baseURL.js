import axios from "axios";

const baseURL = "https://ai-poll-b30b8a89907a.herokuapp.com/";
const token = localStorage.getItem("token"); // Retrieve the token from local storage

const base = axios.create({
  baseURL,
});

base.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");
  if (token) {
   config.headers.Authorization = `token ${token}`; // Set the token in the Authorization header
  }
  return config;
},
(error) => {
  Promise.reject(error);
});

export default base;

