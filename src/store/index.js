import Vue from 'vue';
import Vuex from 'vuex';
import global from './modules/global';
import auth from './modules/auth';
import category from './modules/category';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    auth,
    category,
  },
});
