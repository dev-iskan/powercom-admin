import axios from './index';

export default {
  list: (options) => axios.get('/users', { params: options }),
  get: (id) => axios.get(`/users/${id}`),
  store: (payload) => axios.post('/users/', payload),
  update: (payload) => axios.post(`/users/${payload.id}?_method=PUT`, payload),
  destroy: (id) => axios.post(`/users/${id}?_method=DELETE`),
};
