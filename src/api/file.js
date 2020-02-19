import axios from './index';

export default {
  list: (id) => axios.get(`/media/files?product_id=${id}`),
  get: (name) => axios.get(`/media/files?name=${name}`),
  store: (id, payload) => axios.post(`/media/files?product_id=${id}`, payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  destroy: (id) => axios.delete(`/media/files/${id}`),
};
