/* eslint-disable no-shadow */
import api from '@/api/order';
import i18n from '@/plugins/i18n';

const state = {
  loading: false,
  items: [],
  pagination: {
    total: 0,
    offset: 0,
    page: 0,
    length: 0,
  },

  deliveryTypes: [
    {
      name: i18n.t('with_delivery'),
      value: true,
    },
    {
      name: i18n.t('without_delivery'),
      value: false,
    },
  ],
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
  destroy({ commit, dispatch }, { id, params }) {
    return new Promise((resolve, reject) => {
      commit('setLoading', true);
      api.destroy(id)
        .then(({ data }) => {
          dispatch('list', params);
          resolve(data);
        })
        .catch(reject)
        .finally(() => commit('setLoading', false));
    });
  },
  setStatus({ commit, dispatch }, { id, status }) {
    return new Promise((resolve, reject) => {
      commit('setLoading', true);
      api.setStatus(id, status)
        .then(({ data }) => {
          dispatch('list');
          resolve(data);
        })
        .catch(reject)
        .finally(() => commit('setLoading', false));
    });
  },
  completeDelivery({ commit, dispatch }, id) {
    return new Promise((resolve, reject) => {
      commit('setLoading', true);
      api.completeDelivery(id)
        .then(({ data }) => {
          dispatch('list');
          resolve(data);
        })
        .catch(reject)
        .finally(() => commit('setLoading', false));
    });
  },
  cancelDelivery({ commit }, id) {
    return new Promise((resolve, reject) => {
      commit('setLoading', true);
      api.cancelDelivery(id)
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
