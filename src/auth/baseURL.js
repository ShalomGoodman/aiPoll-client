// #Todo 
// export baseurl so instead of using the entire string we can just use this variable and each function within the components gets this variable for requests to 

// all api requests need to run here -- i want do multi requests on multi pages---explain how to export import 

//get token and assign to local storage, 


import axios from "axios";

const baseURL = "https://ai-poll-b30b8a89907a.herokuapp.com/";
const token = localStorage.getItem("token"); // Retrieve the token from local storage

const base = axios.create({
  baseURL,
});

base.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  return config;
},
(error) => {
  Promise.reject(error);
});

export default base;


// import axios from "axios";

// // export const LOCALSTORAGE_KEY = "token";

// // Create a re-useable axios object, with our API as the baseURL
// const baseURL = "https://ai-poll-b30b8a89907a.herokuapp.com/";
// const base = axios.create({
//   baseURL,
// });

// // Interceptors are axios functionality, that allows you to intercept requests and responses
// // Here we're setting the token in localstorage to the Authorization header
// base.interceptors.request.use((config) => {
// //   const token = localStorage.getItem(LOCALSTORAGE_KEY);
//   console.log("Token in request:", token);
//   config.headers.Authorization = token;
//   console.log(token);
//   return config;
// });

// export default base;
