import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://www.harumi.store/api",
  withCredentials: true,
});

export default newRequest;