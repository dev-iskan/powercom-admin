/* eslint-disable no-shadow */
import api from '@/api/category';

const state = {
  loading: false,
  items: [],
};

const getters = {
  hierarchy(state) {
    const items = [];

    const getChildren = (parentId) => {
      const children = [];
      state.items.forEach((child) => {
        if (child.parent_id === parentId) {
          children.push({
            id: child.id,
            name: child.name,
            children: getChildren(child.id),
          });
        }
      });
      return children;
    };

    state.items.forEach((item) => {
      if (!item.parent_id) {
        items.push({
          id: item.id,
          name: item.name,
          children: getChildren(item.id),
        });
      }
    });

    return items;
  },
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
  destroy({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      commit('setLoading', true);
      api.destroy(id)
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
