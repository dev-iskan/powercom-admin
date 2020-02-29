import axios from './index';

export default {
  list: (options) => axios.get('/orders/payments', { params: options }),
  store: (payload) => axios.post('/orders/payments', payload),
};
