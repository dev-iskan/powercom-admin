import axios from './index';

export default {
  list: (options) => axios.get('/orders/payments', { params: options }),
  types: () => axios.get('/orders/payment_methods'),
};
