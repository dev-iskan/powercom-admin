import axios from './index';

export default {
  list: (options) => axios.get('/articles', { params: options }),
  get: (id) => axios.get(`/articles/${id}`),
  store: (payload) => axios.post('/articles/', payload),
  update: (payload) => axios.post(`/articles/${payload.id}?_method=PUT`, payload),
  destroy: (id) => axios.post(`/articles/${id}?_method=DELETE`),
};
