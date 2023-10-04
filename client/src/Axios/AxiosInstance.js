import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://recipeasey-diry.onrender.com/api'
});

export default instance;