import axios from './index';

export default {
  login: (payload) => axios.post('/auth/login', payload),
  logout: () => axios.post('/auth/logout'),
};
