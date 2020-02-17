import axios from 'axios';

export const TOKEN = 'jwt-token';

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    if (localStorage.getItem(TOKEN)) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN)}`;
    }
    return config;
  },
);

export default instance;
