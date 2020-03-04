/* eslint-disable no-shadow */
import settings from '@/api/settings';

const state = {
  loading: false,
  paymentMethods: {},
  orderStatuses: {},
  orderSetting: {},
  total: 0,
};

const getters = {
  getStatus: (state) => (statusId) => state.orderStatuses.find(({ id }) => id === statusId),
  getPaymentMethods: (state) => Object.keys(state.paymentMethods).map((key) => ({
    name: state.paymentMethods[key],
    value: key,
  })),
};

const actions = {
  app({ commit }) {
    settings.app()
      .then(({ data }) => {
        commit('setPaymentMethods', data.payment_methods);
        commit('setOrderStatuses', data.order_statuses);
        commit('setOrderSettings', data.order_setting);
        commit('setTotal', data.total);
      });
  },
};

const mutations = {
  setLoading(state, loading) {
    state.loading = loading;
  },
  setPaymentMethods(state, payload) {
    state.paymentMethods = payload;
  },
  setOrderStatuses(state, payload) {
    state.orderStatuses = payload;
  },
  setOrderSettings(state, payload) {
    state.orderSetting = payload;
  },
  setTotal(state, total) {
    state.total = total;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
