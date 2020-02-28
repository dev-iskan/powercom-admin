/* eslint-disable no-shadow */
import api from '@/api/item';

const state = {
  loading: false,
  items: [],
};

const actions = {
  list({ commit }, options) {
    commit('setLoading', true);
    return new Promise((resolve, reject) => {
      api.list(options)
        .then(({ data }) => {
          commit('setItems', data);
          resolve(data);
        })
        .catch(reject)
        .finally(() => commit('setLoading', false));
    });
  },
  store({ commit }, payload) {
    commit('setLoading', true);
    return new Promise((resolve, reject) => {
      api.store(payload)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(reject)
        .finally(() => commit('setLoading', false));
    });
  },
  destroy({ commit }, id) {
    commit('setLoading', true);
    return new Promise((resolve, reject) => {
      api.destroy(id)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(reject)
        .finally(() => commit('setLoading', false));
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
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
