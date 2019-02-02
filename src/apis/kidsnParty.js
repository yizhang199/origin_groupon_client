import axios from "axios";

let headers = {};

if (localStorage.getItem("user")) {
  const user = JSON.parse(localStorage.getItem("user"));
  const auth_token = `Bearer ${user.api_token}`;
  headers = { Authorization: auth_token };
}

const request = axios.create({
  baseURL: `http://localhost:8000/api`,
  headers
});

export default request;
