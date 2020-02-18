import axios from './index';

export default {
  list: (options) => axios.get('/categories', options),
  get: (id) => axios.get(`/categories/${id}`),
  store: (payload) => axios.post('/categories/', payload),
  update: (payload) => axios.post(`/categories/${payload.id}?_method=PUT`, payload),
  destroy: (id) => axios.post(`/categories/${id}?_method=DELETE`),
};
