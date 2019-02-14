import axios from "axios";

const makeRequest = () => {
  return axios.create({
    baseURL: `http://localhost:8000/api`
  });
};

const request = makeRequest();

export default request;
