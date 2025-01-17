/* eslint-disable no-shadow */
import api from '@/api/client';

const state = {
  loading: false,
  items: [],
};

const getters = {
  namesWithIds: (state) => state.items.map((item) => ({
    id: item.id,
    name: `${item.name} ${item.surname || ''} ${item.patronymic || ''}`,
  })),
};

const actions = {
  list({ commit }, options) {
    return new Promise((resolve, reject) => {
      commit('setLoading', true);
      api.list(options)
        .then(({ data }) => {
          commit('setItems', data);
          resolve(data);
        })
        .catch(reject)
        .finally(() => commit('setLoading', false));
    });
  },
  get({ commit }, id) {
    return new Promise((resolve, reject) => {
      commit('setLoading', true);
      api.get(id)
        .then(({ data }) => { resolve(data); })
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
  update({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      commit('setLoading', true);
      api.update(payload)
        .then(({ data }) => {
          dispatch('list');
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
  getters,
  actions,
  mutations,
};
