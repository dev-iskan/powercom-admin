import axios from './index';

export default {
  list: (resource, id) => axios.get(`/media/images/${resource}/${id}`),
  get: (id) => axios.get(`/media/images/${id}`),
  store: (resource, id, payload) => axios.post(`/media/images/${resource}/${id}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),

  destroy: (id) => axios.delete(`/media/images/${id}`),
};
