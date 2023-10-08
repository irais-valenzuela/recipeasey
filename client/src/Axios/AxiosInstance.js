import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://recipeasey.onrender.com/api"
      : "http://localhost:3005/api",
});

export default instance;
