import axios from './index';

export default {
  list: (options) => axios.get('/brands', options),
  get: (id) => axios.get(`/brands/${id}`),
  store: (payload) => axios.post('/brands/', payload),
  update: (payload) => axios.post(`/brands/${payload.id}?_method=PUT`, payload),
  destroy: (id) => axios.post(`/brands/${id}?_method=DELETE`),
};
