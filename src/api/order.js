import axios from './index';

export default {
  list: (options) => axios.get('/orders/orders', { params: options }),
  get: (id) => axios.get(`/orders/orders/${id}`),
  store: (payload) => axios.post('/orders/orders', payload),
  update: (payload) => axios.post(`/orders/${payload.id}?_method=PUT`, payload),
  destroy: (id) => axios.post(`/orders/${id}?_method=DELETE`),
  setStatus: (id, status) => axios.post(`/orders/orders/${id}/${status}`),
};
