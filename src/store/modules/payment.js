/* eslint-disable no-shadow */
import api from '@/api/payment';

const state = {
  loading: false,
  items: [],
  types: {},
  pagination: {
    total: 0,
    offset: 0,
    page: 0,
    length: 0,
  },
};

const getters = {

};

const actions = {
  list({ commit }, params) {
    return new Promise((resolve, reject) => {
      commit('setLoading', true);
      api.list(params)
        .then(({ data }) => {
          commit('setItems', data.data);
          commit('setPagination', {
            total: data.total,
            page: data.current_page,
            offset: data.per_page,
            length: data.last_page,
          });
          resolve(data);
        })
        .catch(reject)
        .finally(() => commit('setLoading', false));
    });
  },
  store({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      commit('setLoading', true);
      api.store(payload)
        .then(({ data }) => {
          dispatch('list');
          resolve(data);
        })
        .catch(reject)
        .finally(() => commit('setLoading', false));
    });
  },
  getTypes({ commit }) {
    return new Promise((resolve, reject) => {
      api.types()
        .then(({ data }) => {
          commit('setTypes', data);
          resolve(data);
        })
        .catch(reject);
    });
  },
};

const mutations = {
  setLoading(state, loading) {
    state.loading = loading;
  },
  setItems(state, items) {
    state.items = items;
  },
  setTypes(item, types) {
    state.types = types;
  },
  setPagination(state, {
    total, offset, page, length,
  }) {
    state.pagination.total = total;
    state.pagination.offset = offset;
    state.pagination.page = page;
    state.pagination.length = length;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
