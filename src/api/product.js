import axios from './index';

export default {
  list: (options) => axios.get('/products', { params: options }),
  get: (id) => axios.get(`/products/${id}`),
  store: (payload) => axios.post('/products/', payload),
  update: (payload) => axios.post(`/products/${payload.id}?_method=PUT`, payload),
  destroy: (id) => axios.post(`/products/${id}?_method=DELETE`),
};
