import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

if (localStorage.token) {
  instance.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.token;
}

// instance.interceptors.request.use(
//   function (req) {
//     console.log(req);
//     return req;
//   },
//   function (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

export default instance;
