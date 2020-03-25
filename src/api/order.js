import axios from './index';

export default {
  list: (options) => axios.get('/orders/orders', { params: options }),
  get: (id) => axios.get(`/orders/orders/${id}`),
  store: (payload) => axios.post('/orders/orders', payload),
  update: (payload) => axios.post(`/orders/orders/${payload.id}?_method=PUT`, payload),
  destroy: (id) => axios.post(`/orders/${id}?_method=DELETE`),
  setStatus: (id, status) => axios.post(`/orders/orders/${id}/${status}`),
  completeDelivery: (id) => axios.post(`/orders/orders/${id}/complete_delivery`),
  cancelDelivery: (id) => axios.post(`/orders/orders/${id}/cancel_delivery`),
};
