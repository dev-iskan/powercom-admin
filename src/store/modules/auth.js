/* eslint-disable no-shadow */
import api from '@/api/auth';
import { TOKEN } from '@/api';

const state = {
  token: localStorage.getItem(TOKEN) || '',
  user: {},
};

const getters = {

};

const actions = {
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      api.login(payload)
        .then(({ data }) => {
          commit('setToken', data.token);
          commit('setUser', data.user);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  detail({ commit }) {
    return new Promise((resolve, reject) => {
      api.detail()
        .then(({ data }) => {
          commit('setUser', data.user);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      api.logout()
        .then(({ data }) => {
          commit('setUser', {});
          commit('setToken', '');
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const mutations = {
  setToken(state, token) {
    localStorage.setItem(TOKEN, token);
    state.token = token;
  },
  setUser(state, user) {
    state.user = user;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
