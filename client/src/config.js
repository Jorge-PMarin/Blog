const axios = require('axios');

export const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:4000/',
});
