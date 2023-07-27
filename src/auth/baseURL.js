// #Todo 
// export baseurl so instead of using the entire string we can just use this variable and each function within the components gets this variable for requests to 

// all api requests need to run here -- i want do multi requests on multi pages---explain how to export import 

//get token and assign to local storage, 


import axios from "axios";

const baseURL = "https://ai-poll-b30b8a89907a.herokuapp.com/";

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