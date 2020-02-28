import axios from './index';

export default {
  list: (options) => axios.get('/orders/items', { params: options }),
  store: (payload) => axios.post('/orders/items', payload),
  update: (payload) => axios.post(`/orders/items/${payload.id}?_method=PUT`, payload),
  destroy: (id) => axios.post(`/orders/items/${id}?_method=DELETE`),
};
