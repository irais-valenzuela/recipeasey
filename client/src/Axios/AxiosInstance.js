import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://recipeasey-diry.onrender.com"
      : "http://localhost:3005",
});

export default instance;
