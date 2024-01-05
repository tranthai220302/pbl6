import axios from "axios";

const newRequest = axios.create({
  withCredentials: true,
});

export default newRequest;