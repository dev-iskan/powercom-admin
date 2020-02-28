import axios from './index';

export default {
  list: (options) => axios.get('/clients', { params: options }),
  get: (id) => axios.get(`/clients/${id}`),
  store: (payload) => axios.post('/clients/', payload),
  update: (payload) => axios.post(`/clients/${payload.id}?_method=PUT`, payload),
};
