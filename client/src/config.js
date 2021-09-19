const axios = require('axios');

export const axiosInstance = axios.create({
  baseURL: 'https://marin-blog.herokuapp.com/',
});
